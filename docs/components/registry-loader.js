const registryPaths = [
  './data/malabi_registry.json',
  '../data/malabi_registry.json',
  './malabi_registry.json'
];

async function fetchRegistry(path) {
  try {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) return null;
    const payload = await response.json();
    return payload.tokens || payload.tokens || [];
  } catch (error) {
    console.warn(`Registry load failed for ${path}`, error);
    return null;
  }
}

export async function loadRegistry() {
  const seen = new Set();

  for (const path of registryPaths) {
    if (seen.has(path)) continue;
    seen.add(path);

    const tokens = await fetchRegistry(path);
    if (tokens && tokens.length) {
      return tokens;
    }
  }

  console.error('Unable to load registry data from any known path.');
  return [];
}

export function normalizeToken(payload = {}) {
  const tier = payload.identity?.tier || payload.tier || payload.rarity || 'Common';
  const domain = payload.identity?.domain || payload.mathematical_domain || payload.domain || 'Unknown';
  const symbol = payload.identity?.symbol || payload.symbol || '◆';
  const equation = payload.mathematics?.equation || payload.equation || payload.symbol || '997';
  const concept = payload.mathematics?.concept || payload.concept || 'Prime foundation';
  const energyValue = payload.energy?.value || payload.energy?.amount || payload.energy_level || payload.energy || 0;
  const energyLevel = payload.energy?.level || payload.energy?.evolution_level || payload.evolution_level || 1;
  const dimension = payload.lore?.dimension || payload.dimension || 'Genesis Core';
  const story = typeof payload.lore === 'string' ? payload.lore : payload.lore?.story || payload.description || 'Origin crystal of the Prime Formula';
  const aiPersonality = payload.ai?.personality || payload.ai_personality || payload.personality || 'Prime Oracle';
  const mintStatus = payload.blockchain?.mint_status || payload.blockchain?.status || payload.mint_status || 'unminted';
  const owner = payload.blockchain?.owner || null;
  const image = payload.image || payload.image_url || payload.animation_url || payload.metadata?.image || payload.metadata?.image_url || '';

  return {
    token_id: payload.token_id || payload.id || null,
    name: payload.name || payload.title || `Malabi Universe #${payload.token_id || payload.id || '000'}`,
    image,
    identity: {
      tier,
      domain,
      symbol
    },
    mathematics: {
      equation,
      concept
    },
    energy: {
      value: energyValue,
      level: energyLevel
    },
    lore: {
      dimension,
      story
    },
    ai: {
      personality: aiPersonality
    },
    blockchain: {
      network: payload.blockchain?.network || 'Supra',
      mint_status: mintStatus,
      owner
    },
    marketplace: {
      name: payload.marketplace?.name || payload.crystara?.marketplace || 'Crystara',
      collection: payload.marketplace?.collection || 'Malabi Universe'
    },
    rarity: tier
  };
}

export function findCrystalById(tokenId, tokens = []) {
  if (!tokenId) return null;
  return tokens.find((token) => String(token.token_id) === String(tokenId) || String(token.id) === String(tokenId));
}
