import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { GoGenerator } from "../../templating/go/go-generator";

describe("GO: constructor", () => {
    test("paramless", () => {
        const code = `
            export class Test {
                public bar: Date;
            
                constructor() { this.bar = new Date(); }
            }`;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`package test`);
        expected.write("");
        expected.write(`import "time"`);
        expected.write("");
        expected.write("type Test struct {");
        expected.write("\tBar time.Time");
        expected.write("}");
        expected.write("");
        expected.write("func NewTest() *Test {");
        expected.write("\tt := Test{}");
        expected.write("\t// this.bar = new Date(); ");
        expected.write("\treturn &t");
        expected.write("}");
        expected.write("");
        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("parameters", () => {
        const code = `
            export class Test {
                public bar: Date;
            
                constructor(val: number, val2: string) { this.bar = new Date(); }
            }`;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`package test`);
        expected.write("");
        expected.write(`import "time"`);
        expected.write("");
        expected.write("type Test struct {");
        expected.write("\tBar time.Time");
        expected.write("}");
        expected.write("");
        expected.write("func NewTest(val int, val2 string) *Test {");
        expected.write("\tt := Test{}");
        expected.write("\t// this.bar = new Date(); ");
        expected.write("\treturn &t");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("property declaration", () => {
        const code = `
            export class Test {
                constructor(public val: number, val2: string) {
                }
            }`;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`package test`);
        expected.write("");
        expected.write("type Test struct {");
        expected.write("\tVal int");
        expected.write("}");
        expected.write("");
        expected.write("func NewTest(val2 string) *Test {");
        expected.write("\tt := Test{}");
        expected.write("\treturn &t");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
