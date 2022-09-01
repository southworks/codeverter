import {
    SourceFile,
} from "typescript";
import { Writter } from "./writter/writter";
import { File } from "./shared/file"

export function printFile(
    node: SourceFile, writter: Writter, file: File
): void {
    writter.setIndentChar(file.getIndentChar());
    writter.setIndentValue(file.getIndentValue());
    file.parse(node);
    file.print(writter);
}
