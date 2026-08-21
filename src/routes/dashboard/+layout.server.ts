import type { LayoutServerLoad } from "./$types";
import { requireAuth } from "$lib/server/auth";

export const load: LayoutServerLoad = async ({ locals }) => {
  const user = requireAuth(locals);
  return { user };
};
