import { SourceFile } from "typescript";
import { AccessLevel } from "../shared/access-level";
import { Constant } from "../shared/constant";
import { Writteable } from "../writter/writter";
import { GoTypeMapper } from "./go-type-mapper";

export class GoConstant extends Constant {

    constructor(sourceFile: SourceFile) {
        super(sourceFile, GoTypeMapper);
    }

    public print(writter: Writteable): boolean {
        const name = this.getAccessLevel() == AccessLevel.Public
            ? this.capitalize(this.getName())
            : this.getName().toLowerCase();

        writter.write(`const ${name} ${this.getType()} ${this.getValue()}`);
        return true;
    }
}
