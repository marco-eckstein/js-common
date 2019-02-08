import { BrowserUtil } from "./BrowserUtil";

describe("BrowserUtil", () => {

    describe("getHashParametersAsObject", () => {
        it("works", () => {
            interface Params { a: string; b: string; }
            const url = new URL("http://foo.net/#a=1&b=2");
            expect(BrowserUtil.getHashParametersAsObject<Params>(url)).toEqual({ a: "1", b: "2" });
        });
    });
});
