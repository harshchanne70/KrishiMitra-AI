from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class FarmerProfileCreate(BaseModel):
    farmer_name: str = Field(..., min_length=2, max_length=100)
    phone: Optional[str] = None
    state: str = "Maharashtra"
    district: str = "Nagpur"
    village: str = Field(..., min_length=2)
    preferred_lang: str = "hi"
    total_land: float = Field(2.5, gt=0)
    land_unit: str = "acre"

class FarmerProfileUpdate(BaseModel):
    farmer_name: Optional[str] = None
    phone: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    village: Optional[str] = None
    preferred_lang: Optional[str] = None
    total_land: Optional[float] = None
    land_unit: Optional[str] = None

class FarmerProfileResponse(BaseModel):
    id: str
    user_id: Optional[str]
    farmer_name: str
    phone: Optional[str]
    state: str
    district: str
    village: str
    preferred_lang: str
    total_land: float
    land_unit: str
    created_at: datetime

    model_config = {"from_attributes": True}

class FarmCreate(BaseModel):
    farm_name: str = "Main Farm Plot"
    soil_type: str = "black"
    ph: Optional[float] = None
    water_source: str = "borewell"
    water_availability: str = "medium"
    irrigation_method: str = "drip"
    current_season: str = "kharif"
    notes: Optional[str] = None

class FarmResponse(FarmCreate):
    id: str
    profile_id: str
    created_at: datetime

    model_config = {"from_attributes": True}
