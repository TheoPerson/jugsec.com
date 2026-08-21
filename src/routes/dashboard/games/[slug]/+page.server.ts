import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { GAME_PROFILES } from "$lib/server/services/game-profiles";

export const load: PageServerLoad = async ({ params }) => {
  const game = GAME_PROFILES.find((g) => g.slug === params.slug);
  if (!game) throw error(404, "Game not found");
  return { game };
};
