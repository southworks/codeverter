/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { TemplateGenerator } from "./templating/template-generator";
import { CSharpGenerator } from "./templating/csharp/csharp-generator";
import { GoGenerator } from "./templating/go/go-generator";
import { CustomGenerator } from "./templating/custom/custom-generator";
import { VBGenerator } from "./templating/vb/vb-generator";

export type AvailableLanguages = "go" | "csharp" | "custom" | "vb";

export function getLanguageGenerator(lang: AvailableLanguages, ...params: string[]): TemplateGenerator {
    switch (lang) {
        case "go": return new GoGenerator();
        case "csharp": return new CSharpGenerator();
        case "custom": return new CustomGenerator(params[0]);
        case "vb": return new VBGenerator();
    }
}
