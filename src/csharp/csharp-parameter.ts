import { Parameter } from "../shared/parameter";
import { FactoryParams } from "../shared/types/factory";
import { Writteable } from "../writter/writter";
import { CSharpTypeMapper } from "./csharp-type-mapper";

export class CSharpParameter extends Parameter {
    constructor(params: FactoryParams) {
        super(params, CSharpTypeMapper);
    }

    public print(writter: Writteable): boolean {
        writter.write(`${this.getType()} ${this.getName()}`);
        return true;
    }
}
