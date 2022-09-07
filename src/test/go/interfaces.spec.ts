import { createSourceFile, ScriptTarget } from "typescript";
import { GoFile } from "../../go/go-file";
import { printFile } from "../../print-file";
import { StringWritter } from "../../writter/string-writter";

const filename = "test.ts";

describe("GO: interface", () => {
    test("Simple interface", () => {
        const code = `
            export interface MyInterface {
                firstMethod(a: number): void;
                secondMethod(): string;
            }
        `;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile());

        const expected = new StringWritter("\t", 1);
        expected.write("package test");
        expected.writeNewLine();
        expected.write("type MyInterface interface {");
        expected.write("\tFirstMethod() ");
        expected.write("\tSecondMethod()  string");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("Other interface", () => {
        const code = `
            export interface MyInterface {
                firstField: number;
                firstMethod(x: number): string;
            }
        `;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile());

        const expected = new StringWritter("\t", 1);
        expected.write("package test");
        expected.writeNewLine();
        expected.write("type MyInterface interface {");
        expected.write("\tFirstMethod()  string");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
