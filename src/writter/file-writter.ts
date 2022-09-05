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
            writeFileSync(this.dest, `${value}`, { flag: "a+" });
        }
    }

    /**
     * Implicit add new line at the end
     * @param value The value to be written
     */
    public write(value: string): void {
        super.write(value);
        this.writeNewLine();
    }
}
