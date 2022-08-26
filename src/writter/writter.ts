export interface Writteable {
    write(value: string): void;
    getCurrentDeepLevel(): number;
    setDeepLevel(value: number): number;
    incDeepLevel(): number;
    decDeepLevel(): number;
    restorePreviousDeepLevel(): number;
}

export abstract class Writter implements Writteable {
    private deepLevel: number = 0;
    private prevDeepLevel: number = 0;

    private getIndent(): string {
        return this.getIndentChar().repeat(this.getIndentValue() * this.deepLevel)
    }

    protected abstract writeImpl(value: string): void;
    protected abstract getIndentChar(): string;
    protected abstract getIndentValue(): number;

    public write(value: string): void {
        this.writeImpl(`${this.getIndent()}${value}`);
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
}
