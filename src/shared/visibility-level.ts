/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Node, SyntaxKind } from "typescript";

export type VisibilityLevel = "private" | "protected" | "public";

export class VisibilityLevelHelper {
    public static getLevel(node: Node): VisibilityLevel {
        const accessModifierIndex = 0;
        const mods = node.modifiers;
        if (mods) {
            switch (mods![accessModifierIndex].kind) {
                case SyntaxKind.PrivateKeyword: return "private";
                case SyntaxKind.ProtectedKeyword: return "protected";
            }
        }
        return "public";
    }
}
