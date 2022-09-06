import { ElementKind } from "./elements";

export interface Initable {
    init(kind: ElementKind, isFunc: boolean): void;
}

export function isInitable(obj: any): obj is Initable {
    return "init" in obj;
}
