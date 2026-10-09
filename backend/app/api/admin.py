from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from backend.app.core.database import get_db
from backend.app.models.advisory import AdvisorySession, SystemAlert
from backend.app.models.user import User
from backend.app.models.knowledge import KnowledgeSource
from backend.app.services.crop_service import CROPS_DATABASE
from backend.app.api.auth import get_current_user

router = APIRouter(prefix="/admin", tags=["Admin Management"])

def check_admin_role(user: User = Depends(get_current_user)) -> User:
    if user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required to access this resource."
        )
    return user

@router.get("/stats")
def get_system_stats(db: Session = Depends(get_db)):
    total_users = db.query(User).count()
    total_advisories = db.query(AdvisorySession).count()
    total_alerts = db.query(SystemAlert).count()
    total_crops = len(CROPS_DATABASE)
    
    return {
        "status": "operational",
        "system_name": "KrishiMitra AI Agricultural Advisory Platform",
        "version": "1.0.0",
        "database_type": "SQLite / PostgreSQL Hybrid",
        "total_farmers": max(total_users, 1),
        "total_advisories_generated": total_advisories,
        "active_alerts": total_alerts,
        "configured_crops": total_crops,
        "ai_status": "Rule-Based Expert Engine + Public Agromet Live Sync Active"
    }

@router.get("/crops")
def get_admin_crops():
    return CROPS_DATABASE

@router.get("/knowledge-sources")
def get_knowledge_sources():
    return [
        {
            "id": "src-1",
            "title": "ICAR Standard Package of Practices - Oilseeds & Pulses",
            "organization": "Indian Council of Agricultural Research (ICAR)",
            "year": "2024",
            "category": "Agronomy & Soil Management",
            "crops": ["Soybean", "Pigeon Pea", "Chickpea"],
            "url": "https://icar.org.in"
        },
        {
            "id": "src-2",
            "title": "Cotton Production Technology & Pink Bollworm IPM",
            "organization": "Central Institute for Cotton Research (CICR), Nagpur",
            "year": "2024",
            "category": "Pest & Disease Management",
            "crops": ["Cotton"],
            "url": "https://cicr.icar.gov.in"
        },
        {
            "id": "src-3",
            "title": "Integrated Nutrient and Irrigation Management in Wheat",
            "organization": "Indian Institute of Wheat and Barley Research (IIWBR), Karnal",
            "year": "2023",
            "category": "Irrigation & Nutrients",
            "crops": ["Wheat"],
            "url": "https://iiwbr.icar.gov.in"
        },
        {
            "id": "src-4",
            "title": "System of Rice Intensification (SRI) & AWD Water Management",
            "organization": "National Rice Research Institute (NRRI), Cuttack",
            "year": "2023",
            "category": "Water Management",
            "crops": ["Rice"],
            "url": "https://icar-nrri.in"
        }
    ]
