import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { optimizationHistory } from "$lib/server/db/schema";
import { eq, desc } from "drizzle-orm";

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  const history = await db
    .select()
    .from(optimizationHistory)
    .where(eq(optimizationHistory.userId, user.id))
    .orderBy(desc(optimizationHistory.appliedAt))
    .limit(50);

  return { history };
};
