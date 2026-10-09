from typing import List, Dict, Any, Optional
from backend.app.schemas.crop import CropSuitabilityResult

CROPS_DATABASE: List[Dict[str, Any]] = [
    {
        "crop_id": "soybean",
        "name_en": "Soybean",
        "name_hi": "सोयाबीन",
        "name_mr": "सोयाबीन",
        "scientific_name": "Glycine max",
        "icon": "🌱",
        "water_req": "medium",
        "min_ph": 6.0,
        "max_ph": 7.5,
        "suitable_soils": ["black", "clay", "alluvial"],
        "suitable_seasons": ["kharif"],
        "varieties": [
            {"name": "JS 335", "maturity_days": "95-100", "description": "High yield, resistant to pod shattering"},
            {"name": "JS 93-05", "maturity_days": "90-95", "description": "Early maturing, suitable for rainfed areas"},
            {"name": "NRC 37", "maturity_days": "100-105", "description": "Drought tolerant, good oil content"}
        ],
        "growth_stages": ["Germination (0-7d)", "Vegetative (8-30d)", "Flowering (31-50d)", "Pod Formation (51-75d)", "Maturity (76-100d)"],
        "duration_days": "90-105 days",
        "expected_yield": "18-24 Quintals/Acre",
        "ideal_temp_c": "25-32°C"
    },
    {
        "crop_id": "cotton",
        "name_en": "Cotton",
        "name_hi": "कपास",
        "name_mr": "कापूस",
        "scientific_name": "Gossypium hirsutum",
        "icon": "🌾",
        "water_req": "medium",
        "min_ph": 6.0,
        "max_ph": 8.0,
        "suitable_soils": ["black", "clay"],
        "suitable_seasons": ["kharif"],
        "varieties": [
            {"name": "Bt Cotton (Bollgard II)", "maturity_days": "150-165", "description": "High boll retention, resistant to bollworm"},
            {"name": "PKV Hy-2", "maturity_days": "160-170", "description": "Vidarbha/Marathwada adapted high lint"},
            {"name": "Suraj", "maturity_days": "140-150", "description": "Non-Bt high strength long staple"}
        ],
        "growth_stages": ["Germination (0-10d)", "Squaring (35-50d)", "Flowering & Boll (55-90d)", "Boll Bursting (95-140d)", "Harvesting (140-170d)"],
        "duration_days": "150-170 days",
        "expected_yield": "12-18 Quintals/Acre",
        "ideal_temp_c": "28-35°C"
    },
    {
        "crop_id": "wheat",
        "name_en": "Wheat",
        "name_hi": "गेहूं",
        "name_mr": "गहू",
        "scientific_name": "Triticum aestivum",
        "icon": "🌾",
        "water_req": "medium",
        "min_ph": 6.0,
        "max_ph": 7.5,
        "suitable_soils": ["alluvial", "black", "clay"],
        "suitable_seasons": ["rabi"],
        "varieties": [
            {"name": "GW 496", "maturity_days": "115-120", "description": "Preferred for central zone, bold grain"},
            {"name": "Lok-1", "maturity_days": "105-110", "description": "Heat tolerant, excellent chapati quality"},
            {"name": "HD-2967", "maturity_days": "125-130", "description": "High tillering and yellow rust resistance"}
        ],
        "growth_stages": ["Crown Root Initiation (20-25d)", "Tillering (40-45d)", "Jointing & Booting (60-65d)", "Flowering (75-80d)", "Grain Filling & Maturity (90-120d)"],
        "duration_days": "110-130 days",
        "expected_yield": "20-26 Quintals/Acre",
        "ideal_temp_c": "15-24°C"
    },
    {
        "crop_id": "rice",
        "name_en": "Rice (Paddy)",
        "name_hi": "धान (चावल)",
        "name_mr": "भात (तांदूळ)",
        "scientific_name": "Oryza sativa",
        "icon": "🌾",
        "water_req": "high",
        "min_ph": 5.5,
        "max_ph": 7.0,
        "suitable_soils": ["clay", "alluvial", "laterite"],
        "suitable_seasons": ["kharif"],
        "varieties": [
            {"name": "MTU 1010", "maturity_days": "120-125", "description": "Short duration, pest resistant, high yield"},
            {"name": "Indrayani", "maturity_days": "135-140", "description": "Aromatic, preferred for Maharashtra Western Ghats"},
            {"name": "IR 64", "maturity_days": "125-130", "description": "Widely adapted semi-dwarf coarse grain"}
        ],
        "growth_stages": ["Nursery/Sowing (0-25d)", "Tillering (26-55d)", "Panicle Initiation (56-75d)", "Heading & Flowering (76-90d)", "Ripening & Harvesting (91-130d)"],
        "duration_days": "120-140 days",
        "expected_yield": "25-32 Quintals/Acre",
        "ideal_temp_c": "24-33°C"
    },
    {
        "crop_id": "chickpea",
        "name_en": "Chickpea (Chana)",
        "name_hi": "चना (छोला)",
        "name_mr": "हरभरा (चना)",
        "scientific_name": "Cicer arietinum",
        "icon": "🫛",
        "water_req": "low",
        "min_ph": 6.0,
        "max_ph": 7.8,
        "suitable_soils": ["black", "alluvial", "clay"],
        "suitable_seasons": ["rabi"],
        "varieties": [
            {"name": "Digvijay", "maturity_days": "100-105", "description": "Wilt resistant, drought tolerant deshi chana"},
            {"name": "Vijay (Phule G-81-1-1)", "maturity_days": "90-95", "description": "Early maturing, excellent drought resistance"},
            {"name": "JAKI 9218", "maturity_days": "100-110", "description": "Bold seeded, high branching"}
        ],
        "growth_stages": ["Germination (0-8d)", "Vegetative Branching (9-35d)", "Flowering (36-60d)", "Pod Development (61-85d)", "Maturity (86-105d)"],
        "duration_days": "95-110 days",
        "expected_yield": "10-15 Quintals/Acre",
        "ideal_temp_c": "15-25°C"
    },
    {
        "crop_id": "pigeonpea",
        "name_en": "Pigeon Pea (Tur / Arhar)",
        "name_hi": "तूर (अरहर)",
        "name_mr": "तूर",
        "scientific_name": "Cajanus cajan",
        "icon": "🫘",
        "water_req": "low",
        "min_ph": 5.5,
        "max_ph": 7.5,
        "suitable_soils": ["black", "red", "clay"],
        "suitable_seasons": ["kharif"],
        "varieties": [
            {"name": "BDN 711", "maturity_days": "150-160", "description": "White seeded, tolerant to sterility mosaic"},
            {"name": "BSMR 736", "maturity_days": "170-180", "description": "Resistant to wilt and sterility mosaic"},
            {"name": "ICPL 87119 (Asha)", "maturity_days": "180-190", "description": "High yielding medium duration"}
        ],
        "growth_stages": ["Seedling (0-30d)", "Vegetative (31-80d)", "Branching & Flowering (81-125d)", "Pod Formation (126-155d)", "Harvesting (156-180d)"],
        "duration_days": "150-180 days",
        "expected_yield": "8-14 Quintals/Acre",
        "ideal_temp_c": "25-35°C"
    },
    {
        "crop_id": "maize",
        "name_en": "Maize (Corn)",
        "name_hi": "मक्का",
        "name_mr": "मका",
        "scientific_name": "Zea mays",
        "icon": "🌽",
        "water_req": "medium",
        "min_ph": 5.8,
        "max_ph": 7.5,
        "suitable_soils": ["alluvial", "red", "black", "clay"],
        "suitable_seasons": ["kharif", "rabi", "zaid"],
        "varieties": [
            {"name": "DeKalb 9108", "maturity_days": "105-110", "description": "High grain density and disease tolerance"},
            {"name": "Pioneer P3501", "maturity_days": "100-105", "description": "Robust cob filling, drought resilience"}
        ],
        "growth_stages": ["Emergence (0-10d)", "Knee High (15-35d)", "Tasseling/Silking (45-60d)", "Grain Filling (65-85d)", "Black Layer/Maturity (86-105d)"],
        "duration_days": "95-110 days",
        "expected_yield": "25-35 Quintals/Acre",
        "ideal_temp_c": "20-30°C"
    },
    {
        "crop_id": "tomato",
        "name_en": "Tomato",
        "name_hi": "टमाटर",
        "name_mr": "टोमॅटो",
        "scientific_name": "Solanum lycopersicum",
        "icon": "🍅",
        "water_req": "medium",
        "min_ph": 6.0,
        "max_ph": 7.0,
        "suitable_soils": ["alluvial", "red", "black"],
        "suitable_seasons": ["kharif", "rabi", "zaid"],
        "varieties": [
            {"name": "Abhinav (Syngenta)", "maturity_days": "65-70 post transplant", "description": "Firm fruits, strong TyLCV tolerance"},
            {"name": "Arka Rakshak", "maturity_days": "70-75 post transplant", "description": "Triple disease resistant, high yield"}
        ],
        "growth_stages": ["Transplanting (0-15d)", "Vegetative Growth (16-35d)", "First Flowering (36-50d)", "Fruit Set (51-70d)", "Harvesting Cycles (71-120d)"],
        "duration_days": "100-130 days",
        "expected_yield": "180-250 Quintals/Acre",
        "ideal_temp_c": "18-28°C"
    },
    {
        "crop_id": "onion",
        "name_en": "Onion",
        "name_hi": "प्याज",
        "name_mr": "कांदा",
        "scientific_name": "Allium cepa",
        "icon": "🧅",
        "water_req": "medium",
        "min_ph": 6.0,
        "max_ph": 7.0,
        "suitable_soils": ["alluvial", "red", "sandy"],
        "suitable_seasons": ["rabi", "kharif", "zaid"],
        "varieties": [
            {"name": "Bhima Super", "maturity_days": "110-120", "description": "Good keeping quality, red bulbs"},
            {"name": "Phule Samarth", "maturity_days": "115-125", "description": "High yield for late Kharif and Rabi"}
        ],
        "growth_stages": ["Seedling/Transplant (0-30d)", "Foliage Development (31-60d)", "Bulb Initiation (61-80d)", "Bulb Enlargement (81-110d)", "Harvest/Curing (111-125d)"],
        "duration_days": "110-130 days",
        "expected_yield": "80-120 Quintals/Acre",
        "ideal_temp_c": "15-28°C"
    },
    {
        "crop_id": "groundnut",
        "name_en": "Groundnut (Peanut)",
        "name_hi": "मूंगफली",
        "name_mr": "भुईमूग",
        "scientific_name": "Arachis hypogaea",
        "icon": "🥜",
        "water_req": "medium",
        "min_ph": 6.0,
        "max_ph": 7.0,
        "suitable_soils": ["sandy", "red", "alluvial"],
        "suitable_seasons": ["kharif", "zaid"],
        "varieties": [
            {"name": "TAG 24", "maturity_days": "100-105", "description": "Semi-dwarf, early maturity, high shelling %"},
            {"name": "TG 37A", "maturity_days": "105-110", "description": "Bold kernels, high oil recovery"}
        ],
        "growth_stages": ["Vegetative (0-25d)", "Flowering & Pegging (26-50d)", "Pod Formation (51-80d)", "Pod Maturation (81-105d)"],
        "duration_days": "100-115 days",
        "expected_yield": "12-18 Quintals/Acre",
        "ideal_temp_c": "22-30°C"
    }
]

WATER_NUM = {"low": 1, "medium": 2, "high": 3}

def evaluate_crop_suitability(
    soil_type: str,
    season: str,
    water_availability: str,
    ph: Optional[float] = None
) -> List[CropSuitabilityResult]:
    """
    Transparent, explainable agronomic rule-based suitability scoring.
    - Soil compatibility: up to 40 pts
    - Season match: up to 30 pts
    - Water requirement match: up to 20 pts
    - Soil pH match: up to 10 pts
    """
    results: List[CropSuitabilityResult] = []
    norm_soil = (soil_type or "").lower().strip()
    norm_season = (season or "").lower().strip()
    norm_water = (water_availability or "").lower().strip()
    if norm_water not in WATER_NUM:
        norm_water = "medium"

    for crop in CROPS_DATABASE:
        score = 0
        reasons: List[str] = []
        cautions: List[str] = []

        # 1. Soil Match (40 pts)
        if norm_soil in crop["suitable_soils"]:
            score += 40
            reasons.append(f"Highly compatible with {norm_soil.capitalize()} soil.")
        else:
            score += 15
            cautions.append(f"{norm_soil.capitalize()} soil is sub-optimal; improve drainage and organic matter.")

        # 2. Season Match (30 pts)
        if norm_season in crop["suitable_seasons"]:
            score += 30
            reasons.append(f"Natural sowing window aligns with the current {norm_season.capitalize()} season.")
        else:
            score += 5
            cautions.append(f"Off-season for traditional {norm_season.capitalize()}; may encounter climate stress.")

        # 3. Water Availability Match (20 pts)
        req_val = WATER_NUM.get(crop["water_req"], 2)
        farm_val = WATER_NUM.get(norm_water, 2)
        diff = abs(req_val - farm_val)
        if diff == 0:
            score += 20
            reasons.append(f"Water availability ({norm_water}) matches crop water needs ({crop['water_req']}).")
        elif diff == 1:
            score += 10
            if farm_val < req_val:
                cautions.append(f"Crop requires medium/high water but availability is {norm_water}; supplemental irrigation necessary.")
            else:
                reasons.append(f"Abundant water available; manage proper drainage to prevent waterlogging.")
        else:
            score += 0
            cautions.append(f"Critical water gap: requires high water while current availability is low.")

        # 4. pH match (10 pts)
        if ph is not None:
            min_p = crop["min_ph"]
            max_p = crop["max_ph"]
            if min_p <= ph <= max_p:
                score += 10
                reasons.append(f"Soil pH {ph} is within the ideal range ({min_p} - {max_p}).")
            else:
                dist = min(abs(ph - min_p), abs(ph - max_p))
                pen = min(10, int(dist * 5))
                score += max(0, 10 - pen)
                cautions.append(f"Soil pH {ph} is outside ideal range ({min_p} - {max_p}); consider soil conditioning.")
        else:
            score += 6
            reasons.append("pH not tested; standard neutral soil assumption applied (+6 pts).")

        final_score = max(5, min(98, score))

        results.append(CropSuitabilityResult(
            crop_id=crop["crop_id"],
            name_en=crop["name_en"],
            name_hi=crop["name_hi"],
            name_mr=crop["name_mr"],
            icon=crop["icon"],
            water_req=crop["water_req"],
            score=final_score,
            is_heuristic_estimate=True,
            match_reasons=reasons,
            cautions=cautions,
            suitable_soils=crop["suitable_soils"],
            suitable_seasons=crop["suitable_seasons"],
            varieties=crop["varieties"],
            growth_stages=crop["growth_stages"]
        ))

    # Sort descending by suitability score
    results.sort(key=lambda x: x.score, reverse=True)
    return results

def get_crop_by_id(crop_id: str) -> Optional[Dict[str, Any]]:
    for c in CROPS_DATABASE:
        if c["crop_id"] == crop_id.lower().strip():
            return c
    return None
