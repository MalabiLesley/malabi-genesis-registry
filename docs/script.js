const registryUrl = "../data/malabi_registry.json";
let crystals = [];

async function loadRegistry() {
  try {
    const response = await fetch(registryUrl);
    if (!response.ok) {
      throw new Error(`Registry request failed with status ${response.status}`);
    }
    const data = await response.json();
    crystals = data.tokens || [];
  } catch (error) {
    console.error("Unable to load registry data", error);
    crystals = [];
  }
}

function normalizeCrystalPayload(payload) {
  return {
    token_id: payload.token_id,
    name: payload.name || payload.title || "Unnamed Crystal",
    tier: payload.tier || payload.rarity || "Unknown",
    rarity: payload.rarity || payload.tier || "Unknown",
    mathematical_domain: payload.mathematical_domain || payload.domain || "Unknown",
    symbol: payload.symbol || "◌",
    equation: payload.equation || "Unknown",
    energy_level: payload.energy_level || payload.energy || 0,
    dimension: payload.dimension || "Unknown Dimension",
    ai_personality: payload.ai_personality || payload.personality || "The Prime Oracle",
    evolution_level: payload.evolution_level || 1,
    lore: payload.lore || "No lore provided."
  };
}

async function fetchLiveMetadata(tokenId) {
  const candidateUrls = [
    `https://api.crystara.trade/v1/nfts/${tokenId}`,
    `https://api.crystara.trade/v1/assets/${tokenId}`
  ];

  for (const url of candidateUrls) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        continue;
      }
      const payload = await response.json();
      return normalizeCrystalPayload(payload);
    } catch (error) {
      console.warn(`Live metadata request failed for ${url}`, error);
    }
  }

  return null;
}

async function explore() {
  const input = document.getElementById("tokenInput");
  const result = document.getElementById("result");
  const tokenId = input.value.trim();

  if (!tokenId) {
    result.innerHTML = "Please enter a crystal ID.";
    return;
  }

  result.innerHTML = "🔮 Searching the Genesis Matrix...";

  if (!crystals.length) {
    await loadRegistry();
  }

  const localCrystal = crystals.find((item) => String(item.token_id) === tokenId);
  const liveCrystal = await fetchLiveMetadata(tokenId);
  const crystal = liveCrystal || localCrystal;

  if (crystal) {
    const normalizedCrystal = normalizeCrystalPayload(crystal);
    result.innerHTML = `
      <h2>${normalizedCrystal.name}</h2>
      <p><strong>⭐ Tier:</strong> ${normalizedCrystal.tier}</p>
      <p><strong>🔢 Mathematical Domain:</strong> ${normalizedCrystal.mathematical_domain}</p>
      <p><strong>Symbol:</strong> ${normalizedCrystal.symbol}</p>
      <p><strong>Equation:</strong> ${normalizedCrystal.equation}</p>
      <p><strong>⚡ Energy Level:</strong> ${normalizedCrystal.energy_level} MALABI</p>
      <p><strong>🌌 Dimension:</strong> ${normalizedCrystal.dimension}</p>
      <p><strong>🧠 AI Personality:</strong> ${normalizedCrystal.ai_personality}</p>
      <p><strong>📜 Lore:</strong> ${normalizedCrystal.lore}</p>
      ${liveCrystal ? '<p><em>Live metadata detected.</em></p>' : '<p><em>Local registry data displayed.</em></p>'}
    `;
  } else {
    result.innerHTML = "⚠️ Crystal not found. The Prime Formula has not registered this identity.";
  }
}

loadRegistry();