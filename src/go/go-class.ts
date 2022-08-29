import { Class } from "../shared/class";
import { Writter } from "../writter/writter";
import { GoProperty } from "./go-property";

export class GoClass extends Class<GoProperty> {

    constructor() {
        super(GoProperty);
    }

    public print(writter: Writter): boolean {
        writter.write(`type ${this.getName()} struct {`);
        writter.incDeepLevel();
        for (let prop of this.getProperties()) {
            prop.print(writter);
        }
        writter.decDeepLevel();
        writter.write(`}`);
        return true;
    }
}
