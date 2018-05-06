import { GeoUtil } from "./GeoUtil";

describe("GeoUtil", () => {

    const berlin = {
        latitude: 52.5,
        longitude: 13.4,
    };

    const munich = {
        latitude: 48.1,
        longitude: 11.6,
    };

    describe("getDistanceInKm", () => {
        it("is zero for itself", () => {
            expect(GeoUtil.getDistanceInKm(berlin, berlin)).toEqual(0);
        });

        it("is correct between Berlin and Munich", () => {
            expect(Math.floor(GeoUtil.getDistanceInKm(berlin, munich))).toEqual(505);
        });
    });
});
