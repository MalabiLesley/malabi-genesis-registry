import { getRarityColor, formatStatusBadge } from './status-engine.js';

export function renderCrystalCard(crystal) {
  const rarityColor = getRarityColor(crystal.rarity || crystal.identity.tier);
  const status = formatStatusBadge(crystal.blockchain.mint_status);
  const ownerRow = crystal.blockchain.owner ? `<p class="info-row"><span>Owner</span><span>${crystal.blockchain.owner}</span></p>` : '';

  return `
    <div class="crystal-card glass-panel">
      <div class="card-visual">
        <div class="image-shell">
          <img src="${crystal.image || 'https://via.placeholder.com/640x640/0b1220/00ffff?text=Equation+Crystal'}" alt="${crystal.name}" />
        </div>
        <div class="status-pill" style="border-color: ${status.accent}; color: ${status.accent};">
          <span>${status.label}</span>
        </div>
      </div>

      <div class="card-details">
        <div class="card-header">
          <div>
            <p class="eyebrow">MALABI UNIVERSE</p>
            <h2>${crystal.name}</h2>
            <p class="subtle">${crystal.marketplace.collection} • ${crystal.blockchain.network}</p>
          </div>
          <div class="tier-badge" style="background: ${rarityColor}; box-shadow: 0 0 16px ${rarityColor};">
            ${crystal.identity.tier.toUpperCase()}
          </div>
        </div>

        <div class="value-grid">
          <div class="value-card">
            <span class="value-label">Domain</span>
            <strong>${crystal.identity.domain}</strong>
          </div>
          <div class="value-card">
            <span class="value-label">Symbol</span>
            <strong>${crystal.identity.symbol}</strong>
          </div>
          <div class="value-card">
            <span class="value-label">Equation</span>
            <strong>${crystal.mathematics.equation}</strong>
          </div>
          <div class="value-card">
            <span class="value-label">Energy</span>
            <strong>${crystal.energy.value.toLocaleString()} MALABI</strong>
          </div>
        </div>

        <div class="info-block">
          <p class="info-row"><span>Dimension</span><span>${crystal.lore.dimension}</span></p>
          <p class="info-row"><span>AI Personality</span><span>${crystal.ai.personality}</span></p>
          ${ownerRow}
          <p class="info-row"><span>Marketplace</span><span>${crystal.marketplace.name}</span></p>
        </div>

        <div class="lore-block">
          <p class="info-label">Genesis Story</p>
          <p>${crystal.lore.story}</p>
        </div>
      </div>
    </div>
  `;
}
