import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as a percentage score */
export function formatScore(score: number): string {
  return `${Math.round(score)}`;
}

/** Get score color class based on value (0-100) */
export function getScoreColor(score: number): string {
  if (score >= 80) return "text-neon";
  if (score >= 60) return "text-accent";
  if (score >= 40) return "text-warning";
  return "text-danger";
}

/** Get score label based on value */
export function getScoreLabel(score: number): string {
  if (score >= 90) return "Elite";
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 60) return "Average";
  if (score >= 40) return "Below Average";
  return "Needs Work";
}

/** Get impact badge color */
export function getImpactColor(impact: string): string {
  switch (impact) {
    case "critical":
      return "bg-danger-muted text-danger";
    case "high":
      return "bg-warning-muted text-warning";
    case "medium":
      return "bg-accent-muted text-accent";
    case "low":
      return "bg-neon-muted text-neon";
    default:
      return "bg-surface-3 text-text-secondary";
  }
}

/** Capitalize first letter */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Relative time label */
export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
}
