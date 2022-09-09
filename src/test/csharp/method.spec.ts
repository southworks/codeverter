import { CSharpFile } from "../../csharp/csharp-file";
import { printFile } from "../../print-file";
import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode } from "../compiler-helper";

const filename = "test.ts";

describe("CSharp: method", () => {
    test("simple method in class", () => {
        const code = new StringWritter("\t", 1);
        code.write("export class Test {");
        code.write("    public method(): string {");
        code.write("        let asd: string = \"holi\";");
        code.write("        let testNoType = 123;");
        code.write("        return asd;");
        code.write("    }");
        code.write("}");

        var { sourceFile, typeChecker } = compileTypeScriptCode(code.getString(), filename);

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new CSharpFile({ sourceFile, typeChecker }));

        const expected = new StringWritter(" ", 4);
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        public string Method()");
        expected.write("        {");
        expected.write("            string asd = \"holi\";");
        expected.write("            var testNoType = 123;");
        expected.write("            //        let asd: string = \"holi\";");
        expected.write("            //        let testNoType = 123;");
        expected.write("            //        return asd;");
        expected.write("            return \"\";");
        expected.write("        }");
        expected.write("    }");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
