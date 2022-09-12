/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { Declaration, NodeFlags, VariableDeclarationList } from "typescript";
import { ElementKind } from "../types/elements";

type AddElement = (kind: ElementKind, node: Declaration) => void;

export function addVaribles(node: VariableDeclarationList, addElement: AddElement): void {
    const kind = node.flags == NodeFlags.Const ? "constant" : "variable";
    node.declarations.forEach(d => {
        addElement(kind, d);
    });
}
