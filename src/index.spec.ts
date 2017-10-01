import { GeoPosition, JsCommon } from "./index";

describe("GeoUtil", () => {
    const geoUtil = new JsCommon().geoUtil;

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
            expect(geoUtil.getDistanceInKm(berlin, berlin)).toEqual(0);
        });

        it("is correct between Berlin and Munich", () => {
            expect(Math.floor(geoUtil.getDistanceInKm(berlin, munich))).toEqual(505);
        });
    });
});

describe("I18nUtil", () => {
    const i18nUtil = new JsCommon().i18nUtil;

    describe("transform", () => {
        const input = {
            a: {
                b1: {
                    d1: {
                        de: "Ein b1.d1",
                        en: "A b1.d1",
                    },
                    d2: {
                        de: "Ein b1.d2",
                        en: "A b1.d2",
                    },
                },
                b2: {
                    d1: {
                        de: "Ein b2.d1",
                        en: "A b2.d1",
                    },
                },
            },
        };

        const language = "en";

        const expectedOutput = {
            a: {
                b1: {
                    d1: "A b1.d1",
                    d2: "A b1.d2",
                },
                b2: {
                    d1: "A b2.d1",
                },
            },
        };

        it("works", () => {
            const actualOutput = i18nUtil.transform(input, language);
            expect(JSON.stringify(actualOutput)).toEqual(JSON.stringify(expectedOutput));
        });
    });
});
