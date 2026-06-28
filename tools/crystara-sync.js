#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const registryPath = path.join(rootDir, 'data', 'malabi_registry.json');
const outputPaths = [
  path.join(rootDir, 'data', 'malabi_registry.json'),
  path.join(rootDir, 'docs', 'data', 'malabi_registry.json')
];

function loadRegistry(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function normalizeToken(token) {
  const mintStatus = token.supra_status || token.blockchain?.mint_status || 'unminted';
  const crystaraStatus = token.crystara_status || token.crystara?.status || 'available';

  return {
    ...token,
    image: token.image || 'https://via.placeholder.com/640x640/0b1220/00ffff?text=Equation+Crystal',
    crystara_status: crystaraStatus,
    supra_status: mintStatus,
    owner: token.owner || token.blockchain?.owner || null,
    domain: token.domain || token.mathematical_domain || token.identity?.domain || 'Unknown',
    equation: token.equation || token.mathematics?.equation || 'Unknown',
    energy: token.energy || token.energy_level || 0,
    evolution_level: token.evolution_level || token.energy?.evolution_level || 1,
    dimension: token.dimension || 'Unknown Dimension',
    lore: token.lore || 'No lore provided.',
    ai_personality: token.ai_personality || token.ai?.personality || 'The Prime Oracle'
  };
}

function main() {
  const registry = loadRegistry(registryPath);
  const normalizedTokens = (registry.tokens || []).map(normalizeToken);
  const nextRegistry = {
    ...registry,
    tokens: normalizedTokens,
    protocol: {
      ...(registry.protocol || {}),
      version: '2.2',
      description: 'Official live-collection registry schema for Crystara and Supra-ready NFT identity.'
    }
  };

  for (const outputPath of outputPaths) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(nextRegistry, null, 2));
    console.log(`Synced ${normalizedTokens.length} registry entries to ${path.relative(rootDir, outputPath)}`);
  }
}

main();
