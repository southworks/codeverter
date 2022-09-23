import { Class } from "./shared/class";
import { Constructor } from "./shared/constructor";
import { Enum } from "./shared/enum";
import { File } from "./shared/file";
import { Function } from "./shared/function";
import { Imports } from "./shared/imports";
import { Interface } from "./shared/interface";
import { Method } from "./shared/method";
import { Parameter } from "./shared/parameter";
import { Property } from "./shared/property";
import { ElementFactory } from "./shared/types/factory";
import { Variable } from "./shared/variable";

export const elementRegistry: ElementFactory = {
    class: Class,
    constant: Variable,
    variable: Variable,
    ctr: Constructor,
    enum: Enum,
    file: File,
    function: Function,
    //imports: Imports,
    interface: Interface,
    method: Method,
    parameter: Parameter,
    property: Property
}
