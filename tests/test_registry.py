import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from scripts.validate_registry import validate_registry


def test_registry_structure_and_schema():
    result = validate_registry(ROOT)
    assert result["ok"] is True
    assert result["registry_file"] == "data/malabi_registry.json"
    assert result["token_count"] >= 5
    assert result["required_fields"]


def test_registry_contains_lifecycle_and_blockchain_fields():
    result = validate_registry(ROOT)
    assert result["ok"] is True

    registry_path = ROOT / "data" / "malabi_registry.json"
    registry = __import__("json").loads(registry_path.read_text(encoding="utf-8"))

    for token in registry["tokens"]:
        assert "identity" in token
        assert "mathematics" in token
        assert "energy" in token
        assert "ai" in token
        assert "blockchain" in token
        assert "crystara" in token
        assert token["blockchain"]["mint_status"] in {"unminted", "minted", "transferred"}
        assert token["crystara"]["status"] in {"available", "listed", "sold"}
