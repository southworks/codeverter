import { Class } from "../shared/class";
import { FactoryParams } from "../shared/types/factory";
import { Writteable } from "../writter/writter";
import { GoConstructor } from "./go-constructor";
import { GoMethod } from "./go-method";
import { GoProperty } from "./go-property";

export class GoClass extends Class {

    constructor(params: FactoryParams) {
        super(params, GoProperty, GoConstructor, GoMethod);
    }

    public print(writter: Writteable): boolean {
        writter.write(`type ${this.getName()} struct {`);
        writter.incDeepLevel();
        const classHeritages = this.getExtends();
        classHeritages.forEach(c => writter.write(c));
        for (let prop of this.getValues("property")) {
            prop.print(writter);
        }
        writter.decDeepLevel();
        writter.write(`}`);
        this.getValues("ctr").forEach(c => {
            writter.writeNewLine();
            c.print(writter);

        });
        this.getValues("method").forEach(m => {
            writter.writeNewLine();
            m.print(writter);
        });
        return true;
    }
}
