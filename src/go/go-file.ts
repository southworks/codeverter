import { File } from "../shared/file";
import { Writteable } from "../writter/writter";
import { GoClass } from "./go-class";
import { GoVariable } from "./go-variable";
import { GoFunction } from "./go-function";
import { GoImports } from "./go-imports";

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
        writter.write("");

        if (this.getImportHandler().print(writter)) {
            writter.write("");
        }
        this.getValues("class").forEach(c => {
            c.print(writter);
        });
        this.getValues("function").forEach(f => {
            f.print(writter);
            writter.write("");
        });
        this.getValues("constant").forEach(v => {
            v.print(writter);
        })
        this.getValues("variable").forEach(v => {
            v.print(writter);
        })
        return true;
    }
}
