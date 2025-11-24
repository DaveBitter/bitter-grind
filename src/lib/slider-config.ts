// Slider configuration for different brewing methods
// Provides sensible ranges and step sizes for better UX

export interface SliderConfig {
  coffee: {
    min: number;
    max: number;
    step: number;
  };
  ratio: {
    min: number;
    max: number;
    step: number;
  };
}

const DEFAULT_CONFIG: SliderConfig = {
  coffee: {
    min: 5,
    max: 60,
    step: 0.5, // Finer control with 0.5g steps (110 steps total)
  },
  ratio: {
    min: 1,
    max: 25,
    step: 0.5, // Better than 0.1 - reduces from 240 to 48 steps
  },
};

const METHOD_CONFIGS: Record<string, Partial<SliderConfig>> = {
  espresso: {
    coffee: {
      min: 15,
      max: 25,
      step: 0.5,
    },
    ratio: {
      min: 1.5,
      max: 3,
      step: 0.1, // Finer steps for espresso ratios
    },
  },
  "cold-brew": {
    coffee: {
      min: 30,
      max: 50,
      step: 1,
    },
    ratio: {
      min: 6,
      max: 10,
      step: 0.5,
    },
  },
  "french-press": {
    coffee: {
      min: 15,
      max: 40,
      step: 0.5,
    },
    ratio: {
      min: 12,
      max: 18,
      step: 0.5,
    },
  },
  "moka-pot": {
    coffee: {
      min: 15,
      max: 50,
      step: 1,
    },
    ratio: {
      min: 5,
      max: 10,
      step: 0.5,
    },
  },
};

export function getSliderConfig(methodId: string): SliderConfig {
  const methodConfig = METHOD_CONFIGS[methodId];

  if (!methodConfig) {
    return DEFAULT_CONFIG;
  }

  return {
    coffee: {
      ...DEFAULT_CONFIG.coffee,
      ...methodConfig.coffee,
    },
    ratio: {
      ...DEFAULT_CONFIG.ratio,
      ...methodConfig.ratio,
    },
  };
}

