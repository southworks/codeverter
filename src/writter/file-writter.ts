/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Writter, WritterOpts } from "./writter";
import { writeFileSync, rmSync, existsSync } from "fs";

export class FileWritter extends Writter {
    private fileName!: string;

    protected getFileName(): string {
        return this.fileName;
    }

    protected writeImpl(value: string): void {
        if (this.getFileName()) {
            writeFileSync(this.getFileName(), `${value}`, { flag: "a+" });
        }
    }

    public setOpts(opts: Partial<WritterOpts>): void {
        super.setOpts(opts);
        this.fileName = opts.fileName ?? "";
        if (existsSync(this.getFileName())) {
            rmSync(this.getFileName());
        }
    }
}
