import { ValueMapper } from "../shared/default-value-mapper";
import { KnownTypes } from "../shared/type-mapper";

export class CSharpDefaultValueMapper extends ValueMapper {
    public get(type: KnownTypes): string {
        switch (type) {
            case KnownTypes.Boolean: return "false";
            case KnownTypes.Date: return "DateTime.Now";
            case KnownTypes.Number: return "0";
            case KnownTypes.String: return "\"\"";
            case KnownTypes.Void: return "";
            default:
                return "null";
        }
    }
}
