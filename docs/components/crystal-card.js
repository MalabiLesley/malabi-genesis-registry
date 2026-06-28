import { getRarityColor, formatStatusBadge } from './status-engine.js';

export function renderCrystalCard(crystal) {
  const rarityColor = getRarityColor(crystal.rarity || crystal.identity.tier);
  const status = formatStatusBadge(crystal.crystara_status || crystal.blockchain.mint_status || 'unminted');
  const ownerRow = crystal.blockchain.owner ? `<p class="info-row"><span>Owner</span><span>${crystal.blockchain.owner}</span></p>` : '';
  const imageSrc = crystal.image || crystal.image_url || 'https://via.placeholder.com/640x640/0b1220/00ffff?text=Equation+Crystal';
  const tokenReference = crystal.marketplace?.token_reference || crystal.crystara?.token_reference || crystal.token_reference || null;
  const marketplaceUrl = crystal.marketplace?.marketplace_url || crystal.crystara?.marketplace_url || crystal.marketplace_url || null;
  const tokenLink = tokenReference && marketplaceUrl
    ? `<p class="info-row"><span>Crystara Token</span><span><a href="${marketplaceUrl}" target="_blank" rel="noopener noreferrer">${tokenReference}</a></span></p>`
    : tokenReference
      ? `<p class="info-row"><span>Crystara Token</span><span>${tokenReference}</span></p>`
      : '';

  return `
    <div class="crystal-card glass-panel">
      <div class="card-visual">
        <div class="image-shell">
          <img src="${imageSrc}" alt="${crystal.name}" />
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
          <p class="info-row"><span>Mint Status</span><span>${crystal.crystara_status || crystal.blockchain.mint_status || 'unminted'}</span></p>
          ${ownerRow}
          ${tokenLink}
          <p class="info-row"><span>Marketplace</span><span>${crystal.marketplace.name}</span></p>
        </div>

        <div class="lore-block">
          <p class="info-label">Genesis Story</p>
          <p>${crystal.lore_text || crystal.lore.story}</p>
        </div>

        <div class="lore-block">
          <p class="info-label">Minted NFT Profile</p>
          <p>${crystal.blockchain.mint_status === 'unminted' ? 'This crystal is prepared for future minting and can be linked to a live Crystara token later.' : 'This profile is ready to anchor a live minted NFT record with Crystara artwork, marketplace references, and ownership history.'}</p>
        </div>
      </div>
    </div>
  `;
}
