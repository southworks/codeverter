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
    private deepLevel: number = 0;
    private prevDeepLevel: number = 0;
    private indentChar: string = " ";
    private indentValue: number = 2;
    private fileName!: string;

    private getIndent(): string {
        return this.indentChar.repeat(this.indentValue * this.deepLevel)
    }

    protected getFileName(): string {
        return this.fileName;
    }

    protected abstract writeImpl(value: string): void;

    public write(value: string): void {
        this.writeImpl(`${this.getIndent()}${value}`);
    }

    public writeNewLine(): void {
        this.writeImpl(this.newLine);
    }

    public getCurrentDeepLevel(): number {
        return this.deepLevel;
    }

    public setDeepLevel(value: number): number {
        if (value < 0) {
            value = 0;
        }

        this.prevDeepLevel = this.deepLevel;
        this.deepLevel = value;
        return value;
    }

    public incDeepLevel(): number {
        return this.setDeepLevel(this.deepLevel + 1);
    }

    public decDeepLevel(): number {
        return this.setDeepLevel(this.deepLevel - 1);
    }

    public restorePreviousDeepLevel(): number {
        return this.setDeepLevel(this.prevDeepLevel);
    }

    public setOpts(opts: Partial<WritterOpts>): void {
        this.fileName = opts.fileName ?? this.fileName;
    }
}
