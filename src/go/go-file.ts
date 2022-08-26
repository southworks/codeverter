import { File } from "../shared/file";
import { Writter } from "../writter/writter";
import { GoClass } from "./go-class";

export class GoFile extends File<GoClass> {
    constructor() {
        super(GoClass);
    }

    public print(writter: Writter): void {
        this.getClasses().forEach(c => c.print(writter));
    }
}
