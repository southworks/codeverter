import { createSourceFile, ScriptTarget } from "typescript";
import { GoFile } from "../../go/go-file";
import { printFile } from "../../print-file";
import { StringWritter } from "../../writter/string-writter";

const filename = "test.ts";

describe("GO: constant", () => {
    test("Constants different types", () => {
        const code = `
            const constant: string = "test";\n
            const numberConstant: number = 123;`;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile());

        let expected = "const Constant string = \"test\"";
        expected += "\n";
        expected += "const NumberConstant int = 123";
        expect(strWritter.getString()).toBe(expected);
    });
});
