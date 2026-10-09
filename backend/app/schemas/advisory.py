from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class AdvisoryInputRequest(BaseModel):
    # Farmer & Location
    farmer_name: str
    phone: Optional[str] = None
    state: str = "Maharashtra"
    district: str = "Nagpur"
    village: str
    preferred_lang: str = "hi"
    
    # Land & Soil
    farm_area: float = 2.5
    area_unit: str = "acre"
    soil_type: str = "black"
    soil_ph: Optional[float] = None
    water_source: str = "borewell"
    water_availability: str = "medium"
    irrigation_method: str = "drip"
    current_season: str = "kharif"
    
    # Selected Crop
    crop_id: str
    crop_name: str
    crop_variety: Optional[str] = None
    growth_stage: str = "Vegetative"
    sowing_date: Optional[str] = None
    allocated_area: Optional[float] = None
    
    # Disease image analysis result if uploaded
    disease_result: Optional[Dict[str, Any]] = None

class AdvisorySummaryResponse(BaseModel):
    session_id: str
    created_at: datetime
    farmer_summary: Dict[str, Any]
    crop_growth_stage: Dict[str, Any]
    weather_advisory: Dict[str, Any]
    soil_and_water_notes: Dict[str, Any]
    irrigation_guidance: Dict[str, Any]
    crop_care_recommendations: List[Dict[str, Any]]
    pest_and_disease_concerns: List[Dict[str, Any]]
    important_alerts: List[Dict[str, Any]]
    recommended_next_steps: List[str]
    knowledge_sources: List[Dict[str, str]]
    disclaimer: str

class AdvisorySessionListItem(BaseModel):
    id: str
    farmer_name: str
    village: Optional[str]
    crop_id: str
    crop_name: str
    growth_stage: Optional[str]
    suitability_score: float
    created_at: datetime
    summary_text: Optional[str] = None
