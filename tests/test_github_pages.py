import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def test_github_pages_registry_copy_exists():
    pages_registry = ROOT / "docs" / "data" / "malabi_registry.json"
    assert pages_registry.exists(), "GitHub Pages needs a published registry copy under docs/data/"

    with pages_registry.open("r", encoding="utf-8") as handle:
        data = json.load(handle)

    assert isinstance(data, dict)
    assert data.get("tokens")
    assert len(data["tokens"]) >= 5
