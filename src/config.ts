export const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export const API_PROVIDERS = [
  {
    id: 'mistral' as const,
    name: 'Mistral AI',
    icon: '🤖',
  },
  {
    id: 'anthropic' as const,
    name: 'Anthropic',
    icon: '🧠',
  },
] as const;