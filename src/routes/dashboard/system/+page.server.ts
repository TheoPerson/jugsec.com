import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { systemProfiles } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();
  const [profile] = await db
    .select()
    .from(systemProfiles)
    .where(eq(systemProfiles.userId, user.id))
    .limit(1);
  return { systemProfile: profile ?? null };
};

export const actions: Actions = {
  save: async ({ request, locals }) => {
    if (!locals.user) return fail(401);
    const data = await request.formData();

    const values = {
      name: data.get("name")?.toString() || "My Gaming PC",
      cpu: data.get("cpu")?.toString() || null,
      gpu: data.get("gpu")?.toString() || null,
      ramGb: data.get("ramGb") ? parseInt(data.get("ramGb")!.toString()) : null,
      storageType: data.get("storageType")?.toString() || null,
      monitorResolution: data.get("monitorResolution")?.toString() || null,
      monitorRefreshRate: data.get("monitorRefreshRate")
        ? parseInt(data.get("monitorRefreshRate")!.toString())
        : null,
      osVersion: data.get("osVersion")?.toString() || null,
      updatedAt: new Date(),
    };

    // Upsert: update if exists, insert if not
    const [existing] = await db
      .select({ id: systemProfiles.id })
      .from(systemProfiles)
      .where(eq(systemProfiles.userId, locals.user.id))
      .limit(1);

    if (existing) {
      await db
        .update(systemProfiles)
        .set(values)
        .where(eq(systemProfiles.id, existing.id));
    } else {
      await db
        .insert(systemProfiles)
        .values({ ...values, userId: locals.user.id });
    }

    return { success: true };
  },
};
