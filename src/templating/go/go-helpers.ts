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
    RootSourceElement,
    TypedSourceElement,
    ValuedSourceElement,
    VisibilitySourceElement
} from "../../shared/types/source-element";
import { CustomHelpers } from "../custom/custom-helpers";
import { TemplateHelper } from "../template-helpers";

export interface GoHelpers extends CustomHelpers {
    getArrayValue(v: ValuedSourceElement): string;
    fixName(e: VisibilitySourceElement): string;
    printVariable(v: ValuedSourceElement, global: boolean): string;
    printEnum(v: EnumSourceElement): string;
    printClass(v: ClassSourceElement): string;
    printInterface(v: InterfaceSourceElement): string;
    printProperty(v: ValuedSourceElement): string;
    printConstructor(v: ParametrizedSourceElement): string;
    printMethodBody(v: ParametrizedSourceElement): string;
    printMethod(p: ClassSourceElement | InterfaceSourceElement, v: ParametrizedSourceElement): string;
    printImports: (s: RootSourceElement) => string;
}

export function getGoHelpers(helpers: TemplateHelper & GoHelpers): GoHelpers {
    return {
        mapDefaultValue: (e: TypedSourceElement) => {
            switch (e.knownType) {
                case "number": return "0";
                case "string": return "\"\"";
                case "boolean": return "false";
                case "date": return "time.Now()";
                case "void": return "";
                case "array": return "nil";
                default:
                    return "nil";
            }
        },
        mapType: (e: TypedSourceElement) => {
            const fn: Function = (kt: KnownTypes, t: string | KnownTypes) => {
                switch (kt) {
                    case "number": return "int";
                    case "string": return "string";
                    case "boolean": return "bool";
                    case "date": return "time.Time";
                    case "reference": return `*${t}`;
                    case "void": return "";
                    case "array": return `[]${fn(t, "")}`;
                    default:
                        return "error";
                }
            };
            return fn(e.knownType, e.type);
        },
        getArrayValue: (v: ValuedSourceElement) => {
            let defaultValue = helpers.getArrayDefault(v.value!);
            let type = helpers.mapType(v);
            return `${type}{${defaultValue}}`;
        },
        printVariable: (v: ValuedSourceElement, global: boolean) => {
            const name = v.visibility == "public" && global
                ? helpers.capitalize(v.name)
                : helpers.camelize(v.name);

            const declarationPrefix = (v.kind == "constant" && !["array", "date", "reference"].includes(v.knownType))
                ? "const "
                : global ? "var " : "";
            const asignChar = v.knownType != "void"
                ? (v.kind == "constant" || global) ? " =" : " :="
                : "";

            let value = v.value;
            if (v.knownType == "string") {
                value = `"${v.value}"`;
            } else if (v.knownType == "void" && v.value) {
                value = `interface{} // ${v.value}`;
            } else if (v.knownType == "array") {
                value = helpers.getArrayValue(v);
            } else if (v.knownType == "date") {
                value = `time.Now() // ${v.value}`;
            } else if (v.knownType == "reference") {
                value = `new(${v.type}) // ${v.value}`;
            }
            if (value == "") {
                return ""; // cannot define empty const/var in go
            }
            let type = global ? helpers.mapType(v) : "";
            if (type != "") {
                type = ` ${type}`;
            }
            return `${declarationPrefix}${name}${type}${asignChar} ${value}`;
        },
        printEnum: (v: EnumSourceElement) => {
            let result = `const (`;
            v.value.forEach((k, i) => {
                let value = k.value;
                let type = typeof value === "string" ? "string" : "int";
                value = type == "string" ? `"${value}"` : value;
                let memberStr = `${k.name}`;
                memberStr += i == 0
                    ? ` ${type} = ${value == undefined ? "iota" : value}`
                    : value ? ` = ${value}` : "";
                result = `${result}\n\t${memberStr}`;
            });
            return `${result}\n)`;
        },
        printProperty: (v: ValuedSourceElement) => {
            const name = helpers.fixName(v);
            let type = helpers.mapType(v);
            return `${name} ${type}`;
        },
        fixName: (e: VisibilitySourceElement) => {
            return e.visibility == "public" ? helpers.capitalize(e.name) : helpers.camelize(e.name);
        },
        printMethod: (p: ClassSourceElement | InterfaceSourceElement, v: ParametrizedSourceElement) => {
            const params = v.parameters.map(p => {
                let type = helpers.mapType(p);
                return `${p.name} ${type}`;
            }).join(", ");
            let resultType = helpers.mapType(v);
            if (!!resultType) {
                resultType = ` ${resultType}`;
            }
            if (!p || p.kind == "class") {
                const receiver = p
                    ? `(${helpers.toLowerCase(p.name[0])} *${helpers.fixName(p)}) `
                    : "";
                let result = `func ${receiver}${helpers.fixName(v)}(${params})${resultType} {`;
                result = `${result}${helpers.printMethodBody(v)}`;
                result = `${result}\n\treturn`;
                if (v.knownType != "void") {
                    result = `${result} ${helpers.mapDefaultValue(v)}`;
                }
                return `${result}\n}`;
            }
            return `${helpers.fixName(v)}(${params})${resultType}`;
        },
        printMethodBody: (v: ParametrizedSourceElement) => {
            let vars = v.constants.concat(v.variables)
                .map(e => helpers.printVariable(e, false))
                .join("\n\t");
            if (!!vars) {
                vars = `\n\t${vars}`;
            }
            let result = vars;
            v.content.forEach(l => {
                if (l.trim() != "") {
                    result = `${result}\n\t//${l}`;
                }
            });
            return result;
        },
        printConstructor: (v: ParametrizedSourceElement) => {
            const params = v.parameters.map(p => {
                let type = helpers.mapType(p);
                return `${p.name} ${type}`;
            }).join(", ");

            let result = `func New${helpers.capitalize(v.name)}(${params}) *${helpers.fixName(v)} {`;

            const firstLetter = v.name.charAt(0).toLowerCase();
            const init = `${firstLetter} := ${helpers.fixName(v)}{}`;
            result = `${result}\n\t${init}`;
            result = `${result}${helpers.printMethodBody(v)}`;
            result = `${result}\n\treturn &${firstLetter}`;
            return `${result}\n}`;
        },
        printClass: (v: ClassSourceElement) => {
            let result = `type ${helpers.fixName(v)} struct {`
            v.extends.forEach(e => {
                // maybe mismatch name because visibility
                result = `${result}\n\t${e.name}`;
            });
            v.properties.forEach(p => {
                result = `${result}\n\t${helpers.printProperty(p)}`;
            });
            result = `${result}\n}`;

            const constructors: any[] = helpers.orderBy(v.constructors as [],
                "visibility",
                ["public", "protected", "private"]) as [];
            // the first constructor
            const constructor = constructors[0];
            if (constructor) {
                result = `${result}\n\n${helpers.printConstructor(constructor)}`;
            }

            v.methods.forEach(m => {
                result = `${result}\n\n${helpers.printMethod(v, m)}`;
            });
            return result;
        },
        printInterface: (v: InterfaceSourceElement) => {
            let result = `type ${helpers.fixName(v)} interface {`
            v.extends.forEach(e => {
                //visibility?
                result = `${result}\n\t${e.name}`;
            });

            v.methods.forEach(m => {
                result = `${result}\n\t${helpers.printMethod(v, m)}`;
            });
            return result + "\n}";
        },
        printImports: (s: RootSourceElement) => {
            const types = s.variables.map(v => v.knownType)
                .concat(s.constants.map(v => v.knownType))
                .concat(s.functions.map(v => v.knownType))
                .concat(s.functions.flatMap(f => f.parameters.map(p => p.knownType)))
                .concat(s.interfaces.flatMap(i => i.methods.map(m => m.knownType)))
                .concat(s.classes.flatMap(c => c.methods.map(m => m.knownType)))
                .concat(s.classes.flatMap(c => c.methods.flatMap(m => m.variables.map(v => v.knownType))))
                .concat(s.classes.flatMap(c => c.methods.flatMap(m => m.constants.map(v => v.knownType))))
                .concat(s.classes.flatMap(c => c.methods.flatMap(p => p.parameters.map(pa => pa.knownType))))
                .concat(s.classes.flatMap(c => c.properties.map(m => m.knownType)))
                .concat(s.classes.flatMap(c => c.constants.map(m => m.knownType)))
                .concat(s.classes.flatMap(c => c.constructors.flatMap(p => p.parameters.map(pa => pa.knownType))));
            if (types.includes("date")) {
                return `\nimport "time"\n`;
            }
            return "";
        }
    }
}
