import { Property } from "../shared/property";
import { Writter } from "../writter/writter";
import { GoTypeMapper } from "./go-type-mapper";

export class GoProperty extends Property<GoTypeMapper> {
    constructor() {
        super(GoTypeMapper)
    }

    private capitalize(val: string): string {
        return val[0].toUpperCase() + val.substring(1);
    }

    public print(writter: Writter): void {
        let typeName = this.getType() || "error";
        writter.write(`${this.capitalize(this.getName())}: ${typeName}`)
    }
}
