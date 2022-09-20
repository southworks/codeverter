/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

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

/**
 * Returns only the values from an array without brackets, parenthesis or any other characters
 * Input: [1, 2, 3, 4]
 * Output: 1, 2, 3, 4
 * @param strArray 
 * @returns Inner values of an array
 */
export function getArrayValues(strArray: string): string {
    if (strArray.match("new Array")) {
        return strArray.match(/\((.*?)\)/g)?.toString().replace("(", "").replace(")", "") ?? strArray;
    } else if (strArray.includes("[") && strArray.includes("]")) {
        return strArray.replace("[", "").replace("]", "");
    }
    return strArray;
}
