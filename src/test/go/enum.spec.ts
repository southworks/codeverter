// import { GoFile } from "../../go/go-file";
// import { StringWritter } from "../../writter/string-writter";
// import { compileTypeScriptCode, printFile } from "../../lib";

// const filename = "test.ts";

// describe("GO: Enum", () => {
//     test("Simple enum", () => {
//         const code = `
//             export enum BoxSize {
//                 Small = 0,
//                 Medium = 1,
//                 Large = 2
//             }
//         `;
//         let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

//         const strWritter = new StringWritter();
//         printFile(sourceFile, strWritter, new GoFile({ sourceFile, typeChecker }));

//         const expected = new StringWritter("\t", 1);
//         expected.write("package test");
//         expected.writeNewLine();
//         expected.write("const (");
//         expected.write("\tSmall int = 0");
//         expected.write("\tMedium = 1");
//         expected.write("\tLarge = 2");
//         expected.write(")");
//         expected.writeNewLine();

//         expect(strWritter.getString()).toBe(expected.getString());
//     });

//     test("String enum", () => {
//         const code = `
//             export enum StringEnum {
//                 One = "1",
//                 Two = "2",
//                 Three = "3"
//             }
//         `;
//         let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

//         const strWritter = new StringWritter();
//         printFile(sourceFile, strWritter, new GoFile({ sourceFile, typeChecker }));

//         const expected = new StringWritter("\t", 1);
//         expected.write("package test");
//         expected.writeNewLine();
//         expected.write("const (");
//         expected.write(`\tOne string = "1"`);
//         expected.write(`\tTwo = "2"`);
//         expected.write(`\tThree = "3"`);
//         expected.write(")");
//         expected.writeNewLine();

//         expect(strWritter.getString()).toBe(expected.getString());
//     });

//     test("Enum with iota", () => {
//         const code = `
//             export enum BoxSize {
//                 Small,
//                 Medium,
//                 Large
//             }
//         `;
//         let { sourceFile, typeChecker } = compileTypeScriptCode(code, filename);

//         const strWritter = new StringWritter();
//         printFile(sourceFile, strWritter, new GoFile({ sourceFile, typeChecker }));

//         const expected = new StringWritter("\t", 1);
//         expected.write("package test");
//         expected.writeNewLine();
//         expected.write("const (");
//         expected.write("\tSmall int = iota");
//         expected.write("\tMedium");
//         expected.write("\tLarge");
//         expected.write(")");
//         expected.writeNewLine();

//         expect(strWritter.getString()).toBe(expected.getString());
//     });
// });
