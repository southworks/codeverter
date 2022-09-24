/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { KnownTypes } from "../../shared/type-mapper";
import { ClassSourceElement, EnumSourceElement, InterfaceSourceElement, ParametrizedSourceElement, RootSourceElement, ValuedSourceElement, VisibilitySourceElement } from "../../shared/types/source-element";
import { TemplateGenerator } from "../template-generator";
import { TemplateHelper } from "../template-helpers";

interface GoHelpers {
    printVariable(v: ValuedSourceElement, global: boolean): string;
    printEnum(v: EnumSourceElement): string;
    printClass(v: ClassSourceElement): string;
    printInterface(v: InterfaceSourceElement): string;
    printProperty(v: ValuedSourceElement): string;
    fixName(e: VisibilitySourceElement): string;
    printConstructor(v: ParametrizedSourceElement): string;
    printMethodBody(v: ParametrizedSourceElement): string;
    printMethod(p: ClassSourceElement | InterfaceSourceElement, v: ParametrizedSourceElement): string;
    printImports: (s: RootSourceElement) => string;
}

export class GoGenerator extends TemplateGenerator {
    public getCustomHelpers(helpers: TemplateHelper & GoHelpers): GoHelpers {
        return {
            // generateInitializeValue: (kt: KnownTypes, t: string, value: string, semicolon: boolean) => {
            //     if (!!value) {
            //         if (kt == 6) { //KnownTypes.Array
            //             let defaultValue = value;
            //             if (value.match("new Array")) {
            //                 defaultValue = value.match(/\((.*?)\)/g)?.toString().replace("(", "").replace(")", "") ?? value;
            //             } else if (value.includes("[") && value.includes("]")) {
            //                 defaultValue = value.replace("[", "").replace("]", "");
            //             }
            //             defaultValue = defaultValue === "" ? defaultValue : ` ${defaultValue} `;
            //             return ` = new ${helpers.mapType(kt, t)} {${defaultValue}};`;
            //         } else if (kt == 3) { //KnownTypes.Date
            //             return ` = new DateTime();`;
            //         } else if (kt == 1) { //KnownTypes.String
            //             return ` = "${value}";`;
            //         }
            //         return ` = ${value};`;
            //     }
            //     return semicolon ? ";" : "";
            // },
            // interfaceName: (val: string) => {
            //     let intfName = val.replace(/\w/, c => c.toUpperCase());
            //     if (intfName[0] != "I") {
            //         intfName = "I" + intfName;
            //     }
            //     return intfName;
            // },
            printVariable: (v: ValuedSourceElement, global: boolean) => {
                const name = v.visibility == "public" && global
                    ? helpers.capitalize(v.name)
                    : helpers.toLowerCase(v.name);
                const declarationPrefix = v.kind == "constant" ? "const" : "var";
                const asignChar = (v.kind == "constant" || v.knownType != 5) ? "=" : ":=";

                let value = v.value;
                if (v.knownType == 1 || (v.knownType == 5 && isNaN(+v.value!))) {
                    value = `"${v.value}"`;
                }
                if (value == "") {
                    return ""; // cannot define empty const/var in go
                }
                let type = helpers.mapType(v.knownType, v.type);
                if (type != "") {
                    type = ` ${type}`;
                }
                return `${declarationPrefix} ${name}${type} ${asignChar} ${value}`;
            },
            printEnum: (v: EnumSourceElement) => {
                let result = `const (`;
                v.value.forEach((k, i) => {
                    let value = k.value;
                    let type = typeof value === "string" ? "string" : "int";
                    value = type == "string" ? `"${value}"` : value;
                    let memberStr = `${k.name}`;
                    memberStr += i == 0
                        ? ` ${type} = ${value || value === 0 ? value : "iota"}`
                        : value ? ` = ${value}` : "";
                    result = `${result}\n\t${memberStr}`;
                });
                return `${result}\n)`;
            },
            printProperty: (v: ValuedSourceElement) => {
                const name = helpers.fixName(v);
                let type = helpers.mapType(v.knownType, v.type);
                return `${name} ${type}`;
            },
            fixName: (e: VisibilitySourceElement) => {
                return e.visibility == "public" ? helpers.capitalize(e.name) : helpers.camelize(e.name);
            },
            printMethod: (p: ClassSourceElement | InterfaceSourceElement, v: ParametrizedSourceElement) => {
                const params = v.parameters.map(p => {
                    let type = helpers.mapType(p.knownType, p.type);
                    return `${p.name} ${type}`;
                }).join(", ");
                let resultType = helpers.mapType(v.knownType, v.type);
                if (!!resultType) {
                    resultType = ` ${resultType}`;
                }
                if (p.kind == "class") {
                    const receiver = p
                        ? `(${helpers.toLowerCase(p.name[0])} *${helpers.fixName(p)}) `
                        : "";
                    let result = `func ${receiver}${helpers.fixName(v)}(${params})${resultType} {`;
                    debugger;
                    result = `${result}${helpers.printMethodBody(v)}`;
                    result = `${result}\n\treturn${helpers.mapDefaultValue(v.knownType)}`;
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
                    let type = helpers.mapType(p.knownType, p.type);
                    return `${p.name} ${type}`;
                }).join(", ");

                let result = `func New${helpers.capitalize(v.name)}(${params}) *${helpers.fixName(v)} {`;

                const firstLetter = v.name.charAt(0).toLowerCase();
                const init = `${firstLetter} := ${helpers.fixName(v)}{}`
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
                    result = `${result}\n\n${helpers.printMethod(v, m)}`
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
                    result = `${result}\n\t${helpers.printMethod(v, m)}`
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
                if (types.includes(3)) {
                    return `\nimport "time"\n`
                }
                return "";
            }
        }
    }

    /**
     * Use integers instead the enum to easily convert into string.
     * @param type 
     * @returns 
     */
    public getDefaultValueMap(type: KnownTypes): string {
        switch (type) {
            case 0: return " 0";
            case 1: return " \"\"";
            case 2: return " false";
            case 3: return " new Date()";
            case 5: return "";
            default:
                return " null";
        }
    }

    /**
     * Use anonymous function to be able to call it again inside
     * Use integers instead the enum to easily convert into string.
     * @param knowType 
     * @param type 
     * @returns 
     */
    public getTypeMap(knowType: KnownTypes, type: string): string {
        const fn: Function = (kt: KnownTypes, t: string) => {
            switch (kt) {
                case 0: return "int";
                case 1: return "string";
                case 2: return "bool";
                case 3: return "time.Time";
                case 4: return t; //KnownTypes.Reference
                case 5: return ""; //KnownTypes.Void
                case 6: return `[]${fn(+t, "")}`;
                default:
                    return "error";
            }
        };
        return fn(knowType, type);
    }

    public getExtension(): string {
        return ".go";
    }

    private printVariable(varName: string, global: boolean): string {
        return `<%-helpers.printVariable(${varName}, ${global})%>`;
    }

    private printEnum(varName: string): string {
        return `<%-helpers.printEnum(${varName})%>`;
    }

    private printClass(varName: string): string {
        return `<%-helpers.printClass(${varName})%>`;
    }

    private printInterface(varName: string): string {
        return `<%-helpers.printInterface(${varName})%>`;
    }
    private printImports(varName: string): string {
        return `<%-helpers.printImports(${varName})%>`;
    }

    public getTemplate(): string {
        this.addLine(`<% let visibilityOrder = ["public", "protected", "private"];`);
        this.addLine(`let classes = ${this.orderBy("sourceFile.classes", "visibility", "visibilityOrder")};`);
        this.addLine(`let interfaces = ${this.orderBy("sourceFile.interfaces", "visibility", "visibilityOrder")};`);
        this.addLine(`let variables = sourceFile.variables;`);
        this.addLine(`let constants = sourceFile.constants;`);
        this.addLine(`let functions = sourceFile.functions;`);
        this.addLine(`let enumerates = sourceFile.enumerates;`);
        this.addLine(`_%>`);
        this.addLine(`package ${this.sanitize(this.toLowerCase("sourceFile.name", false), "_")}`);
        this.addLine(this.printImports("sourceFile"));
        this.startFor("e", this.orderBy("enumerates", "visibility", "visibilityOrder"));
        this.addNewLineIf("i != 0");
        this.addLine(this.printEnum("e"));
        this.endFor();
        this.addLine(this.splitBlock("enumerates", "variables.concat(constants)"));
        this.startFor("v", this.orderBy("variables", "visibility", "visibilityOrder"));
        this.addLine(this.printVariable("v", true));
        this.endFor();
        this.addLine(this.splitBlock("variables", "constants"));
        this.startFor("c", this.orderBy("constants", "visibility", "visibilityOrder"));
        this.addLine(this.printVariable("c", true));
        this.endFor();
        this.addLine(this.splitBlock("interfaces", "variables.concat(constants).concat(enumerates)"));
        this.startFor("n", "interfaces");
        this.addNewLineIf("i != 0");
        this.addLine(this.printInterface("n"));
        this.endFor();
        this.addLine(this.splitBlock("classes", "variables.concat(constants).concat(enumerates).concat(interfaces)"));
        this.startFor("c", "classes");
        this.addNewLineIf("i != 0");
        this.addLine(this.printClass("c"));
        this.endFor();
        return super.getTemplate();
    }
}
