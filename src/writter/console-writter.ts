import { Writter } from "./writter";

export class ConsoleWritter extends Writter {
    protected writeImpl(value: string): void {
        console.log(value);
    }
}
