import { KnownTypes } from "./type-mapper";

/**
 * Abstract value mapper, it could be an interface but we need it as a class to be consistent
 * with the project structure.
 */
export abstract class ValueMapper {
    public abstract get(type: KnownTypes): string;
}
