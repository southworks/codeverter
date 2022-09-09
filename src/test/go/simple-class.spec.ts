import { GoFile } from "../../go/go-file";
import { printFile } from "../../print-file";
import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode } from "../compiler-helper";

const filename = "test.ts";

describe("GO: class", () => {
    test("simple class", () => {
        const code = `
            export class Test {
                foo: number;
            }
        `;
        var { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile({ sourceFile, typeChecker }));

        const expected = new StringWritter("\t", 1);
        expected.write(`package test`);
        expected.writeNewLine();
        expected.write("type Test struct {");
        expected.write("\tFoo int");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("simple class with class reference", () => {
        const code = `
            export class Test {
                foo: number;
            }
        
            export class Test2 {
                foo2: Test;
            }
        `;
        var { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile({ sourceFile, typeChecker }));

        const expected = new StringWritter("\t", 1);
        expected.write(`package test`);
        expected.writeNewLine();
        expected.write("type Test struct {");
        expected.write("\tFoo int");
        expected.write("}");
        expected.writeNewLine();
        expected.write("type Test2 struct {");
        expected.write("\tFoo2 Test");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
