import { Writteable } from "../../writter/writter";
import { SourceElement } from "../types/source-element";

export type PrintOptions = Partial<{
    splitted: boolean,
    trailingNewLine: boolean,
    startingNewLine: boolean
}>;

/**
 * Print a block of code adding new lines in between
 * @param writter Write handler
 * @param values Values to print
 * @returns Indicates that content was printed
 */
export function printBlock(writter: Writteable, values: SourceElement[], opts?: PrintOptions): boolean {
    let contentPrinted = false;
    values.forEach((c, i, a) => {
        if (opts?.startingNewLine && i == 0) {
            writter.writeNewLine();
        }
        contentPrinted = c.print(writter) || contentPrinted;
        if (contentPrinted && ((opts?.splitted && i != a.length - 1) || opts?.trailingNewLine)) {
            writter.writeNewLine();
        }
    });
    return contentPrinted;
}
