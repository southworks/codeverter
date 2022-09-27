import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { CSharpGenerator } from "../../templating/csharp/csharp-generator";

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
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public interface IMyInterface");
        expected.write("    {");
        expected.write("        int FirstField { get; set; }");
        expected.write("");
        expected.write("        string FirstMethod(int x);");
        expected.write("    }");
        expected.write("}");
        expected.write("");

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
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public interface IClockInterface");
        expected.write("    {");
        expected.write("        DateTime CurrentTime { get; set; }");
        expected.write("");
        expected.write("        void SetTime(DateTime d);");
        expected.write("    }");
        expected.write("");
        expected.write("    public class Clock : IClockInterface");
        expected.write("    {");
        expected.write("        public DateTime CurrentTime { get; set; } = new DateTime();");
        expected.write("");
        expected.write("        public Clock(int h, int m)");
        expected.write("        {");
        expected.write("        }");
        expected.write("");
        expected.write("        public void SetTime(DateTime d)");
        expected.write("        {");
        expected.write("            //                     this.currentTime = d;");
        expected.write("            return;");
        expected.write("        }");
        expected.write("    }");
        expected.write("}");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
