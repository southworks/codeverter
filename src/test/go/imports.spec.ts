import { createSourceFile, ScriptTarget } from "typescript";
import { GoFile } from "../../go/go-file";
import { printFile } from "../../print-file";
import { StringWritter } from "../../writter/string-writter";

const filename = "test.ts";

describe("GO: imports", () => {
    test("simple date property", () => {
        const code = `
            export class Test {
                foo: Date;
            }
        `;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile());
        expect(strWritter.getString()).toBe(`import "time"\n\ntype Test struct {\n  Foo: time.Time\n}`);
    });

    test("multiple date property", () => {
        const code = `
            export class Test {
                foo: Date;
                bar: Date;
            }
        `;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile());
        expect(strWritter.getString()).toBe(`import "time"\n\ntype Test struct {\n  Foo: time.Time\n  Bar: time.Time\n}`);
    });
});
