import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { systemProfiles, optimizationScans } from "$lib/server/db/schema";
import { eq, desc } from "drizzle-orm";
import { runOptimizationScan } from "$lib/server/services/optimization";

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  const [profile] = await db
    .select()
    .from(systemProfiles)
    .where(eq(systemProfiles.userId, user.id))
    .limit(1);

  const scans = await db
    .select()
    .from(optimizationScans)
    .where(eq(optimizationScans.userId, user.id))
    .orderBy(desc(optimizationScans.createdAt))
    .limit(5);

  return { systemProfile: profile ?? null, scans };
};

export const actions: Actions = {
  scan: async ({ locals }) => {
    if (!locals.user) return fail(401, { error: "Not authenticated" });

    const [profile] = await db
      .select()
      .from(systemProfiles)
      .where(eq(systemProfiles.userId, locals.user.id))
      .limit(1);

    if (!profile)
      return fail(400, { error: "Set up your system profile first" });

    try {
      const result = await runOptimizationScan(locals.user.id, profile.id);
      return { success: true, scan: result };
    } catch (err) {
      return fail(500, { error: "Scan failed. Please try again." });
    }
  },
};
