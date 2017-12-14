export class DateUtil {

    // TODO: Check whether this can be better replaced with a lib like moment.js.
    public static parseTime(time: string) {
        const parts = time.split(":");

        if (parts.length > 2) {
            throw new Error("Not implemented support for time string: " + time);
        }

        const hours = parts[0] === "24" ? "0" : parts[0];
        const minutes = parts.length > 1 ? parts[1] : "0";

        return { hours: parseInt(hours, 10), minutes: parseInt(minutes, 10) };
    }

    // TODO: Check whether this can be better replaced with a lib like moment.js.
    public static getDateAtTime(date: Date, time: Date) {
        const result = new Date();

        result.setFullYear(date.getFullYear());
        result.setMonth(date.getMonth());
        result.setDate(date.getDate());
        result.setHours(time.getHours());
        result.setMinutes(time.getMinutes());
        result.setSeconds(time.getSeconds());
        result.setMilliseconds(time.getMilliseconds());

        return result;
    }
}
