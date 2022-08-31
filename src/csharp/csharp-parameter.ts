import { SourceFile } from "typescript";
import { Parameter } from "../shared/parameter";
import { Writteable } from "../writter/writter";
import { CSharpTypeMapper } from "./csharp-type-mapper";

export class CSharpParameter extends Parameter {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, CSharpTypeMapper);
    }

    public print(writter: Writteable): boolean {
        writter.write(`${this.getType()} ${this.getName()}`);
        return true;
    }
}
