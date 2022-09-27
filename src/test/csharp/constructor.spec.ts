import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { CSharpGenerator } from "../../templating/csharp/csharp-generator";

describe("CSharp: constructor", () => {
    test("paramless", () => {
        const code = `
            export class Test {
                public bar: Date;
            
                constructor() { this.bar = new Date(); }
            }`;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        public DateTime Bar { get; set; }");
        expected.write("");
        expected.write("        public Test()");
        expected.write(`        {`);
        expected.write(`            //  this.bar = new Date(); `);
        expected.write("        }");
        expected.write("    }");
        expected.write("}\n");
        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("parameters", () => {
        const code = `
            export class Test {
                public bar: Date;
            
                constructor(val: number, val2: string) { this.bar = new Date(); }
            }`;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        public DateTime Bar { get; set; }");
        expected.write("");
        expected.write("        public Test(int val, string val2)");
        expected.write(`        {`);
        expected.write(`            //  this.bar = new Date(); `);
        expected.write("        }");
        expected.write("    }");
        expected.write("}\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("property declaration", () => {
        const code = `
            export class Test {
                constructor(public val: number, val2: string) {
                }
            }`;
        let compilationResult = compileTypeScriptCode(code, "test.s");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`namespace Test`);
        expected.write(`{`);
        expected.write("    public class Test");
        expected.write(`    {`);
        expected.write("        public int Val { get; set; }");
        expected.write("");
        expected.write("        public Test(string val2)");
        expected.write(`        {`);
        expected.write("        }");
        expected.write("    }");
        expected.write("}\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
