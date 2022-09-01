import { createSourceFile, ScriptTarget } from "typescript";
import { printFile } from "../../print-file";
import { GoFile } from "../../go/go-file";
import { StringWritter } from "../../writter/string-writter";

const filename = "test.ts";

describe("GO: property access level", () => {
    test("no access modifier", () => {
        const code = `
            export class Test {
                foo: number;
            }
        `;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile());

        const expected = new StringWritter("\t", 1);
        expected.write(`package test`);
        expected.writeNewLine();
        expected.write("type Test struct {");
        expected.write("\tFoo int");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("public access modifier", () => {
        const code = `
            export class Test {
                public foo: number;
            }
        `;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile());

        const expected = new StringWritter("\t", 1);
        expected.write(`package test`);
        expected.writeNewLine();
        expected.write("type Test struct {");
        expected.write("\tFoo int");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("protected access modifier", () => {
        const code = `
            export class Test {
                protected foo: number;
            }
        `;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile());

        const expected = new StringWritter("\t", 1);
        expected.write(`package test`);
        expected.writeNewLine();
        expected.write("type Test struct {");
        expected.write("\tfoo int");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("private access modifier", () => {
        const code = `
            export class Test {
                private foo: number;
            }
        `;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile());

        const expected = new StringWritter("\t", 1);
        expected.write(`package test`);
        expected.writeNewLine();
        expected.write("type Test struct {");
        expected.write("\tfoo int");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
