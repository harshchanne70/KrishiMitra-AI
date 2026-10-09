from typing import Dict, Any, Optional

SOIL_RETENTION_FACTORS: Dict[str, float] = {
    "black": 0.90,     # High clay content, excellent moisture holding
    "clay": 0.95,      # Heavy moisture retention
    "alluvial": 0.70,  # Moderate-high retention, balanced silt-loam
    "red": 0.55,       # Moderate-low retention, porous
    "laterite": 0.50,  # Low retention, acidic porous
    "sandy": 0.30      # Very low water retention, fast drainage
}

STAGE_WATER_MULTIPLIER: Dict[str, float] = {
    "sowing": 0.7,
    "germination": 0.7,
    "seedling": 0.8,
    "vegetative": 1.0,
    "branching": 1.1,
    "squaring": 1.15,
    "tillering": 1.1,
    "flowering": 1.35, # Critical peak moisture demand
    "tasseling": 1.30,
    "pod formation": 1.25,
    "grain filling": 1.20,
    "maturity": 0.60,
    "harvesting": 0.40
}

CROP_BASE_DEMAND: Dict[str, Dict[str, Any]] = {
    "soybean": {"base_litres_per_acre": 16000, "base_interval_days": 7, "critical_stages": ["Flowering", "Pod Filling"]},
    "cotton": {"base_litres_per_acre": 18000, "base_interval_days": 8, "critical_stages": ["Squaring", "Boll Development"]},
    "wheat": {"base_litres_per_acre": 17000, "base_interval_days": 9, "critical_stages": ["CRI (21 DAS)", "Booting", "Flowering"]},
    "rice": {"base_litres_per_acre": 35000, "base_interval_days": 3, "critical_stages": ["Panicle Initiation", "Flowering"]},
    "chickpea": {"base_litres_per_acre": 12000, "base_interval_days": 14, "critical_stages": ["Pre-flowering", "Pod development"]},
    "pigeonpea": {"base_litres_per_acre": 13000, "base_interval_days": 12, "critical_stages": ["Branching", "Pod setting"]},
    "maize": {"base_litres_per_acre": 19000, "base_interval_days": 6, "critical_stages": ["Tasseling", "Silking"]},
    "tomato": {"base_litres_per_acre": 15000, "base_interval_days": 4, "critical_stages": ["Flowering", "Fruit Enlargement"]},
    "onion": {"base_litres_per_acre": 14000, "base_interval_days": 5, "critical_stages": ["Bulb Formation"]},
    "groundnut": {"base_litres_per_acre": 15000, "base_interval_days": 7, "critical_stages": ["Pegging", "Pod development"]}
}

def calculate_irrigation_guidance(
    crop_id: str,
    growth_stage: str,
    soil_type: str,
    water_availability: str,
    rain_probability_48h: int = 15
) -> Dict[str, Any]:
    norm_crop = (crop_id or "").lower().strip()
    norm_soil = (soil_type or "").lower().strip()
    norm_stage = (growth_stage or "").lower().strip()
    
    crop_data = CROP_BASE_DEMAND.get(norm_crop, {
        "base_litres_per_acre": 16000,
        "base_interval_days": 7,
        "critical_stages": ["Vegetative", "Flowering"]
    })
    
    retention = SOIL_RETENTION_FACTORS.get(norm_soil, 0.70)
    
    # Stage factor
    stage_mult = 1.0
    for key, val in STAGE_WATER_MULTIPLIER.items():
        if key in norm_stage:
            stage_mult = val
            break

    # Availability adjustment
    avail_adj = {"low": 0.8, "medium": 1.0, "high": 1.15}.get(water_availability.lower(), 1.0)
    
    # Rain delay trigger
    rain_imminent = (rain_probability_48h >= 55)
    
    # Estimated litres per acre per session
    estimated_litres = int(crop_data["base_litres_per_acre"] * stage_mult * (0.8 + retention * 0.3))
    
    # Interval in days
    interval = max(2, min(18, round(crop_data["base_interval_days"] * retention / avail_adj)))
    if norm_soil == "sandy":
        interval = max(2, round(interval * 0.5)) # sandy soils need frequent light irrigations

    # Recommended method based on soil and crop
    if norm_soil == "sandy" or water_availability == "low":
        method = "Micro-drip irrigation (recommended to reduce percolation loss in sandy/water-scarce soil)"
        method_hi = "ड्रिप सिंचाई (रेतीली मिट्टी या सीमित पानी में रिसाव हानि रोकने हेतु सर्वोत्तम)"
        method_mr = "ठिबक सिंचन (वालुकामय माती किंवा मर्यादित पाण्यात पाणी वाया जाणे रोखण्यासाठी सर्वोत्तम)"
    elif norm_crop == "rice":
        method = "Shallow water ponding / Alternate Wetting & Drying (AWD)"
        method_hi = "कम जल भराव / वैकल्पिक गीला व सूखा तरीका (AWD)"
        method_mr = "उथळ पाणी साठवणे / पर्यायी ओले व सुके सिंचन (AWD)"
    else:
        method = "Broadbed Furrow (BBF) or Drip fertigation"
        method_hi = "चौड़ी क्यारी फरो (BBF) या ड्रिप प्रणाली"
        method_mr = "रुंद वरंबा सरी (BBF) किंवा ठिबक पद्धत"

    action_text = (
        "Rain expected in next 48 hours. Postpone irrigation to avoid root hypoxia and fungal disease."
        if rain_imminent
        else "No significant rainfall anticipated. Proceed with planned irrigation schedule."
    )
    action_text_hi = (
        "अगले 48 घंटों में बारिश की संभावना है। जड़ों में सड़न रोकने हेतु सिंचाई स्थगित करें।"
        if rain_imminent
        else "भारी बारिश की संभावना नहीं है। योजना अनुसार सिंचाई जारी रखें।"
    )
    action_text_mr = (
        "पुढील 48 तासांत पाऊस अपेक्षित आहे. मुळांची कुज रोखण्यासाठी सिंचन पुढे ढकला."
        if rain_imminent
        else "मोठ्या पावसाची शक्यता नाही. नियोजित सिंचन वेळापत्रक सुरू ठेवा."
    )

    return {
        "interval_days": interval,
        "estimated_litres_per_acre": estimated_litres,
        "rain_delay_recommended": rain_imminent,
        "recommended_method": method,
        "recommended_method_hi": method_hi,
        "recommended_method_mr": method_mr,
        "action_advisory": action_text,
        "action_advisory_hi": action_text_hi,
        "action_advisory_mr": action_text_mr,
        "critical_stages_note": f"Maintain strictly optimal moisture during critical stages: {', '.join(crop_data['critical_stages'])}.",
        "calculation_source": "Derived from ICAR Agromet & FAO-56 Crop Water Guide (Heuristic Estimation)",
        "uncertainty_note": "Actual water requirements fluctuate with real-time temperature, wind, and soil organic content. Calibrate by checking top 5 cm soil moisture before applying water."
    }
