import { NamedDeclaration, TypeNode } from "typescript";

export type TypedDeclaration = NamedDeclaration & { readonly type?: TypeNode };
