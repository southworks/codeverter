/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { SourceElement } from "./source-element";

/**
 * Available factory types
 */
export type ElementKind = "file"
    | "imports"
    | "class"
    | "ctr"
    | "property"
    | "parameter"
    | "function"
    | "method"
    | "constant"
    | "variable"
    | "enum"
    | "interface";

/**
 * Dictionary to hold created elements
 */
export class ElementValues {
    private values: {
        [p in ElementKind]?: SourceElement[]
    } = {};

    public add(key: ElementKind, val: SourceElement): void {
        (this.values[key] = this.values[key] ?? []).push(val);
    }

    public get<T>(key: ElementKind): T[] {
        return (this.values[key] as any ?? []) as T[];
    }
}
