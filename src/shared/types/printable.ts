import { Writteable } from "../../writter/writter";

export interface Printable {
    print(writter: Writteable): boolean;
}
