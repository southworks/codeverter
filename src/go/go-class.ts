import { SourceFile } from "typescript";
import { Class } from "../shared/class";
import { Writteable } from "../writter/writter";
import { GoConstructor } from "./go-constructor";
import { GoMethod } from "./go-method";
import { GoProperty } from "./go-property";

export class GoClass extends Class {

    constructor(sourceFile: SourceFile) {
        super(sourceFile, GoProperty, GoConstructor, GoMethod);
    }

    public print(writter: Writteable): boolean {
        writter.write(`type ${this.getName()} struct {`);
        writter.incDeepLevel();
        for (let prop of this.getValues("property")) {
            prop.print(writter);
        }
        writter.decDeepLevel();
        writter.write(`}`);
        writter.write("");
        this.getValues("ctr").forEach(c => {
            c.print(writter);
            writter.write("");
        });
        this.getValues("method").forEach(m => {
            m.print(writter);
            writter.write("");
        });
        return true;
    }
}
