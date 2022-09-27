import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { GoGenerator } from "../../templating/go/go-generator";

describe("GO: imports", () => {
    test("simple date property", () => {
        const code = `
            export class Test {
                foo: Date;
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`package test`);
        expected.write("");
        expected.write(`import "time"`);
        expected.write("");
        expected.write("type Test struct {");
        expected.write("\tFoo time.Time");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("multiple date property", () => {
        const code = `
            export class Test {
                foo: Date;
                bar: Date;
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`package test`);
        expected.write("");
        expected.write(`import "time"`);
        expected.write("");
        expected.write("type Test struct {");
        expected.write("\tFoo time.Time");
        expected.write("\tBar time.Time");
        expected.write("}");
        expected.write("");
        expect(strWritter.getString()).toBe(expected.getString());
    });
});
