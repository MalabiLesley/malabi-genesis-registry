from typing import Any, Dict


def normalize_crystal_payload(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Normalize a live NFT payload into the registry schema used by the explorer."""
    if not isinstance(payload, dict):
        raise ValueError("Payload must be an object")

    image = (
        payload.get("image")
        or payload.get("image_url")
        or payload.get("animation_url")
        or payload.get("metadata", {}).get("image")
        or payload.get("metadata", {}).get("image_url")
        or "https://via.placeholder.com/640x640/0b1220/00ffff?text=Equation+Crystal"
    )
    blockchain = payload.get("blockchain") or {}
    crystara = payload.get("crystara") or {}
    owner = payload.get("owner") or blockchain.get("owner") or None
    energy_value = payload.get("energy") or payload.get("energy_level") or 0
    energy_level = payload.get("evolution_level") or payload.get("energy_level") or 1

    return {
        "token_id": payload.get("token_id"),
        "name": payload.get("name") or payload.get("title") or "Unnamed Crystal",
        "image": image,
        "tier": payload.get("tier") or payload.get("rarity") or "Unknown",
        "rarity": payload.get("rarity") or payload.get("tier") or "Unknown",
        "domain": payload.get("domain") or payload.get("mathematical_domain") or "Unknown",
        "mathematical_domain": payload.get("mathematical_domain") or payload.get("domain") or "Unknown",
        "symbol": payload.get("symbol") or "◌",
        "equation": payload.get("equation") or "Unknown",
        "energy_level": energy_value,
        "energy": energy_value,
        "dimension": payload.get("dimension") or "Unknown Dimension",
        "ai_personality": payload.get("ai_personality") or payload.get("personality") or "The Prime Oracle",
        "evolution_level": payload.get("evolution_level") or energy_level,
        "lore": payload.get("lore") or "No lore provided.",
        "crystara_status": payload.get("crystara_status") or crystara.get("status") or "available",
        "supra_status": payload.get("supra_status") or blockchain.get("mint_status") or payload.get("mint_status") or "unminted",
        "owner": owner,
        "identity": {
            "tier": payload.get("tier") or payload.get("rarity") or "Unknown",
            "domain": payload.get("domain") or payload.get("mathematical_domain") or "Unknown",
            "symbol": payload.get("symbol") or "◌",
        },
        "mathematics": {
            "equation": payload.get("equation") or "Unknown",
            "concept": payload.get("concept") or "Genesis mathematical identity",
        },
        "energy_info": {
            "amount": energy_value,
            "evolution_level": payload.get("evolution_level") or energy_level,
        },
        "ai": {
            "personality": payload.get("ai_personality") or payload.get("personality") or "The Prime Oracle",
            "role": payload.get("ai_role") or "Genesis Interpreter",
        },
        "blockchain": {
            "network": blockchain.get("network") or "Supra",
            "mint_status": payload.get("supra_status") or blockchain.get("mint_status") or payload.get("mint_status") or "unminted",
            "owner": owner,
        },
        "crystara": {
            "marketplace": crystara.get("marketplace") or "Crystara",
            "status": payload.get("crystara_status") or crystara.get("status") or "available",
            "token_reference": crystara.get("token_reference") or payload.get("token_reference") or payload.get("crystara_token") or None,
            "marketplace_url": crystara.get("marketplace_url") or payload.get("marketplace_url") or None,
        },
    }
