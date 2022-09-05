import { createProgram } from "typescript";
import { File } from "./shared/file";
import { printFile } from "./print-file";
import { ConsoleWritter } from "./writter/console-writter";
import { GoFile } from "./go/go-file";
import { CSharpFile } from "./csharp/csharp-file";
import { Writter } from "./writter/writter";
import { FileWritter } from "./writter/file-writter";
import { basename, extname, resolve, dirname } from "path";

const [, , ...args] = process.argv;

if (args.indexOf("--help") > -1) {
    console.log("--file:");
    console.log("    Path to the source file. Default value: 'tmp/index.ts'");
    console.log("--lang: [csharp | go]");
    console.log("    Target language. Default value: 'go'");
    console.log("--dest: [console | file] <destination path>");
    console.log("    Console output or file name. Default value: 'console'");
} else {
    const fileIndex = args.indexOf('--file');
    const fileName = fileIndex > -1 ? args[fileIndex + 1] : "./tmp/index.ts";

    const langIndex = args.indexOf('--lang');
    const langName = langIndex > -1 ? args[langIndex + 1] : "go";

    const destIndex = args.indexOf('--dest');
    const destName = destIndex > -1 ? args[destIndex + 1] : "console";
    const destPath = destIndex > -1 && destIndex + 2 != fileIndex && destIndex + 2 != langIndex
        ? args[destIndex + 2] : undefined;

    let program = createProgram([fileName], { allowJs: true });
    const sourceFile = program.getSourceFile(fileName);

    if (!sourceFile) {
        console.error("file not found:", fileName);
    } else {
        const langMapper: { [x: string]: () => File } = {
            go: () => new GoFile(),
            csharp: () => new CSharpFile()
        }
        const destMapper: { [x: string]: () => Writter } = {
            console: () => new ConsoleWritter(),
            file: () => {
                const extMapper: { [x: string]: string } = {
                    go: ".go",
                    csharp: ".cs"
                }
                const newFileName = basename(fileName).replace(extname(fileName), extMapper[langName]);
                return new FileWritter(resolve(destPath ?? dirname(fileName), newFileName));
            }
        }
        printFile(sourceFile!, destMapper[destName](), langMapper[langName]());
    }
}
