import { SourceFile } from "typescript";
import { AccessLevel } from "../shared/access-level";
import { Method } from "../shared/method";
import { ArrayWritter } from "../writter/array-writter";
import { Writteable } from "../writter/writter";
import { GoDefaultValueMapper } from "./go-default-value-mapper";
import { GoParameter } from "./go-parameter";
import { GoTypeMapper } from "./go-type-mapper";

export class GoMethod extends Method {
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

        let returnValue = this.getType();
        if (!!returnValue) {
            returnValue = " " + returnValue;
        }

        const firstLetter = this.getName().charAt(0).toLowerCase();
        const receiver = `${firstLetter} *${this.getParent()?.getName()}`;

        writter.write(`func (${receiver}) ${methodName}(${paramStr})${returnValue} {`);
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
