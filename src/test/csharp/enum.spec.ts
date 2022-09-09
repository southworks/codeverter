import { CSharpFile } from "../../csharp/csharp-file";
import { printFile } from "../../print-file";
import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode } from "../compiler-helper";

const filename = "test.ts";

describe("CSharp: Enum", () => {
    test("Simple enum", () => {
        const code = `
            export enum LogLevel {
                Info = 0,
                Warning = 1,
                Error = 2
            }
        `;
        let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

        const strWritter = new StringWritter();
        printFile(sourceFile, strWritter, new CSharpFile({ sourceFile, typeChecker }));

        const expected = new StringWritter(" ", 4);
        expected.write("namespace Test");
        expected.write("{");
        expected.write("    public static class Helper");
        expected.write("    {");
        expected.write("        public enum LogLevel");
        expected.write("        {");
        expected.write("            Info = 0,");
        expected.write("            Warning = 1,");
        expected.write("            Error = 2");
        expected.write("        }");
        expected.write("    }");
        expected.write("}");
        expected.writeNewLine();

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
