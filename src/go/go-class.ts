import { SourceFile } from "typescript";
import { Class } from "../shared/class";
import { Writteable } from "../writter/writter";
import { GoConstructor } from "./go-constructor";
import { GoProperty } from "./go-property";

export class GoClass extends Class {

    constructor(sourceFile: SourceFile) {
        super(sourceFile, GoProperty, GoConstructor);
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
        for (let ctr of this.getValues("ctr")) {
            ctr.print(writter);
        }
        return true;
    }
}
