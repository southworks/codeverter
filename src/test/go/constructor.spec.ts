import { createSourceFile, ScriptTarget } from "typescript";
import { GoFile } from "../../go/go-file";
import { printFile } from "../../print-file";
import { StringWritter } from "../../writter/string-writter";

const filename = "test.ts";

describe("GO: constructor", () => {
    test("paramless", () => {
        const code = `
            export class Test {
                public bar: Date;
            
                constructor() { this.bar = new Date(); }
            }`;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile());

        let expected = "import \"time\"\n";
        expected += "\ntype Test struct {";
        expected += "\n  Bar time.Time";
        expected += "\n}";
        expected += "\n";
        expected += "\nfunc NewTest() *Test {";
        expected += "\n  t := new(Test)";
        expected += "\n  // this.bar = new Date(); ";
        expected += "\n  return t";
        expected += "\n}";
        expect(strWritter.getString()).toBe(expected);
    });

    test("parameters", () => {
        const code = `
            export class Test {
                public bar: Date;
            
                constructor(val: number, val2: string) { this.bar = new Date(); }
            }`;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile());

        let expected = "import \"time\"\n";
        expected += "\ntype Test struct {";
        expected += "\n  Bar time.Time";
        expected += "\n}";
        expected += "\n";
        expected += "\nfunc NewTest(val int, val2 string) *Test {";
        expected += "\n  t := new(Test)";
        expected += "\n  // this.bar = new Date(); ";
        expected += "\n  return t";
        expected += "\n}";
        expect(strWritter.getString()).toBe(expected);
    });
});
