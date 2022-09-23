// import { GoFile } from "../../go/go-file";
// import { StringWritter } from "../../writter/string-writter";
// import { compileTypeScriptCode, printFile } from "../../lib";

// const filename = "test.ts";

// describe("GO: imports", () => {
//     test("simple date property", () => {
//         const code = `
//             export class Test {
//                 foo: Date;
//             }
//         `;
//         let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

//         const strWritter = new StringWritter();
//         printFile(sourceFile, strWritter, new GoFile({ sourceFile, typeChecker }));
//         const expected = new StringWritter("\t", 1);
//         expected.write(`package test`);
//         expected.writeNewLine();
//         expected.write(`import "time"`);
//         expected.writeNewLine();
//         expected.write("type Test struct {");
//         expected.write("\tFoo time.Time");
//         expected.write("}");
//         expected.writeNewLine();

//         expect(strWritter.getString()).toBe(expected.getString());
//     });

//     test("multiple date property", () => {
//         const code = `
//             export class Test {
//                 foo: Date;
//                 bar: Date;
//             }
//         `;
//         let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

//         const strWritter = new StringWritter();
//         printFile(sourceFile, strWritter, new GoFile({ sourceFile, typeChecker }));
//         const expected = new StringWritter("\t", 1);
//         expected.write(`package test`);
//         expected.writeNewLine();
//         expected.write(`import "time"`);
//         expected.writeNewLine();
//         expected.write("type Test struct {");
//         expected.write("\tFoo time.Time");
//         expected.write("\tBar time.Time");
//         expected.write("}");
//         expected.writeNewLine();
//         expect(strWritter.getString()).toBe(expected.getString());
//     });
// });
