const rarityColorMap = {
  common: '#9DA3B1',
  rare: '#5AA9FF',
  epic: '#9B59FF',
  legendary: '#F1C40F',
  mythic: '#00FFFF'
};

const statusLabels = {
  unminted: {
    title: 'Awaiting Discovery',
    subtitle: 'This Equation Crystal exists inside the Genesis Matrix but has not yet entered blockchain ownership.',
    accent: '#38B2AC'
  },
  minted: {
    title: 'Crystallized',
    subtitle: 'A Prime Formula crystal crystallized on Supra with on-chain ownership verified.',
    accent: '#7C3AED'
  },
  transferred: {
    title: 'Transferred',
    subtitle: 'Previous ownership history has been recorded and remains part of the identity trace.',
    accent: '#F59E0B'
  }
};

export function getRarityColor(rarity = 'Common') {
  return rarityColorMap[String(rarity).toLowerCase()] || rarityColorMap.common;
}

export function getStatusContent(status = 'unminted') {
  return statusLabels[String(status).toLowerCase()] || statusLabels.unminted;
}

export function formatStatusBadge(status = 'unminted') {
  const content = getStatusContent(status);
  return {
    label: String(status).toUpperCase(),
    title: content.title,
    subtitle: content.subtitle,
    accent: content.accent
  };
}
