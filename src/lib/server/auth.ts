import { eq, and, gt } from "drizzle-orm";
import { db } from "./db";
import { sessions, users } from "./db/schema";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { redirect, type RequestEvent } from "@sveltejs/kit";

const SESSION_EXPIRY_DAYS = 30;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(
    Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
  );

  await db.insert(sessions).values({
    userId,
    token,
    expiresAt,
  });

  return { token, expiresAt };
}

export async function validateSession(token: string) {
  const [session] = await db
    .select()
    .from(sessions)
    .where(and(eq(sessions.token, token), gt(sessions.expiresAt, new Date())))
    .limit(1);

  if (!session) return null;

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      username: users.username,
      displayName: users.displayName,
      avatarUrl: users.avatarUrl,
      tier: users.tier,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  return user ?? null;
}

export async function deleteSession(token: string) {
  await db.delete(sessions).where(eq(sessions.token, token));
}

export function setSessionCookie(
  event: RequestEvent,
  token: string,
  expiresAt: Date,
) {
  event.cookies.set("session", token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: expiresAt,
  });
}

export function clearSessionCookie(event: RequestEvent) {
  event.cookies.delete("session", { path: "/" });
}

/** Throws a redirect to /auth/login if no user session exists. */
export function requireAuth(locals: App.Locals) {
  if (!locals.user) {
    throw redirect(302, "/auth/login");
  }
  return locals.user;
}
