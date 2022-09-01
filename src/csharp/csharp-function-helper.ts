import { AccessLevel } from "../shared/access-level";
import { Printable } from "../shared/types/printable";
import { ArrayWritter } from "../writter/array-writter";
import { Writteable } from "../writter/writter";

export class CSharpFunctionHelper {
    public static Write(writter: Writteable, name: string, content: string[],
        returnType: string, accessLevel: AccessLevel, isStatic: boolean, parameters: Printable[]): void {

        const visibility = AccessLevel[accessLevel].toLowerCase();

        const arrWritter = new ArrayWritter();
        parameters.map(p => p.print(arrWritter));
        const paramStr = arrWritter.getContent().join(", ");

        writter.write(`${visibility}${isStatic ? " static " : " "}${returnType} ${name}(${paramStr})`);
        writter.write("{");
        writter.incDeepLevel();
        for (const line of content) {
            writter.write(`//${line}`);
        }
        writter.write(`return${returnType != "void" ? ` default(${returnType});` : ";"}`);
        writter.decDeepLevel();
        writter.write(`}`);
    }
}