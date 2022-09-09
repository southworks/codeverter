import {
    SourceFile, TypeChecker,
} from "typescript";
import { Writteable } from "./writter/writter";
import { File } from "./shared/file"
import { Factory } from "./shared/types/factory";
import { basename, extname, resolve, dirname } from "path";

export function printFiles(
    node: SourceFile[], writter: Writteable, fileFactory: Factory<File>, typeChecker: TypeChecker
): void {
    node.forEach(sourceFile => {
        const file = new fileFactory({ sourceFile, typeChecker });
        const newFileName = basename(sourceFile.fileName).replace(extname(sourceFile.fileName), file.getExtension());
        console.log(`--- Processing: ${sourceFile.fileName} ---`);
        console.log("");
        writter.setOpts({
            fileName: resolve(dirname(sourceFile.fileName), newFileName)
        });
        printFile(sourceFile, writter, file);
    });
}

export function printFile(
    node: SourceFile, writter: Writteable, file: File
): void {
    writter.setOpts({
        indentChar: file.getIndentChar(),
        indentValue: file.getIndentValue()
    });
    file.parse(node);
    file.print(writter);
}
