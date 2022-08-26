import { createSourceFile, ScriptTarget } from "typescript";
import { print } from "../index";
import { StringWritter } from "../writter/string-writter";

const filename = "test.ts";

describe("class", () => {
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

        print(sourceFile, strWritter);
        expect(strWritter.getString()).toBe("type Test struct {\n  Foo: int\n}");
    });

    test("simple class date property", () => {
        const code = `
            export class Test {
                foo: Date;
            }
        `;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();

        print(sourceFile, strWritter);
        expect(strWritter.getString()).toBe("type Test struct {\n  Foo: time.Time\n}");
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

        print(sourceFile, strWritter);

        expect(strWritter.getString()).toBe("type Test struct {\n  Foo: int\n}\ntype Test2 struct {\n  Foo2: Test\n}");
    });
});
