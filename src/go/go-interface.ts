import { SourceFile } from "typescript";
import { Interface } from "../shared/interface";
import { Writteable } from "../writter/writter";
import { GoMethod } from "./go-method";
import { GoProperty } from "./go-property";

export class GoInterface extends Interface {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, GoProperty, GoMethod);
    }

    public print(writter: Writteable): boolean {
        writter.write(`type ${this.getName()} interface {`);
        writter.incDeepLevel();
        for (let meth of this.getValues("methodSignature")) {
            meth.print(writter);
        }
        writter.decDeepLevel();
        writter.write("}");
        return true;
    }
}
