import { GeoPosition, JsCommon } from "./index";

const geoUtil = new JsCommon().geoUtil;
const berlin: GeoPosition = new class {
    public lat = () => 52.5;
    public lng = () => 13.4;
};
const munich: GeoPosition = new class {
    public lat = () => 48.1;
    public lng = () => 11.6;
};

describe("GeoUtil.getDistanceInKm", () => {
    it("is zero for itself", () => {
        expect(geoUtil.getDistanceInKm(berlin, berlin)).toEqual(0);
    });

    it("is correct between Berlin and Munich", () => {
        expect(Math.floor(geoUtil.getDistanceInKm(berlin, munich))).toEqual(505);
    });
});
