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

export interface CSharpHelpers extends CustomHelpers {
    generateInitializeValue(e: ValuedSourceElement, semicolon: boolean): string;
    interfaceName(val: string): string;
    printEnum(v: EnumSourceElement): string;
    printVariable(v: ValuedSourceElement): string;
    printMethod(p: ClassSourceElement | InterfaceSourceElement, v: ParametrizedSourceElement): string;
    printProperty(v: ValuedSourceElement, isInterface: boolean): string;
    printInterface(v: InterfaceSourceElement): string;
    printClass(v: ClassSourceElement): string;
}

export function getCSharpHelpers(helpers: TemplateHelper & CSharpHelpers): CSharpHelpers {
    return {
        mapDefaultValue: (e: TypedSourceElement) => {
            switch (e.knownType) {
                case "number": return " 0";
                case "string": return " \"\"";
                case "boolean": return " false";
                case "date": return " DateTime.Now";
                case "void": return "";
                case "array": return ` new ${helpers.mapType(e)} {}`;
                default:
                    return " null";
            }
        },
        mapType: (e: TypedSourceElement) => {
            const fn: Function = (kt: KnownTypes, t: string | KnownTypes) => {
                switch (kt) {
                    case "number": return "int";
                    case "string": return "string";
                    case "boolean": return "bool";
                    case "date": return "DateTime";
                    case "reference": return t;
                    case "void": return "void";
                    case "array": return `${fn(t, "")}[]`;
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
                    return ` = new ${helpers.mapType(e)} {${defaultValue}};`;
                } else if (e.knownType == "date") {
                    return ` = new DateTime(); //${e.value}`;
                } else if (e.knownType == "void") {
                    return ` = null; //${e.value}`;
                } else if (e.knownType == "string") {
                    return ` = "${e.value}";`;
                } else if (e.knownType == "reference") {
                    return ` = null; //${e.value}`;
                }
                return ` = ${e.value};`;
            }
            return semicolon ? ";" : "";
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
            let result = `        public enum ${name}\n`;
            result += "        {\n";
            result += v.value.map(i => {
                const hasValue = i.value != undefined;
                const value = hasValue
                    ? i.type == "number" ? i.value : `"${i.value}"`
                    : "";
                return `            ${helpers.capitalize(i.name)}${hasValue ? " = " : ""}${value}`;
            }).join(",\n");
            result += "\n        }";
            return result;
        },
        printVariable: (v: ValuedSourceElement) => {
            const name = v.kind == "constant" ? helpers.toUpperCase(v.name) : helpers.capitalize(v.name);
            const type = v.knownType == "void"
                ? "object"
                : helpers.mapType(v);
            let modifier;
            if (v.kind == "constant") {
                if (v.knownType == "number" || v.knownType == "string" || v.knownType == "boolean") {
                    modifier = "const ";
                } else {
                    modifier = "static readonly ";
                }
            } else {
                modifier = "static ";
            }
            const defaultValue = helpers.generateInitializeValue(v, true);
            return `public ${modifier}${type} ${name}${defaultValue}`;
        },
        printMethod: (p: ClassSourceElement | InterfaceSourceElement, v: ParametrizedSourceElement) => {
            const parameters = v.parameters.map(pa => {
                return `${helpers.mapType(pa)} ${pa.name}`;
            }).join(", ");
            const forInterface = p && p.kind == "interface";
            const visibility = forInterface ? "" : `${v.visibility} `;
            const trailingSemicolon = forInterface ? ";" : "";
            const staticModifier = v.static ? "static " : "";
            const returnType = v.kind != "ctr"
                ? `${helpers.mapType(v)} `
                : "";
            let result = `        ${visibility}${staticModifier}${returnType}${helpers.capitalize(v.name)}(${parameters})${trailingSemicolon}`;
            if (!forInterface) {
                result += "\n        {\n";
                result += v.variables.concat(v.constants).map(va => {
                    const refType = va.knownType == "reference" || va.knownType == "date" || va.knownType == "array";
                    const constModifier = (va.kind == "constant" && !refType) ? "const " : "";
                    const typeModifier = va.knownType == "void"
                        ? "var"
                        : helpers.mapType(va);
                    const defaultValue = helpers.generateInitializeValue(va, true);
                    return `            ${constModifier}${typeModifier} ${helpers.camelize(va.name)}${defaultValue}`;
                }).join("\n");

                if ((v.variables.length || v.constants.length) && v.content.length) {
                    result += "\n";
                }

                result += v.content.map(c => {
                    return `            // ${c}`;
                }).join("\n");

                if (v.kind != "ctr") {
                    result += `\n            return${helpers.mapDefaultValue(v)};`;
                }
                result += v.variables.length || v.content.length
                    ? "\n        }"
                    : "        }";
            }
            return result;
        },
        printProperty: (v: ValuedSourceElement, isInterface: boolean) => {
            let assignDefault = "";
            if (!isInterface) {
                assignDefault = helpers.generateInitializeValue(v, isInterface);
            }
            let visibilityTag = !isInterface ? `${v.visibility} ` : "";
            let propertyTag = `${visibilityTag}${helpers.mapType(v)} ${helpers.capitalize(v.name)} { get; set; }${assignDefault}`;
            return propertyTag;
        },
        printInterface: (v: InterfaceSourceElement) => {
            const name = helpers.interfaceName(v.name);
            const ext = v.extends.length
                ? ` : ${v.extends.map(e => helpers.interfaceName(e.name)).join(", ")}`
                : "";
            let result = `    ${v.visibility} ${v.kind} ${name}${ext}`;
            result += "\n    {\n";

            result += v.properties.map(p => {
                return `        ${helpers.printProperty(p, true)}`;
            }).join("\n");

            if (v.properties.length && v.methods.length) {
                result += "\n";
            }

            result += v.methods.map(m => {
                return helpers.printMethod(v, m);
            }).join("\n");
            return result + "\n    }";
        },
        printClass: (v: ClassSourceElement) => {
            const name = helpers.capitalize(v.name);
            const extList = v.extends.map(e => helpers.capitalize(e.name))
                .concat(v.implements.map(i => helpers.interfaceName(i.name)));

            const ext = extList.length
                ? ` : ${extList.join(", ")}`
                : "";

            let result = `    ${v.visibility} ${v.kind} ${name}${ext}`;
            result += "\n    {\n";

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

            return result + "\n    }";
        }
    }
}
