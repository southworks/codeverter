import { KnownTypes, TypeMapperImpl } from "../shared/type-mapper";

export class CSharpTypeMapper extends TypeMapperImpl {

    protected getVoidType(): string {
        return "void";
    }

    protected getKnownType(type: KnownTypes): string {
        switch (type) {
            case KnownTypes.Boolean: return "bool";
            case KnownTypes.Number: return "int"; // review
            case KnownTypes.String: return "string";
            case KnownTypes.Date: {
                this.getImportHandler().add("system");
                return "DateTime";
            }
            default:
                console.error("Not supported", type);
                return "error";
        }
    }
}
