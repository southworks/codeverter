import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { CSharpGenerator } from "../../templating/csharp/csharp-template";

const filename = "test.ts";

describe("CSharp: variables", () => {
    test("Variables different types", () => {
        const code = `
            let constant: string = "test";\n
            let numberConstant: number = 123;`;
        let compilationResult = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(compilationResult, strWritter, new CSharpGenerator());

        const expected = new StringWritter();
        expected.write(`namespace Test`);
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write(`        public static string Constant = "test";`);
        expected.write(`        public static int NumberConstant = 123;`);
        expected.write("    }");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
