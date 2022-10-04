import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { GoGenerator } from "../../templating/go/go-generator";

describe("GO: constant", () => {
    test("datetime", () => {
        const code = new StringWritter();
        code.write("const constant: Date = new Date();");
        code.write("const constantInf = new Date();");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write(`import "time"`);
        expected.write("");
        expected.write("var Constant time.Time = time.Now() // new Date()");
        expected.write("var ConstantInf time.Time = time.Now() // new Date()");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("reference", () => {
        const code = new StringWritter();
        code.write("const constant: Foo = new Foo();");
        code.write("const constantInf = new Foo();");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("var Constant *Foo = new(Foo) // new Foo()");
        expected.write("var ConstantInf *Foo = new(Foo) // new Foo()");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("array", () => {
        const code = new StringWritter();
        code.write("const constant: number[] = [1, 2, 3];");
        code.write("const constantInf = [1, 2, 3];");
        code.write("const constantG: Array<number> = new Array<number>(1, 2, 3);");
        code.write("const constantInfG = new Array<number>(1, 2, 3);");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("var Constant []int = []int{1, 2, 3}");
        expected.write("var ConstantInf []int = []int{1, 2, 3}");
        expected.write("var ConstantG []int = []int{1, 2, 3}");
        expected.write("var ConstantInfG []int = []int{1, 2, 3}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("number", () => {
        const code = new StringWritter();
        code.write("const constant: number = 123;");
        code.write("const constantInf = 123;");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("const Constant int = 123");
        expected.write("const ConstantInf int = 123");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("string", () => {
        const code = new StringWritter();
        code.write(`const constant: string = "test";`);
        code.write(`const constantInf = "test";`);
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write(`const Constant string = "test"`);
        expected.write(`const ConstantInf string = "test"`);
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("boolean", () => {
        const code = new StringWritter();
        code.write("const constant: boolean = true;");
        code.write("const constantInf = true;");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("const Constant bool = true");
        expected.write("const ConstantInf bool = true");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("anonymous type", () => {
        const code = `const constant = {a: 'a'};`;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("const Constant interface{} // {a: 'a'}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
