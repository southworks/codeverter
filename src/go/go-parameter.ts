import { Parameter } from "../shared/parameter";
import { FactoryParams } from "../shared/types/factory";
import { Writteable } from "../writter/writter";
import { GoTypeMapper } from "./go-type-mapper";

export class GoParameter extends Parameter {
    constructor(params: FactoryParams) {
        super(params, GoTypeMapper);
    }

    public print(writter: Writteable): boolean {
        writter.write(`${this.getName()} ${this.getType()}`);
        return true;
    }
}
