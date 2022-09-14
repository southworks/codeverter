import { CSharpFile } from "../../csharp/csharp-file";
import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";

const filename = "test.ts";

describe("CSharp: variables", () => {
    test("Variables different types", () => {
        const code = `
            let constant: string = "test";\n
            let numberConstant: number = 123;`;
        let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new CSharpFile({ sourceFile, typeChecker }));

        const expected = new StringWritter(" ", 4);
        expected.write(`namespace Test`);
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write(`        public static string Constant = "test";`);
        expected.writeNewLine();
        expected.write(`        public static int NumberConstant = 123;`);
        expected.write("    }");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
