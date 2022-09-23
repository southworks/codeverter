/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { MethodDeclaration, SyntaxKind } from "typescript";
import { Function } from "./function";

export class Method extends Function<MethodDeclaration> {
    public parse(node: MethodDeclaration): void {
        super.parse(node);
        this.static = node.modifiers?.find(m => m.kind == SyntaxKind.StaticKeyword) != null;
    }
}
