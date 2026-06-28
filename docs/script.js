import { loadRegistry, normalizeToken, findCrystalById } from './components/registry-loader.js';
import { renderCrystalCard } from './components/crystal-card.js';

const resultEl = document.getElementById('result');
const searchStatus = document.getElementById('searchStatus');
const exploreButton = document.getElementById('exploreButton');
const tokenInput = document.getElementById('tokenInput');
let registry = [];

function updateStatus(message, variant = 'info') {
  searchStatus.textContent = message;
  searchStatus.style.color = variant === 'error' ? '#ffbbbb' : '#d4f8ff';
  searchStatus.style.borderColor = variant === 'error' ? 'rgba(255, 187, 187, 0.15)' : 'rgba(255, 255, 255, 0.08)';
}

function renderLoading() {
  resultEl.classList.add('search-loading');
  resultEl.innerHTML = `
    <div class="default-state">
      <span class="pulse-dot"></span>
      <h3>Consulting the Genesis Matrix...</h3>
      <p>Crunching identity vectors, evaluating rarity, and aligning your crystal with the Prime Formula.</p>
    </div>
  `;
}

function renderError(message) {
  resultEl.classList.remove('search-loading');
  resultEl.innerHTML = `
    <div class="default-state error-state">
      <span class="pulse-dot"></span>
      <h3>Crystal not found</h3>
      <p>${message}</p>
    </div>
  `;
}

function renderDefault() {
  resultEl.classList.remove('search-loading');
  resultEl.innerHTML = `
    <div class="default-state">
      <span class="pulse-dot"></span>
      <h3>Step into the Genesis Matrix</h3>
      <p>Enter an Equation Crystal ID to reveal its premium NFT identity and status.</p>
    </div>
  `;
}

async function initialize() {
  registry = await loadRegistry();
  updateStatus('Genesis Matrix ready. Enter an ID to begin.');
}

async function explore() {
  const tokenId = tokenInput.value.trim();

  if (!tokenId) {
    updateStatus('Enter an Equation Crystal ID to begin your search.', 'error');
    renderError('Please enter a crystal ID and try again.');
    return;
  }

  updateStatus('Consulting the Genesis Matrix...');
  renderLoading();

  if (!registry.length) {
    registry = await loadRegistry();
  }

  const rawCrystal = findCrystalById(tokenId, registry);
  if (!rawCrystal) {
    updateStatus('Crystal not found in the Prime Formula.', 'error');
    renderError('This Equation Crystal does not exist in the current Genesis Registry.');
    return;
  }

  const crystal = normalizeToken(rawCrystal);
  resultEl.classList.remove('search-loading');
  resultEl.innerHTML = renderCrystalCard(crystal);
  updateStatus(`Identity revealed for #${crystal.token_id}.`);
}

exploreButton.addEventListener('click', explore);
tokenInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') explore();
});

initialize();