import { 
    createSourceFile, 
    ScriptTarget,
    SourceFile, 
} from "typescript";
import { GoFile } from "./go/go-file";
import { ConsoleWritter } from "./writter/console-writter";
import { Writter } from "./writter/writter";

const filename = "test.ts";

// delete, testing purposes
const code = `
    export class Foo {
        dummy: number;
    }
`;

const sourceFile = createSourceFile(
    filename, code, ScriptTarget.Latest
);

export function print(
  node: SourceFile, writter: Writter
): void {
    const file = new GoFile();
    file.parse(node);
    file.print(writter);
}

print(sourceFile, new ConsoleWritter());
