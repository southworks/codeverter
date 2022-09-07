import { createSourceFile, isExpressionStatement, ScriptTarget } from "typescript";
import { GoFile } from "../../go/go-file";
import { printFile } from "../../print-file";
import { StringWritter } from "../../writter/string-writter";

const filename = "test.ts";

describe("GO: Enum", () => {
    test("Simple enum", () => {
        const code = `
            export enum BoxSize {
                Small = 0,
                Medium = 1,
                Large = 2
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
        expected.write("const (");
        expected.write("\tSmall int = 0");
        expected.write("\tMedium = 1");
        expected.write("\tLarge = 2");
        expected.write(")");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("String enum", () => {
        const code = `
            export enum StringEnum {
                One = "1",
                Two = "2",
                Three = "3"
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
        expected.write("const (");
        expected.write(`\tOne string = "1"`);
        expected.write(`\tTwo = "2"`);
        expected.write(`\tThree = "3"`);
        expected.write(")");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
