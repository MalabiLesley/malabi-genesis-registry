from typing import Any, Dict


def normalize_crystal_payload(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Normalize a live NFT payload into the registry schema used by the explorer."""
    if not isinstance(payload, dict):
        raise ValueError("Payload must be an object")

    return {
        "token_id": payload.get("token_id"),
        "name": payload.get("name") or payload.get("title") or "Unnamed Crystal",
        "tier": payload.get("tier") or payload.get("rarity") or "Unknown",
        "rarity": payload.get("rarity") or payload.get("tier") or "Unknown",
        "mathematical_domain": payload.get("mathematical_domain") or payload.get("domain") or "Unknown",
        "symbol": payload.get("symbol") or "◌",
        "equation": payload.get("equation") or "Unknown",
        "energy_level": payload.get("energy_level") or payload.get("energy") or 0,
        "dimension": payload.get("dimension") or "Unknown Dimension",
        "ai_personality": payload.get("ai_personality") or payload.get("personality") or "The Prime Oracle",
        "evolution_level": payload.get("evolution_level") or 1,
        "lore": payload.get("lore") or "No lore provided.",
    }
