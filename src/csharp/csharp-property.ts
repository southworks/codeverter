import { SourceFile } from "typescript";
import { AccessLevel } from "../shared/access-level";
import { Property } from "../shared/property";
import { Writteable } from "../writter/writter";
import { CSharpTypeMapper } from "./csharp-type-mapper";

export class CSharpProperty extends Property {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, CSharpTypeMapper);
    }

    public print(writter: Writteable): boolean {
        const visibility = AccessLevel[this.getAccessLevel()].toLowerCase();
        writter.write(`${visibility} ${this.getType()} ${this.capitalize(this.getName())} { get; set; }`);
        return true;
    }
}
