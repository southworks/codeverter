import { Writter } from "./writter";

/**
 * For testing purpose
 */
export class StringWritter extends Writter {
    private content: string[] = [];

    constructor(indentChar?: string, indentValue?: number) {
        super();
        if (indentChar) {
            this.setIndentChar(indentChar);
        }
        if (indentValue) {
            this.setIndentValue(indentValue);
        }
    }

    protected writeImpl(value: string): void {
        this.content.push(value);
    }

    public getString(): string {
        return this.content.join("\n");
    }
}
