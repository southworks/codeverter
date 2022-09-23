import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { CSharpGenerator } from "../../templating/csharp/csharp-template";
import { File } from "../../shared/file";
import { elementRegistry } from "../../element-registry";

const filename = "test.ts";

describe("CSharp: constant", () => {
    test("Constants different types", () => {
        const code = `
            const constant: string = "test";\n
            const numberConstant: number = 123;`;
        let compilationResult = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(compilationResult, strWritter, new CSharpGenerator());

        const expected = new StringWritter();
        expected.write(`namespace Test`);
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write(`        public const string CONSTANT = "test";`);
        expected.write(`        public const int NUMBERCONSTANT = 123;`);
        expected.write("    }");
        expected.write("}\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
