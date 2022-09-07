import { SourceFile } from "typescript";
import { AccessLevel } from "../shared/access-level";
import { Interface } from "../shared/interface";
import { Writteable } from "../writter/writter";
import { CSharpMethod } from "./csharp-method";
import { CSharpProperty } from "./csharp-property";

export class CSharpInterface extends Interface {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, CSharpProperty, CSharpMethod);
    }

    public print(writter: Writteable): boolean {
        const visibility = AccessLevel[this.getAccessLevel()].toLowerCase();
        writter.write(`${visibility} interface I${this.getName()}`);
        writter.write("{");
        writter.incDeepLevel();
        for (let prop of this.getValues("property")) {
            prop.print(writter);
        }
        for (let meth of this.getValues("method")) {
            meth.print(writter);
        }
        writter.decDeepLevel();
        writter.write("}");
        return true;
    }
}
