import { AccessLevel } from "../shared/access-level";
import { Class } from "../shared/class";
import { printBlock } from "../shared/helpers/print-helper";
import { FactoryParams } from "../shared/types/factory";
import { Writteable } from "../writter/writter";
import { CSharpConstructor } from "./csharp-constructor";
import { CSharpInterface } from "./csharp-interface";
import { CSharpMethod } from "./csharp-method";
import { CSharpProperty } from "./csharp-property";

export class CSharpClass extends Class {

    constructor(params: FactoryParams) {
        super(params, CSharpProperty, CSharpConstructor, CSharpMethod);
    }

    public print(writter: Writteable): boolean {
        const visibility = AccessLevel[this.getAccessLevel()].toLowerCase();
        const classHeritages = this.getExtends();
        const intefacesHeritages = this.getImplements().map((i) => CSharpInterface.getFormattedName(i));
        const concatenatedHeritages = classHeritages.concat(intefacesHeritages);
        const heritageString = concatenatedHeritages.length > 0 ? ` : ${concatenatedHeritages.join(", ")}` : "";
        writter.write(`${visibility} class ${this.getName()}${heritageString}`);
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
