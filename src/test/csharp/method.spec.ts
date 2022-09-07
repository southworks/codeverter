import { createSourceFile, ScriptTarget } from "typescript";
import { CSharpFile } from "../../csharp/csharp-file";
import { printFile } from "../../print-file";
import { StringWritter } from "../../writter/string-writter";

const filename = "test.ts";

describe("GO: method", () => {
    test("simple method in class", () => {
        const code = new StringWritter("\t", 1);
        code.write("export class Test {");
        code.write("    public method(): string {");
        code.write("        let asd: string = \"holi\";");
        code.write("        return asd;");
        code.write("    }");
        code.write("}");

        const sourceFile = createSourceFile(
            filename, code.getString(), ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new CSharpFile());

        const expected = new StringWritter(" ", 4);
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        public string Method()");
        expected.write("        {");
        expected.write("            string Asd = \"holi\";");
        expected.write("            //        let asd: string = \"holi\";");
        expected.write("            //        return asd;");
        expected.write("            return \"\";");
        expected.write("        }");
        expected.write("    }");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
