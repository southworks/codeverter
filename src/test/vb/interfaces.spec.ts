import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { VBGenerator } from "../../templating/vb/vb-generator";

describe("CSharp: interfaces", () => {
    test("Simple interface", () => {
        const code = `
            export interface MyInterface {
                firstField: number;
                firstMethod(x: number): string;
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");
        expected.write("    Public Interface IMyInterface");
        expected.write("        Property FirstField As Integer");
        expected.write("        Function FirstMethod(x As Integer) As String");
        expected.write("    End Interface");
        expected.write("End Namespace\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("Interface with class implementation", () => {
        const code = `
            export interface ClockInterface {
                currentTime: Date;
                setTime(d: Date): void;
            }
            
            export class Clock implements ClockInterface {
                currentTime: Date = new Date();
                setTime(d: Date) {
                    this.currentTime = d;
                }
                constructor(h: number, m: number) {
                }
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("Namespace Test");
        expected.write("    Public Interface IClockInterface");
        expected.write("        Property CurrentTime As Date");
        expected.write("        Sub SetTime(d As Date)");
        expected.write("    End Interface");
        expected.write("");
        expected.write("    Public Class Clock : IClockInterface");
        expected.write("        Public Property CurrentTime As Date");
        expected.write("");
        expected.write("        Public Sub Clock(h As Integer, m As Integer)");
        expected.write("        End Sub");
        expected.write("");
        expected.write("        Public Sub SetTime(d As Date)");
        expected.write("            ' currentTime = d");
        expected.write("        End Sub");
        expected.write("    End Class");
        expected.write("End Namespace\n");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
