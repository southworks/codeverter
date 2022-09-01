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

        let blockPrinted = false;

        this.getValues("property").forEach((p, i, a) => {
            blockPrinted = p.print(writter) || blockPrinted;
            if (i != a.length - 1) {
                writter.writeNewLine();
            }
        });

        this.getValues("ctr").forEach((c, i, a) => {
            if (i == 0 && blockPrinted) {
                writter.writeNewLine();
                blockPrinted = false;
            }
            blockPrinted = c.print(writter) || blockPrinted;
            if (i != a.length - 1) {
                writter.writeNewLine();
            }
        });

        this.getValues("method").forEach((m, i, a) => {
            if (i == 0 && blockPrinted) {
                writter.writeNewLine();
                blockPrinted = false;
            }
            blockPrinted = m.print(writter) || blockPrinted;
            if (i != a.length - 1) {
                writter.writeNewLine();
            }
        });

        writter.decDeepLevel();
        writter.write(`}`);
        return true;
    }
}
