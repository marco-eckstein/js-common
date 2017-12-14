export class I18nUtil {
    public static transform(node: any, language: string): any {
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
    public static formatTimeInterval(beginDate: Date, endDate: Date, language: "en" | "de") {
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
    public static abbreviateWeekDay(weekday: string, language: "en" | "de") {
        const charCount = language === "en" ? 3 : 2;
        return weekday.substring(0, charCount);
    }

    // TODO: Check whether this can be better replaced with a I18n lib.
    public static formatNumberString(numberString: string, language: "en" | "de") {
        return language === "en" ?
            numberString.replace(/\,/, ".")
            :
            numberString.replace(/\./, ",");
    }
}
