import { Declaration } from "typescript";
import { ElementKind } from "./elements";
import { Importer, ImporterGetter } from "./importer";
import { Parseable } from "./parseable";
import { Printable } from "./printable";

/**
 * print(writter: Writter): boolean;
 * parse(node: T): void;
 * getImportHandler(): Imports;
 * setImportHandler(handler: Imports): void;
 */
type SourceElementDef<T extends Declaration = Declaration> = Printable & Parseable<T> & Importer;
/**
 * A source element needs to set the importer so implements Importer interface
 */
export interface SourceElement<T extends Declaration = Declaration> extends SourceElementDef<T> {
    setParent(element: SourceElement): void;
    setKind(kind: ElementKind): void;
    getKind(): ElementKind;
    getName(): string;
};

/**
 * print(writter: Writter): boolean;
 * parse(node: T): void;
 * getImportHandler(): Imports;
 */
type RootSourceElementDef<T extends Declaration = Declaration> = Printable & Parseable<T> & ImporterGetter;
/**
 * A root source element, aka file, cannot expose an importer setter. It needs to be created inside so this way
 * we have protected the access.
 */
export interface RootSourceElement<T extends Declaration = Declaration> extends RootSourceElementDef<T> { };
