import { createSourceFile, ScriptTarget } from "typescript";
import { CSharpFile } from "../../csharp/csharp-file";
import { printFile } from "../../print-file";
import { StringWritter } from "../../writter/string-writter";

const filename = "test.ts";

describe("CSharp: interfaces", () => {
    test("Simple interface", () => {
        const code = `
            export interface MyInterface {
                firstField: number;
                firstMethod(x: number): string;
            }
        `;
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new CSharpFile());

        const expected = new StringWritter(" ", 4);
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public interface IMyInterface");
        expected.write("    {");
        expected.write("        public int FirstField { get; set; }");
        expected.write("        public string FirstMethod(int x);");
        expected.write("    }");
        expected.writeNewLine();
        expected.write("}");
        expected.writeNewLine();

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
        const sourceFile = createSourceFile(
            filename, code, ScriptTarget.Latest
        );

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new CSharpFile());

        const expected = new StringWritter(" ", 4);
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public interface IClockInterface");
        expected.write("    {");
        expected.write("        public DateTime CurrentTime { get; set; }");
        expected.write("        public void SetTime(DateTime d);");
        expected.write("    }");
        expected.writeNewLine();
        expected.write("    public class Clock : IClockInterface");
        expected.write("    {");
        expected.write("        public DateTime CurrentTime { get; set; }");
        expected.writeNewLine();
        expected.write("        public Clock(int h, int m)");
        expected.write("        {");
        expected.write("        }");
        expected.writeNewLine();
        expected.write("        public void SetTime(DateTime d)");
        expected.write("        {");
        expected.write("            //                    this.currentTime = d;");
        expected.write("            return;");
        expected.write("        }");
        expected.write("    }");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
