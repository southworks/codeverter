/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

export class Imports {
    private imports: string[] = [];

    protected get(): string[] {
        return this.imports
    }

    public add(value: string): void {
        if (!this.imports.includes(value)) {
            this.imports.push(value);
        }
    }
}
