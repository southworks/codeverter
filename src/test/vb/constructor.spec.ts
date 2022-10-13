import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { VBGenerator } from "../../templating/vb/vb-generator";

describe("vb: constructor", () => {
    test("paramless", () => {
        const code = `
            export class Test {
                public bar: Date;
            
                constructor() { this.bar = new Date(); }
            }`;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`Namespace Test`);
        expected.write("    Public Class Test");
        expected.write("        Public Property Bar As Date");
        expected.write("");
        expected.write("        Public Sub Test()");
        expected.write(`            ' bar = new Date()`);
        expected.write("        End Sub");
        expected.write("    End Class");
        expected.write("End Namespace\n");
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
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`Namespace Test`);
        expected.write("    Public Class Test");
        expected.write("        Public Property Bar As Date");
        expected.write("");
        expected.write("        Public Sub Test(val As Integer, val2 As String)");
        expected.write(`            ' bar = new Date()`);
        expected.write("        End Sub");
        expected.write("    End Class");
        expected.write("End Namespace\n");

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
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`Namespace Test`);
        expected.write("    Public Class Test");
        expected.write("        Public Property Val As Integer");
        expected.write("");
        expected.write("        Public Sub Test(val2 As String)");
        expected.write("        End Sub");
        expected.write("    End Class");
        expected.write("End Namespace\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
