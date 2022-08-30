import { SourceFile } from "typescript";
import { Constructor } from "../shared/constructor";
import { Writteable } from "../writter/writter";
import { GoParameter } from "./go-parameter";
import { GoTypeMapper } from "./go-type-mapper";

export class GoConstructor extends Constructor {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, GoParameter, GoTypeMapper);
    }

    public print(writter: Writteable): boolean {
        const params: string[] = [];
        const write = (v: string) => {
            params.push(v);
        }

        this.getValues("parameter").map(p => p.print({
            write: write
        } as Writteable));

        const paramStr = params.join(", ");

        writter.write(`func New${this.capitalize(this.getName())}(${paramStr}) *${this.getName()} {`);
        writter.incDeepLevel();
        const firstLetter = this.getName().charAt(0).toLowerCase();
        writter.write(`${firstLetter} := new(${this.getName()})`);
        for (const line of this.getContent()) {
            writter.write(`//${line}`);
        }
        writter.write(`return ${firstLetter}`);
        writter.decDeepLevel();
        writter.write(`}`);
        return true;
    }
}
