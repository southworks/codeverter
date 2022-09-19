/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Writter } from "./writter";

export class StringWritter extends Writter {
    private content: string[] = [];

    constructor(indentChar?: string, indentValue?: number) {
        super();
        this.setOpts({ indentChar, indentValue });
    }

    protected writeImpl(value: string): void {
        this.content.push(value);
    }

    public getString(): string {
        return this.content.map(v => v.replace("\n", "")).join("\n");
    }
}
