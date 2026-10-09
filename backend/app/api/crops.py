from fastapi import APIRouter
from typing import List, Optional
from backend.app.schemas.crop import CropCatalogItem, CropSuitabilityQuery, CropSuitabilityResult
from backend.app.services.crop_service import CROPS_DATABASE, evaluate_crop_suitability

router = APIRouter(prefix="/crops", tags=["Crops"])

@router.get("/catalog", response_model=List[CropCatalogItem])
def get_catalog():
    items = []
    for c in CROPS_DATABASE:
        items.append(CropCatalogItem(
            id=c["crop_id"],
            crop_id=c["crop_id"],
            name_en=c["name_en"],
            name_hi=c["name_hi"],
            name_mr=c["name_mr"],
            scientific_name=c.get("scientific_name"),
            icon=c["icon"],
            water_req=c["water_req"],
            min_ph=c["min_ph"],
            max_ph=c["max_ph"],
            suitable_soils=c["suitable_soils"],
            suitable_seasons=c["suitable_seasons"],
            varieties=c["varieties"],
            growth_stages=c["growth_stages"],
            duration_days=c["duration_days"],
            expected_yield=c["expected_yield"]
        ))
    return items

@router.post("/suitability", response_model=List[CropSuitabilityResult])
def calculate_suitability(query: CropSuitabilityQuery):
    results = evaluate_crop_suitability(
        soil_type=query.soil_type,
        season=query.season,
        water_availability=query.water_availability,
        ph=query.ph
    )
    return results
