import { Writter } from "./writter";

export class StringWritter extends Writter {
    private content: string[] = [];

    protected writeImpl(value: string): void {
        this.content.push(value);
    }

    public getString(): string {
        return this.content.join("\n");
    }
}
