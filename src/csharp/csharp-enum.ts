import { AccessLevel } from "../shared/access-level";
import { Enum } from "../shared/enum";
import { FactoryParams } from "../shared/types/factory";
import { Writteable } from "../writter/writter";
import { CSharpTypeMapper } from "./csharp-type-mapper";

export class CSharpEnum extends Enum {
    constructor(params: FactoryParams) {
        super(params, CSharpTypeMapper);
    }

    private getMemberString(k: string, value: string | number): string {
        let memberString = `${k}`;
        if (value || value === 0) {
            let type = typeof value === "string" ? "string" : "int";
            value = type == "string" ? `"${value}"` : value;
            memberString = `${k} = ${value}`;
        }
        return memberString;
    }

    public print(writter: Writteable): boolean {
        const visibility = AccessLevel[this.getAccessLevel()].toLowerCase();
        writter.write(`${visibility} enum ${this.getName()}`);
        writter.write("{");
        writter.incDeepLevel();
        let values = this.getEnumValues();
        let membersCount = Object.keys(values).length;
        Object.keys(values).forEach((k, i) => {
            let memberStr = this.getMemberString(k, values[k]);
            if (i !== membersCount - 1) {
                memberStr += ",";
            }
            writter.write(memberStr);
        });
        writter.decDeepLevel();
        writter.write("}");
        return true;
    }
}
