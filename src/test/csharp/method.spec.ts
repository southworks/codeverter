import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { CSharpGenerator } from "../../templating/csharp/csharp-generator";

describe("CSharp: method", () => {
    test("simple method in class", () => {
        const code = new StringWritter();
        code.write("export class Test {");
        code.write("    public method(): string {");
        code.write("        let test: string = \"test\";");
        code.write("        let testNoType = 123;");
        code.write("        return test;");
        code.write("    }");
        code.write("}");

        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public class Test");
        expected.write("    {");
        expected.write("        public string Method()");
        expected.write("        {");
        expected.write("            string test = \"test\";");
        expected.write("            int testNoType = 123;");
        expected.write("            //         let test: string = \"test\";");
        expected.write("            //         let testNoType = 123;");
        expected.write("            //         return test;");
        expected.write("            return \"\";");
        expected.write("        }");
        expected.write("    }");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("global function", () => {
        const code = new StringWritter();
        code.write("export function foo(): string {");
        code.write("    return \"\";");
        code.write("}");

        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write("        public static string Foo()");
        expected.write("        {");
        expected.write("            //     return \"\";");
        expected.write("            return \"\";");
        expected.write("        }");
        expected.write("    }");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("global function infer", () => {
        const code = new StringWritter();
        code.write("export function foo() {");
        code.write("    return \"\";");
        code.write("}");

        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write("        public static string Foo()");
        expected.write("        {");
        expected.write("            //     return \"\";");
        expected.write("            return \"\";");
        expected.write("        }");
        expected.write("    }");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("global function infer void", () => {
        const code = new StringWritter();
        code.write("export function foo() {");
        code.write("    return;");
        code.write("}");

        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write("        public static void Foo()");
        expected.write("        {");
        expected.write("            //     return;");
        expected.write("            return;");
        expected.write("        }");
        expected.write("    }");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
