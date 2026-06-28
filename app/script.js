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
  const imageUrl = payload.image || payload.image_url || payload.animation_url || payload.imageUrl || payload.metadata?.image || payload.metadata?.image_url || payload.data?.image || null;
  const description = payload.description || payload.metadata?.description || payload.data?.description || "";
  const attributes = payload.attributes || payload.metadata?.attributes || payload.data?.attributes || [];
  const energyAmount = payload.energy || payload.energy_level || energy.amount || 0;
  const mintStatus = payload.supra_status || blockchain.mint_status || payload.mint_status || "unminted";
  const crystaraStatus = payload.crystara_status || crystara.status || "available";

  return {
    token_id: payload.token_id,
    name: payload.name || payload.title || "Unnamed Crystal",
    image_url: imageUrl,
    description,
    attributes,
    tier: payload.tier || payload.rarity || identity.tier || "Unknown",
    rarity: payload.rarity || payload.tier || identity.tier || "Unknown",
    domain: payload.domain || payload.mathematical_domain || identity.domain || "Unknown",
    mathematical_domain: payload.mathematical_domain || payload.domain || identity.domain || "Unknown",
    symbol: payload.symbol || identity.symbol || "◌",
    equation: payload.equation || mathematics.equation || "Unknown",
    energy_level: energyAmount,
    energy: energyAmount,
    dimension: payload.dimension || payload.lore?.dimension || "Unknown Dimension",
    ai_personality: payload.ai_personality || payload.personality || ai.personality || "The Prime Oracle",
    evolution_level: payload.evolution_level || energy.evolution_level || 1,
    lore,
    crystara_status: crystaraStatus,
    supra_status: mintStatus,
    owner: payload.owner || blockchain.owner || null,
    identity: {
      tier: identity.tier || payload.tier || "Unknown",
      domain: identity.domain || payload.mathematical_domain || payload.domain || "Unknown",
      symbol: identity.symbol || payload.symbol || "◌"
    },
    mathematics: {
      equation: mathematics.equation || payload.equation || "Unknown",
      concept: mathematics.concept || "Genesis mathematical identity"
    },
    energy_block: {
      amount: energy.amount || payload.energy_level || 0,
      evolution_level: energy.evolution_level || payload.evolution_level || 1
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
      mint_status: mintStatus,
      owner: payload.owner || blockchain.owner || null
    },
    crystara: {
      marketplace: crystara.marketplace || "Crystara",
      status: crystaraStatus
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
      if (!response.ok) continue;
      const payload = await response.json();
      return payload;
    } catch (error) {
      console.warn(`Live metadata request failed for ${url}`, error);
    }
  }

  return null;
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

  const localCrystal = crystals.find((item) => String(item.token_id) === tokenId || String(item.id) === tokenId || String(item.token_id) === tokenId.replace(/^#/, ""));
  const liveCrystal = await fetchLiveMetadata(tokenId);

  if (!localCrystal && !liveCrystal) {
    renderResult(
      `<h2>Not Found</h2><p>⚠️ Crystal ID ${tokenId} is not registered in the Genesis Registry and no live Crystara metadata was found.</p>`
    );
    return;
  }

  const mergedPayload = {
    ...(localCrystal || {}),
    ...(liveCrystal || {}),
    lore: localCrystal?.lore || liveCrystal?.lore || liveCrystal?.description || "No lore provided.",
    image: liveCrystal?.image || liveCrystal?.image_url || liveCrystal?.animation_url || liveCrystal?.metadata?.image || localCrystal?.image || localCrystal?.image_url || null,
    description: liveCrystal?.description || localCrystal?.description || ""
  };

  const normalizedCrystal = normalizeCrystalPayload(mergedPayload);
  const isMinted = ["minted", "transferred"].includes(normalizedCrystal.blockchain.mint_status);
  const ownerLine = normalizedCrystal.blockchain.owner
    ? buildLine("👤 Owner:", normalizedCrystal.blockchain.owner)
    : "";

  const imageBlock = normalizedCrystal.image_url
    ? `<div class="result-image"><img src="${normalizedCrystal.image_url}" alt="${normalizedCrystal.name} preview" /></div>`
    : `<div class="result-image"><img src="https://via.placeholder.com/640x640/0b1220/00ffff?text=Equation+Crystal" alt="${normalizedCrystal.name} placeholder" /></div>`;

  let output = `
    ${imageBlock}
    <h2>${normalizedCrystal.name}</h2>
    <p><em>Equation Crystal ID ${normalizedCrystal.token_id}</em></p>
    ${buildLine("⭐ Rarity:", `${normalizedCrystal.tier}`)}
    ${buildLine("🔬 Mathematical Domain:", `${normalizedCrystal.mathematical_domain}`)}
    ${buildLine("⚡ Energy:", `${normalizedCrystal.energy.amount} MALABI · Evolution ${normalizedCrystal.energy.evolution_level}`)}
    ${buildLine("📜 Lore:", normalizedCrystal.lore)}
    ${buildLine("🔢 Equation:", normalizedCrystal.equation)}
    ${buildLine("🧠 Mint Status:", normalizedCrystal.blockchain.mint_status)}
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
      <p><em>Equation Crystal discovered in the Genesis Matrix. Awaiting blockchain crystallization.</em></p>
    `;
  }

  renderResult(output);
}

loadRegistry();