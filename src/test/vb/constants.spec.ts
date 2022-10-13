import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { VBGenerator } from "../../templating/vb/vb-generator";

describe("Vb: constant", () => {
    test("datetime", () => {
        const code = new StringWritter();
        code.write("const constant: Date = new Date();");
        code.write("const constantInf = new Date();");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");    
        expected.write("    Module Helper");
        expected.write("        ReadOnly CONSTANT As Date = new DateTime() 'new Date()");
        expected.write("        ReadOnly CONSTANTINF As Date = new DateTime() 'new Date()");
        expected.write("    End Module");
        expected.write("End Namespace\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("reference", () => {
        const code = new StringWritter();
        code.write("const constant: Foo = new Foo();");
        code.write("const CONSTANTINF = new Foo();");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");  
        expected.write("    Module Helper");
        expected.write("        ReadOnly CONSTANT As Foo = New Foo() 'new Foo()");
        expected.write("        ReadOnly CONSTANTINF As Foo = New Foo() 'new Foo()");
        expected.write("    End Module");
        expected.write("End Namespace\n");

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
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");       
        expected.write("    Module Helper");
        expected.write("        ReadOnly CONSTANT As Integer() = { 1, 2, 3 }");
        expected.write("        ReadOnly CONSTANTINF As Integer() = { 1, 2, 3 }");
        expected.write("        ReadOnly CONSTANTG As Integer() = { 1, 2, 3 }");
        expected.write("        ReadOnly CONSTANTINFG As Integer() = { 1, 2, 3 }");
        expected.write("    End Module");
        expected.write("End Namespace\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("number", () => {
        const code = new StringWritter();
        code.write("const constant: number = 123;");
        code.write("const CONSTANTINF = 123;");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");
        expected.write("    Module Helper");
        expected.write("        Const CONSTANT As Integer = 123");
        expected.write("        Const CONSTANTINF As Integer = 123");
        expected.write("    End Module");
        expected.write("End Namespace\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("string", () => {
        const code = new StringWritter();
        code.write(`const constant: string = "test";`);
        code.write(`const CONSTANTINF = "test";`);
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");
        expected.write("    Module Helper");
        expected.write(`        Const CONSTANT As String = "test"`);
        expected.write(`        Const CONSTANTINF As String = "test"`);
        expected.write("    End Module");
        expected.write("End Namespace\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("boolean", () => {
        const code = new StringWritter();
        code.write(`const constant: boolean = true;`);
        code.write(`const CONSTANTINF = true;`);
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");  
        expected.write("    Module Helper");
        expected.write(`        Const CONSTANT As Boolean = true`);
        expected.write(`        Const CONSTANTINF As Boolean = true`);
        expected.write("    End Module");
        expected.write("End Namespace\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("anonymous type", () => {
        const code = `const constant = {a: 'a'};`;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");
        expected.write("    Module Helper");
        expected.write(`        ReadOnly CONSTANT As Object = New Object() '{a: 'a'}`);
        expected.write("    End Module");
        expected.write("End Namespace\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
