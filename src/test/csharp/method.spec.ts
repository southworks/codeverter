import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { CSharpGenerator } from "../../templating/csharp/csharp-generator";

describe("CSharp: method", () => {
    test("simple method in class", () => {
        const code = new StringWritter();
        code.write("export class Test {");
        code.write("    public method(): string {");
        code.write("        let asd: string = \"holi\";");
        code.write("        let testNoType = 123;");
        code.write("        return asd;");
        code.write("    }");
        code.write("}");

        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        public string Method()");
        expected.write("        {");
        expected.write("            string asd = \"holi\";");
        expected.write("            int testNoType = 123;");
        expected.write("            //         let asd: string = \"holi\";");
        expected.write("            //         let testNoType = 123;");
        expected.write("            //         return asd;");
        expected.write("            return \"\";");
        expected.write("        }");
        expected.write("    }");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("global function", () => {
        const code = new StringWritter();
        code.write("export function foo: string {");
        code.write("    return \"\";");
        code.write("}");

        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public static class Helper");
        expected.write(`    {`);
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
});
