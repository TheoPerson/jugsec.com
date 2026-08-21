import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import {
  verifyPassword,
  createSession,
  setSessionCookie,
} from "$lib/server/auth";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) throw redirect(302, "/dashboard");
};

export const actions: Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const email = data.get("email")?.toString()?.trim()?.toLowerCase();
    const password = data.get("password")?.toString();

    if (!email || !password) {
      return fail(400, { error: "Email and password are required", email });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (!user) {
      return fail(400, { error: "Invalid email or password", email });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return fail(400, { error: "Invalid email or password", email });
    }

    const session = await createSession(user.id);
    setSessionCookie(event, session.token, session.expiresAt);
    throw redirect(302, "/dashboard");
  },
};
