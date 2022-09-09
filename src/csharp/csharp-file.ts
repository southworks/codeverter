import { File } from "../shared/file";
import { sanitize } from "../shared/helpers/filename-sanitizer";
import { printBlock } from "../shared/helpers/print-helper";
import { FactoryParams } from "../shared/types/factory";
import { Writteable } from "../writter/writter";
import { CSharpClass } from "./csharp-class";
import { CSharpEnum } from "./csharp-enum";
import { CSharpFunction } from "./csharp-function";
import { CSharpImports } from "./csharp-imports";
import { CSharpInterface } from "./csharp-interface";
import { CSharpVariable } from "./csharp-variable";

export class CSharpFile extends File {
    constructor(params: FactoryParams) {
        super(params, CSharpClass, CSharpVariable, CSharpImports, CSharpFunction, CSharpEnum, CSharpInterface);
    }

    public getExtension(): string {
        return ".cs";
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
        writter.write(`namespace ${this.capitalize(sanitize(this.getName(), "_"))}`);
        writter.write("{");
        writter.incDeepLevel();
        const printOpt = { splitted: true };
        contentPrinted = printBlock(writter, this.getValues("interface"), printOpt);
        if (contentPrinted) {
            writter.writeNewLine();
        }
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
