import uuid
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from backend.app.schemas.advisory import AdvisoryInputRequest, AdvisorySummaryResponse
from backend.app.services.crop_service import get_crop_by_id
from backend.app.services.irrigation_service import calculate_irrigation_guidance
from backend.app.services.weather_service import fetch_live_weather
from backend.app.core.config import settings

VERIFIED_KNOWLEDGE_CITATIONS = [
    {"source": "ICAR Handbook of Agriculture (6th Ed.)", "organization": "Indian Council of Agricultural Research, New Delhi"},
    {"source": "Package of Practices for Kharif/Rabi Crops", "organization": "State Agricultural Universities (MPKV / PAU / TNAU)"},
    {"source": "National Agromet Advisory Service Bulletin", "organization": "India Meteorological Department (IMD) - Agromet Division"},
    {"source": "Soil Health Management Guidelines", "organization": "Department of Agriculture & Farmers Welfare (DA&FW)"}
]

async def generate_comprehensive_advisory(
    req: AdvisoryInputRequest
) -> AdvisorySummaryResponse:
    session_id = f"adv-{uuid.uuid4().hex[:10]}"
    now_dt = datetime.now(timezone.utc)
    
    crop_info = get_crop_by_id(req.crop_id)
    crop_name = crop_info["name_en"] if crop_info else req.crop_name
    
    # 1. Fetch weather context
    weather_resp = await fetch_live_weather(
        village=req.village,
        district=req.district,
        state_name=req.state
    )
    
    # 2. Irrigation calculation
    rain_prob_48h = weather_resp.forecast[0].rain_probability if weather_resp.forecast else 10
    irr_plan = calculate_irrigation_guidance(
        crop_id=req.crop_id,
        growth_stage=req.growth_stage,
        soil_type=req.soil_type,
        water_availability=req.water_availability,
        rain_probability_48h=rain_prob_48h
    )

    # 3. Build Card: My Farm Summary
    farm_summary = {
        "farmer_name": req.farmer_name,
        "village": req.village,
        "district": req.district,
        "state": req.state,
        "total_area": f"{req.farm_area} {req.area_unit}",
        "soil_type": req.soil_type.capitalize(),
        "soil_ph": req.soil_ph if req.soil_ph is not None else "Not tested (assumed 6.5 - 7.5)",
        "water_source": req.water_source.capitalize(),
        "water_availability": req.water_availability.capitalize(),
        "season": req.current_season.capitalize()
    }

    # 4. Build Card: Selected Crop & Growth Stage
    crop_growth_stage = {
        "crop_name": crop_name,
        "variety": req.crop_variety or "Local recommended high-yielding variety",
        "current_stage": req.growth_stage,
        "sowing_date": req.sowing_date or "Current season regular sowing",
        "allocated_area": f"{req.allocated_area or req.farm_area} {req.area_unit}",
        "expected_maturity": crop_info["duration_days"] if crop_info else "90-120 days",
        "benchmark_yield": crop_info["expected_yield"] if crop_info else "15-20 Quintals/Acre"
    }

    # 5. Build Card: Weather Advisory
    weather_advisory = {
        "current_temperature": f"{weather_resp.current_temp}°C",
        "condition": weather_resp.current_condition,
        "icon": weather_resp.current_icon,
        "humidity": f"{weather_resp.current_humidity}%",
        "rain_probability": f"{weather_resp.current_rain_prob}%",
        "wind_speed": f"{weather_resp.current_wind} km/h",
        "forecast_headline": weather_resp.advisory_recommendation,
        "is_live_data": weather_resp.is_live_api,
        "data_source": weather_resp.source
    }

    # 6. Build Card: Soil & Water Notes
    soil_and_water = {
        "retention_profile": f"{req.soil_type.capitalize()} soil provides {'high water holding capacity' if req.soil_type in ['black', 'clay'] else 'rapid drainage requiring frequent light watering'}.",
        "ph_status": (
            f"pH {req.soil_ph} is within normal arable limits."
            if req.soil_ph and 6.0 <= req.soil_ph <= 7.8
            else "Standard neutral range assumed. Testing through Soil Health Card recommended."
        ),
        "water_security": f"{req.water_source.capitalize()} source with {req.water_availability} availability."
    }

    # 7. Build Card: Crop Care Recommendations
    care_recommendations: List[Dict[str, Any]] = [
        {
            "category": "Nutrient Management",
            "recommendation": f"For {crop_name} at the {req.growth_stage} stage, prioritize balanced NPK. Avoid excess nitrogen which promotes vegetative lodging and pest susceptibility.",
            "source": "ICAR Agronomy Division - Nutrient Best Management Practices"
        },
        {
            "category": "Intercultural Operations",
            "recommendation": "Perform shallow hoeing or weeding to break soil capillaries, conserve moisture, and suppress weed competition.",
            "source": "State University Agricultural Extension Field Manual"
        },
        {
            "category": "Moisture Conservation",
            "recommendation": "Consider organic mulching (crop residue or straw) in row spaces to decrease evaporation losses and moderate root zone temperature.",
            "source": "Central Research Institute for Dryland Agriculture (CRIDA)"
        }
    ]

    # 8. Build Card: Possible Pest or Disease Concerns
    pest_concerns: List[Dict[str, Any]] = []
    if req.disease_result and req.disease_result.get("condition_id") != "healthy":
        pest_concerns.append({
            "issue": req.disease_result.get("condition_name_en", "Foliage Symptom"),
            "severity": "Active Attention Required",
            "symptoms": req.disease_result.get("symptoms_observed", []),
            "action": req.disease_result.get("immediate_care_actions", ["Prune infected leaves", "Ensure dry canopy"]),
            "source": "Leaf Photo Diagnostic & ICAR Disease Management Guide"
        })
    else:
        pest_concerns.append({
            "issue": f"Seasonal sucking pests & leaf spots in {crop_name}",
            "severity": "Preventive Monitoring",
            "symptoms": ["Curling of young leaves", "Yellowing along edges", "Minor leaf perforations"],
            "action": [
                "Install yellow sticky traps (5-6 per acre) to monitor whiteflies and aphids.",
                "Erect bird perches (10-15 per acre) to promote biological pest predation.",
                "Spray 5% Neem Seed Kernel Extract (NSKE) at early sign of pest incidence."
            ],
            "source": "ICAR Integrated Pest Management (IPM) Standard Protocols"
        })

    # 9. Build Card: Important Alerts
    alerts: List[Dict[str, Any]] = []
    if weather_resp.current_rain_prob >= 60 or irr_plan["rain_delay_recommended"]:
        alerts.append({
            "type": "weather",
            "severity": "warning",
            "title": "Rain Alert & Spray Withholding",
            "message": "Rain expected in upcoming forecast. Postpone scheduled chemical spraying and furrow irrigation to prevent chemical runoff and water stagnation."
        })
    if req.soil_ph and (req.soil_ph < 6.0 or req.soil_ph > 8.0):
        alerts.append({
            "type": "soil",
            "severity": "info",
            "title": "Soil pH Imbalance",
            "message": f"Recorded soil pH is {req.soil_ph}. Strongly acidic or alkaline soils reduce phosphorus and zinc uptake. Apply soil amendments following local soil test lab advice."
        })
    if not alerts:
        alerts.append({
            "type": "general",
            "severity": "info",
            "title": "Normal Field Conditions",
            "message": "No severe weather or phytosanitary alerts active for your location. Normal agronomic schedule is progressing well."
        })

    # 10. Build Card: Recommended Next Steps
    next_steps = [
        f"Inspect field moisture 2 inches below the surface before next irrigation cycle ({irr_plan['interval_days']} days interval).",
        "Maintain clean irrigation channels and remove competing weed hosts along farm borders.",
        "Keep track of mandi prices in your district for upcoming harvest marketing decisions.",
        "In case of any unidentifiable disease outbreak or persistent yellowing, consult your nearest Krishi Vigyan Kendra (KVK) officer."
    ]

    return AdvisorySummaryResponse(
        session_id=session_id,
        created_at=now_dt,
        farmer_summary=farm_summary,
        crop_growth_stage=crop_growth_stage,
        weather_advisory=weather_advisory,
        soil_and_water_notes=soil_and_water,
        irrigation_guidance=irr_plan,
        crop_care_recommendations=care_recommendations,
        pest_and_disease_concerns=pest_concerns,
        important_alerts=alerts,
        recommended_next_steps=next_steps,
        knowledge_sources=VERIFIED_KNOWLEDGE_CITATIONS,
        disclaimer="Advisory generated using verified agronomic guidelines from ICAR and State Agricultural Universities. This system provides advisory support and does not replace official on-site diagnosis by certified agricultural authorities."
    )
