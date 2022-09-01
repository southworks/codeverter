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

        this.getValues("ctr").forEach(c => {
            writter.writeNewLine();
            c.print(writter);

        });
        this.getValues("method").forEach(m => {
            writter.writeNewLine();
            m.print(writter);
        });

        writter.decDeepLevel();
        writter.write(`}`);
        return true;
    }
}
