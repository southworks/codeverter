import { Identifier, SyntaxKind, TypeNode, TypeReferenceNode } from "typescript";

export enum KnownTypes {
    Number,
    String,
    Boolean,
    Date
}

export interface TypeMapper {
    get(node: TypeNode): string | undefined;
}

export abstract class TypeMapperImpl implements TypeMapper {

    private getReferenceType(value: string): string {
        switch (value) {
            case "Date": return this.getKnownType(KnownTypes.Date);
            default: return value;
        }
    }

    protected abstract getKnownType(type: KnownTypes): string;

    public get(node: TypeNode): string | undefined {
        switch (node?.kind) {
            case SyntaxKind.NumberKeyword:
                return this.getKnownType(KnownTypes.Number);
            case SyntaxKind.StringKeyword:
                return this.getKnownType(KnownTypes.String);
            case SyntaxKind.BooleanKeyword:
                return this.getKnownType(KnownTypes.Boolean);
            default: {
                if (node?.kind == SyntaxKind.TypeReference) {
                    const referenceType = ((node as TypeReferenceNode).typeName as Identifier).escapedText!;
                    return this.getReferenceType(referenceType);
                }
            }
        }
    }
}
