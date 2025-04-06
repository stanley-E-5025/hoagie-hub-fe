/**
 * Safely access potentially null or undefined nested properties
 *
 * @param obj The object to access
 * @param defaultValue Default value to return if path resolves to undefined/null
 * @returns A function that accepts a path function and returns the value or default
 */
export function safe<T, R>(
  obj: T | null | undefined,
  defaultValue: R,
): (path: (obj: NonNullable<T>) => R | null | undefined) => R {
  return (path: (obj: NonNullable<T>) => R | null | undefined): R => {
    try {
      if (obj === null || obj === undefined) return defaultValue;
      const result = path(obj as NonNullable<T>);
      return result === null || result === undefined ? defaultValue : result;
    } catch (e) {
      return defaultValue;
    }
  };
}

/**
 * Safely check if a value exists (not null or undefined)
 *
 * @param value The value to check
 * @returns Boolean indicating if value exists
 */
export function exists<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Get a value with a fallback if null/undefined
 *
 * @param value The value to check
 * @param defaultValue Default value to use if value is null/undefined
 * @returns The value or default
 */
export function getOrDefault<T>(
  value: T | null | undefined,
  defaultValue: T,
): T {
  return exists(value) ? value : defaultValue;
}

/**
 * Safely get a property from an object with a fallback if null/undefined
 *
 * @param obj The object to access
 * @param key The key to access
 * @param defaultValue Default value if property is null/undefined
 * @returns The property value or default
 */
export function getProp<T, K extends keyof T>(
  obj: T | null | undefined,
  key: K,
  defaultValue: T[K],
): T[K] {
  if (!exists(obj)) return defaultValue;
  const value = obj[key];
  return exists(value) ? value : defaultValue;
}

export default {
  safe,
  exists,
  getOrDefault,
  getProp,
};
