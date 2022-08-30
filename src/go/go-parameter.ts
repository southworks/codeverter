import { SourceFile } from "typescript";
import { Parameter } from "../shared/parameter";
import { Writteable } from "../writter/writter";
import { GoTypeMapper } from "./go-type-mapper";

export class GoParameter extends Parameter {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, GoTypeMapper)
    }

    public print(writter: Writteable): boolean {
        writter.write(`${this.getName()} ${this.getType()}`)
        return true;
    }
}
