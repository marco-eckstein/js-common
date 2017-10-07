/**
 * A geographic postion on the earth. Analogous too Google Maps API position.
 */
export interface GeoPosition {
    lat(): number;
    lng(): number;
}

export interface TimeInterval {
    begin: Date;
    end: Date;
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export class JsCommon {
    public dateUtil = new class DateUtil {
        // TODO: Check whether this can be better replaced with a lib like moment.js.
        public parseTime(time: string) {
            const parts = time.split(":");

            if (parts.length > 2) {
                throw new Error("Not implemented support for time string: " + time);
            }

            const hours = parts[0] === "24" ? "0" : parts[0];
            const minutes = parts.length > 1 ? parts[1] : "0";

            return { hours: parseInt(hours, 10), minutes: parseInt(minutes, 10) };
        }

        // TODO: Check whether this can be better replaced with a lib like moment.js.
        public getDateAtTime(date: Date, time: Date) {
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
    };

    public geoUtil = new class GeoUtil {
        /**
         * Adapted from http://stackoverflow.com/q/18883601/443836
         */
        public getDistanceInKm(pos1: GeoPosition, pos2: GeoPosition) {
            const earthRadiusInKm = 6371;
            const dLat = degToRad(pos2.lat() - pos1.lat());
            const dLng = degToRad(pos2.lng() - pos1.lng());
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(degToRad(pos1.lat())) * Math.cos(degToRad(pos2.lat()))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return earthRadiusInKm * c;

            function degToRad(deg: number) {
                return deg * (Math.PI / 180);
            }
        }
    };
    public i18nUtil = new class I18nUtil {
        public transform(node: any, language: string): any {
            const newNode: any = {};
            for (const childName of Object.getOwnPropertyNames(node)) {
                const child = node[childName];
                if (typeof child === "string") {
                    return node[language];
                } else {
                    newNode[childName] = this.transform(child, language);
                }
            }
            return newNode;
        }

        // TODO: Check whether this can be better replaced with a lib like moment.js.
        public formatTimeInterval(beginDate: Date, endDate: Date, language: "en" | "de") {
            const extraLongHyphen = "–"; // Your editor may display this as a regular hyphen.
            const separator = " " + extraLongHyphen + " ";
            const postfix = language === "en" ? "" : " Uhr";
            return formatTime(beginDate) + separator + formatTime(endDate) + postfix;

            function formatTime(date: Date) {
                const h = date.getHours();
                const m = date.getMinutes();
                if (language === "en") {
                    if (m === 0) {
                        if (h === 0) {
                            return "12 midnight";
                        } else if (h < 12) {
                            return h + " am";
                        } else if (h === 12) {
                            return "12 noon";
                        } else {
                            return (h - 12) + " pm";
                        }
                    } else {
                        if (h < 12) {
                            return h + ":" + pad(m) + " am";
                        } else if (h === 12) {
                            return h + ":" + pad(m) + " pm";
                        } else {
                            return (h - 12) + ":" + pad(m) + " pm";
                        }
                    }
                } else {
                    if (m === 0) {
                        return h;
                    } else {
                        return h + ":" + pad(m);
                    }
                }

                function pad(n: number) {
                    return n < 10 ? "0" + n : n;
                }
            }
        }

        // TODO: Check whether this can be better replaced with a I18n lib.
        public abbreviateWeekDay(weekday: string, language: "en" | "de") {
            const charCount = language === "en" ? 3 : 2;
            return weekday.substring(0, charCount);
        }

        // TODO: Check whether this can be better replaced with a I18n lib.
        public formatNumberString(numberString: string, language: "en" | "de") {
            return language === "en" ?
                numberString.replace(/\,/, ".")
                :
                numberString.replace(/\./, ",");
        }
    };

    public domUtil = new class DomUtil {
        // Adapted from https://stackoverflow.com/a/15203639 (also see comments)
        public isElementVisible(element: Element) {
            const rect     = element.getBoundingClientRect();
            const vWidth   = window.innerWidth || document.documentElement.clientWidth;
            const vHeight  = window.innerHeight || document.documentElement.clientHeight;

            // Return false if it's not in the viewport
            if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) {
                return false;
            }

            // Return true if any of its four corners are visible
            return (
                element.contains(document.elementFromPoint(rect.left, rect.top))
                || element.contains(document.elementFromPoint(rect.right, rect.top))
                || element.contains(document.elementFromPoint(rect.right, rect.bottom))
                || element.contains(document.elementFromPoint(rect.left, rect.bottom))
            );
        }
    };

    public openingTimesUtil = new class OpeningTimesUtil {

        public isOpen(
            openingTimeIntervals: Array<TimeInterval | null>,
            dayOfWeek: DayOfWeek,
            time?: Date,
        ): boolean {
            const getDateAtTime = new JsCommon().dateUtil.getDateAtTime;
            const currentInterval = openingTimeIntervals[dayOfWeek];

            if (!time) {
                return !!currentInterval;
            }

            const date = new Date(0);
            const dayTime = getDateAtTime(date, time);

            if (currentInterval) {
                // Is it open due to today's opening times?

                const dayBegin = getDateAtTime(date, currentInterval.begin);
                let dayEnd = getDateAtTime(date, currentInterval.end);

                if (dayBegin.getTime() === dayEnd.getTime()) {
                    // Special case: Always open
                    return true;
                }

                if (dayBegin > dayEnd) {
                    // The day has special opening times, so adjust the end time.
                    const nextDate = new Date(0);
                    nextDate.setDate(nextDate.getDate() + 1);
                    dayEnd = getDateAtTime(nextDate, currentInterval.end);
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
                const previousDayBegin = getDateAtTime(previousDate, previousInterval.begin);
                let previousDayEnd = getDateAtTime(previousDate, previousInterval.end);

                if (previousDayBegin > previousDayEnd) {

                    // Previous day indeed has special opening times, so adjust the end time.
                    previousDayEnd = getDateAtTime(date, previousInterval.end);

                    return dayTime < previousDayEnd;
                }
            }

            return false;
        }
    };
}
