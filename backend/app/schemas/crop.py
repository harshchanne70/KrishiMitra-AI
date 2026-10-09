from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class CropCatalogItem(BaseModel):
    id: str
    crop_id: str
    name_en: str
    name_hi: str
    name_mr: str
    scientific_name: Optional[str] = None
    icon: str
    water_req: str
    min_ph: float
    max_ph: float
    suitable_soils: List[str]
    suitable_seasons: List[str]
    varieties: List[Dict[str, Any]]
    growth_stages: List[str]
    duration_days: str
    expected_yield: str

class CropSuitabilityQuery(BaseModel):
    soil_type: str = "black"
    ph: Optional[float] = None
    water_availability: str = "medium"
    season: str = "kharif"

class CropSuitabilityResult(BaseModel):
    crop_id: str
    name_en: str
    name_hi: str
    name_mr: str
    icon: str
    water_req: str
    score: int
    is_heuristic_estimate: bool = True
    match_reasons: List[str]
    cautions: List[str]
    suitable_soils: List[str]
    suitable_seasons: List[str]
    varieties: List[Dict[str, Any]]
    growth_stages: List[str]
