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
