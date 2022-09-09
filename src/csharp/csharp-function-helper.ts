/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { AccessLevel } from "../shared/access-level";
import { Printable } from "../shared/types/printable";
import { ArrayWritter } from "../writter/array-writter";
import { Writteable } from "../writter/writter";

export class CSharpFunctionHelper {
    public static Write(writter: Writteable, name: string, content: string[],
        returnType: string, returnValue: string, accessLevel: AccessLevel, isStatic: boolean, parameters: Printable[], isSignature: boolean,
        declarations: Printable[]): void {

        const visibility = AccessLevel[accessLevel].toLowerCase();

        const arrWritter = new ArrayWritter();
        parameters.map(p => p.print(arrWritter));
        const paramStr = arrWritter.getContent().join(", ");

        if (isSignature) {
            writter.write(`${returnType} ${name}(${paramStr});`);
        } else {
            writter.write(`${visibility}${isStatic ? " static " : " "}${returnType} ${name}(${paramStr})`);
            writter.write("{");
            writter.incDeepLevel();

            arrWritter.clear();
            declarations.map(p => p.print(arrWritter));
            arrWritter.getContent().forEach(d => writter.write(d));

            for (const line of content) {
                writter.write(`//${line}`);
            }
            writter.write(`return${!!returnValue ? " " + returnValue : ""};`);
            writter.decDeepLevel();
            writter.write(`}`);
        }
    }
}
