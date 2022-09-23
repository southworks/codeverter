// import { GoFile } from "../../go/go-file";
// import { StringWritter } from "../../writter/string-writter";
// import { compileTypeScriptCode, printFile } from "../../lib";

// const filename = "test.ts";

// describe("GO: property access level", () => {
//     test("no access modifier", () => {
//         const code = `
//             export class Test {
//                 foo: number;
//             }
//         `;
//         let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

//         const strWritter = new StringWritter();
//         printFile(sourceFile, strWritter, new GoFile({ sourceFile, typeChecker }));

//         const expected = new StringWritter("\t", 1);
//         expected.write(`package test`);
//         expected.writeNewLine();
//         expected.write("type Test struct {");
//         expected.write("\tFoo int");
//         expected.write("}");
//         expected.writeNewLine();

//         expect(strWritter.getString()).toBe(expected.getString());
//     });

//     test("public access modifier", () => {
//         const code = `
//             export class Test {
//                 public foo: number;
//             }
//         `;
//         let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

//         const strWritter = new StringWritter();
//         printFile(sourceFile, strWritter, new GoFile({ sourceFile, typeChecker }));

//         const expected = new StringWritter("\t", 1);
//         expected.write(`package test`);
//         expected.writeNewLine();
//         expected.write("type Test struct {");
//         expected.write("\tFoo int");
//         expected.write("}");
//         expected.writeNewLine();

//         expect(strWritter.getString()).toBe(expected.getString());
//     });

//     test("protected access modifier", () => {
//         const code = `
//             export class Test {
//                 protected foo: number;
//             }
//         `;
//         let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

//         const strWritter = new StringWritter();
//         printFile(sourceFile, strWritter, new GoFile({ sourceFile, typeChecker }));

//         const expected = new StringWritter("\t", 1);
//         expected.write(`package test`);
//         expected.writeNewLine();
//         expected.write("type Test struct {");
//         expected.write("\tfoo int");
//         expected.write("}");
//         expected.writeNewLine();

//         expect(strWritter.getString()).toBe(expected.getString());
//     });

//     test("private access modifier", () => {
//         const code = `
//             export class Test {
//                 private foo: number;
//             }
//         `;
//         let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

//         const strWritter = new StringWritter();
//         printFile(sourceFile, strWritter, new GoFile({ sourceFile, typeChecker }));

//         const expected = new StringWritter("\t", 1);
//         expected.write(`package test`);
//         expected.writeNewLine();
//         expected.write("type Test struct {");
//         expected.write("\tfoo int");
//         expected.write("}");
//         expected.writeNewLine();

//         expect(strWritter.getString()).toBe(expected.getString());
//     });
// });
