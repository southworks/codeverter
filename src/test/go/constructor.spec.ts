import { GoFile } from "../../go/go-file";
import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";

const filename = "test.ts";

describe("GO: constructor", () => {
    test("paramless", () => {
        const code = `
            export class Test {
                public bar: Date;
            
                constructor() { this.bar = new Date(); }
            }`;
        let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile({ sourceFile, typeChecker }));

        const expected = new StringWritter("\t", 1);
        expected.write(`package test`);
        expected.writeNewLine();
        expected.write(`import "time"`);
        expected.writeNewLine();
        expected.write("type Test struct {");
        expected.write("\tBar time.Time");
        expected.write("}");
        expected.writeNewLine();
        expected.write("func NewTest() *Test {");
        expected.write("\tt := Test{}");
        expected.write("\t// this.bar = new Date(); ");
        expected.write("\treturn &t");
        expected.write("}");
        expected.writeNewLine();
        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("parameters", () => {
        const code = `
            export class Test {
                public bar: Date;
            
                constructor(val: number, val2: string) { this.bar = new Date(); }
            }`;
        let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile({ sourceFile, typeChecker }));

        const expected = new StringWritter("\t", 1);
        expected.write(`package test`);
        expected.writeNewLine();
        expected.write(`import "time"`);
        expected.writeNewLine();
        expected.write("type Test struct {");
        expected.write("\tBar time.Time");
        expected.write("}");
        expected.writeNewLine();
        expected.write("func NewTest(val int, val2 string) *Test {");
        expected.write("\tt := Test{}");
        expected.write("\t// this.bar = new Date(); ");
        expected.write("\treturn &t");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
