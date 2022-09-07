import { Declaration, NodeFlags, VariableDeclarationList } from "typescript";
import { ElementKind } from "../types/elements";

type AddElement = (kind: ElementKind, node: Declaration) => void;

export function addVaribles(node: VariableDeclarationList, addElement: AddElement): void {
    const kind = node.flags == NodeFlags.Const ? "constant" : "variable";
    node.declarations.forEach(d => {
        addElement(kind, d);
    });
}
