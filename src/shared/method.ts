import { MethodDeclaration } from "typescript";
import { Parameter } from "./parameter";
import { TypeMapper, TypeMapperImpl } from "./type-mapper";
import { Importer } from "./types/importer";
import { SourceElement } from "./types/source-element";
import { Function } from "./function";

export abstract class Method<P extends SourceElement = Parameter, T extends TypeMapper & Importer = TypeMapperImpl>
    extends Function<MethodDeclaration, P, T> {

    public parse(node: MethodDeclaration): void {
        super.parse(node);
    }
}
