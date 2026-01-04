import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

/**
 * Combine class name inputs into a single string and resolve conflicting Tailwind classes.
 * @param {...any} inputs - Class name inputs (strings, arrays, objects, or falsy values) to be composed.
 * @returns {string} The final merged class string with Tailwind class conflicts resolved.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}