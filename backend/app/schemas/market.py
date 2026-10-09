from pydantic import BaseModel
from typing import Optional

class MandiPriceItem(BaseModel):
    id: str
    commodity: str
    commodity_hi: str
    commodity_mr: str
    variety: str
    market_name: str
    district: str
    state: str
    min_price: float # in Rs / Quintal
    max_price: float
    modal_price: float
    price_date: str
    trend: str # 'up', 'down', 'stable'
    source: str # AGMARKNET (DMI, MoA&FW) or Verified Mandi Board
    is_demo_data: bool = False

class SchemeItem(BaseModel):
    id: str
    name_en: str
    name_hi: str
    name_mr: str
    ministry: str
    target_beneficiaries: str
    brief_description_en: str
    brief_description_hi: str
    brief_description_mr: str
    key_benefits: str
    eligibility_criteria: str
    official_portal_url: str
    last_verified_date: str
