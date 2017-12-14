import { GeoPosition, GeoUtil } from "./GeoUtil";

describe("GeoUtil", () => {

    const berlin: GeoPosition = new class {
        public lat = () => 52.5;
        public lng = () => 13.4;
    };

    const munich: GeoPosition = new class {
        public lat = () => 48.1;
        public lng = () => 11.6;
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
