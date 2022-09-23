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
    private newLine = typeof process === "undefined"
        ? "\n"
        : process.platform === "win32" ? "\r\n" : "\n";
    private fileName!: string;

    protected getFileName(): string {
        return this.fileName;
    }

    protected abstract writeImpl(value: string): void;

    public write(value: string): void {
        this.writeImpl(value);
    }

    public writeNewLine(): void {
        this.writeImpl(this.newLine);
    }

    public setOpts(opts: Partial<WritterOpts>): void {
        this.fileName = opts.fileName ?? this.fileName;
    }
}
