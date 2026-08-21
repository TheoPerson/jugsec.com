import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import {
  hashPassword,
  createSession,
  setSessionCookie,
} from "$lib/server/auth";
import { eq, or } from "drizzle-orm";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) throw redirect(302, "/dashboard");
};

export const actions: Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const username = data.get("username")?.toString()?.trim();
    const email = data.get("email")?.toString()?.trim()?.toLowerCase();
    const password = data.get("password")?.toString();
    const confirmPassword = data.get("confirmPassword")?.toString();

    if (!username || !email || !password || !confirmPassword) {
      return fail(400, { error: "All fields are required", username, email });
    }

    if (username.length < 3 || username.length > 50) {
      return fail(400, {
        error: "Username must be 3-50 characters",
        username,
        email,
      });
    }

    if (password.length < 8) {
      return fail(400, {
        error: "Password must be at least 8 characters",
        username,
        email,
      });
    }

    if (password !== confirmPassword) {
      return fail(400, { error: "Passwords do not match", username, email });
    }

    // Vérifier unicité
    const [existing] = await db
      .select({ id: users.id })
      .from(users)
      .where(or(eq(users.email, email), eq(users.username, username)))
      .limit(1);

    if (existing) {
      return fail(400, {
        error: "Email or username already taken",
        username,
        email,
      });
    }

    const passwordHash = await hashPassword(password);
    const [newUser] = await db
      .insert(users)
      .values({ username, email, passwordHash, displayName: username })
      .returning();

    const session = await createSession(newUser.id);
    setSessionCookie(event, session.token, session.expiresAt);
    throw redirect(302, "/dashboard");
  },
};
