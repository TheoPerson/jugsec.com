import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { deleteSession, clearSessionCookie } from "$lib/server/auth";

export const actions: Actions = {
  default: async (event) => {
    const token = event.cookies.get("session");
    if (token) {
      await deleteSession(token);
      clearSessionCookie(event);
    }
    throw redirect(302, "/");
  },
};
