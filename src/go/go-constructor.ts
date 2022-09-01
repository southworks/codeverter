import { SourceFile } from "typescript";
import { Constructor } from "../shared/constructor";
import { ArrayWritter } from "../writter/array-writter";
import { Writteable } from "../writter/writter";
import { GoParameter } from "./go-parameter";
import { GoTypeMapper } from "./go-type-mapper";

export class GoConstructor extends Constructor {
    constructor(sourceFile: SourceFile) {
        super(sourceFile, GoParameter, GoTypeMapper);
    }

    public print(writter: Writteable): boolean {
        const arrWritter = new ArrayWritter();
        this.getValues("parameter").map(p => p.print(arrWritter));
        const paramStr = arrWritter.getContent().join(", ");

        writter.write(`func New${this.capitalize(this.getName())}(${paramStr}) *${this.getName()} {`);
        writter.incDeepLevel();
        const firstLetter = this.getName().charAt(0).toLowerCase();
        writter.write(`${firstLetter} := ${this.getName()}{}`);
        for (const line of this.getContent()) {
            writter.write(`//${line}`);
        }
        writter.write(`return &${firstLetter}`);
        writter.decDeepLevel();
        writter.write(`}`);
        return true;
    }
}
