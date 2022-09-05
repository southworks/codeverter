import { File } from "../shared/file";
import { printBlock } from "../shared/helpers/print-helper";
import { Writteable } from "../writter/writter";
import { CSharpClass } from "./csharp-class";
import { CSharpEnum } from "./csharp-enum";
import { CSharpFunction } from "./csharp-function";
import { CSharpImports } from "./csharp-imports";
import { CSharpVariable } from "./csharp-variable";

export class CSharpFile extends File {
    constructor() {
        super(CSharpClass, CSharpVariable, CSharpImports, CSharpFunction, CSharpEnum);
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
        const printOpt = { splitted: true };
        contentPrinted = printBlock(writter, this.getValues("class"), printOpt);

        const globalFunctions = this.getValues("function");
        const globalVars = this.getValues("variable");
        const globalConstants = this.getValues("constant");
        const globalEnums = this.getValues("enum");
        if ((globalFunctions.length || globalVars.length || globalConstants.length || globalEnums.length) > 0) {
            if (contentPrinted) {
                writter.writeNewLine();
            }
            // if there are some global functions we need to create a helper class to hold them
            writter.write("public static class Helper");
            writter.write("{");
            writter.incDeepLevel();
            printBlock(writter, globalEnums, printOpt);
            printBlock(writter, globalVars, printOpt);
            printBlock(writter, globalConstants, printOpt);
            printBlock(writter, globalFunctions, printOpt);
            writter.decDeepLevel();
            writter.write("}");
        }
        writter.decDeepLevel();
        writter.write("}");
        writter.writeNewLine();
        return true;
    }
}
