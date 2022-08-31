import { Writteable } from "./writter";

/**
 * stub implementation only for getting the values into an array
 */
export class ArrayWritter implements Writteable {
    private content: string[] = [];

    public write(value: string): void {
        this.content.push(value);
    }

    public getCurrentDeepLevel(): number {
        return 0;
    }

    public setDeepLevel(value: number): number {
        return value;
    }

    public incDeepLevel(): number {
        return 0;
    }

    public decDeepLevel(): number {
        return 0;
    }

    public restorePreviousDeepLevel(): number {
        return 0;
    }

    public getContent(): string[] {
        return this.content;
    }
}
