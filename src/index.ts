import { createProgram } from "typescript";
import { File } from "./shared/file";
import { printFile } from "./print-file";
import { ConsoleWritter } from "./writter/console-writter";
import { GoFile } from "./go/go-file";
import { CSharpFile } from "./csharp/csharp-file";

const [, , ...args] = process.argv;

if (args.indexOf("--help") > -1) {
    console.log("--file:");
    console.log("    Path to the file. Default value: 'tmp/index.ts'");
    console.log("--lang: [csharp | go]");
    console.log("    Target language. Default value: 'go'");
} else {
    const fileIndex = args.indexOf('--file');
    const fileName = fileIndex > -1 ? args[fileIndex + 1] : "./tmp/index.ts";

    const langIndex = args.indexOf('--lang');
    const langName = langIndex > -1 ? args[langIndex + 1] : "go";

    let program = createProgram([fileName], { allowJs: true });
    const sourceFile = program.getSourceFile(fileName);

    if (!sourceFile) {
        console.error("file not found:", fileName);
    } else {
        const langMapper: { [x: string]: () => File } = {
            go: () => new GoFile(),
            csharp: () => new CSharpFile()
        }
        printFile(sourceFile!, new ConsoleWritter(), langMapper[langName]());
    }
}
