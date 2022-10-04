/**
 * @license
 * Copyright 2022 SOUTHWORKS UK LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/southworks/codeverter/blob/main/LICENSE
 */

import { TemplateGenerator } from "./template-generator";

export interface TemplateHelper {
    getArrayDefault(str: string): string;
    capitalize(str: string): string;
    camelize(str: string): string;
    toUpperCase(str: string): string;
    toLowerCase(str: string): string;
    sanitize(str: string, replaceChar: string): string;
    orderBy(values: any[], field: string, order: string[]): [];
    splitBlock(...values: any[]): string;
    ifAny(...values: any[]): boolean;
    defaultVisibilityOrder(): string[];
}

export class TemplateHelpers {

    /**
     * transform pattern:
     * methodName(...params) {} to methodName: (...params) => {}
     * @param fnName 
     * @param fnStr 
     * @returns 
     */
    private static sanitizeFn(fnName: string, fn: Function): string {
        let fnStr = fn.toString();
        if (fnName != fn.name) {
            let fnOffset = fnStr.indexOf("(");
            fnStr = fnStr.substring(fnOffset);
            fnOffset = fnStr.indexOf(")");

            fnStr = fnStr.substring(0, fnOffset + 1) + " =>" + fnStr.substring(fnOffset + 1);
        }
        return `${fnName}: ${fnStr}`;
    }

    private static merge(prefix: string, values: string[], suffix: string): string {
        let result = prefix;
        for (let i = 0; i < values.length; i++) {
            result = `${result}  ${values[i]}`
            if (i < values.length - 1) {
                result = result + ",";
            }
            result = result + "\r\n";
        }
        return result + suffix;
    }

    public static toString(helpers: TemplateHelper): string {
        const methods: string[] = [];
        Object.keys(helpers).forEach(k => {
            let fn: Function = (helpers as any)[k];
            let sanitizedFn = TemplateHelpers.sanitizeFn(k, fn);
            methods.push(sanitizedFn);
        });
        return TemplateHelpers.merge("const helpers = {\r\n", methods, "}");
    }

    public static build(generator: TemplateGenerator): TemplateHelper {
        const defaulHelpers = {
            defaultVisibilityOrder: generator.getDefaultVisibilityOrder,
            capitalize: (str: string) => { return str.replace(/\w/, c => c.toUpperCase()); },
            getArrayDefault: (str: string) => {
                let result = str;
                if (str?.match("new Array")) {
                    result = str.match(/\((.*?)\)/g)?.toString().replace("(", "").replace(")", "") ?? str;
                } else if (str?.includes("[") && str.includes("]")) {
                    result = str.replace("[", "").replace("]", "");
                }
                return result;
            },
            camelize: (str: string) => { return str[0].toLowerCase() + str.substring(1) },
            toUpperCase: (str: string) => { return str.toUpperCase(); },
            toLowerCase: (str: string) => { return str.toLowerCase(); },
            sanitize: (str: string, replaceChar: string) => { return str.replace(/[^a-zA-Z0-9_ ]/g, replaceChar) },
            orderBy: (e: [], f: string, s: []) => {
                return e.sort((a, b) => {
                    let indexA = s.indexOf(a[f]);
                    let indexB = s.indexOf(b[f]);
                    return indexA - indexB;
                });
            },
            splitBlock: (...values: any[]) => {
                if (values.every(v => v && v.length)) {
                    return "\n";
                }
                return "";
            },
            ifAny: (...values: any[]) => {
                if (values.find(v => v && v.length)) {
                    return true;
                }
                return false;
            }
        };
        return {
            ...defaulHelpers,
            ...generator.getCustomHelpers(defaulHelpers)
        }
    }
}
