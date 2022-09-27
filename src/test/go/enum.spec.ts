import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { GoGenerator } from "../../templating/go/go-template";

describe("GO: Enum", () => {
    test("int", () => {
        const code = `
            export enum BoxSize {
                Small = 0,
                Medium = 1,
                Large = 2
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("const (");
        expected.write("\tSmall int = 0");
        expected.write("\tMedium = 1");
        expected.write("\tLarge = 2");
        expected.write(")");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("string", () => {
        const code = `
            export enum StringEnum {
                One = "1",
                Two = "2",
                Three = "3"
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("const (");
        expected.write(`\tOne string = "1"`);
        expected.write(`\tTwo = "2"`);
        expected.write(`\tThree = "3"`);
        expected.write(")");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("implicit", () => {
        const code = `
            export enum BoxSize {
                Small,
                Medium,
                Large
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new GoGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("package test");
        expected.write("");
        expected.write("const (");
        expected.write("\tSmall int = iota");
        expected.write("\tMedium");
        expected.write("\tLarge");
        expected.write(")");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
