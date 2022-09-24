import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { GoGenerator } from "../../templating/go/go-template";

describe("GO: method", () => {
    test("simple method in class", () => {
        const code = new StringWritter();
        code.write("export class Test {");
        code.write("    public method(): string {");
        code.write("        let asd: string = \"holi\";");
        code.write("        return asd;");
        code.write("    }");
        code.write("}");

        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");
        debugger
        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`package test`);
        expected.write("");
        expected.write("type Test struct {");
        expected.write("}");
        expected.write("");
        expected.write("func (t *Test) Method() string {");
        expected.write("\tvar asd string = \"holi\"");
        expected.write("\t//        let asd: string = \"holi\";");
        expected.write("\t//        return asd;");
        expected.write("\treturn \"\"");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
