import { OpeningTimesUtil } from "./OpeningTimesUtil";

describe("OpeningTimesUtil", () => {

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
                expect(OpeningTimesUtil.isOpen(intervals, 0)).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 1)).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 2)).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 3)).toBe(false);
                expect(OpeningTimesUtil.isOpen(intervals, 4)).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 5)).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 6)).toBe(true);
            });
        });

        describe("with time", () => {
            it("works for regular opening times on sunday", () => {
                expect(OpeningTimesUtil.isOpen(intervals, 0, dateAtTime(11))).toBe(false);
                expect(OpeningTimesUtil.isOpen(intervals, 0, dateAtTime(11, 59, 59, 999))).toBe(false);
                expect(OpeningTimesUtil.isOpen(intervals, 0, dateAtTime(12))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 0, dateAtTime(14))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 0, dateAtTime(15, 59, 59, 999))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 0, dateAtTime(16))).toBe(false);
                expect(OpeningTimesUtil.isOpen(intervals, 0, dateAtTime(23))).toBe(false);
            });

            it("works for regular opening times on monday", () => {
                expect(OpeningTimesUtil.isOpen(intervals, 1, dateAtTime(9, 59, 59, 999))).toBe(false);
                expect(OpeningTimesUtil.isOpen(intervals, 1, dateAtTime(10))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 1, dateAtTime(19, 59, 59, 999))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 1, dateAtTime(20))).toBe(false);
            });

            it("works for special opening times before a closed day", () => {
                expect(OpeningTimesUtil.isOpen(intervals, 3, dateAtTime(0))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 3, dateAtTime(1))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 3, dateAtTime(2))).toBe(false);
                expect(OpeningTimesUtil.isOpen(intervals, 3, dateAtTime(3))).toBe(false);
            });

            it("works when open all day", () => {
                expect(OpeningTimesUtil.isOpen(intervals, 4, dateAtTime(0))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 4, dateAtTime(1))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 4, dateAtTime(12))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 4, dateAtTime(23))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 4, dateAtTime(23, 59, 59, 999))).toBe(true);
            });

            it("works for special opening times between friday and saturday", () => {
                expect(OpeningTimesUtil.isOpen(intervals, 5, dateAtTime(23))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 6, dateAtTime(0))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 6, dateAtTime(0, 59, 59, 999))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 6, dateAtTime(1))).toBe(false);
                expect(OpeningTimesUtil.isOpen(intervals, 6, dateAtTime(2))).toBe(false);
                expect(OpeningTimesUtil.isOpen(intervals, 6, dateAtTime(10))).toBe(true);
            });

            it("works for special opening times between saturday and sunday", () => {
                expect(OpeningTimesUtil.isOpen(intervals, 6, dateAtTime(23))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 6, dateAtTime(24))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 0, dateAtTime(0))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 0, dateAtTime(0, 59, 59, 999))).toBe(true);
                expect(OpeningTimesUtil.isOpen(intervals, 0, dateAtTime(1))).toBe(false);
                expect(OpeningTimesUtil.isOpen(intervals, 0, dateAtTime(2))).toBe(false);
                expect(OpeningTimesUtil.isOpen(intervals, 0, dateAtTime(12))).toBe(true);
            });
        });
    });
});
