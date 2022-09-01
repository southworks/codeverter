export interface Writteable {
    write(value: string): void;
    writeNewLine(): void;
    getCurrentDeepLevel(): number;
    setDeepLevel(value: number): number;
    incDeepLevel(): number;
    decDeepLevel(): number;
    restorePreviousDeepLevel(): number;
}

export abstract class Writter implements Writteable {
    private newLine = process.platform === "win32" ? "\r\n" : "\n";

    private deepLevel: number = 0;
    private prevDeepLevel: number = 0;
    private indentChar!: string;
    private indentValue!: number;

    private getIndent(): string {
        return this.indentChar.repeat(this.indentValue * this.deepLevel)
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

    public setIndentChar(val: string): void {
        this.indentChar = val;
    }

    public setIndentValue(val: number): void {
        this.indentValue = val;
    }
}
