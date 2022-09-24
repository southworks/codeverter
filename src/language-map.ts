/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Factory } from "./shared/types/factory";
import { TemplateGenerator } from "./templating/template-generator";
import { CSharpGenerator } from "./templating/csharp/csharp-template";
import { GoGenerator } from "./templating/go/go-template";

export type AvailableLanguages = "go" | "csharp";

export const languageMap: { [x in AvailableLanguages]: Factory<TemplateGenerator, void> } = {
    go: GoGenerator,
    csharp: CSharpGenerator
}
