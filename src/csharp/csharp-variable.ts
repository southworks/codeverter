import { SourceFile } from "typescript";
import { Variable } from "../shared/variable";
import { Writteable } from "../writter/writter";
import { CSharpTypeMapper } from "./csharp-type-mapper";

export class CSharpVariable extends Variable {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, CSharpTypeMapper);
    }

    public print(_: Writteable): boolean {
        // TODO
        return true;
    }
}
