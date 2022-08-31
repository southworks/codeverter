import { SourceElement } from "./source-element";

/**
 * Available factory types
 */
export type ElementKind = "class" | "ctr" | "property" | "parameter" | "imports";

/**
 * Dictionary to hold created elements
 */
export class ElementValues {
    private values: {
        [p in ElementKind]?: SourceElement[]
    } = {};

    public add(key: ElementKind, val: SourceElement): void {
        (this.values[key] = this.values[key] ?? []).push(val);
    }

    public get<T>(key: ElementKind): T[] {
        return (this.values[key] as any ?? []) as T[];
    }
}
