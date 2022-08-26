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
