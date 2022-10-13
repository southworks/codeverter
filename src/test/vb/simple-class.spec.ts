import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { VBGenerator } from "../../templating/vb/vb-generator";

describe("CSharp: class", () => {
    test("simple class", () => {
        const code = `
            export class Test {
                foo: number;
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`Namespace Test`);
        expected.write("    Public Class Test");
        expected.write("        Public Property Foo As Integer");
        expected.write("    End Class");
        expected.write("End Namespace");
        expected.write("");

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
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`Namespace Test`);
        expected.write("    Public Class Test");
        expected.write("        Public Property Foo As Integer");
        expected.write("    End Class");
        expected.write("");
        expected.write("    Public Class Test2");
        expected.write("        Public Property Foo2 As Test");
        expected.write("    End Class");
        expected.write("End Namespace");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
