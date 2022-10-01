import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { CSharpGenerator } from "../../templating/csharp/csharp-generator";

describe("CSharp: constant", () => {
    test("Constants different types", () => {
        const code = `
            const constant: string = "test";\n
            const numberConstant: number = 123;`;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write(`        public const string CONSTANT = "test";`);
        expected.write(`        public const int NUMBERCONSTANT = 123;`);
        expected.write("    }");
        expected.write("}\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("Constants infer types", () => {
        const code = `
            const constant = {a: 'a'};\n
            const constantStr = 'asdasdad';\n
            const constantBool = false;\n
            const constantArr: number[] = [1, 2];\n
            const constantArr2 = new Array<number>(1, 2);\n
            const ConstantNum = 123;`;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write(`        public const var CONSTANT = null; //{a: 'a'}`);
        expected.write(`        public const string CONSTANTSTR = "asdasdad";`);
        expected.write(`        public const bool CONSTANTBOOL = false;`);
        expected.write(`        public const int[] CONSTANTARR = new int[] { 1, 2 };`);
        expected.write(`        public const int[] CONSTANTARR2 = new int[] { 1, 2 };`);
        expected.write(`        public const int CONSTANTNUM = 123;`);
        expected.write("    }");
        expected.write("}\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
