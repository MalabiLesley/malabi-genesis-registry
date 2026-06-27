let crystals = [];

function resolveRegistryCandidates() {
  const pageUrl = window.location.href;
  return [
    new URL("./data/malabi_registry.json", pageUrl).toString(),
    new URL("../data/malabi_registry.json", pageUrl).toString(),
    "./data/malabi_registry.json",
    "../data/malabi_registry.json"
  ];
}

async function loadRegistry() {
  const candidates = resolveRegistryCandidates();
  const seen = new Set();

  for (const candidate of candidates) {
    if (seen.has(candidate)) {
      continue;
    }
    seen.add(candidate);

    try {
      const response = await fetch(candidate, { cache: "no-store" });
      if (!response.ok) {
        continue;
      }
      const data = await response.json();
      crystals = data.tokens || [];
      return;
    } catch (error) {
      console.warn(`Registry request failed for ${candidate}`, error);
    }
  }

  console.error("Unable to load registry data from any known path.");
  crystals = [];
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

async function explore() {
  const id = document.getElementById("tokenInput").value.trim();
  const result = document.getElementById("result");

  if (!id) {
    result.innerHTML = "Please enter a crystal ID.";
    return;
  }

  result.innerHTML = "🔮 Searching the Genesis Matrix...";

  if (!crystals.length) {
    await loadRegistry();
  }

  const crystal = crystals.find((item) => String(item.token_id) === id);

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
    `;
  } else {
    result.innerHTML = "Crystal not found in Genesis Registry.";
  }
}

loadRegistry();