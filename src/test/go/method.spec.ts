import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { GoGenerator } from "../../templating/go/go-generator";

describe("GO: method", () => {
    test("simple method in class", () => {
        const code = new StringWritter();
        code.write("export class Test {");
        code.write("    public method(): string {");
        code.write("        let asd: string = \"test\";");
        code.write("        return asd;");
        code.write("    }");
        code.write("}");

        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("type Test struct {");
        expected.write("}");
        expected.write("");
        expected.write("func (t *Test) Method() string {");
        expected.write("\tasd := \"test\"");
        expected.write("\t//        let asd: string = \"test\";");
        expected.write("\t//        return asd;");
        expected.write("\treturn \"\"");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("return integer", () => {
        const code = new StringWritter();
        code.write("export class Test {");
        code.write("    public method(): number {");
        code.write("        let test: number = 1;");
        code.write("        return test;");
        code.write("    }");
        code.write("}");

        let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`package test`);
        expected.write("");
        expected.write("type Test struct {");
        expected.write("}");
        expected.write("");
        expected.write("func (t *Test) Method() int {");
        expected.write("\ttest := 1");
        expected.write("\t//        let test: number = 1;");
        expected.write("\t//        return test;");
        expected.write("\treturn 0");
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
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("func Foo() string {");
        expected.write("\t//    return \"\";");
        expected.write("\treturn \"\"");
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
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("func Foo() string {");
        expected.write("\t//    return \"\";");
        expected.write("\treturn \"\"");
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
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("func Foo() {");
        expected.write("\t//    return;");
        expected.write("\treturn");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
