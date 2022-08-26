import { Declaration } from "typescript";

export interface Parseable<T extends Declaration = Declaration> {
    parse(node: T): void;
}
