import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { GoGenerator } from "../../templating/go/go-generator";

describe("GO: variables", () => {
    test("datetime", () => {
        const code = new StringWritter();
        code.write("var constant: Date = new Date();");
        code.write("var constantInf = new Date();");
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
        code.write("var constant: Foo = new Foo();");
        code.write("var constantInf = new Foo();");
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
        code.write("var constant: number[] = [1, 2, 3];");
        code.write("var constantInf = [1, 2, 3];");
        code.write("var constantG: Array<number> = new Array<number>(1, 2, 3);");
        code.write("var constantInfG = new Array<number>(1, 2, 3);");
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
        code.write("var constant: number = 123;");
        code.write("var constantInf = 123;");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("var Constant int = 123");
        expected.write("var ConstantInf int = 123");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("string", () => {
        const code = new StringWritter();
        code.write(`var constant: string = "test";`);
        code.write(`var constantInf = "test";`);
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write(`var Constant string = "test"`);
        expected.write(`var ConstantInf string = "test"`);
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("boolean", () => {
        const code = new StringWritter();
        code.write(`var constant: boolean = true;`);
        code.write(`var constantInf = true;`);
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("var Constant bool = true");
        expected.write("var ConstantInf bool = true");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("anonymous type", () => {
        const code = `var constant = {a: 'a'};`;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("var Constant interface{} // {a: 'a'}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
