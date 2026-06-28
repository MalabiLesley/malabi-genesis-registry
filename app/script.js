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
    if (seen.has(candidate)) continue;
    seen.add(candidate);

    try {
      const response = await fetch(candidate, { cache: "no-store" });
      if (!response.ok) continue;
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

function normalizeCrystalPayload(payload = {}) {
  const identity = payload.identity || {};
  const mathematics = payload.mathematics || {};
  const energy = payload.energy || {};
  const ai = payload.ai || {};
  const blockchain = payload.blockchain || {};
  const crystara = payload.crystara || {};
  const lore = typeof payload.lore === "string" ? payload.lore : payload.lore?.story || "No lore provided.";

  return {
    token_id: payload.token_id,
    name: payload.name || payload.title || "Unnamed Crystal",
    tier: payload.tier || payload.rarity || identity.tier || "Unknown",
    rarity: payload.rarity || payload.tier || identity.tier || "Unknown",
    mathematical_domain: payload.mathematical_domain || payload.domain || identity.domain || "Unknown",
    symbol: payload.symbol || identity.symbol || "◌",
    equation: payload.equation || mathematics.equation || "Unknown",
    energy_level: payload.energy_level || payload.energy || energy.amount || 0,
    dimension: payload.dimension || payload.lore?.dimension || "Unknown Dimension",
    ai_personality: payload.ai_personality || payload.personality || ai.personality || "The Prime Oracle",
    evolution_level: payload.evolution_level || energy.evolution_level || 1,
    lore,
    identity: {
      tier: identity.tier || payload.tier || "Unknown",
      domain: identity.domain || payload.mathematical_domain || "Unknown",
      symbol: identity.symbol || payload.symbol || "◌"
    },
    mathematics: {
      equation: mathematics.equation || payload.equation || "Unknown",
      concept: mathematics.concept || "Genesis mathematical identity"
    },
    energy: {
      amount: energy.amount || payload.energy_level || 0,
      evolution_level: energy.evolution_level || payload.evolution_level || 1
    },
    ai: {
      personality: ai.personality || payload.ai_personality || "The Prime Oracle",
      role: ai.role || "Genesis Interpreter"
    },
    blockchain: {
      network: blockchain.network || "Supra",
      mint_status: blockchain.mint_status || "unminted",
      owner: blockchain.owner || null
    },
    crystara: {
      marketplace: crystara.marketplace || "Crystara",
      status: crystara.status || "available"
    }
  };
}

function renderResult(content) {
  const result = document.getElementById("result");
  result.className = "result-card";
  result.innerHTML = content;
}

function buildLine(label, value) {
  return `<p><strong>${label}</strong> ${value}</p>`;
}

async function explore() {
  const tokenId = document.getElementById("tokenInput").value.trim();

  if (!tokenId) {
    renderResult("<p>Please enter a crystal ID.</p>");
    return;
  }

  renderResult("<p>🔮 Searching the Genesis Matrix...</p>");

  if (!crystals.length) {
    await loadRegistry();
  }

  const crystal = crystals.find((item) => String(item.token_id) === tokenId);

  if (!crystal) {
    renderResult(
      `<h2>Not Found</h2><p>⚠️ Crystal ID ${tokenId} is not registered in the Genesis Registry.</p>`
    );
    return;
  }

  const normalizedCrystal = normalizeCrystalPayload(crystal);
  const isMinted = ["minted", "transferred"].includes(normalizedCrystal.blockchain.mint_status);
  const ownerLine = normalizedCrystal.blockchain.owner
    ? buildLine("👤 Owner:", normalizedCrystal.blockchain.owner)
    : "";

  let output = `
    <h2>${normalizedCrystal.name}</h2>
    <p><em>Equation Crystal ID ${normalizedCrystal.token_id}</em></p>
    ${buildLine("⭐ Identity:", `${normalizedCrystal.tier} · ${normalizedCrystal.mathematical_domain}`)}
    ${buildLine("🔢 Equation:", normalizedCrystal.equation)}
  `;

  if (isMinted) {
    output += `
      ${ownerLine}
      ${buildLine("⛓ Blockchain:", `${normalizedCrystal.blockchain.network} · ${normalizedCrystal.blockchain.mint_status}`)}
      ${buildLine("🛍 Crystara:", `${normalizedCrystal.crystara.marketplace} · ${normalizedCrystal.crystara.status}`)}
      ${buildLine("🧠 AI Personality:", normalizedCrystal.ai_personality)}
      <p><em>Equation Crystal crystallized on-chain and linked to a verified owner.</em></p>
    `;
  } else {
    output += `
      ${buildLine("📜 Lore:", normalizedCrystal.lore)}
      ${buildLine("⚡ Energy:", `${normalizedCrystal.energy.amount} MALABI · Evolution ${normalizedCrystal.energy.evolution_level}`)}
      <p><em>Equation Crystal discovered in the Genesis Matrix. Awaiting blockchain crystallization.</em></p>
    `;
  }

  renderResult(output);
}

loadRegistry();