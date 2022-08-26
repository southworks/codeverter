import { Writter } from "../writter/writter";

export interface Printable {
    print(writter: Writter): void;
}
