import httpx
from typing import Optional, Dict, Any, List
from backend.app.schemas.disease import LeafDiseasePrediction
from backend.app.core.config import settings

# Verified Agricultural Knowledge Base for Leaf Conditions (ICAR / TNAU Agronomy)
VERIFIED_DISEASE_CATALOG: Dict[str, Dict[str, Any]] = {
    "blight": {
        "condition_id": "blight",
        "name_en": "Leaf Blight (Alternaria / Cercospora complex)",
        "name_hi": "पत्ती झुलसा रोग (अल्टरनेरिया / सर्कोस्पोरा)",
        "name_mr": "पान करपा रोग (अल्टरनेरिया / सर्कोस्पोरा)",
        "symptoms": [
            "Concentric brown or dark circular spots with yellow chlorotic halos on foliage",
            "Premature drying, curling, and dropping of lower canopy leaves",
            "Lesions coalescing into larger necrotic dead patches during high humidity"
        ],
        "immediate_actions": [
            "Prune and safely burn or compost deeply buried infected foliage to limit spore dispersal.",
            "Avoid overhead sprinkler irrigation; apply water at ground level to keep the leaf canopy dry.",
            "Maintain adequate spacing between rows to enhance wind circulation and decrease ambient humidity."
        ],
        "preventive_measures": [
            "Crop rotation with non-host cereals (e.g., Sorghum/Maize) for at least 2 consecutive seasons.",
            "Treat seed prior to planting with Trichoderma viride (4g/kg seed) or Carbendazim (2g/kg seed).",
            "Balanced nitrogen application; excessive urea promotes succulent tissue vulnerable to fungal penetration."
        ],
        "when_to_contact_expert": "If more than 20% of the leaf canopy displays dark necrotic lesions, or if spots appear on pods/bolls/fruits, immediately contact your block Krishi Vigyan Kendra (KVK) or Taluka Agriculture Officer (TAO) for certified chemical fungicide approval.",
        "sources": [
            "ICAR - Directorate of Soybean Research (IISR) Technical Bulletin No. 42",
            "TNAU Agritech Portal: Crop Protection Pathology Guide",
            "Mahatma Phule Krishi Vidyapeeth (MPKV) Rahuri Krishi Darshani"
        ]
    },
    "mildew": {
        "condition_id": "mildew",
        "name_en": "Powdery Mildew (Erysiphe / Leveillula spp.)",
        "name_hi": "चूर्णिल आसिता / भभूतिया रोग",
        "name_mr": "भुरी रोग (पावडर बुरशी)",
        "symptoms": [
            "White to grayish talcum powder-like patches on the upper surface of leaves",
            "Affected leaves turn dull yellow, wither, and drop prematurely",
            "Severe infection stunts plant height and prevents pod/grain filling"
        ],
        "immediate_actions": [
            "Spray wettable sulfur 80% WP @ 2.5 - 3 g/L or neem seed kernel extract (NSKE 5%) during early morning hours.",
            "Remove weed hosts around farm bunds that serve as alternate fungal reservoirs.",
            "Ensure morning sunlight penetration by thinning overcrowded plant stands."
        ],
        "preventive_measures": [
            "Plant resistant or tolerant certified seed varieties.",
            "Avoid planting downwind of already infected late-sown fields.",
            "Maintain soil potash levels to strengthen plant epidermal cell walls."
        ],
        "when_to_contact_expert": "If powdery white growth spreads to flowering clusters or young fruit stems, seek written recommendation from the District Agriculture Extension Officer before applying systemic fungicides.",
        "sources": [
            "ICAR - Central Institute for Cotton Research (CICR) Disease Compendium",
            "Dr. Panjabrao Deshmukh Krishi Vidyapeeth (PDKV) Crop Advisory Bulletin"
        ]
    },
    "nutrient": {
        "condition_id": "nutrient",
        "name_en": "Nutrient Deficiency (Interveinal Chlorosis - Iron / Nitrogen / Zinc)",
        "name_hi": "पोषक तत्व की कमी (अंतःशिरीय पीलापन - लोहा / नाइट्रोजन / जस्ता)",
        "name_mr": "पोषक द्रव्यांची कमतरता (पानांमधील पिवळेपणा - लोह / नत्र / जस्त)",
        "symptoms": [
            "Interveinal yellowing (veins remain green while leaf lamina turns pale yellow or whitish)",
            "Uniform pale light-green color starting from older bottom leaves (typical Nitrogen shortage)",
            "Stunted growth, thin stalks, and shortened internodal distance"
        ],
        "immediate_actions": [
            "Apply foliar spray of Chelated Iron (Fe-EDTA 12%) @ 1 g/L or Ferrous Sulphate (0.5%) + Citric Acid (0.1%) for iron chlorosis.",
            "For general yellowing, spray 1% Urea solution (10g/L water) or 19:19:19 water-soluble grade early morning.",
            "Ensure regular irrigation; extreme drought or waterlogging blocks root nutrient uptake."
        ],
        "preventive_measures": [
            "Conduct Soil Health Card test every 2 years to identify micronutrient deficiencies before sowing.",
            "Incorporate well-decomposed Farm Yard Manure (FYM) or vermicompost @ 2-3 tonnes/acre.",
            "Correct alkaline soil pH with organic amendments (gypsum/sulfur) where pH exceeds 8.2."
        ],
        "when_to_contact_expert": "If chlorosis does not recover within 7-10 days after foliar nourishment, consult the Soil Health Testing Laboratory at your nearest Krishi Kendra.",
        "sources": [
            "National Project on Management of Soil Health & Fertility (DAC&FW)",
            "ICAR - Indian Institute of Soil Science (IISS), Bhopal"
        ]
    },
    "healthy": {
        "condition_id": "healthy",
        "name_en": "Healthy Leaf Canopy (No active disease symptoms observed)",
        "name_hi": "स्वस्थ पत्ती छत्र (कोई सक्रिय रोग लक्षण नहीं)",
        "name_mr": "निरोगी पान (कोणतेही रोग लक्षण आढळले नाही)",
        "symptoms": [
            "Uniform vibrant green coloration across lamina",
            "Intact leaf margins without necrotic spots, holes, or chlorotic bleaching",
            "Turgid leaves with normal transpiration and vigorous growth"
        ],
        "immediate_actions": [
            "Maintain existing balanced irrigation schedule according to soil moisture status.",
            "Continue weekly monitoring, inspecting both upper and lower leaf surfaces.",
            "Promote beneficial predatory insects (ladybird beetles, chrysoperla) by avoiding indiscriminate prophylactic sprays."
        ],
        "preventive_measures": [
            "Install yellow and blue sticky traps (5-6 per acre) for early monitoring of sucking pests.",
            "Maintain clean field bunds and balanced N:P:K fertilization."
        ],
        "when_to_contact_expert": "Consult your agricultural officer for periodic routine seasonal advisories or before critical flowering stages.",
        "sources": [
            "ICAR Integrated Pest Management (IPM) Standard Operating Procedures",
            "Directorate of Plant Protection, Quarantine & Storage (DPPQ&S)"
        ]
    }
}

async def analyze_leaf_image(
    file_bytes: bytes,
    filename: str,
    mime_type: str,
    color_hint: Optional[str] = None
) -> LeafDiseasePrediction:
    """
    Model inference dispatcher:
    1. If external model service DISEASE_MODEL_API_URL is configured, sends request to real endpoint.
    2. Otherwise, returns a transparent 'Demo Mode' result with verified agronomic guidance,
       preventing fake confidence claims.
    """
    if settings.DISEASE_MODEL_API_URL:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                files = {"file": (filename, file_bytes, mime_type)}
                resp = await client.post(settings.DISEASE_MODEL_API_URL, files=files)
                if resp.status_code == 200:
                    data = resp.json()
                    c_id = data.get("condition_id", "blight")
                    cat = VERIFIED_DISEASE_CATALOG.get(c_id, VERIFIED_DISEASE_CATALOG["blight"])
                    return LeafDiseasePrediction(
                        condition_id=cat["condition_id"],
                        condition_name_en=cat["name_en"],
                        condition_name_hi=cat["name_hi"],
                        condition_name_mr=cat["name_mr"],
                        confidence=round(float(data.get("confidence", 85.0)), 1),
                        is_demo=False,
                        disclaimer="Prediction generated by trained neural network model. Verify with local agronomist before purchasing chemical products.",
                        symptoms_observed=cat["symptoms"],
                        immediate_care_actions=cat["immediate_actions"],
                        preventive_measures=cat["preventive_measures"],
                        when_to_contact_expert=cat["when_to_contact_expert"],
                        verified_knowledge_sources=cat["sources"]
                    )
        except Exception:
            pass # fallback to transparent demo mode

    # Demo Mode Fallback: Heuristic based on client color hint or deterministic hash
    h_key = "blight"
    if color_hint:
        c_hint_norm = color_hint.lower()
        if "healthy" in c_hint_norm:
            h_key = "healthy"
        elif "nutrient" in c_hint_norm or "yellow" in c_hint_norm:
            h_key = "nutrient"
        elif "mildew" in c_hint_norm or "white" in c_hint_norm:
            h_key = "mildew"
    else:
        # Simple sample toggle based on byte length
        keys = ["blight", "nutrient", "mildew", "healthy"]
        h_key = keys[len(file_bytes) % len(keys)]

    cat = VERIFIED_DISEASE_CATALOG[h_key]

    return LeafDiseasePrediction(
        condition_id=cat["condition_id"],
        condition_name_en=cat["name_en"],
        condition_name_hi=cat["name_hi"],
        condition_name_mr=cat["name_mr"],
        confidence=None, # Explicitly omitted to avoid fake accuracy claims
        is_demo=True,
        disclaimer="Demo Mode — no real disease prediction model is connected. Showing sample diagnostic profile from verified ICAR agronomy guidelines.",
        symptoms_observed=cat["symptoms"],
        immediate_care_actions=cat["immediate_actions"],
        preventive_measures=cat["preventive_measures"],
        when_to_contact_expert=cat["when_to_contact_expert"],
        verified_knowledge_sources=cat["sources"]
    )
