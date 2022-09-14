/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

interface Path {
    basename(path: string, ext?: string): string;
    extname(path: string): string;
    resolve(...paths: string[]): string;
    dirname(path: string): string;
    join(...paths: string[]): string;
}

const path = (typeof window === "undefined" ? require("path") : null) as Path;

/**
 * Mock implementations for browser support
 */
export const basename = typeof window === "undefined" ? path?.basename : (path: string, _: string) => path;
export const extname = typeof window === "undefined" ? path?.extname : (path: string) => {
    const arr = path.split(".");
    return `.${arr[arr.length - 1]}`;
};
export const resolve = typeof window === "undefined" ? path?.resolve : (path: string | string[]) => typeof path === "string" ? path : path.join("/");
export const dirname = typeof window === "undefined" ? path?.dirname : (path: string) => path;
export const join = typeof window === "undefined" ? path?.join : (...paths: string[]) => paths.join("/");
