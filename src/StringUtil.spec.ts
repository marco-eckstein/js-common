import { StringUtil } from "./StringUtil";

describe("StringUtil", () => {

    it("works with whitespace", () => {
        expect(StringUtil.trimX(" foo  ", " ")).toEqual("foo");
    });

    it("works with a single character", () => {
        expect(StringUtil.trimX("_foo_", "_")).toEqual("foo");
    });

    it("works with multiple characters (1)", () => {
        expect(StringUtil.trimX("+=foo+=+=", "+=")).toEqual("foo");
    });

    it("works with multiple characters (2)", () => {
        expect(StringUtil.trimX("+foo++", "++")).toEqual("+foo");
    });
});
