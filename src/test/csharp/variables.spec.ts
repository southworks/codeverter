import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { CSharpGenerator } from "../../templating/csharp/csharp-generator";

describe("CSharp: variables", () => {
    test("datetime", () => {
        const code = new StringWritter();
        code.write("var variable: Date = new Date();");
        code.write("var variableInf = new Date();");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write("        public static DateTime Variable = new DateTime(); //new Date()");
        expected.write("        public static DateTime VariableInf = new DateTime(); //new Date()");
        expected.write("    }");
        expected.write("}\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("reference", () => {
        const code = new StringWritter();
        code.write("var variable: Foo = new Foo();");
        code.write("var variableInf = new Foo();");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write("        public static Foo Variable = null; //new Foo()");
        expected.write("        public static Foo VariableInf = null; //new Foo()");
        expected.write("    }");
        expected.write("}\n");

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
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write("        public static int[] Variable = new int[] { 1, 2, 3 };");
        expected.write("        public static int[] VariableInf = new int[] { 1, 2, 3 };");
        expected.write("        public static int[] VariableG = new int[] { 1, 2, 3 };");
        expected.write("        public static int[] VariableInfG = new int[] { 1, 2, 3 };");
        expected.write("    }");
        expected.write("}\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("number", () => {
        const code = new StringWritter();
        code.write("var variable: number = 123;");
        code.write("var variableInf = 123;");
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write("        public static int Variable = 123;");
        expected.write("        public static int VariableInf = 123;");
        expected.write("    }");
        expected.write("}\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("string", () => {
        const code = new StringWritter();
        code.write(`var variable: string = "test";`);
        code.write(`var variableInf = "test";`);
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write(`        public static string Variable = "test";`);
        expected.write(`        public static string VariableInf = "test";`);
        expected.write("    }");
        expected.write("}\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("boolean", () => {
        const code = new StringWritter();
        code.write(`var variable: boolean = true;`);
        code.write(`var variableInf = true;`);
        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write(`        public static bool Variable = true;`);
        expected.write(`        public static bool VariableInf = true;`);
        expected.write("    }");
        expected.write("}\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("anonymous type", () => {
        const code = `var variable = {a: 'a'};`;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write(`        public static object Variable = null; //{a: 'a'}`);
        expected.write("    }");
        expected.write("}\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
