from fastapi import APIRouter, Query
from typing import List, Optional
from backend.app.schemas.market import MandiPriceItem, SchemeItem
from backend.app.services.market_service import get_mandi_prices
from backend.app.services.scheme_service import get_government_schemes

market_router = APIRouter(prefix="/market", tags=["Mandi Market Prices"])
schemes_router = APIRouter(prefix="/schemes", tags=["Government Schemes"])

@market_router.get("/prices", response_model=List[MandiPriceItem])
def list_mandi_prices(
    commodity: Optional[str] = Query(None, description="Commodity filter (e.g., Soybean, Cotton)"),
    state: Optional[str] = Query(None, description="State filter (e.g., Maharashtra)")
):
    return get_mandi_prices(commodity=commodity or "", state=state or "")

@schemes_router.get("/list", response_model=List[SchemeItem])
def list_government_schemes():
    return get_government_schemes()
