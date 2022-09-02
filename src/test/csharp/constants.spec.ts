import { createSourceFile, ScriptTarget } from "typescript";
import { CSharpFile } from "../../csharp/csharp-file";
import { printFile } from "../../print-file";
import { StringWritter } from "../../writter/string-writter";

const filename = "test.ts";

describe("CSharp: constant", () => {
    test("Constants different types", () => {
        const code = `
            const constant: string = "test";\n
            const numberConstant: number = 123;`;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new CSharpFile());

        const expected = new StringWritter(" ", 4);
        expected.write(`namespace Test`);
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write(`        public const string CONSTANT = "test";`);
        expected.writeNewLine();
        expected.write(`        public const int NUMBERCONSTANT = 123;`);
        expected.write("    }");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
