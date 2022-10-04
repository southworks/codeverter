import { StringWritter } from "../../writter/string-writter";
import { compileTypeScriptCode, printFile } from "../../lib";
import { GoGenerator } from "../../templating/go/go-generator";

describe("GO: method", () => {
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() {");
                expected.write("\t//        console.log(undefined);");
                expected.write("\treturn");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() {");
                expected.write("\t//        console.log(undefined);");
                expected.write("\treturn");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() {");
                expected.write("\t//        console.log(undefined);");
                expected.write("\t//        return;");
                expected.write("\treturn");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() string {");
                expected.write("\t//        return 'test';");
                expected.write("\treturn \"\"");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() string {");
                expected.write("\t//        return 'test';");
                expected.write("\treturn \"\"");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() bool {");
                expected.write("\t//        return true;");
                expected.write("\treturn false");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() bool {");
                expected.write("\t//        return true;");
                expected.write("\treturn false");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() int {");
                expected.write("\t//        return 100;");
                expected.write("\treturn 0");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() int {");
                expected.write("\t//        return 100;");
                expected.write("\treturn 0");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() []int {");
                expected.write("\t//        return [1, 2, 3];");
                expected.write("\treturn nil");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() []int {");
                expected.write("\t//        return [1, 2, 3];");
                expected.write("\treturn nil");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() []int {");
                expected.write("\t//        return [1, 2, 3];");
                expected.write("\treturn nil");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write(`import "time"`);
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() time.Time {");
                expected.write("\t//        return new Date();");
                expected.write("\treturn time.Now()");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write(`import "time"`);
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() time.Time {");
                expected.write("\t//        return new Date();");
                expected.write("\treturn time.Now()");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() *Test {");
                expected.write("\t//        return new Test();");
                expected.write("\treturn nil");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() *Test {");
                expected.write("\t//        return new Test();");
                expected.write("\treturn nil");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write(`import "time"`);
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() {");
                expected.write("\tvarStr := \"test\"");
                expected.write("\tvarBool := false");
                expected.write("\tvarNum := 1");
                expected.write("\tvarArray := []int{1, 2}");
                expected.write("\tvarDate := time.Now() // new Date()");
                expected.write("\tvarRef := new(Test) // new Test()");
                expected.write("\t//        let varStr: string = \"test\";");
                expected.write("\t//        let varBool: boolean = false;");
                expected.write("\t//        let varNum: number = 1;");
                expected.write("\t//        let varArray: number[] = [1, 2];");
                expected.write("\t//        let varDate: Date = new Date();");
                expected.write("\t//        let varRef: Test = new Test();");
                expected.write("\treturn");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write(`import "time"`);
                expected.write("");
                expected.write("type Test struct {");
                expected.write("}");
                expected.write("");
                expected.write("func (t *Test) Method() {");
                expected.write("\tvarStr := \"test\"");
                expected.write("\tvarBool := false");
                expected.write("\tvarNum := 1");
                expected.write("\tvarArray := []int{1, 2}");
                expected.write("\tvarDate := time.Now() // new Date()");
                expected.write("\tvarRef := new(Test) // new Test()");
                expected.write("\t//        let varStr = \"test\";");
                expected.write("\t//        let varBool = false;");
                expected.write("\t//        let varNum = 1;");
                expected.write("\t//        let varArray = [1, 2];");
                expected.write("\t//        let varDate = new Date();");
                expected.write("\t//        let varRef = new Test();");
                expected.write("\treturn");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() {");
                expected.write("\t//    console.log(undefined);");
                expected.write("\treturn");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() {");
                expected.write("\t//    console.log(undefined);");
                expected.write("\treturn");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() {");
                expected.write("\t//    console.log(undefined);");
                expected.write("\t//    return;");
                expected.write("\treturn");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() string {");
                expected.write("\t//    return 'test';");
                expected.write("\treturn \"\"");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() string {");
                expected.write("\t//    return 'test';");
                expected.write("\treturn \"\"");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() bool {");
                expected.write("\t//    return true;");
                expected.write("\treturn false");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() bool {");
                expected.write("\t//    return true;");
                expected.write("\treturn false");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() int {");
                expected.write("\t//    return 100;");
                expected.write("\treturn 0");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() int {");
                expected.write("\t//    return 100;");
                expected.write("\treturn 0");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() []int {");
                expected.write("\t//    return [1, 2, 3];");
                expected.write("\treturn nil");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() []int {");
                expected.write("\t//    return [1, 2, 3];");
                expected.write("\treturn nil");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() []int {");
                expected.write("\t//    return [1, 2, 3];");
                expected.write("\treturn nil");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write(`import "time"`);
                expected.write("");
                expected.write("func Method() time.Time {");
                expected.write("\t//    return new Date();");
                expected.write("\treturn time.Now()");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write(`import "time"`);
                expected.write("");
                expected.write("func Method() time.Time {");
                expected.write("\t//    return new Date();");
                expected.write("\treturn time.Now()");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() *Test {");
                expected.write("\t//    return new Test();");
                expected.write("\treturn nil");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() *Test {");
                expected.write("\t//    return new Test();");
                expected.write("\treturn nil");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() {");
                expected.write("\tvarStr := \"test\"");
                expected.write("\tvarBool := false");
                expected.write("\tvarNum := 1");
                expected.write("\tvarArray := []int{1, 2}");
                expected.write("\tvarDate := time.Now() // new Date()");
                expected.write("\tvarRef := new(Test) // new Test()");
                expected.write("\t//    let varStr: string = \"test\";");
                expected.write("\t//    let varBool: boolean = false;");
                expected.write("\t//    let varNum: number = 1;");
                expected.write("\t//    let varArray: number[] = [1, 2];");
                expected.write("\t//    let varDate: Date = new Date();");
                expected.write("\t//    let varRef: Test = new Test();");
                expected.write("\treturn");
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
                printFile(compilationResult, new GoGenerator(), strWritter);

                const expected = new StringWritter();
                expected.write("package test");
                expected.write("");
                expected.write("func Method() {");
                expected.write("\tvarStr := \"test\"");
                expected.write("\tvarBool := false");
                expected.write("\tvarNum := 1");
                expected.write("\tvarArray := []int{1, 2}");
                expected.write("\tvarDate := time.Now() // new Date()");
                expected.write("\tvarRef := new(Test) // new Test()");
                expected.write("\t//    let varStr = \"test\";");
                expected.write("\t//    let varBool = false;");
                expected.write("\t//    let varNum = 1;");
                expected.write("\t//    let varArray = [1, 2];");
                expected.write("\t//    let varDate = new Date();");
                expected.write("\t//    let varRef = new Test();");
                expected.write("\treturn");
                expected.write("}");
                expected.write("");

                expect(strWritter.getString()).toBe(expected.getString());
            });
        });
    });
});
