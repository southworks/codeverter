import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { CSharpGenerator } from "../../templating/csharp/csharp-template";

describe("CSharp: Enum", () => {
    test("Simple enum", () => {
        const code = `
            export enum LogLevel {
                Info = 0,
                Warning = 1,
                Error = 2
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new CSharpGenerator(), strWritter);

        const expected = new StringWritter();
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
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
