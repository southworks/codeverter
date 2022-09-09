import { AccessLevel } from "../shared/access-level";
import { KnownTypes } from "../shared/type-mapper";
import { FactoryParams } from "../shared/types/factory";
import { Variable } from "../shared/variable";
import { Writteable } from "../writter/writter";
import { CSharpTypeMapper } from "./csharp-type-mapper";

export class CSharpVariable extends Variable {
    constructor(params: FactoryParams) {
        super(params, CSharpTypeMapper);
    }

    private isVoid(): boolean {
        return this.getKnownType() == KnownTypes.Void;
    }

    public print(writter: Writteable): boolean {
        const accessLevel = AccessLevel[this.getAccessLevel()].toLowerCase();

        if (this.isFuncVariable()) {
            const name = this.camelize(this.getName());
            if (this.isVoid()) {
                writter.write(`var ${name} = ${this.getValue()};`);
            } else {
                const declaration = this.isConst() ? "const " : "";
                writter.write(`${declaration}${this.getType()} ${name} = ${this.getValue()};`);
            }
        } else {
            const name = this.isConst() ? this.getName().toUpperCase() : this.capitalize(this.getName());
            const declaration = this.isConst() ? "const" : "static";
            writter.write(`${accessLevel} ${declaration} ${this.getType()} ${name} = ${this.getValue()};`);
        }
        return true;
    }
}
