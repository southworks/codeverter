import { CSharpFile } from "../../csharp/csharp-file";
import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";

const filename = "test.ts";

describe("CSharp: class", () => {
    test("simple class", () => {
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

    test("simple class with class reference", () => {
        const code = `
            export class Test {
                foo: number;
            }
        
            export class Test2 {
                foo2: Test;
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
        expected.writeNewLine();
        expected.write("    public class Test2");
        expected.write(`    {`);
        expected.write("        public Test Foo2 { get; set; }");
        expected.write("    }");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("Class with default value property", () => {
        const code = `
            export class Test {
                foo: number = 2;
                bar: Array<number> = [2, 500];
                foobar: Array<string> = ["Foo", "Bar"];
                myArray: number[] = [];
                otherArray: Array<number> = new Array<number>(1, 2, 3);
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
        expected.write("        public int Foo { get; set; } = 2;");
        expected.write("        public int[] Bar { get; set; } = new int[] { 2, 500 };");
        expected.write("        public string[] Foobar { get; set; } = new string[] { \"Foo\", \"Bar\" };");
        expected.write("        public int[] MyArray { get; set; } = new int[] {};");
        expected.write("        public int[] OtherArray { get; set; } = new int[] { 1, 2, 3 };");
        expected.write("    }");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
