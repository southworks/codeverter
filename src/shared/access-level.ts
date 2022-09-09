/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Node, SyntaxKind } from "typescript";

export enum AccessLevel {
    Private,
    Protected,
    Public
}

export class AccessLevelHelper {
    public static getLevel(node: Node): AccessLevel {
        const accessModifierIndex = 0;
        const mods = node.modifiers;
        if (mods) {
            switch (mods![accessModifierIndex].kind) {
                case SyntaxKind.PrivateKeyword: return AccessLevel.Private;
                case SyntaxKind.ProtectedKeyword: return AccessLevel.Protected;
            }
        }
        return AccessLevel.Public
    }
}
