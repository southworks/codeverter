import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { GoGenerator } from "../../templating/go/go-generator";

describe("GO: interface", () => {
    test("Simple interface", () => {
        const code = `
            export interface MyInterface {
                firstMethod(a: number): void;
                secondMethod(): string;
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("type MyInterface interface {");
        expected.write("\tFirstMethod(a int)");
        expected.write("\tSecondMethod() string");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("Other interface", () => {
        const code = `
            export interface MyInterface {
                firstField: number;
                firstMethod(x: number): string;
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("type MyInterface interface {");
        expected.write("\tFirstMethod(x int) string");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
