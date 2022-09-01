import { Writter } from "./writter";
import { writeFileSync, rmSync, existsSync } from "fs";

export class FileWritter extends Writter {
    private dest: string;

    constructor(dest: string) {
        super();
        this.dest = dest;
        if (existsSync(this.dest)) {
            rmSync(this.dest);
        }
    }

    protected writeImpl(value: string): void {
        if (this.dest) {
            writeFileSync(this.dest, `${value}\n`, { flag: "a+" });
        }
    }
}
