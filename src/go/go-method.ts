import { SourceFile } from "typescript";
import { AccessLevel } from "../shared/access-level";
import { Method } from "../shared/method";
import { SourceElement } from "../shared/types/source-element";
import { ArrayWritter } from "../writter/array-writter";
import { Writteable } from "../writter/writter";
import { GoDefaultValueMapper } from "./go-default-value-mapper";
import { GoParameter } from "./go-parameter";
import { GoTypeMapper } from "./go-type-mapper";
import { GoVariable } from "./go-variable";

export class GoMethod extends Method {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, GoParameter, GoVariable, GoTypeMapper, GoDefaultValueMapper);
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

        if (this.isSignature()) {
            writter.write(`${methodName}() ${returnValue}`);
        } else {
            writter.write(`func (${receiver}) ${methodName}(${paramStr})${returnValue} {`);
            writter.incDeepLevel();

            arrWritter.clear();
            this.getValues("constant").concat(this.getValues("variable")).map(p => p.print(arrWritter));
            arrWritter.getContent().forEach(c => {
                writter.write(c);
            });

            for (const line of this.getContent()) {
                writter.write(`//${line}`);
            }
            writter.write(`return ${this.getReturnValue()}`);
            writter.decDeepLevel();
            writter.write(`}`);
        }
        return true;
    }
}
