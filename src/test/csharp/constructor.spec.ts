import { createSourceFile, ScriptTarget } from "typescript";
import { CSharpFile } from "../../csharp/csharp-file";
import { printFile } from "../../print-file";
import { StringWritter } from "../../writter/string-writter";

const filename = "test.ts";

describe("CSharp: constructor", () => {
    test("paramless", () => {
        const code = `
            export class Test {
                public bar: Date;
            
                constructor() { this.bar = new Date(); }
            }`;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new CSharpFile());

        const expected = new StringWritter(" ", 4);
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        public DateTime Bar { get; set; }");
        expected.writeNewLine();
        expected.write("        public Test()");
        expected.write(`        {`);
        expected.write(`            // this.bar = new Date(); `);
        expected.write("        }");
        expected.write("    }");
        expected.write("}");
        expected.writeNewLine();
        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("parameters", () => {
        const code = `
            export class Test {
                public bar: Date;
            
                constructor(val: number, val2: string) { this.bar = new Date(); }
            }`;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new CSharpFile());

        const expected = new StringWritter(" ", 4);
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        public DateTime Bar { get; set; }");
        expected.writeNewLine();
        expected.write("        public Test(int val, string val2)");
        expected.write(`        {`);
        expected.write(`            // this.bar = new Date(); `);
        expected.write("        }");
        expected.write("    }");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
