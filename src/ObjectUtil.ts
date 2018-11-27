export class ObjectUtil {

    public static toMapObject<T>(keys: string[], value: T): { [key: string]: T; } {
        const obj: any = {};
        for (const key of keys) {
            obj[key] = value;
        }
        return obj;
    }
}
