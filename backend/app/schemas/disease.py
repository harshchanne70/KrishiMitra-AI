from pydantic import BaseModel
from typing import List, Optional

class LeafDiseasePrediction(BaseModel):
    condition_id: str
    condition_name_en: str
    condition_name_hi: str
    condition_name_mr: str
    confidence: Optional[float] = None
    is_demo: bool = True
    disclaimer: str
    symptoms_observed: List[str]
    immediate_care_actions: List[str]
    preventive_measures: List[str]
    when_to_contact_expert: str
    verified_knowledge_sources: List[str]
