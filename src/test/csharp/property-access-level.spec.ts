import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { CSharpGenerator } from "../../templating/csharp/csharp-template";

const filename = "test.ts";

describe("CSharp: property access level", () => {
    test("no access modifier", () => {
        const code = `
            export class Test {
                foo: number;
            }
        `;
        let compilationResult = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(compilationResult, strWritter, new CSharpGenerator());

        const expected = new StringWritter();
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        public int Foo { get; set; }");
        expected.write("    }");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("public access modifier", () => {
        const code = `
            export class Test {
                public foo: number;
            }
        `;
        let compilationResult = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(compilationResult, strWritter, new CSharpGenerator());

        const expected = new StringWritter();
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        public int Foo { get; set; }");
        expected.write("    }");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("protected access modifier", () => {
        const code = `
            export class Test {
                protected foo: number;
            }
        `;
        let compilationResult = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(compilationResult, strWritter, new CSharpGenerator());

        const expected = new StringWritter();
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        protected int Foo { get; set; }");
        expected.write("    }");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("private access modifier", () => {
        const code = `
            export class Test {
                private foo: number;
            }
        `;
        let compilationResult = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(compilationResult, strWritter, new CSharpGenerator());

        const expected = new StringWritter();
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        private int Foo { get; set; }");
        expected.write("    }");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
