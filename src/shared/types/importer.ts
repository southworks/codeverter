/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Imports } from "../imports";

export interface ImporterGetter {
    getImportHandler(): Imports;
}

export interface Importer extends ImporterGetter {
    setImportHandler(handler: Imports): void;
}
