import { ParameterDeclaration } from "typescript";
import { TypeMapper, TypeMapperImpl } from "./type-mapper";
import { Importer } from "./types/importer";
import { TypedClassElement } from "./types/typed-class-element";

export abstract class Parameter<T extends TypeMapper & Importer = TypeMapperImpl> extends TypedClassElement<ParameterDeclaration, T> {

}
