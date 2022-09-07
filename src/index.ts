#!/usr/bin/env node

import { createProgram } from "typescript";
import { File } from "./shared/file";
import { printFiles } from "./print-file";
import { ConsoleWritter } from "./writter/console-writter";
import { GoFile } from "./go/go-file";
import { CSharpFile } from "./csharp/csharp-file";
import { Writter } from "./writter/writter";
import { FileWritter } from "./writter/file-writter";
import { lstatSync, readdirSync } from "fs";
import { join } from "path";
import { Factory } from "./shared/types/factory";

const [, , ...args] = process.argv;

if (args.indexOf("--help") > -1) {
    console.log("--src:");
    console.log("    Path to the source file or directory. Default value: '.'");
    console.log("--lang: [csharp | go]");
    console.log("    Target language. Default value: 'go'");
    console.log("--dest: [console | file] <destination path>");
    console.log("    Console output or file name. Default value: 'console'");
} else {
    const srcIndex = args.indexOf('--src');
    // Change here for your dev file path;
    const src = srcIndex > -1 ? args[srcIndex + 1] : ".";

    const langIndex = args.indexOf('--lang');
    const langName = langIndex > -1 ? args[langIndex + 1] : "go";

    const destIndex = args.indexOf('--dest');
    const destName = destIndex > -1 ? args[destIndex + 1] : "console";

    const files = lstatSync(src).isDirectory() ? readdirSync(src).map(f => join(src, f)) : [src];
    if (files.length == 0) {
        console.error("No files to process. Consider using --help to solve the problem.");
    } else {
        let program = createProgram(files, { allowJs: true });

        const langMapper: { [x: string]: Factory<File> } = {
            go: GoFile,
            csharp: CSharpFile
        }
        const destMapper: { [x: string]: () => Writter } = {
            console: () => new ConsoleWritter(),
            file: () => new FileWritter()
        }
        printFiles(files.map(f => program.getSourceFile(f)!), destMapper[destName](), langMapper[langName]);
    }
}
