import { SourceFile } from "typescript";
import { AccessLevel } from "../shared/access-level";
import { Variable } from "../shared/variable";
import { Writteable } from "../writter/writter";
import { GoTypeMapper } from "./go-type-mapper";

export class GoVariable extends Variable {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, GoTypeMapper);
    }

    public print(writter: Writteable): boolean {
        const name = (this.getAccessLevel() == AccessLevel.Public && !this.isFuncVariable())
            ? this.capitalize(this.getName())
            : this.getName().toLowerCase();

        const declaration = this.isConst() ? "const" : "var";

        if (!this.getType().trim() && !this.isConst()) {
            writter.write(`${declaration} ${name} := ${this.getValue()}`);
        } else {
            writter.write(`${declaration} ${name} ${this.getType()} = ${this.getValue()}`);   
        }

        return true;
    }
}
