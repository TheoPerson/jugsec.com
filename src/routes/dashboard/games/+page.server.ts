import type { PageServerLoad } from "./$types";
import { GAME_PROFILES } from "$lib/server/services/game-profiles";

export const load: PageServerLoad = async () => {
  // Utiliser les données en mémoire pour l'instant (pas de DB seed requis)
  return {
    games: GAME_PROFILES.map((g) => ({
      slug: g.slug,
      name: g.name,
      description: g.description,
      category: g.category,
      publisher: g.publisher,
      isFeatured: g.isFeatured,
      optimizationCount: g.optimizations.length,
    })),
  };
};
