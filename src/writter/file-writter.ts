import { Writter, WritterOpts } from "./writter";
import { writeFileSync, rmSync, existsSync } from "fs";

export class FileWritter extends Writter {
    protected writeImpl(value: string): void {
        if (this.getFileName()) {
            writeFileSync(this.getFileName(), `${value}`, { flag: "a+" });
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

    public setOpts(opts: Partial<WritterOpts>): void {
        super.setOpts(opts);
        if (existsSync(this.getFileName())) {
            rmSync(this.getFileName());
        }
    }
}
