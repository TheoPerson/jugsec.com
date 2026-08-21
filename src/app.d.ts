declare global {
  namespace App {
    interface Locals {
      user: {
        id: string;
        email: string;
        username: string;
        displayName: string | null;
        avatarUrl: string | null;
        tier: string;
        createdAt: Date;
        updatedAt: Date;
      } | null;
    }
  }
}

export {};
