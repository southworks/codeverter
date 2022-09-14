/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { CSharpFile } from "./csharp/csharp-file";
import { GoFile } from "./go/go-file";
import { Factory } from "./shared/types/factory";
import { File } from "./shared/file";

export type AvailableLanguages = "go" | "csharp";

export const languageMap: { [x in AvailableLanguages]: Factory<File> } = {
    go: GoFile,
    csharp: CSharpFile
}
