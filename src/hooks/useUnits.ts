import { useState, useEffect } from 'react';

const UNITS_STORAGE_KEY = 'bitter-grind-units';

export type UnitSystem = 'metric' | 'imperial';

export function useUnits() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(UNITS_STORAGE_KEY);
      return (stored === 'imperial' ? 'imperial' : 'metric') as UnitSystem;
    }
    return 'metric';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(UNITS_STORAGE_KEY, unitSystem);
    }
  }, [unitSystem]);

  const toggleUnits = () => {
    setUnitSystem(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  const useImperial = unitSystem === 'imperial';

  return { unitSystem, useImperial, toggleUnits, setUnitSystem };
}

