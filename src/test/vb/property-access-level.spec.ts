import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { VBGenerator } from "../../templating/vb/vb-generator";

describe("CSharp: property access level", () => {
    test("no access modifier", () => {
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

    test("public access modifier", () => {
        const code = `
            export class Test {
                public foo: number;
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

    test("protected access modifier", () => {
        const code = `
            export class Test {
                protected foo: number;
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`Namespace Test`);
        expected.write("    Public Class Test");
        expected.write("        Protected Property Foo As Integer");
        expected.write("    End Class");
        expected.write("End Namespace");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("private access modifier", () => {
        const code = `
            export class Test {
                private foo: number;
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`Namespace Test`);
        expected.write("    Public Class Test");
        expected.write("        Private Property Foo As Integer");
        expected.write("    End Class");
        expected.write("End Namespace");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
