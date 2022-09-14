import { CSharpFile } from "../../csharp/csharp-file";
import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";

const filename = "test.ts";

describe("CSharp: property access level", () => {
    test("no access modifier", () => {
        const code = `
            export class Test {
                foo: number;
            }
        `;
        let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new CSharpFile({ sourceFile, typeChecker }));

        const expected = new StringWritter(" ", 4);
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        public int Foo { get; set; }");
        expected.write("    }");
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
        let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new CSharpFile({ sourceFile, typeChecker }));

        const expected = new StringWritter(" ", 4);
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        public int Foo { get; set; }");
        expected.write("    }");
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
        let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new CSharpFile({ sourceFile, typeChecker }));

        const expected = new StringWritter(" ", 4);
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        protected int Foo { get; set; }");
        expected.write("    }");
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
        let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new CSharpFile({ sourceFile, typeChecker }));

        const expected = new StringWritter(" ", 4);
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        private int Foo { get; set; }");
        expected.write("    }");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
