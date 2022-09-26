/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

export interface Writteable {
    write(value: string): void;
    setOpts(opts: Partial<WritterOpts>): void;
}

export type WritterOpts = {
    fileName: string;
};

export abstract class Writter implements Writteable {

    protected abstract writeImpl(value: string): void;

    public write(value: string): void {
        this.writeImpl(value);
    }

    public setOpts(_: Partial<WritterOpts>): void {
    }
}
