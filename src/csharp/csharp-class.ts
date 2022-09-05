import { SourceFile } from "typescript";
import { AccessLevel } from "../shared/access-level";
import { Class } from "../shared/class";
import { printBlock } from "../shared/helpers/print-helper";
import { Writteable } from "../writter/writter";
import { CSharpConstructor } from "./csharp-constructor";
import { CSharpMethod } from "./csharp-method";
import { CSharpProperty } from "./csharp-property";

export class CSharpClass extends Class {

    constructor(sourceFile: SourceFile) {
        super(sourceFile, CSharpProperty, CSharpConstructor, CSharpMethod);
    }

    public print(writter: Writteable): boolean {
        const visibility = AccessLevel[this.getAccessLevel()].toLowerCase();
        writter.write(`${visibility} class ${this.getName()}`);
        writter.write("{");
        writter.incDeepLevel();
        let blockPrinted = false;
        blockPrinted = printBlock(writter, this.getValues("property"));
        blockPrinted = printBlock(writter, this.getValues("ctr"), { startingNewLine: blockPrinted, splitted: true }) || blockPrinted;
        blockPrinted = printBlock(writter, this.getValues("method"), { startingNewLine: blockPrinted, splitted: true }) || blockPrinted;
        writter.decDeepLevel();
        writter.write(`}`);
        return true;
    }
}
