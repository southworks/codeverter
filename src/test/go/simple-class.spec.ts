import { createSourceFile, ScriptTarget } from "typescript";
import { GoFile } from "../../go/go-file";
import { printFile } from "../../print-file";
import { StringWritter } from "../../writter/string-writter";

const filename = "test.ts";

describe("GO: class", () => {
    test("simple class", () => {
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
        expect(strWritter.getString()).toBe("type Test struct {\n  Foo: int\n}");
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
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new GoFile());
        expect(strWritter.getString()).toBe("type Test struct {\n  Foo: int\n}\ntype Test2 struct {\n  Foo2: Test\n}");
    });
});
