import { GeoPosition, JsCommon } from "./index";

describe("DateUtil", () => {
    const dateUtil = new JsCommon().dateUtil;

    describe("parseTime", () => {
        it("parses arbitrary date", () => {
            expect(dateUtil.parseTime("15:45")).toEqual({ hours: 15, minutes: 45 });
        });

        it("parses date without time", () => {
            expect(dateUtil.parseTime("15")).toEqual({ hours: 15, minutes: 0 });
        });

        it("parses 0:00", () => {
            expect(dateUtil.parseTime("0:00")).toEqual({ hours: 0, minutes: 0 });
        });

        it("parses 00:00", () => {
            expect(dateUtil.parseTime("00:00")).toEqual({ hours: 0, minutes: 0 });
        });

        it("parses 24:00", () => {
            expect(dateUtil.parseTime("0:00")).toEqual({ hours: 0, minutes: 0 });
        });
    });
});

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

    describe("formatTimeInterval", () => {

        const extraLongHyphen = "–"; // Your editor may display this as a regular hyphen.
        const separator = " " + extraLongHyphen + " ";

        describe("from am to pm", () => {
            const begin = new Date(2000, 0, 1, 4, 5);
            const end = new Date(2000, 0, 1, 19, 0);

            it("works for English language", () => {
                expect(i18nUtil.formatTimeInterval(begin, end, "en"))
                    .toEqual("4:05 am" + separator + "7 pm");
            });

            it("works for German language", () => {
                expect(i18nUtil.formatTimeInterval(begin, end, "de"))
                    .toEqual("4:05" + separator + "19 Uhr");
            });
        });

        describe("from noon to midnight", () => {
            const begin = new Date(2000, 0, 1, 12, 0);
            const end = new Date(2000, 0, 1, 24, 0);

            it("works for English language", () => {
                expect(i18nUtil.formatTimeInterval(begin, end, "en"))
                    .toEqual("12 noon" + separator + "12 midnight");
            });

            it("works for German language", () => {
                expect(i18nUtil.formatTimeInterval(begin, end, "de"))
                    .toEqual("12" + separator + "0 Uhr");
            });
        });
    });
});
