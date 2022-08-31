import { ConstructorDeclaration } from "typescript";
import { Parameter } from "./parameter";
import { TypeMapper, TypeMapperImpl } from "./type-mapper";
import { Importer } from "./types/importer";
import { SourceElement } from "./types/source-element";
import { Function } from "./function";

export abstract class Constructor<P extends SourceElement = Parameter, T extends TypeMapper & Importer = TypeMapperImpl>
    extends Function<ConstructorDeclaration, P, T> {

    public getName(): string {
        return this.getParent()?.getName();
    }
}
