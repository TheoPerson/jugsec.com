import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import {
  systemProfiles,
  optimizationScans,
  optimizationHistory,
  userGameProfiles,
} from "$lib/server/db/schema";
import { eq, desc, count } from "drizzle-orm";

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  const [profile] = await db
    .select()
    .from(systemProfiles)
    .where(eq(systemProfiles.userId, user.id))
    .limit(1);

  const [latestScan] = await db
    .select()
    .from(optimizationScans)
    .where(eq(optimizationScans.userId, user.id))
    .orderBy(desc(optimizationScans.createdAt))
    .limit(1);

  const recentActivity = await db
    .select()
    .from(optimizationHistory)
    .where(eq(optimizationHistory.userId, user.id))
    .orderBy(desc(optimizationHistory.appliedAt))
    .limit(5);

  const [scanCount] = await db
    .select({ value: count() })
    .from(optimizationScans)
    .where(eq(optimizationScans.userId, user.id));

  const [historyCount] = await db
    .select({ value: count() })
    .from(optimizationHistory)
    .where(eq(optimizationHistory.userId, user.id));

  const [gamesCount] = await db
    .select({ value: count() })
    .from(userGameProfiles)
    .where(eq(userGameProfiles.userId, user.id));

  return {
    systemProfile: profile ?? null,
    latestScan: latestScan ?? null,
    recentActivity,
    stats: {
      scans: scanCount?.value ?? 0,
      optimizations: historyCount?.value ?? 0,
      games: gamesCount?.value ?? 0,
    },
  };
};
