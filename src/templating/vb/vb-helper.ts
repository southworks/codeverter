/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { KnownTypes } from "../../shared/type-mapper";
import {
    ClassSourceElement,
    EnumSourceElement,
    InterfaceSourceElement,
    ParametrizedSourceElement,
    TypedSourceElement,
    ValuedSourceElement
} from "../../shared/types/source-element";
import { CustomHelpers } from "../custom/custom-helpers";
import { TemplateHelper } from "../template-helpers";

export interface VBHelpers extends CustomHelpers {
    generateInitializeValue(e: ValuedSourceElement, semicolon: boolean): string;
    interfaceName(val: string): string;
    printEnum(v: EnumSourceElement): string;
    printVariable(v: ValuedSourceElement): string;
    printMethod(p: ClassSourceElement | InterfaceSourceElement, v: ParametrizedSourceElement): string;
    printProperty(v: ValuedSourceElement, isInterface: boolean): string;
    printInterface(v: InterfaceSourceElement): string;
    printClass(v: ClassSourceElement): string;
}

export function getVBHelpers(helpers: TemplateHelper & VBHelpers): VBHelpers {
    return {
        mapDefaultValue: (e: TypedSourceElement) => {
            switch (e.knownType) {
                case "number": return " 0";
                case "string": return " \"\"";
                case "boolean": return " false";
                case "date": return " DateTime.Now";
                case "void": return "";
                case "array": return ` {}`;
                default:
                    return " null";
            }
        },
        mapType: (e: TypedSourceElement) => {
            const fn: Function = (kt: KnownTypes, t: string | KnownTypes) => {
                switch (kt) {
                    case "number": return "Integer";
                    case "string": return "String";
                    case "boolean": return "Boolean";
                    case "date": return "Date";
                    case "reference": return t;
                    case "void": return "void";
                    case "array": return `${fn(t, "")}()`;
                    case "any": return "object";
                    default:
                        return "error";
                }
            };
            return fn(e.knownType, e.type);
        },
        generateInitializeValue: (e: ValuedSourceElement, semicolon: boolean) => {
            if (e.value != undefined) {
                if (e.knownType == "array") {
                    let defaultValue = helpers.getArrayDefault(e.value);
                    defaultValue = defaultValue === "" ? defaultValue : ` ${defaultValue} `;
                    return ` = {${defaultValue}}`;
                } else if (e.knownType == "date") {
                    return ` = new DateTime() '${e.value}`;
                } else if (e.knownType == "void") {
                    return ` = New Object() '${e.value}`;
                } else if (e.knownType == "string") {
                    return ` = "${e.value}"`;
                } else if (e.knownType == "reference") {
                    return ` = ${helpers.capitalize(e.value)} '${e.value}`;
                }
                return ` = ${e.value}`;
            }
            return "";
        },
        interfaceName: (val: string) => {
            let intfName = val.replace(/\w/, c => c.toUpperCase());
            if (intfName[0] != "I") {
                intfName = "I" + intfName;
            }
            return intfName;
        },
        printEnum: (v: EnumSourceElement) => {
            const name = helpers.capitalize(v.name);
            let result = `        Enum ${name}\n`;
            result += v.value.map(i => {
                const hasValue = i.value != undefined && i.type == "number";
                const value = hasValue
                    ? i.type == "number" ? i.value : `"${i.value}"`
                    : "";
                return `            ${helpers.capitalize(i.name)}${hasValue ? " = " : ""}${value}`;
            }).join("\n");
            result += "\n        End Enum";
            return result;
        },
        printVariable: (v: ValuedSourceElement) => {
            let name = v.kind == "constant" ? helpers.toUpperCase(v.name) : helpers.capitalize(v.name);
            const type = v.knownType == "void"
                ? "Object"
                : helpers.mapType(v);
            let modifier = "Dim ";
            if (v.kind == "constant") {
                if (v.knownType == "number" || v.knownType == "string" || v.knownType == "boolean") {
                    modifier = "Const ";
                } else {
                    modifier = "ReadOnly ";
                }
            }

            const defaultValue = helpers.generateInitializeValue(v, false);
            return `${modifier}${name} As ${type}${defaultValue}`;
        },
        printMethod: (p: ClassSourceElement | InterfaceSourceElement, v: ParametrizedSourceElement) => {
            const parameters = v.parameters.map(pa => {
                return `${pa.name} As ${helpers.mapType(pa)}`;
            }).join(", ");
            const forInterface = p && p.kind == "interface";
            const visibility = forInterface ? "" : `${helpers.capitalize(v.visibility)} `;
            let result = v.knownType == "void"
                ? `        ${visibility}Sub ${helpers.capitalize(v.name)}(${parameters})`
                : `        ${visibility}Function ${helpers.capitalize(v.name)}(${parameters}) As ${helpers.mapType(v)}`;
            if (!forInterface) {
                result += "\n";
                result += v.variables.concat(v.constants).map(va => {
                    const refType = va.knownType == "reference" || va.knownType == "date" || va.knownType == "array";
                    const constModifier = (va.kind == "constant" && !refType) ? "Const " : "Dim ";
                    const typeModifier = va.knownType == "void"
                        ? "Object"
                        : helpers.mapType(va);
                    const defaultValue = helpers.generateInitializeValue(va, true);
                    return `            ${constModifier}${helpers.camelize(va.name)} As ${typeModifier}${defaultValue}`;
                }).join("\n");

                if ((v.variables.length || v.constants.length) && v.content.length) {
                    result += "\n";
                }

                result += v.content.map(c => {
                    return `            ' ${c.replace("this.", "").replace(";", "").trim()}`;
                }).join("\n");

                if (v.kind != "ctr" && v.knownType != "void") {
                    result += `\n            return${helpers.mapDefaultValue(v)}`;
                }

                if (v.knownType != "void") {
                    result += v.variables.length || v.content.length
                        ? "\n        End Function"
                        : "        End Function";
                } else {
                    result += v.variables.length || v.content.length
                        ? "\n        End Sub"
                        : "        End Sub";
                }

            }
            return result;
        },
        printProperty: (v: ValuedSourceElement, isInterface: boolean) => {
            let visibilityTag = !isInterface ? `${v.visibility} ` : "";
            let propertyTag = `${helpers.capitalize(visibilityTag)}Property ${helpers.capitalize(v.name)} As ${helpers.mapType(v)}`;
            return propertyTag;
        },
        printInterface: (v: InterfaceSourceElement) => {
            const name = helpers.interfaceName(v.name);
            const ext = v.extends.length
                ? ` : ${v.extends.map(e => helpers.interfaceName(e.name)).join(", ")}`
                : "";
            let result = `    ${helpers.capitalize(v.visibility)} ${helpers.capitalize(v.kind)} ${name}${ext}\n`;

            result += v.properties.map(p => {
                return `        ${helpers.printProperty(p, true)}`;
            }).join("\n");

            if (v.properties.length && v.methods.length) {
                result += "\n";
            }

            result += v.methods.map(m => {
                return helpers.printMethod(v, m);
            }).join("\n");
            return result + "\n    End Interface";
        },
        printClass: (v: ClassSourceElement) => {
            const name = helpers.capitalize(v.name);
            const extList = v.extends.map(e => helpers.capitalize(e.name))
                .concat(v.implements.map(i => helpers.interfaceName(i.name)));

            const ext = extList.length
                ? ` : ${extList.join(", ")}`
                : "";

            let result = `    ${helpers.capitalize(v.visibility)} ${helpers.capitalize(v.kind)} ${name}${ext}`;
            result += "\n";

            const visibility = helpers.defaultVisibilityOrder();
            result += helpers.orderBy(v.properties, "visibility", visibility).map(p => {
                return `        ${helpers.printProperty(p, false)}`;
            }).join("\n");

            if (v.properties.length && v.constructors.length) {
                result += "\n\n";
            }

            result += helpers.orderBy(v.constructors, "visibility", visibility).map(c => {
                return `${helpers.printMethod(v, c)}`;
            }).join("\n\n");

            if (v.methods.length && (v.constructors.length || v.properties.length)) {
                result += "\n\n";
            }

            result += helpers.orderBy(v.methods, "visibility", visibility).map(m => {
                return `${helpers.printMethod(v, m)}`;
            }).join("\n\n");

            return result + "\n    End Class";
        }
    }
}
