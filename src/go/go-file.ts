import { File } from "../shared/file";
import { Writter } from "../writter/writter";
import { GoClass } from "./go-class";
import { GoImports } from "./go-imports";

export class GoFile extends File<GoClass, GoImports> {
    constructor() {
        super(GoClass, GoImports);
    }

    public print(writter: Writter): boolean {
        if (this.getImportHandler().print(writter)) {
            writter.write("");
        }
        this.getClasses().forEach(c => c.print(writter));
        return true;
    }
}
