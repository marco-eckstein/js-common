import { ObjectUtil } from "./ObjectUtil";

describe("ObjectUtil", () => {

    it("works", () => {
        expect(ObjectUtil.toMapObject(["foo", "bar"], true)).toEqual({ foo: true, bar: true});
    });
});
