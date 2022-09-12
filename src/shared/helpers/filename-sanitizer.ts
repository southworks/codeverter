/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

/**
 * Remove invalid characters from filename for namespaces or packages names
 * @param name 
 * @param replaceChar 
 * @returns Valid name
 */
export function sanitize(name: string, replaceChar: string): string {
    return name.replace(/[^a-zA-Z0-9_ ]/g, replaceChar);
}
