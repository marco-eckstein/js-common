import { DocumentUtil } from "./DocumentUtil";

describe("DocumentUtil", () => {

    describe("getHashParametersAsObject", () => {
        it("works", () => {
            interface Params { a: string; b: string; }
            const url = new URL("http://foo.net/#a=1&b=2");
            expect(DocumentUtil.getHashParametersAsObject<Params>(url)).toEqual({ a: "1", b: "2" });
        });
    });
});
