import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_root_and_health():
    res_root = client.get("/")
    assert res_root.status_code == 200
    content_type = res_root.headers.get("content-type", "")
    if "text/html" in content_type:
        assert "<!doctype html>" in res_root.text.lower() or "<html" in res_root.text.lower()
    else:
        assert res_root.json()["app"] == "KrishiMitra AI"

    res_health = client.get("/api/health")
    assert res_health.status_code == 200
    assert res_health.json()["status"] == "healthy"

def test_crop_catalog():
    res = client.get("/api/crops/catalog")
    assert res.status_code == 200
    crops = res.json()
    assert len(crops) >= 8
    crop_ids = [c["crop_id"] for c in crops]
    assert "soybean" in crop_ids
    assert "cotton" in crop_ids
    assert "wheat" in crop_ids

def test_crop_suitability_calculation():
    payload = {
        "soil_type": "black",
        "ph": 6.8,
        "water_availability": "medium",
        "season": "kharif"
    }
    res = client.post("/api/crops/suitability", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert len(data) > 0
    # Black soil + kharif should rank soybean / cotton high
    top_crop = data[0]
    assert top_crop["score"] >= 70
    assert top_crop["is_heuristic_estimate"] is True
    assert len(top_crop["match_reasons"]) > 0

def test_weather_endpoint():
    res = client.get("/api/weather/forecast?village=Nagpur&district=Nagpur&state=Maharashtra")
    assert res.status_code == 200
    data = res.json()
    assert "forecast" in data
    assert len(data["forecast"]) == 5
    assert "current_temp" in data
    assert "source" in data

def test_advisory_flow_and_persistence():
    advisory_payload = {
        "farmer_name": "Rameshwar Patil",
        "phone": "9876543210",
        "state": "Maharashtra",
        "district": "Nagpur",
        "village": "Katol",
        "preferred_lang": "mr",
        "farm_area": 3.5,
        "area_unit": "acre",
        "soil_type": "black",
        "soil_ph": 6.8,
        "water_source": "well",
        "water_availability": "medium",
        "irrigation_method": "drip",
        "current_season": "kharif",
        "crop_id": "soybean",
        "crop_name": "Soybean",
        "crop_variety": "JS 335",
        "growth_stage": "Flowering",
        "sowing_date": "2026-06-25",
        "allocated_area": 3.5
    }
    res = client.post("/api/advisory/generate", json=advisory_payload)
    assert res.status_code == 200
    data = res.json()
    assert "session_id" in data
    assert data["farmer_summary"]["farmer_name"] == "Rameshwar Patil"
    assert "irrigation_guidance" in data
    assert "crop_care_recommendations" in data
    session_id = data["session_id"]

    # Retrieve history
    res_hist = client.get("/api/advisory/history")
    assert res_hist.status_code == 200
    hist = res_hist.json()
    assert any(h["id"] == session_id for h in hist)

    # Retrieve detail
    res_detail = client.get(f"/api/advisory/{session_id}")
    assert res_detail.status_code == 200
    detail = res_detail.json()
    assert detail["session_id"] == session_id

    # Delete record
    res_del = client.delete(f"/api/advisory/{session_id}")
    assert res_del.status_code == 200

def test_market_and_schemes():
    res_mandi = client.get("/api/market/prices")
    assert res_mandi.status_code == 200
    assert len(res_mandi.json()) > 0

    res_schemes = client.get("/api/schemes/list")
    assert res_schemes.status_code == 200
    schemes = res_schemes.json()
    assert len(schemes) >= 4
    scheme_ids = [s["id"] for s in schemes]
    assert "pm-kisan" in scheme_ids
    assert "pmfby" in scheme_ids

def test_guest_auth():
    res = client.post("/api/auth/guest")
    assert res.status_code == 200
    data = res.json()
    assert "access_token" in data
    assert data["role"] == "farmer"
