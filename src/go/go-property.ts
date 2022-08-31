import { SourceFile } from "typescript";
import { AccessLevel } from "../shared/access-level";
import { Property } from "../shared/property";
import { Writteable } from "../writter/writter";
import { GoTypeMapper } from "./go-type-mapper";

export class GoProperty extends Property {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, GoTypeMapper);
    }

    public print(writter: Writteable): boolean {
        const propertyName = this.getAccessLevel() == AccessLevel.Public
            ? this.capitalize(this.getName())
            : this.getName().toLowerCase();
        writter.write(`${propertyName} ${this.getType()}`);
        return true;
    }
}
