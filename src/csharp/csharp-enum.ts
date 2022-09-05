import { SourceFile } from "typescript";
import { AccessLevel } from "../shared/access-level";
import { Enum } from "../shared/enum";
import { Writteable } from "../writter/writter";
import { CSharpTypeMapper } from "./csharp-type-mapper";

export class CSharpEnum extends Enum {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, CSharpTypeMapper);
    }

    public print(writter: Writteable): boolean {
        const visibility = AccessLevel[this.getAccessLevel()].toLowerCase();
        writter.write(`${visibility} enum ${this.getName()}`);
        writter.write("{");
        writter.incDeepLevel();
        let values = this.getEnumValues();
        let membersCount = Object.keys(values).length;
        Object.keys(values).forEach((k, i) => {
            let value = values[k];
            let type = typeof value === "string" ? "string" : "int";
            value = type == "string" ? `"${value}"` : value;
            i !== membersCount - 1
                ? writter.write(`${k} = ${value},`)
                : writter.write(`${k} = ${value}`);
        });
        writter.decDeepLevel();
        writter.write("}");
        return true;
    }
}
