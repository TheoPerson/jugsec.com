import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "$lib/server/auth";

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();
  return { user };
};

export const actions: Actions = {
  updateProfile: async ({ request, locals }) => {
    if (!locals.user) return fail(401);
    const data = await request.formData();
    const displayName = data.get("displayName")?.toString()?.trim();
    if (!displayName) return fail(400, { error: "Display name is required" });

    await db
      .update(users)
      .set({ username: displayName, updatedAt: new Date() })
      .where(eq(users.id, locals.user.id));
    return { success: true, message: "Profile updated" };
  },

  changePassword: async ({ request, locals }) => {
    if (!locals.user) return fail(401);
    const data = await request.formData();
    const currentPassword = data.get("currentPassword")?.toString();
    const newPassword = data.get("newPassword")?.toString();
    const confirmPassword = data.get("confirmPassword")?.toString();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return fail(400, { error: "All password fields are required" });
    }
    if (newPassword.length < 8) {
      return fail(400, { error: "New password must be at least 8 characters" });
    }
    if (newPassword !== confirmPassword) {
      return fail(400, { error: "Passwords do not match" });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, locals.user.id))
      .limit(1);
    if (!user) return fail(404);

    const valid = await verifyPassword(currentPassword, user.passwordHash);
    if (!valid) return fail(400, { error: "Current password is incorrect" });

    const newHash = await hashPassword(newPassword);
    await db
      .update(users)
      .set({ passwordHash: newHash, updatedAt: new Date() })
      .where(eq(users.id, locals.user.id));
    return { success: true, message: "Password changed successfully" };
  },
};
