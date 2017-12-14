import { DateUtil } from "./DateUtil";

describe("DateUtil", () => {

    describe("parseTime", () => {
        it("parses arbitrary date", () => {
            expect(DateUtil.parseTime("15:45")).toEqual({ hours: 15, minutes: 45 });
        });

        it("parses date without time", () => {
            expect(DateUtil.parseTime("15")).toEqual({ hours: 15, minutes: 0 });
        });

        it("parses 0:00", () => {
            expect(DateUtil.parseTime("0:00")).toEqual({ hours: 0, minutes: 0 });
        });

        it("parses 00:00", () => {
            expect(DateUtil.parseTime("00:00")).toEqual({ hours: 0, minutes: 0 });
        });

        it("parses 24:00", () => {
            expect(DateUtil.parseTime("0:00")).toEqual({ hours: 0, minutes: 0 });
        });
    });

    describe("getDateAtTime", () => {
        it("works", () => {
            const date = new Date(2017, 9, 4, 10, 20, 30, 40);
            const time = new Date(1999, 0, 1, 11, 22, 33, 44);
            expect(DateUtil.getDateAtTime(date, time)).toEqual(new Date(2017, 9, 4, 11, 22, 33, 44));
        });
    });
});
