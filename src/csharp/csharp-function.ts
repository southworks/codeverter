import { SourceFile } from "typescript";
import { Function } from "../shared/function";
import { Writteable } from "../writter/writter";
import { CSharpFunctionHelper } from "./csharp-function-helper";
import { CSharpParameter } from "./csharp-parameter";
import { CSharpTypeMapper } from "./csharp-type-mapper";

export class CSharpFunction extends Function {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, CSharpParameter, CSharpTypeMapper);
    }

    public print(writter: Writteable): boolean {
        CSharpFunctionHelper.Write(writter,
            this.capitalize(this.getName()),
            this.getContent(),
            this.getType(),
            this.getAccessLevel(),
            true,
            this.getValues("parameter"));
        return true;
    }
}
