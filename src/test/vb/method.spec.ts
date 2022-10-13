import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { VBGenerator } from "../../templating/vb/vb-generator";

describe("vb: method", () => {
    describe("in class", () => {
        describe("returns", () => {
            test("void", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method(): void {");
                code.write("        console.log(undefined);");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Sub Method()");
                expected.write("            ' console.log(undefined)");
                expected.write("        End Sub");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer void wituout return statement", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method() {");
                code.write("        console.log(undefined);");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Sub Method()");
                expected.write("            ' console.log(undefined)");
                expected.write("        End Sub");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer void", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method() {");
                code.write("        console.log(undefined)");
                code.write("        return;");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Sub Method()");
                expected.write("            ' console.log(undefined)");
                expected.write("            ' return");
                expected.write("        End Sub");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("string", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method(): string {");
                code.write("        return 'test';");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Function Method() As String");
                expected.write("            ' return 'test'");
                expected.write("            return \"\"");
                expected.write("        End Function");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer string", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method() {");
                code.write("        return 'test';");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Function Method() As String");
                expected.write("            ' return 'test'");
                expected.write("            return \"\"");
                expected.write("        End Function");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("boolean", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method(): boolean {");
                code.write("        return true;");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Function Method() As Boolean");
                expected.write("            ' return true");
                expected.write("            return false");
                expected.write("        End Function");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer boolean", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method() {");
                code.write("        return true;");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Function Method() As Boolean");
                expected.write("            ' return true");
                expected.write("            return false");
                expected.write("        End Function");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("number", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method(): number {");
                code.write("        return 100;");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Function Method() As Integer");
                expected.write("            ' return 100");
                expected.write("            return 0");
                expected.write("        End Function");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("")

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer number", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method() {");
                code.write("        return 100;");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Function Method() As Integer");
                expected.write("            ' return 100");
                expected.write("            return 0");
                expected.write("        End Function");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("")

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("typed array", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method(): number[] {");
                code.write("        return [1, 2, 3];");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Function Method() As Integer()");
                expected.write("            ' return [1, 2, 3]");
                expected.write("            return {}");
                expected.write("        End Function");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer array", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method() {");
                code.write("        return [1, 2, 3];");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Function Method() As Integer()");
                expected.write("            ' return [1, 2, 3]");
                expected.write("            return {}");
                expected.write("        End Function");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("date", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method(): Date {");
                code.write("        return new Date();");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Function Method() As Date");
                expected.write("            ' return new Date()");
                expected.write("            return DateTime.Now");
                expected.write("        End Function");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer date", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method() {");
                code.write("        return new Date();");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Function Method() As Date");
                expected.write("            ' return new Date()");
                expected.write("            return DateTime.Now");
                expected.write("        End Function");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("reference", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method(): Test {");
                code.write("        return new Test();");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Function Method() As Test");
                expected.write("            ' return new Test()");
                expected.write("            return null");
                expected.write("        End Function");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer reference", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method() {");
                code.write("        return new Test();");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Function Method() As Test");
                expected.write("            ' return new Test()");
                expected.write("            return null");
                expected.write("        End Function");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });
        });

        describe("variables", () => {
            test("explicit", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method(): void {");
                code.write("        let varStr: string = \"test\";");
                code.write("        let varBool: boolean = false;");
                code.write("        let varNum: number = 1;");
                code.write("        let varArray: number[] = [1, 2];");
                code.write("        let varDate: Date = new Date();");
                code.write("        let varRef: Test = new Test();");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Sub Method()");
                expected.write("            Dim varStr As String = \"test\"");
                expected.write("            Dim varBool As Boolean = false");
                expected.write("            Dim varNum As Integer = 1");
                expected.write("            Dim varArray As Integer() = { 1, 2 }");
                expected.write("            Dim varDate As Date = new DateTime() 'new Date()");
                expected.write("            Dim varRef As Test = New Test() 'new Test()");
                expected.write("            ' let varStr: string = \"test\"");
                expected.write("            ' let varBool: boolean = false");
                expected.write("            ' let varNum: number = 1");
                expected.write("            ' let varArray: number[] = [1, 2]");
                expected.write("            ' let varDate: Date = new Date()");
                expected.write("            ' let varRef: Test = new Test()");
                expected.write("        End Sub");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method(): void {");
                code.write("        let varStr = \"test\";");
                code.write("        let varBool = false;");
                code.write("        let varNum = 1;");
                code.write("        let varArray = [1, 2];");
                code.write("        let varDate = new Date();");
                code.write("        let varRef = new Test();");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Sub Method()");
                expected.write("            Dim varStr As String = \"test\"");
                expected.write("            Dim varBool As Boolean = false");
                expected.write("            Dim varNum As Integer = 1");
                expected.write("            Dim varArray As Integer() = { 1, 2 }");
                expected.write("            Dim varDate As Date = new DateTime() 'new Date()");
                expected.write("            Dim varRef As Test = New Test() 'new Test()");
                expected.write("            ' let varStr = \"test\"");
                expected.write("            ' let varBool = false");
                expected.write("            ' let varNum = 1");
                expected.write("            ' let varArray = [1, 2]");
                expected.write("            ' let varDate = new Date()");
                expected.write("            ' let varRef = new Test()");
                expected.write("        End Sub");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });
        });

        describe("constants", () => {
            test("explicit", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method(): void {");
                code.write("        const varStr: string = \"test\";");
                code.write("        const varBool: boolean = false;");
                code.write("        const varNum: number = 1;");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Sub Method()");
                expected.write("            Const varStr As String = \"test\"");
                expected.write("            Const varBool As Boolean = false");
                expected.write("            Const varNum As Integer = 1");
                expected.write("            ' const varStr: string = \"test\"");
                expected.write("            ' const varBool: boolean = false");
                expected.write("            ' const varNum: number = 1");
                expected.write("        End Sub");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method(): void {");
                code.write("        const varStr = \"test\";");
                code.write("        const varBool = false;");
                code.write("        const varNum = 1;");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new VBGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("Namespace Test");
                expected.write("    Public Class Test");
                expected.write("        Public Sub Method()");
                expected.write("            Const varStr As String = \"test\"");
                expected.write("            Const varBool As Boolean = false");
                expected.write("            Const varNum As Integer = 1");
                expected.write("            ' const varStr = \"test\"");
                expected.write("            ' const varBool = false");
                expected.write("            ' const varNum = 1");
                expected.write("        End Sub");
                expected.write("    End Class");
                expected.write("End Namespace");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });
        });
    });

});
