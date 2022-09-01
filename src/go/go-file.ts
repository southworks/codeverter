import { File } from "../shared/file";
import { Writteable } from "../writter/writter";
import { GoClass } from "./go-class";
import { GoFunction } from "./go-function";
import { GoImports } from "./go-imports";
import { GoVariable } from "./go-variable";

export class GoFile extends File {
    constructor() {
        super(GoClass, GoVariable, GoImports, GoFunction);
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
        let printContent = false;

        this.getValues("class").forEach((c, i, a) => {
            printContent = c.print(writter) || printContent;
            writter.writeNewLine();
        });

        this.getValues("function").forEach(f => {
            printContent = f.print(writter) || printContent;
            writter.writeNewLine();
        });

        this.getValues("constant").forEach(v => {
            printContent = v.print(writter) || printContent;
            writter.writeNewLine();
        });

        this.getValues("variable").forEach(v => {
            printContent = v.print(writter) || printContent;
            writter.writeNewLine();
        });

        if (!printContent) {
            writter.writeNewLine();
        }
        return true;
    }
}
