import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { GoGenerator } from "../../templating/go/go-template";

describe("GO: variables", () => {
    test("Variables different types", () => {
        const code = `
            let constant: string = "test";\n
            let numberConstant: number = 123;`;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`package test`);
        expected.write("");
        expected.write(`var Constant string = "test"`);
        expected.write("var NumberConstant int = 123");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("Variable inferred type", () => {
        let code = `let constant = "test";\n`;
        code = code + "let constant2 = 1;";
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`package test`);
        expected.write("");
        expected.write(`var Constant := "test"`);
        expected.write(`var Constant2 := 1`);
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
