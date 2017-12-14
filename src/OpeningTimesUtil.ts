import { DateUtil } from "./DateUtil";

export interface TimeInterval {
    begin: Date;
    end: Date;
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export class OpeningTimesUtil {

    public static isOpen(
        openingTimeIntervals: Array<TimeInterval | null>,
        dayOfWeek: DayOfWeek,
        time?: Date,
    ): boolean {
        const currentInterval = openingTimeIntervals[dayOfWeek];

        if (!time) {
            return !!currentInterval;
        }

        const date = new Date(0);
        const dayTime = DateUtil.getDateAtTime(date, time);

        if (currentInterval) {
            // Is it open due to today's opening times?

            const dayBegin = DateUtil.getDateAtTime(date, currentInterval.begin);
            let dayEnd = DateUtil.getDateAtTime(date, currentInterval.end);

            if (dayBegin.getTime() === dayEnd.getTime()) {
                // Special case: Always open
                return true;
            }

            if (dayBegin > dayEnd) {
                // The day has special opening times, so adjust the end time.
                const nextDate = new Date(0);
                nextDate.setDate(nextDate.getDate() + 1);
                dayEnd = DateUtil.getDateAtTime(nextDate, currentInterval.end);
            }

            if (dayBegin <= dayTime && dayTime < dayEnd) {
                return true;
            }
        }

        // Seems to be closed so far, but maybe it is open due to
        // special opening times on the previous day.

        const previousDayOfWeek = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
        const previousInterval = openingTimeIntervals[previousDayOfWeek];

        if (previousInterval) {
            const previousDate = new Date(0);
            previousDate.setDate(previousDate.getDate() - 1);
            const previousDayBegin = DateUtil.getDateAtTime(previousDate, previousInterval.begin);
            let previousDayEnd = DateUtil.getDateAtTime(previousDate, previousInterval.end);

            if (previousDayBegin > previousDayEnd) {

                // Previous day indeed has special opening times, so adjust the end time.
                previousDayEnd = DateUtil.getDateAtTime(date, previousInterval.end);

                return dayTime < previousDayEnd;
            }
        }

        return false;
    }
}
