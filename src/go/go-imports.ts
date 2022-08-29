import { Imports } from "../shared/imports";
import { Writter } from "../writter/writter";

export class GoImports extends Imports {
    public print(writter: Writter): boolean {
        let hasPrinted = false;
        for (const imp of this.get()) {
            writter.write(`import "${imp}"`);
            hasPrinted = true;
        }
        return hasPrinted;
    }
}
