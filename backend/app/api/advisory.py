import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.app.core.database import get_db
from backend.app.models.advisory import AdvisorySession, SystemAlert
from backend.app.schemas.advisory import (
    AdvisoryInputRequest,
    AdvisorySummaryResponse,
    AdvisorySessionListItem
)
from backend.app.services.advisory_service import generate_comprehensive_advisory
from backend.app.api.auth import get_current_user_optional
from backend.app.models.user import User

router = APIRouter(prefix="/advisory", tags=["Advisory"])

@router.post("/generate", response_model=AdvisorySummaryResponse)
async def create_advisory(
    req: AdvisoryInputRequest,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    # 1. Generate full agronomic advisory
    summary = await generate_comprehensive_advisory(req)

    # 2. Persist in database
    session_record = AdvisorySession(
        id=summary.session_id,
        user_id=current_user.id if current_user else None,
        farmer_name=req.farmer_name,
        village=req.village,
        state=req.state,
        crop_id=req.crop_id,
        crop_name=req.crop_name,
        crop_variety=req.crop_variety,
        growth_stage=req.growth_stage,
        sowing_date=req.sowing_date,
        allocated_area=req.allocated_area,
        area_unit=req.area_unit,
        suitability_score=88.0,
        status="completed",
        farm_snapshot=summary.farmer_summary,
        weather_snapshot=summary.weather_advisory,
        irrigation_plan=summary.irrigation_guidance,
        disease_result=req.disease_result,
        advisory_output={
            "crop_growth_stage": summary.crop_growth_stage,
            "soil_and_water_notes": summary.soil_and_water_notes,
            "crop_care_recommendations": summary.crop_care_recommendations,
            "pest_and_disease_concerns": summary.pest_and_disease_concerns,
            "important_alerts": summary.important_alerts,
            "recommended_next_steps": summary.recommended_next_steps,
            "knowledge_sources": summary.knowledge_sources,
            "disclaimer": summary.disclaimer
        }
    )
    db.add(session_record)

    # Also persist alerts into SystemAlert table
    for a in summary.important_alerts:
        db.add(SystemAlert(
            id=f"alert-{uuid.uuid4().hex[:8]}",
            session_id=session_record.id,
            user_id=current_user.id if current_user else None,
            alert_type=a.get("type", "weather"),
            severity=a.get("severity", "warning"),
            title=a.get("title", "Crop Alert"),
            message=a.get("message", "")
        ))

    db.commit()
    db.refresh(session_record)
    return summary

@router.get("/history", response_model=List[AdvisorySessionListItem])
def get_advisory_history(
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    query = db.query(AdvisorySession)
    if current_user:
        query = query.filter(AdvisorySession.user_id == current_user.id)
    
    records = query.order_by(AdvisorySession.created_at.desc()).limit(limit).all()
    
    result = []
    for r in records:
        headline = ""
        if r.advisory_output and "crop_care_recommendations" in r.advisory_output:
            recs = r.advisory_output["crop_care_recommendations"]
            if recs and len(recs) > 0:
                headline = recs[0].get("recommendation", "")[:80] + "..."
        result.append(AdvisorySessionListItem(
            id=r.id,
            farmer_name=r.farmer_name,
            village=r.village,
            crop_id=r.crop_id,
            crop_name=r.crop_name,
            growth_stage=r.growth_stage,
            suitability_score=r.suitability_score,
            created_at=r.created_at,
            summary_text=headline
        ))
    return result

@router.get("/{session_id}", response_model=AdvisorySummaryResponse)
def get_advisory_detail(session_id: str, db: Session = Depends(get_db)):
    record = db.query(AdvisorySession).filter(AdvisorySession.id == session_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Advisory session record not found.")

    adv_out = record.advisory_output or {}
    return AdvisorySummaryResponse(
        session_id=record.id,
        created_at=record.created_at,
        farmer_summary=record.farm_snapshot or {},
        crop_growth_stage=adv_out.get("crop_growth_stage", {}),
        weather_advisory=record.weather_snapshot or {},
        soil_and_water_notes=adv_out.get("soil_and_water_notes", {}),
        irrigation_guidance=record.irrigation_plan or {},
        crop_care_recommendations=adv_out.get("crop_care_recommendations", []),
        pest_and_disease_concerns=adv_out.get("pest_and_disease_concerns", []),
        important_alerts=adv_out.get("important_alerts", []),
        recommended_next_steps=adv_out.get("recommended_next_steps", []),
        knowledge_sources=adv_out.get("knowledge_sources", []),
        disclaimer=adv_out.get("disclaimer", "Verified agronomic guidelines.")
    )

@router.delete("/{session_id}")
def delete_advisory_record(session_id: str, db: Session = Depends(get_db)):
    record = db.query(AdvisorySession).filter(AdvisorySession.id == session_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Advisory record not found.")
    
    # Also delete associated alerts
    db.query(SystemAlert).filter(SystemAlert.session_id == session_id).delete()
    db.delete(record)
    db.commit()
    return {"status": "success", "message": f"Advisory record {session_id} removed."}
