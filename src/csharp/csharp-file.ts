import { File } from "../shared/file";
import { Writteable } from "../writter/writter";
import { CSharpClass } from "./csharp-class";
import { CSharpFunction } from "./csharp-function";
import { CSharpImports } from "./csharp-imports";
import { CSharpVariable } from "./csharp-variable";

export class CSharpFile extends File {
    constructor() {
        super(CSharpClass, CSharpVariable, CSharpImports, CSharpFunction);
    }

    public getIndentChar(): string {
        return " ";
    }

    public getIndentValue(): number {
        return 4;
    }

    public print(writter: Writteable): boolean {
        let contentPrinted = false;

        if (this.getImportHandler().print(writter)) {
            writter.writeNewLine();
        }
        writter.write(`namespace ${this.capitalize(this.getName())}`);
        writter.write("{");
        writter.incDeepLevel();
        this.getValues("class").forEach((c, i, a) => {
            contentPrinted = c.print(writter) || contentPrinted;
            if (i != a.length - 1) {
                writter.writeNewLine();
            }
        });

        const globalFunctions = this.getValues("function");
        if (globalFunctions.length > 0) {
            if (!contentPrinted) {
                writter.writeNewLine();
            }
            // if there are some global functions we need to create a helper class to hold them
            writter.write("public static class Helper");
            writter.write("{");
            writter.incDeepLevel();
            this.getValues("function").forEach((f, i, a) => {
                f.print(writter);
                if (i != a.length - 1) {
                    writter.writeNewLine();
                }
            });
            writter.decDeepLevel();
            writter.write("}");
        }
        writter.decDeepLevel();
        writter.write("}");
        writter.writeNewLine();
        return true;
    }
}
