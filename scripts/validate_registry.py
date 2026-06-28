import json
from pathlib import Path
from typing import Any, Dict


REQUIRED_FIELDS = [
    "token_id",
    "name",
    "image",
    "crystara_status",
    "supra_status",
    "owner",
    "tier",
    "domain",
    "rarity",
    "mathematical_domain",
    "symbol",
    "equation",
    "energy",
    "energy_level",
    "dimension",
    "ai_personality",
    "evolution_level",
    "lore",
    "identity",
    "mathematics",
    "energy",
    "ai",
    "blockchain",
    "crystara",
]

CRYSTARA_REFERENCE_FIELDS = ["token_reference", "marketplace_url"]


def _load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def validate_registry(root: Path) -> Dict[str, Any]:
    registry_path = root / "data" / "malabi_registry.json"
    registry = _load_json(registry_path)

    if not isinstance(registry, dict):
        raise ValueError("Registry root must be an object")

    tokens = registry.get("tokens", [])
    if not isinstance(tokens, list):
        raise ValueError("Registry tokens must be a list")

    missing_fields = []
    for token in tokens:
        if not isinstance(token, dict):
            continue
        for field in REQUIRED_FIELDS:
            if field not in token:
                missing_fields.append((token.get("token_id", "unknown"), field))
        if token.get("supra_status") in {"minted", "transferred"}:
            crystara = token.get("crystara") or {}
            for field in CRYSTARA_REFERENCE_FIELDS:
                if not crystara.get(field):
                    missing_fields.append((token.get("token_id", "unknown"), f"crystara.{field}"))

    total_supply = registry.get("total_supply")
    if total_supply is None:
        raise ValueError("Registry must define total_supply")

    return {
        "ok": not missing_fields and len(tokens) >= 1 and total_supply >= len(tokens),
        "registry_file": "data/malabi_registry.json",
        "token_count": len(tokens),
        "total_supply": total_supply,
        "required_fields": REQUIRED_FIELDS,
        "missing_fields": missing_fields,
    }
