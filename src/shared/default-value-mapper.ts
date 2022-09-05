import { KnownTypes } from "./type-mapper";

export interface ValueMapper {
    get(type: KnownTypes): string;
}
