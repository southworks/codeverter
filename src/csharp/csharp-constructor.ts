import { SourceFile } from "typescript";
import { AccessLevel } from "../shared/access-level";
import { Constructor } from "../shared/constructor";
import { ArrayWritter } from "../writter/array-writter";
import { Writteable } from "../writter/writter";
import { CSharpParameter } from "./csharp-parameter";
import { CSharpTypeMapper } from "./csharp-type-mapper";

export class CSharpConstructor extends Constructor {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, CSharpParameter, CSharpTypeMapper);
    }

    public print(writter: Writteable): boolean {
        const visibility = AccessLevel[this.getAccessLevel()].toLowerCase();

        const arrWritter = new ArrayWritter();
        this.getValues("parameter").map(p => p.print(arrWritter));
        const paramStr = arrWritter.getContent().join(", ");

        writter.write(`${visibility} ${this.capitalize(this.getName())}(${paramStr})`);
        writter.write(`{`);
        writter.incDeepLevel();
        for (const line of this.getContent()) {
            writter.write(`//${line}`);
        }
        writter.decDeepLevel();
        writter.write(`}`);
        return true;
    }
}
