import { File } from "../shared/file";
import { printBlock } from "../shared/helpers/print-helper";
import { Writteable } from "../writter/writter";
import { GoClass } from "./go-class";
import { GoEnum } from "./go-enum";
import { GoFunction } from "./go-function";
import { GoImports } from "./go-imports";
import { GoVariable } from "./go-variable";

export class GoFile extends File {
    constructor() {
        super(GoClass, GoVariable, GoImports, GoFunction, GoEnum);
    }

    public getIndentChar(): string {
        return "\t";
    }

    public getIndentValue(): number {
        return 1;
    }

    public print(writter: Writteable): boolean {
        writter.write(`package ${this.getName().toLowerCase()}`);
        writter.writeNewLine();
        if (this.getImportHandler().print(writter)) {
            writter.writeNewLine();
        }
        const printOpt = { splitted: false, trailingNewLine: true };
        let printContent = printBlock(writter, this.getValues("class"), printOpt);
        printContent = printBlock(writter, this.getValues("enum"), printOpt) || printContent;
        printContent = printBlock(writter, this.getValues("function"), printOpt) || printContent;
        printContent = printBlock(writter, this.getValues("constant"), printOpt) || printContent;
        printContent = printBlock(writter, this.getValues("variable"), printOpt) || printContent;

        if (!printContent) {
            writter.writeNewLine();
        }
        return true;
    }
}
