/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Writter } from "./writter";

export class ConsoleWritter extends Writter {
    protected writeImpl(value: string): void {
        console.log(value);
    }
}
