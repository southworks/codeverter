import { KnownTypes, TypeMapperImpl } from "../shared/type-mapper";

export class GoTypeMapper extends TypeMapperImpl {
    protected getKnownType(type: KnownTypes): string {
        switch (type) {
            case KnownTypes.Boolean: return "bool"
            case KnownTypes.Number: return "int" // review
            case KnownTypes.String: return "string"
            case KnownTypes.Date: return "time.Time"
            default:
                console.error("Not supported", type);
                return "error";
        }
    }
}
