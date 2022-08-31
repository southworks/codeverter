import { SourceFile } from "typescript";
import { Method } from "../shared/method";
import { Writteable } from "../writter/writter";
import { CSharpFunctionHelper } from "./csharp-function-helper";
import { CSharpParameter } from "./csharp-parameter";
import { CSharpTypeMapper } from "./csharp-type-mapper";

export class CSharpMethod extends Method {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, CSharpParameter, CSharpTypeMapper);
    }

    public print(writter: Writteable): boolean {
        CSharpFunctionHelper.Write(writter,
            this.capitalize(this.getName()),
            this.getContent(),
            this.getType(),
            this.getAccessLevel(),
            false,
            this.getValues("parameter"));
        return true;
    }
}
