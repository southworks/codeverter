/**
 * a type alias to an object type with constructor function
 */
export type Factory<T> = { new(...args: any[]): T };
