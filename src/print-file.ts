import {
    SourceFile,
} from "typescript";
import { Writteable } from "./writter/writter";
import { File } from "./shared/file"
import { Factory } from "./shared/types/factory";
import { basename, extname, resolve, dirname } from "path";

export function printFiles(
    node: SourceFile[], writter: Writteable, fileFactory: Factory<File>
): void {
    node.forEach(n => {
        const file = new fileFactory(n);
        const newFileName = basename(n.fileName).replace(extname(n.fileName), file.getExtension());
        console.log(`--- Processing: ${n.fileName} ---`);
        console.log("");
        writter.setOpts({
            fileName: resolve(dirname(n.fileName), newFileName)
        });
        printFile(n, writter, file);
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
