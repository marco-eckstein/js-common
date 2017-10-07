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

    describe("getDateAtTime", () => {
        it("works", () => {
            const date = new Date(2017, 9, 4, 10, 20, 30, 40);
            const time = new Date(1999, 0, 1, 11, 22, 33, 44);
            expect(dateUtil.getDateAtTime(date, time)).toEqual(new Date(2017, 9, 4, 11, 22, 33, 44));
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

    describe("abbreviateWeekDay", () => {
        it("works for English language", () => {
            expect(i18nUtil.abbreviateWeekDay("Monday", "en")).toEqual("Mon");
        });

        it("works for German language", () => {
            expect(i18nUtil.abbreviateWeekDay("Montag", "de")).toEqual("Mo");
        });
    });

    describe("formatNumberString", () => {
        describe("format dot format", () => {
            const numberString = "47.11";

            it("works for English language", () => {
                expect(i18nUtil.formatNumberString(numberString, "en")).toEqual("47.11");
            });

            it("works for German language", () => {
                expect(i18nUtil.formatNumberString(numberString, "de")).toEqual("47,11");
            });
        });

        describe("format comma format", () => {
            const numberString = "47,11";

            it("works for English language", () => {
                expect(i18nUtil.formatNumberString(numberString, "en")).toEqual("47.11");
            });

            it("works for German language", () => {
                expect(i18nUtil.formatNumberString(numberString, "de")).toEqual("47,11");
            });
        });
    });
});

describe("OpeningTimesUtil", () => {
    const openingTimesUtil = new JsCommon().openingTimesUtil;

    const dateAtTime =
        (hours: number, minutes: number = 0, seconds: number = 0, milliseconds: number = 0) =>
        new Date(1999, 0, 1, hours, minutes, seconds, milliseconds);

    describe("isOpen", () => {
        const intervals = [
            { begin: dateAtTime(12), end: dateAtTime(16) },
            { begin: dateAtTime(10), end: dateAtTime(20) },
            { begin: dateAtTime(10), end: dateAtTime(2) },
            null,
            { begin: dateAtTime(0), end: dateAtTime(0) },
            { begin: dateAtTime(10), end: dateAtTime(1) },
            { begin: dateAtTime(10), end: dateAtTime(1) },
        ];

        describe("without time", () => {
            it("works", () => {
                expect(openingTimesUtil.isOpen(intervals, 0)).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 1)).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 2)).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 3)).toBe(false);
                expect(openingTimesUtil.isOpen(intervals, 4)).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 5)).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 6)).toBe(true);
            });
        });

        describe("with time", () => {
            it("works for regular opening times on sunday", () => {
                expect(openingTimesUtil.isOpen(intervals, 0, dateAtTime(11))).toBe(false);
                expect(openingTimesUtil.isOpen(intervals, 0, dateAtTime(11, 59, 59, 999))).toBe(false);
                expect(openingTimesUtil.isOpen(intervals, 0, dateAtTime(12))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 0, dateAtTime(14))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 0, dateAtTime(15, 59, 59, 999))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 0, dateAtTime(16))).toBe(false);
                expect(openingTimesUtil.isOpen(intervals, 0, dateAtTime(23))).toBe(false);
            });

            it("works for regular opening times on monday", () => {
                expect(openingTimesUtil.isOpen(intervals, 1, dateAtTime(9, 59, 59, 999))).toBe(false);
                expect(openingTimesUtil.isOpen(intervals, 1, dateAtTime(10))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 1, dateAtTime(19, 59, 59, 999))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 1, dateAtTime(20))).toBe(false);
            });

            it("works for special opening times before a closed day", () => {
                expect(openingTimesUtil.isOpen(intervals, 3, dateAtTime(0))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 3, dateAtTime(1))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 3, dateAtTime(2))).toBe(false);
                expect(openingTimesUtil.isOpen(intervals, 3, dateAtTime(3))).toBe(false);
            });

            it("works when open all day", () => {
                expect(openingTimesUtil.isOpen(intervals, 4, dateAtTime(0))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 4, dateAtTime(1))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 4, dateAtTime(12))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 4, dateAtTime(23))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 4, dateAtTime(23, 59, 59, 999))).toBe(true);
            });

            it("works for special opening times between friday and saturday", () => {
                expect(openingTimesUtil.isOpen(intervals, 5, dateAtTime(23))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 6, dateAtTime(0))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 6, dateAtTime(0, 59, 59, 999))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 6, dateAtTime(1))).toBe(false);
                expect(openingTimesUtil.isOpen(intervals, 6, dateAtTime(2))).toBe(false);
                expect(openingTimesUtil.isOpen(intervals, 6, dateAtTime(10))).toBe(true);
            });

            it("works for special opening times between saturday and sunday", () => {
                expect(openingTimesUtil.isOpen(intervals, 6, dateAtTime(23))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 6, dateAtTime(24))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 0, dateAtTime(0))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 0, dateAtTime(0, 59, 59, 999))).toBe(true);
                expect(openingTimesUtil.isOpen(intervals, 0, dateAtTime(1))).toBe(false);
                expect(openingTimesUtil.isOpen(intervals, 0, dateAtTime(2))).toBe(false);
                expect(openingTimesUtil.isOpen(intervals, 0, dateAtTime(12))).toBe(true);
            });
        });
    });
});
