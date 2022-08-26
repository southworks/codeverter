import { Writter } from "./writter";

export class ConsoleWritter extends Writter {
    protected getIndentChar(): string {
        return " ";
    }

    protected getIndentValue(): number {
        return 2;
    }

    protected writeImpl(value: string): void {
        console.log(value);
    }
}
