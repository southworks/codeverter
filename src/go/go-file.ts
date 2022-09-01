import { File } from "../shared/file";
import { Writteable } from "../writter/writter";
import { GoClass } from "./go-class";
import { GoConstant } from "./go-constant";
import { GoFunction } from "./go-function";
import { GoImports } from "./go-imports";

export class GoFile extends File<GoClass, GoConstant, GoImports, GoFunction> {
    constructor() {
        super(GoClass, GoConstant, GoImports, GoFunction);
    }

    public print(writter: Writteable): boolean {
        if (this.getImportHandler().print(writter)) {
            writter.write("");
        }
        this.getValues("class").forEach(c => {
            c.print(writter);
            writter.write("");
        });
        this.getValues("function").forEach(f => {
            f.print(writter);
            writter.write("");
        });
        this.getValues("constant").forEach(v => {
            v.print(writter);
            writter.write("");
        })
        return true;
    }
}
