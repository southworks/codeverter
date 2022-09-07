import { SourceFile } from "typescript";
import { Enum } from "../shared/enum";
import { Writteable } from "../writter/writter";
import { GoTypeMapper } from "./go-type-mapper";

export class GoEnum extends Enum {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, GoTypeMapper);
    }

    public print(writter: Writteable): boolean {
        writter.write(`const (`);
        writter.incDeepLevel();
        let values = this.getEnumValues();
        Object.keys(values).forEach((k, i) => {
            let value = values[k];
            let type = typeof value === "string" ? "string" : "int";
            value = type == "string" ? `"${value}"` : value;
            let memberStr = `${k}`;
            memberStr += i == 0
                ? ` ${type} = ${value || value === 0 ? value : "iota"}`
                : value ? ` = ${value}` : "";
            writter.write(memberStr);
        });
        writter.decDeepLevel();
        writter.write(`)`);
        return true;
    }
}
