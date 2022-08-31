import { SourceFile } from "typescript";
import { AccessLevel } from "../shared/access-level";
import { Class } from "../shared/class";
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
        for (let prop of this.getValues("property")) {
            prop.print(writter);
        }

        writter.write("");
        this.getValues("ctr").forEach(c => {
            c.print(writter);
            writter.write("");
        });
        this.getValues("method").forEach(m => {
            m.print(writter);
            writter.write("");
        });

        writter.decDeepLevel();
        writter.write(`}`);
        return true;
    }
}
