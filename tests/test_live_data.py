from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from scripts.live_data import normalize_crystal_payload


def test_normalize_crystal_payload_supports_common_fields():
    payload = {
        "token_id": 8,
        "name": "Live Crystal",
        "tier": "Mythic",
        "rarity": "Mythic",
        "domain": "Prime Formula",
        "symbol": "◆",
        "equation": "997",
        "energy": 30000,
        "dimension": "Genesis Core",
        "personality": "The Prime Oracle",
        "lore": "Live metadata loaded from a remote source."
    }

    normalized = normalize_crystal_payload(payload)

    assert normalized["token_id"] == 8
    assert normalized["mathematical_domain"] == "Prime Formula"
    assert normalized["domain"] == "Prime Formula"
    assert normalized["energy_level"] == 30000
    assert normalized["energy"] == 30000
    assert normalized["ai_personality"] == "The Prime Oracle"
    assert normalized["lore"] == "Live metadata loaded from a remote source."
    assert normalized["supra_status"] == "unminted"
    assert normalized["crystara_status"] == "available"
    assert normalized["owner"] is None
