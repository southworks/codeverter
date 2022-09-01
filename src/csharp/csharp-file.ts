import { File } from "../shared/file";
import { Writteable } from "../writter/writter";
import { CSharpClass } from "./csharp-class";
import { CSharpFunction } from "./csharp-function";
import { CSharpImports } from "./csharp-imports";

export class CSharpFile extends File {
    constructor() {
        super(CSharpClass, CSharpImports, CSharpFunction);
    }

    public getIndentChar(): string {
        return " ";
    }

    public getIndentValue(): number {
        return 4;
    }

    public print(writter: Writteable): boolean {
        if (this.getImportHandler().print(writter)) {
            writter.writeNewLine();
        }
        writter.write(`namespace ${this.capitalize(this.getName())}`);
        writter.write("{");
        writter.incDeepLevel();
        this.getValues("class").forEach(c => {
            writter.writeNewLine();
            c.print(writter);
        });

        const globalFunctions = this.getValues("function");
        if (globalFunctions.length > 0) {
            // if there are some global functions we need to create a helper class to hold them
            writter.write("public static class Helper");
            writter.write("{");
            writter.incDeepLevel();
            this.getValues("function").forEach(f => {
                writter.writeNewLine();
                f.print(writter);
            });
            writter.decDeepLevel();
            writter.write("}");
        }

        writter.decDeepLevel();
        writter.write("}");
        return true;
    }
}
