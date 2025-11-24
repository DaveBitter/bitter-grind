// Recipe encoder/decoder for URL sharing
// Encodes calculator state into URL parameters

import { BREWING_METHODS } from "./brewing-data";

export interface RecipeState {
  methodId: string;
  techniqueIndex: number;
  coffeeAmount: number;
  ratio: number;
}

export interface AppState {
  tab: string;
  methodId?: string;
  techniqueIndex?: number;
  coffeeAmount?: number;
  ratio?: number;
}

/**
 * Encode recipe state into URL search parameters
 */
export function encodeRecipe(state: RecipeState): string {
  const params = new URLSearchParams({
    method: state.methodId,
    tech: state.techniqueIndex.toString(),
    coffee: state.coffeeAmount.toString(),
    ratio: state.ratio.toString(),
  });

  return params.toString();
}

/**
 * Decode recipe state from URL search parameters
 * Returns null if invalid or missing required params
 */
export function decodeRecipe(searchParams: URLSearchParams): RecipeState | null {
  const methodId = searchParams.get("method");
  const techStr = searchParams.get("tech");
  const coffeeStr = searchParams.get("coffee");
  const ratioStr = searchParams.get("ratio");

  if (!methodId || !techStr || !coffeeStr || !ratioStr) {
    return null;
  }

  // Validate method exists
  const method = BREWING_METHODS.find(m => m.id === methodId);
  if (!method) {
    return null;
  }

  const techniqueIndex = parseInt(techStr, 10);
  const coffeeAmount = parseFloat(coffeeStr);
  const ratio = parseFloat(ratioStr);

  // Validate technique index
  if (isNaN(techniqueIndex) || techniqueIndex < 0 || techniqueIndex >= method.techniques.length) {
    return null;
  }

  // Validate numeric values
  if (isNaN(coffeeAmount) || isNaN(ratio) || coffeeAmount <= 0 || ratio <= 0) {
    return null;
  }

  return {
    methodId,
    techniqueIndex,
    coffeeAmount,
    ratio,
  };
}

/**
 * Generate shareable URL with recipe state
 */
export function generateShareUrl(state: RecipeState): string {
  const params = encodeRecipe(state);
  const baseUrl = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "";
  return `${baseUrl}?${params}`;
}

/**
 * Encode full app state (tab + recipe) into URL search parameters
 */
export function encodeAppState(state: AppState): string {
  const params = new URLSearchParams({
    tab: state.tab,
  });
  
  if (state.methodId) {
    params.set("method", state.methodId);
    if (state.techniqueIndex !== undefined) {
      params.set("tech", state.techniqueIndex.toString());
    }
    if (state.coffeeAmount !== undefined) {
      params.set("coffee", state.coffeeAmount.toString());
    }
    if (state.ratio !== undefined) {
      params.set("ratio", state.ratio.toString());
    }
  }
  
  return params.toString();
}

/**
 * Decode full app state from URL search parameters
 */
export function decodeAppState(searchParams: URLSearchParams): AppState | null {
  const tab = searchParams.get("tab") || "calculator";
  
  const methodId = searchParams.get("method");
  const techStr = searchParams.get("tech");
  const coffeeStr = searchParams.get("coffee");
  const ratioStr = searchParams.get("ratio");

  const state: AppState = { tab };

  if (methodId) {
    // Validate method exists
    const method = BREWING_METHODS.find(m => m.id === methodId);
    if (method) {
      state.methodId = methodId;
      
      if (techStr) {
        const techniqueIndex = parseInt(techStr, 10);
        if (!isNaN(techniqueIndex) && techniqueIndex >= 0 && techniqueIndex < method.techniques.length) {
          state.techniqueIndex = techniqueIndex;
        }
      }
      
      if (coffeeStr) {
        const coffeeAmount = parseFloat(coffeeStr);
        if (!isNaN(coffeeAmount) && coffeeAmount > 0) {
          state.coffeeAmount = coffeeAmount;
        }
      }
      
      if (ratioStr) {
        const ratio = parseFloat(ratioStr);
        if (!isNaN(ratio) && ratio > 0) {
          state.ratio = ratio;
        }
      }
    }
  }

  return state;
}

