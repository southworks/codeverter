import { createSourceFile, ScriptTarget } from "typescript";
import { GoFile } from "../../go/go-file";
import { printFile } from "../../print-file";
import { StringWritter } from "../../writter/string-writter";

const filename = "test.ts";

describe("GO: variables", () => {
    test("Variables different types", () => {
        const code = `
            let constant: string = "test";\n
            let numberConstant: number = 123;`;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile());

        let expected = "var Constant string = \"test\"";
        expected += "\n";
        expected += "var NumberConstant int = 123";
        expect(strWritter.getString()).toBe(expected);
    });
});
