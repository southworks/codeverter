import { File } from "../shared/file";
import { KnownTypes } from "../shared/type-mapper";

interface TemplateHelper {
    capitalize(str: string): string;
    camelize(str: string): string;
    toUpperCase(str: string): string;
    toLowerCase(str: string): string;
    sanitize(str: string, replaceChar: string): string;
    orderBy(values: [] | string, field: string, order: [] | string): [] | string;
    mapType(kt: KnownTypes | string, t: string): string;
    mapDefaultValue(t: KnownTypes | string): string;
    splitBlock(...values: any[]): string;
    ifAny(...values: any[]): boolean | string;
}

export abstract class TemplateGenerator implements TemplateHelper {
    private content: string[] = [];

    private static getHelpers(generator: TemplateGenerator): TemplateHelper {
        return {
            capitalize: (str: string) => { return str.replace(/\w/, c => c.toUpperCase()); },
            camelize: (str: string) => { return str[0].toLowerCase() + str.substring(1) },
            toUpperCase: (str: string) => { return str.toUpperCase(); },
            toLowerCase: (str: string) => { return str.toLowerCase(); },
            sanitize: (str: string, replaceChar: string) => str.replace(/[^a-zA-Z0-9_ ]/g, replaceChar),
            orderBy: (e: [], f: string, s: []) => {
                return e.sort((a, b) => {
                    let indexA = s.indexOf(a[f]);
                    let indexB = s.indexOf(b[f]);
                    return indexA - indexB;
                });
            },
            mapType: generator.getTypeMap,
            mapDefaultValue: generator.getDefaultValueMap,
            splitBlock: (...values: any[]) => {
                if (values.every(v => v && v.length)) {
                    return `\n`;
                }
                return "";
            },
            ifAny: (...values: any[]) => {
                if (values.find(v => v && v.length)) {
                    return true;
                }
                return false;
            },
            ...generator.getCustomHelpers()
        }
    };

    protected addLine(val: string): void {
        this.content.push(val);
    }

    protected addNewLineIf(cond: string): void {
        this.addLine(`<% if(${cond}) {_%>`);
        this.addLine(``);
        this.addLine(`<% } _%>`);
    }

    protected addComment(comment: string): void {
        this.addLine(`<%# ${comment} -%>`);
    }

    protected startFor(variable: string, collection: string): void {
        this.addLine(`<% ${collection}.forEach((${variable}, i) => {_%>`);
    }

    protected endFor(): void {
        this.addLine(`<% }); _%>`);
    }

    /**
     * implement custom helpers
     */
    protected getCustomHelpers(): object {
        return {};
    }

    public abstract getDefaultValueMap(type: KnownTypes): string;
    public abstract getTypeMap(knowType: KnownTypes, type: string): string;
    public abstract getExtension(): string;

    public getTemplate(): string {
        return this.content.join("\n");
    }

    public static get(generator: TemplateGenerator, file: File): { template: string, data: object } {
        return {
            template: generator.getTemplate(),
            data: {
                sourceFile: file,
                helpers: TemplateGenerator.getHelpers(generator)
            }
        }
    }

    /**
     * mocks for templating
     */
    public camelize(str: string, includeTags: boolean = true): string {
        let camelize = `helpers.camelize(${str})`;
        if (includeTags) {
            camelize = `<%=${camelize}%>`;
        }
        return camelize;
    }

    public capitalize(str: string, includeTags: boolean = true): string {
        let capitalize = `helpers.capitalize(${str})`;
        if (includeTags) {
            capitalize = `<%=${capitalize}%>`;
        }
        return capitalize;
    }

    public sanitize(str: string, replaceChar: string): string {
        return `<%=helpers.sanitize(${str}, "${replaceChar}")%>`;
    }

    public toUpperCase(str: string): string {
        return `<%=helpers.toUpperCase(${str})%>`;
    }

    public toLowerCase(str: string): string {
        return `<%=helpers.toLowerCase(${str})%>`;
    }

    public orderBy(values: [] | string, field: string, order: [] | string): string {
        return `helpers.orderBy(${values}, "${field}", ${order})`;
    }

    public mapType(kt: string, t: string, includeTags: boolean = true): string {
        let map = `helpers.mapType(${kt}, ${t})`;
        if (includeTags) {
            map = `<%=${map}%>`
        }
        return map;
    }

    public mapDefaultValue(t: KnownTypes | string): string {
        return `<%- helpers.mapDefaultValue(${t}) _%>`;
    }

    public splitBlock(...values: any[]): string {
        return `<%- helpers.splitBlock(${values.join(", ")}) _%>`;
    }

    public ifAny(...values: any[]): string | boolean {
        return `helpers.ifAny(${values.join(", ")})`;
    }
}
