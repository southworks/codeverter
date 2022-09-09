import { GoFile } from "../../go/go-file";
import { printFile } from "../../print-file";
import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode } from "../compiler-helper";

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

        var { sourceFile, typeChecker } = compileTypeScriptCode(code.getString(), filename);

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile({ sourceFile, typeChecker }));

        const expected = new StringWritter("\t", 1);
        expected.write(`package test`);
        expected.writeNewLine();
        expected.write("type Test struct {");
        expected.write("}");
        expected.writeNewLine();
        expected.write("func (m *Test) Method() string {");
        expected.write("\tvar asd string = \"holi\"");
        expected.write("\t//        let asd: string = \"holi\";");
        expected.write("\t//        return asd;");
        expected.write("\treturn \"\"");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
