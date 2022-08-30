import { Writteable } from "../writter/writter";
import { Printable } from "./types/printable";

export abstract class Imports implements Printable {
    private imports: string[] = [];

    protected get(): string[] {
        return this.imports
    }

    public add(value: string): void {
        if (!this.imports.includes(value)) {
            this.imports.push(value);
        }
    }

    public abstract print(writter: Writteable): boolean;
}
