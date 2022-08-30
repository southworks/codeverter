import { Imports } from "../imports";

export interface ImporterGetter {
    getImportHandler(): Imports;
}

export interface Importer extends ImporterGetter {
    setImportHandler(handler: Imports): void;
}
