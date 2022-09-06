import { SourceFile } from "typescript";
import { Method } from "../shared/method";
import { Writteable } from "../writter/writter";
import { CSharpDefaultValueMapper } from "./csharp-default-value-mapper";
import { CSharpFunctionHelper } from "./csharp-function-helper";
import { CSharpParameter } from "./csharp-parameter";
import { CSharpTypeMapper } from "./csharp-type-mapper";
import { CSharpVariable } from "./csharp-variable";

export class CSharpMethod extends Method {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, CSharpParameter, CSharpVariable, CSharpTypeMapper, CSharpDefaultValueMapper);
    }

    public print(writter: Writteable): boolean {
        CSharpFunctionHelper.Write(writter,
            this.capitalize(this.getName()),
            this.getContent(),
            this.getType(),
            this.getReturnValue()!,
            this.getAccessLevel(),
            false,
            this.getValues("parameter"),
            this.getValues("constant").concat(this.getValues("variable")));
        return true;
    }
}
