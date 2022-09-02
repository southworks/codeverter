import { SourceFile } from "typescript";
import { AccessLevel } from "../shared/access-level";
import { Variable } from "../shared/variable";
import { Writteable } from "../writter/writter";
import { CSharpTypeMapper } from "./csharp-type-mapper";

export class CSharpVariable extends Variable {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, CSharpTypeMapper);
    }

    public print(writter: Writteable): boolean {
        const accessLevel = AccessLevel[this.getAccessLevel()].toLowerCase();
        const declaration = this.isConst() ? "const" : "static";
        const name = this.isConst() ? this.getName().toUpperCase() : this.capitalize(this.getName());
        writter.write(`${accessLevel} ${declaration} ${this.getType()} ${name} = ${this.getValue()};`);
        return true;
    }
}