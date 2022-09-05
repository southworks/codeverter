import { SourceFile } from "typescript";
import { AccessLevel } from "../shared/access-level";
import { Function } from "../shared/function";
import { ArrayWritter } from "../writter/array-writter";
import { Writteable } from "../writter/writter";
import { GoDefaultValueMapper } from "./go-default-value-mapper";
import { GoParameter } from "./go-parameter";
import { GoTypeMapper } from "./go-type-mapper";

export class GoFunction extends Function {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, GoParameter, GoTypeMapper, GoDefaultValueMapper);
    }

    public print(writter: Writteable): boolean {
        const arrWritter = new ArrayWritter();
        this.getValues("parameter").map(p => p.print(arrWritter));
        const paramStr = arrWritter.getContent().join(", ");

        let methodName = this.getAccessLevel() == AccessLevel.Private
            ? this.camelize(this.getName())
            : this.capitalize(this.getName());

        let returnType = this.getType();
        if (!!returnType) {
            returnType = " " + returnType;
        }

        writter.write(`func ${methodName}(${paramStr})${returnType} {`);
        writter.incDeepLevel();
        for (const line of this.getContent()) {
            writter.write(`//${line}`);
        }
        writter.write(`return ${this.getReturnValue()}`);
        writter.decDeepLevel();
        writter.write(`}`);
        return true;
    }
}
