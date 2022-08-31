import { Identifier, SyntaxKind, TypeNode, TypeReferenceNode } from "typescript";
import { Importer } from "./types/importer";
import { Imports } from "./imports";

export enum KnownTypes {
    Number,
    String,
    Boolean,
    Date
}

export interface TypeMapper {
    get(node: TypeNode): string | undefined;
}

export abstract class TypeMapperImpl implements TypeMapper, Importer {
    private importHandler!: Imports;

    private getReferenceType(value: string): string {
        switch (value) {
            case "Date": return this.getKnownType(KnownTypes.Date);
            default: return value;
        }
    }

    protected abstract getKnownType(type: KnownTypes): string;

    protected abstract getVoidType(): string;

    public setImportHandler(handler: Imports): void {
        this.importHandler = handler;
    }

    public getImportHandler(): Imports {
        return this.importHandler;
    }

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
                return this.getVoidType();
            }
        }
    }
}
