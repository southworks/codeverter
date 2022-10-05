import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { CSharpGenerator } from "../../templating/csharp/csharp-generator";

describe("CSharp: method", () => {
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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public void Method()");
                expected.write("        {");
                expected.write("            //         console.log(undefined);");
                expected.write("            return;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public void Method()");
                expected.write("        {");
                expected.write("            //         console.log(undefined);");
                expected.write("            return;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer void", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method() {");
                code.write("        console.log(undefined);");
                code.write("        return;");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public void Method()");
                expected.write("        {");
                expected.write("            //         console.log(undefined);");
                expected.write("            //         return;");
                expected.write("            return;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public string Method()");
                expected.write("        {");
                expected.write("            //         return 'test';");
                expected.write("            return \"\";");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public string Method()");
                expected.write("        {");
                expected.write("            //         return 'test';");
                expected.write("            return \"\";");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public bool Method()");
                expected.write("        {");
                expected.write("            //         return true;");
                expected.write("            return false;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public bool Method()");
                expected.write("        {");
                expected.write("            //         return true;");
                expected.write("            return false;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public int Method()");
                expected.write("        {");
                expected.write("            //         return 100;");
                expected.write("            return 0;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public int Method()");
                expected.write("        {");
                expected.write("            //         return 100;");
                expected.write("            return 0;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("untyped array", () => {
                const code = new StringWritter();
                code.write("export class Test {");
                code.write("    public method(): [] {");
                code.write("        return [1, 2, 3];");
                code.write("    }");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public int[] Method()");
                expected.write("        {");
                expected.write("            //         return [1, 2, 3];");
                expected.write("            return new int[] {};");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public int[] Method()");
                expected.write("        {");
                expected.write("            //         return [1, 2, 3];");
                expected.write("            return new int[] {};");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public int[] Method()");
                expected.write("        {");
                expected.write("            //         return [1, 2, 3];");
                expected.write("            return new int[] {};");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public DateTime Method()");
                expected.write("        {");
                expected.write("            //         return new Date();");
                expected.write("            return DateTime.Now;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public DateTime Method()");
                expected.write("        {");
                expected.write("            //         return new Date();");
                expected.write("            return DateTime.Now;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public Test Method()");
                expected.write("        {");
                expected.write("            //         return new Test();");
                expected.write("            return null;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public Test Method()");
                expected.write("        {");
                expected.write("            //         return new Test();");
                expected.write("            return null;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public void Method()");
                expected.write("        {");
                expected.write("            string varStr = \"test\";");
                expected.write("            bool varBool = false;");
                expected.write("            int varNum = 1;");
                expected.write("            int[] varArray = new int[] { 1, 2 };");
                expected.write("            DateTime varDate = new DateTime(); //new Date()");
                expected.write("            Test varRef = null; //new Test()");
                expected.write("            //         let varStr: string = \"test\";");
                expected.write("            //         let varBool: boolean = false;");
                expected.write("            //         let varNum: number = 1;");
                expected.write("            //         let varArray: number[] = [1, 2];");
                expected.write("            //         let varDate: Date = new Date();");
                expected.write("            //         let varRef: Test = new Test();");
                expected.write("            return;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
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
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public class Test");
                expected.write("    {");
                expected.write("        public void Method()");
                expected.write("        {");
                expected.write("            string varStr = \"test\";");
                expected.write("            bool varBool = false;");
                expected.write("            int varNum = 1;");
                expected.write("            int[] varArray = new int[] { 1, 2 };");
                expected.write("            DateTime varDate = new DateTime(); //new Date()");
                expected.write("            Test varRef = null; //new Test()");
                expected.write("            //         let varStr = \"test\";");
                expected.write("            //         let varBool = false;");
                expected.write("            //         let varNum = 1;");
                expected.write("            //         let varArray = [1, 2];");
                expected.write("            //         let varDate = new Date();");
                expected.write("            //         let varRef = new Test();");
                expected.write("            return;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });
        });
    });

    describe("global", () => {
        describe("returns", () => {
            test("void", () => {
                const code = new StringWritter();
                code.write("export function method(): void {");
                code.write("    console.log(undefined);");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static void Method()");
                expected.write("        {");
                expected.write("            //     console.log(undefined);");
                expected.write("            return;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer void wituout return statement", () => {
                const code = new StringWritter();
                code.write("export function method() {");
                code.write("    console.log(undefined);");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static void Method()");
                expected.write("        {");
                expected.write("            //     console.log(undefined);");
                expected.write("            return;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer void", () => {
                const code = new StringWritter();
                code.write("export function method() {");
                code.write("    console.log(undefined);");
                code.write("    return;");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static void Method()");
                expected.write("        {");
                expected.write("            //     console.log(undefined);");
                expected.write("            //     return;");
                expected.write("            return;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("string", () => {
                const code = new StringWritter();
                code.write("export function method(): string {");
                code.write("    return 'test';");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static string Method()");
                expected.write("        {");
                expected.write("            //     return 'test';");
                expected.write("            return \"\";");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer string", () => {
                const code = new StringWritter();
                code.write("export function method() {");
                code.write("    return 'test';");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static string Method()");
                expected.write("        {");
                expected.write("            //     return 'test';");
                expected.write("            return \"\";");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("boolean", () => {
                const code = new StringWritter();
                code.write("export function method(): boolean {");
                code.write("    return true;");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static bool Method()");
                expected.write("        {");
                expected.write("            //     return true;");
                expected.write("            return false;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer boolean", () => {
                const code = new StringWritter();
                code.write("export function method() {");
                code.write("    return true;");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static bool Method()");
                expected.write("        {");
                expected.write("            //     return true;");
                expected.write("            return false;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("number", () => {
                const code = new StringWritter();
                code.write("export function method(): number {");
                code.write("    return 100;");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static int Method()");
                expected.write("        {");
                expected.write("            //     return 100;");
                expected.write("            return 0;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer number", () => {
                const code = new StringWritter();
                code.write("export function method() {");
                code.write("    return 100;");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static int Method()");
                expected.write("        {");
                expected.write("            //     return 100;");
                expected.write("            return 0;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("untyped array", () => {
                const code = new StringWritter();
                code.write("export function method(): [] {");
                code.write("    return [1, 2, 3];");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static int[] Method()");
                expected.write("        {");
                expected.write("            //     return [1, 2, 3];");
                expected.write("            return new int[] {};");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("typed array", () => {
                const code = new StringWritter();
                code.write("export function method(): number[] {");
                code.write("    return [1, 2, 3];");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static int[] Method()");
                expected.write("        {");
                expected.write("            //     return [1, 2, 3];");
                expected.write("            return new int[] {};");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer array", () => {
                const code = new StringWritter();
                code.write("export function method() {");
                code.write("    return [1, 2, 3];");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static int[] Method()");
                expected.write("        {");
                expected.write("            //     return [1, 2, 3];");
                expected.write("            return new int[] {};");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("date", () => {
                const code = new StringWritter();
                code.write("export function method(): Date {");
                code.write("    return new Date();");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static DateTime Method()");
                expected.write("        {");
                expected.write("            //     return new Date();");
                expected.write("            return DateTime.Now;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer date", () => {
                const code = new StringWritter();
                code.write("export function method() {");
                code.write("    return new Date();");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static DateTime Method()");
                expected.write("        {");
                expected.write("            //     return new Date();");
                expected.write("            return DateTime.Now;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("reference", () => {
                const code = new StringWritter();
                code.write("export function method(): Test {");
                code.write("    return new Test();");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static Test Method()");
                expected.write("        {");
                expected.write("            //     return new Test();");
                expected.write("            return null;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer reference", () => {
                const code = new StringWritter();
                code.write("export function method() {");
                code.write("    return new Test();");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static Test Method()");
                expected.write("        {");
                expected.write("            //     return new Test();");
                expected.write("            return null;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });
        });

        describe("variables", () => {
            test("explicit", () => {
                const code = new StringWritter();
                code.write("export function method(): void {");
                code.write("    let varStr: string = \"test\";");
                code.write("    let varBool: boolean = false;");
                code.write("    let varNum: number = 1;");
                code.write("    let varArray: number[] = [1, 2];");
                code.write("    let varDate: Date = new Date();");
                code.write("    let varRef: Test = new Test();");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static void Method()");
                expected.write("        {");
                expected.write("            string varStr = \"test\";");
                expected.write("            bool varBool = false;");
                expected.write("            int varNum = 1;");
                expected.write("            int[] varArray = new int[] { 1, 2 };");
                expected.write("            DateTime varDate = new DateTime(); //new Date()");
                expected.write("            Test varRef = null; //new Test()");
                expected.write("            //     let varStr: string = \"test\";");
                expected.write("            //     let varBool: boolean = false;");
                expected.write("            //     let varNum: number = 1;");
                expected.write("            //     let varArray: number[] = [1, 2];");
                expected.write("            //     let varDate: Date = new Date();");
                expected.write("            //     let varRef: Test = new Test();");
                expected.write("            return;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });

            test("infer", () => {
                const code = new StringWritter();
                code.write("export function method(): void {");
                code.write("    let varStr = \"test\";");
                code.write("    let varBool = false;");
                code.write("    let varNum = 1;");
                code.write("    let varArray = [1, 2];");
                code.write("    let varDate = new Date();");
                code.write("    let varRef = new Test();");
                code.write("}");

                let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

                const strWritter = new StringWritter();
                printFile(compilationResult, new CSharpGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("namespace Test");
                expected.write("{");
                expected.write("    public static class Helper");
                expected.write("    {");
                expected.write("        public static void Method()");
                expected.write("        {");
                expected.write("            string varStr = \"test\";");
                expected.write("            bool varBool = false;");
                expected.write("            int varNum = 1;");
                expected.write("            int[] varArray = new int[] { 1, 2 };");
                expected.write("            DateTime varDate = new DateTime(); //new Date()");
                expected.write("            Test varRef = null; //new Test()");
                expected.write("            //     let varStr = \"test\";");
                expected.write("            //     let varBool = false;");
                expected.write("            //     let varNum = 1;");
                expected.write("            //     let varArray = [1, 2];");
                expected.write("            //     let varDate = new Date();");
                expected.write("            //     let varRef = new Test();");
                expected.write("            return;");
                expected.write("        }");
                expected.write("    }");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });
        });
    });

    describe("complex type inference", () => {
        test("infer operation int", () => {
            const code = new StringWritter();
            code.write("export class Test {");
            code.write("    public method() {");
            code.write("        return 1 + 2;");
            code.write("    }");
            code.write("}");

            let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

            const strWritter = new StringWritter();
            printFile(compilationResult, new CSharpGenerator(), strWritter);

            const expected = new StringWritter();
            expected.write("namespace Test");
            expected.write("{");
            expected.write("    public class Test");
            expected.write("    {");
            expected.write("        public int Method()");
            expected.write("        {");
            expected.write("            //         return 1 + 2;");
            expected.write("            return 0;");
            expected.write("        }");
            expected.write("    }");
            expected.write("}");
            expected.write("");

            expect(strWritter.getString()).toBe(expected.getString());
        });

        test("infer operation boolean", () => {
            const code = new StringWritter();
            code.write("export class Test {");
            code.write("    public method() {");
            code.write("        return true && false;");
            code.write("    }");
            code.write("}");

            let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

            const strWritter = new StringWritter();
            printFile(compilationResult, new CSharpGenerator(), strWritter);

            const expected = new StringWritter();
            expected.write("namespace Test");
            expected.write("{");
            expected.write("    public class Test");
            expected.write("    {");
            expected.write("        public bool Method()");
            expected.write("        {");
            expected.write("            //         return true && false;");
            expected.write("            return false;");
            expected.write("        }");
            expected.write("    }");
            expected.write("}");
            expected.write("");

            expect(strWritter.getString()).toBe(expected.getString());
        });

        test("infer operation string", () => {
            const code = new StringWritter();
            code.write("export class Test {");
            code.write("    public method() {");
            code.write("        return 'test' + 'test';");
            code.write("    }");
            code.write("}");

            let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

            const strWritter = new StringWritter();
            printFile(compilationResult, new CSharpGenerator(), strWritter);

            const expected = new StringWritter();
            expected.write("namespace Test");
            expected.write("{");
            expected.write("    public class Test");
            expected.write("    {");
            expected.write("        public string Method()");
            expected.write("        {");
            expected.write("            //         return 'test' + 'test';");
            expected.write("            return \"\";");
            expected.write("        }");
            expected.write("    }");
            expected.write("}");
            expected.write("");

            expect(strWritter.getString()).toBe(expected.getString());
        });

        test("infer operation string variable", () => {
            const code = new StringWritter();
            code.write("export class Test {");
            code.write("    public method() {");
            code.write("        let ret = 'test';");
            code.write("        return ret;");
            code.write("    }");
            code.write("}");

            let compilationResult = compileTypeScriptCode(code.getString(), "test.ts");

            const strWritter = new StringWritter();
            printFile(compilationResult, new CSharpGenerator(), strWritter);

            const expected = new StringWritter();
            expected.write("namespace Test");
            expected.write("{");
            expected.write("    public class Test");
            expected.write("    {");
            expected.write("        public string Method()");
            expected.write("        {");
            expected.write("            string ret = \"test\";");
            expected.write("            //         let ret = 'test';");
            expected.write("            //         return ret;");
            expected.write("            return \"\";");
            expected.write("        }");
            expected.write("    }");
            expected.write("}");
            expected.write("");

            expect(strWritter.getString()).toBe(expected.getString());
        });
    });
});
