import { AccessLevel } from "../shared/access-level";
import { Property } from "../shared/property";
import { FactoryParams } from "../shared/types/factory";
import { Writteable } from "../writter/writter";
import { CSharpTypeMapper } from "./csharp-type-mapper";

export class CSharpProperty extends Property {
    constructor(params: FactoryParams) {
        super(params, CSharpTypeMapper);
    }

    public print(writter: Writteable): boolean {
        const visibility = AccessLevel[this.getAccessLevel()].toLowerCase();
        if (this.getParent().getKind() == "interface") {
            writter.write(`${this.getType()} ${this.capitalize(this.getName())} { get; set; }`);
        } else {
            writter.write(`${visibility} ${this.getType()} ${this.capitalize(this.getName())} { get; set; }`);
        }
        return true;
    }
}
