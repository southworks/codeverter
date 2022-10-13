import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { VBGenerator } from "../../templating/vb/vb-generator";

describe("vb: Enum", () => {
    test("int", () => {
        const code = `
            export enum LogLevel {
                Info = 0,
                Warning = 1,
                Error = 2
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`Namespace Test`);
        expected.write("    Module Helper");
        expected.write("        Enum LogLevel");
        expected.write("            Info = 0");
        expected.write("            Warning = 1");
        expected.write("            Error = 2");
        expected.write("        End Enum");
        expected.write("    End Module");
        expected.write("End Namespace");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("string", () => {
        const code = `
            export enum LogLevel {
                Info = "info",
                Warning = "warning",
                Error = "error"
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`Namespace Test`);
        expected.write("    Module Helper");
        expected.write("        Enum LogLevel");
        expected.write("            Info");
        expected.write("            Warning");
        expected.write("            Error");
        expected.write("        End Enum");
        expected.write("    End Module");
        expected.write("End Namespace");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });

    test("implicit", () => {
        const code = `
            export enum LogLevel {
                Info,
                Warning,
                Error
            }
        `;
        let compilationResult = compileTypeScriptCode(code, "test.ts");

        const strWritter = new StringWritter();
        printFile(compilationResult, new VBGenerator(), strWritter);

        const expected = new StringWritter();
        expected.write(`Namespace Test`);
        expected.write("    Module Helper");
        expected.write("        Enum LogLevel");
        expected.write("            Info");
        expected.write("            Warning");
        expected.write("            Error");
        expected.write("        End Enum");
        expected.write("    End Module");
        expected.write("End Namespace");
        expected.write("");

        expect(strWritter.getString()).toBe(expected.getString());
    });
});
