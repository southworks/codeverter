import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { GoGenerator } from "../../templating/go/go-generator";

describe("GO: constant", () => {
    test("Constants different types", () => {
        const code = `
            const constant: string = "test";\n
            const numberConstant: number = 123;`;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write(`const Constant string = "test"`);
        expected.write("const NumberConstant int = 123");
        expected.write("");

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
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write(`const Constant = 0 //{a: 'a'}`);
        expected.write(`const ConstantStr string = "asdasdad"`);
        expected.write("const ConstantBool bool = false");
        expected.write("var ConstantArr []int = []int{1, 2}");
        expected.write("var ConstantArr2 []int = []int{1, 2}");
        expected.write("const ConstantNum int = 123");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
