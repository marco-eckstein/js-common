import { I18nUtil } from "./I18nUtil";

describe("I18nUtil", () => {

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
            const actualOutput = I18nUtil.transform(input, language);
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
                expect(I18nUtil.formatTimeInterval(begin, end, "en"))
                    .toEqual("4:05 am" + separator + "7 pm");
            });

            it("works for German language", () => {
                expect(I18nUtil.formatTimeInterval(begin, end, "de"))
                    .toEqual("4:05" + separator + "19 Uhr");
            });
        });

        describe("from noon to midnight", () => {
            const begin = new Date(2000, 0, 1, 12, 0);
            const end = new Date(2000, 0, 1, 24, 0);

            it("works for English language", () => {
                expect(I18nUtil.formatTimeInterval(begin, end, "en"))
                    .toEqual("12 noon" + separator + "12 midnight");
            });

            it("works for German language", () => {
                expect(I18nUtil.formatTimeInterval(begin, end, "de"))
                    .toEqual("12" + separator + "0 Uhr");
            });
        });
    });

    describe("abbreviateWeekDay", () => {
        it("works for English language", () => {
            expect(I18nUtil.abbreviateWeekDay("Monday", "en")).toEqual("Mon");
        });

        it("works for German language", () => {
            expect(I18nUtil.abbreviateWeekDay("Montag", "de")).toEqual("Mo");
        });
    });

    describe("formatNumberString", () => {
        describe("format dot format", () => {
            const numberString = "47.11";

            it("works for English language", () => {
                expect(I18nUtil.formatNumberString(numberString, "en")).toEqual("47.11");
            });

            it("works for German language", () => {
                expect(I18nUtil.formatNumberString(numberString, "de")).toEqual("47,11");
            });
        });

        describe("format comma format", () => {
            const numberString = "47,11";

            it("works for English language", () => {
                expect(I18nUtil.formatNumberString(numberString, "en")).toEqual("47.11");
            });

            it("works for German language", () => {
                expect(I18nUtil.formatNumberString(numberString, "de")).toEqual("47,11");
            });
        });
    });
});
