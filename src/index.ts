#!/usr/bin/env node

/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { createProgram } from "typescript";
import { printFiles } from "./print-file";
import { ConsoleWritter } from "./writter/console-writter";
import { Writter } from "./writter/writter";
import { FileWritter } from "./writter/file-writter";
import { lstatSync, readdirSync, existsSync } from "fs";
import { join, resolve } from "path";
import { AvailableLanguages, getLanguageGenerator } from "./language-map";

const [, , ...args] = process.argv;

if (args.indexOf("--help") > -1) {
    console.log("--src:");
    console.log("    Path to the source file or directory. Default value: '.'");
    console.log("--lang: [csharp | go]");
    console.log("    Target language. Default value: 'go'");
    console.log("--template:");
    console.log("    Path to the custom template to perform the transformation.");
    console.log("    The extension must be '.t' followed by the language extension, for example: csharp => .tcs");
    console.log("    Default value: ''");
    console.log("--dest: [console | file] <destination path>");
    console.log("    Console output or file name. Default value: 'console'");
} else {
    const srcIndex = args.indexOf('--src');
    // Change here for your dev file path;
    const src = srcIndex > -1 ? args[srcIndex + 1] : "./tmp/index.ts";

    const templateIndex = args.indexOf('--template');
    const langIndex = args.indexOf('--lang');
    const langName = langIndex > -1
        ? (args[langIndex + 1] as AvailableLanguages)
        : templateIndex > -1
            ? "custom"
            : "go";

    const destIndex = args.indexOf('--dest');
    const destName = destIndex > -1 ? args[destIndex + 1] : "console";

    const files = lstatSync(src).isDirectory()
        ? readdirSync(src).filter(f => f.endsWith(".ts")).map(f => join(src, f))
        : [src];

    if (files.length == 0) {
        console.error("No files to process. Consider using --help to solve the problem.");
    } else {

        if (templateIndex > -1) {
            if (!existsSync(resolve(__dirname, args[templateIndex + 1]))) {
                console.error(`Template "${args[templateIndex + 1]}" not found.`);
                process.exit(1);
            }
        }

        const program = createProgram(files, { allowJs: true });
        const typeChecker = program.getTypeChecker();

        const destMapper: { [x: string]: () => Writter } = {
            console: () => new ConsoleWritter(),
            file: () => new FileWritter()
        }

        const generator = getLanguageGenerator(langName, args[templateIndex + 1]);
        printFiles(files.map(f => program.getSourceFile(f)!), destMapper[destName](), generator, typeChecker);
    }
}
