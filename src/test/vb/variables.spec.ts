import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { VBGenerator } from "../../templating/vb/vb-generator";

describe("vb: variables", () => {
    test("datetime", () => {
        const code = new StringWritter();
        code.write("var variable: Date = new Date();");
        code.write("var variableInf = new Date();");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");    
        expected.write("    Module Helper");
        expected.write("        Dim Variable As Date = new DateTime() 'new Date()");
        expected.write("        Dim VariableInf As Date = new DateTime() 'new Date()");
        expected.write("    End Module");
        expected.write("End Namespace\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("reference", () => {
        const code = new StringWritter();
        code.write("var variable: Foo = new Foo();");
        code.write("var variableInf = new Foo();");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");  
        expected.write("    Module Helper");
        expected.write("        Dim Variable As Foo = New Foo() 'new Foo()");
        expected.write("        Dim VariableInf As Foo = New Foo() 'new Foo()");
        expected.write("    End Module");
        expected.write("End Namespace\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("array", () => {
        const code = new StringWritter();
        code.write("var variable: number[] = [1, 2, 3];");
        code.write("var variableInf = [1, 2, 3];");
        code.write("var variableG: Array<number> = new Array<number>(1, 2, 3);");
        code.write("var variableInfG = new Array<number>(1, 2, 3);");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");       
        expected.write("    Module Helper");
        expected.write("        Dim Variable As Integer() = { 1, 2, 3 }");
        expected.write("        Dim VariableInf As Integer() = { 1, 2, 3 }");
        expected.write("        Dim VariableG As Integer() = { 1, 2, 3 }");
        expected.write("        Dim VariableInfG As Integer() = { 1, 2, 3 }");
        expected.write("    End Module");
        expected.write("End Namespace\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("number", () => {
        const code = new StringWritter();
        code.write("var variable: number = 123;");
        code.write("var variableInf = 123;");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");
        expected.write("    Module Helper");
        expected.write("        Dim Variable As Integer = 123");
        expected.write("        Dim VariableInf As Integer = 123");
        expected.write("    End Module");
        expected.write("End Namespace\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("string", () => {
        const code = new StringWritter();
        code.write(`var variable: string = "test";`);
        code.write(`var variableInf = "test";`);
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");
        expected.write("    Module Helper");
        expected.write(`        Dim Variable As String = "test"`);
        expected.write(`        Dim VariableInf As String = "test"`);
        expected.write("    End Module");
        expected.write("End Namespace\n");


        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("boolean", () => {
        const code = new StringWritter();
        code.write(`var variable: boolean = true;`);
        code.write(`var variableInf = true;`);
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");  
        expected.write("    Module Helper");
        expected.write(`        Dim Variable As Boolean = true`);
        expected.write(`        Dim VariableInf As Boolean = true`);
        expected.write("    End Module");
        expected.write("End Namespace\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("anonymous type", () => {
        const code = `var variable = {a: 'a'};`;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");
        expected.write("    Module Helper");
        expected.write(`        Dim Variable As Object = New Object() '{a: 'a'}`);
        expected.write("    End Module");
        expected.write("End Namespace\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
