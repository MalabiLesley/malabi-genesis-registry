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
  const crystal = localCrystal || liveCrystal;

  if (crystal) {
    const normalizedCrystal = normalizeCrystalPayload(crystal);
    const isMinted = ["minted", "transferred"].includes(normalizedCrystal.blockchain.mint_status);
    const ownerLine = normalizedCrystal.blockchain.owner
      ? `<p><strong>👤 Owner:</strong> ${normalizedCrystal.blockchain.owner}</p>`
      : "";

    if (isMinted) {
      result.innerHTML = `
        <h2>${normalizedCrystal.name}</h2>
        <p><em>Equation Crystal crystallized on-chain and linked to a verified owner.</em></p>
        <p><strong>⭐ Identity:</strong> ${normalizedCrystal.tier} · ${normalizedCrystal.mathematical_domain}</p>
        <p><strong>🔢 Equation:</strong> ${normalizedCrystal.equation}</p>
        ${ownerLine}
        <p><strong>⛓ Blockchain:</strong> ${normalizedCrystal.blockchain.network} · ${normalizedCrystal.blockchain.mint_status}</p>
        <p><strong>🛍 Crystara:</strong> ${normalizedCrystal.crystara.marketplace} · ${normalizedCrystal.crystara.status}</p>
        <p><strong>🧠 AI Personality:</strong> ${normalizedCrystal.ai_personality}</p>
      `;
    } else {
      result.innerHTML = `
        <h2>${normalizedCrystal.name}</h2>
        <p><em>Equation Crystal discovered in the Genesis Matrix. Awaiting blockchain crystallization.</em></p>
        <p><strong>⭐ Identity:</strong> ${normalizedCrystal.tier} · ${normalizedCrystal.mathematical_domain}</p>
        <p><strong>📜 Lore:</strong> ${normalizedCrystal.lore}</p>
        <p><strong>🔢 Mathematical Attributes:</strong> ${normalizedCrystal.mathematics.concept}</p>
        <p><strong>⚡ Energy:</strong> ${normalizedCrystal.energy.amount} MALABI · Evolution ${normalizedCrystal.energy.evolution_level}</p>
      `;
    }

    if (liveCrystal) {
      result.innerHTML += '<p><em>Live metadata detected.</em></p>';
    } else {
      result.innerHTML += '<p><em>Local registry data displayed.</em></p>';
    }
  } else {
    result.innerHTML = "⚠️ Crystal not found. The Prime Formula has not registered this identity.";
  }
}

loadRegistry();