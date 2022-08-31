import { Imports } from "../shared/imports";
import { Writteable } from "../writter/writter";

export class GoImports extends Imports {
    public print(writter: Writteable): boolean {
        let hasPrinted = false;
        for (const imp of this.get()) {
            writter.write(`import "${imp}"`);
            hasPrinted = true;
        }
        return hasPrinted;
    }
}
