/**
 * Remove invalid characters from filename for namespaces or packages names
 * @param name 
 * @param replaceChar 
 * @returns Valid name
 */
export function sanitize(name: string, replaceChar: string): string {
    return name.replace(/[^a-zA-Z0-9_ ]/g, replaceChar);
}
