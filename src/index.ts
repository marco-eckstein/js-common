/**
 * A geographic postion on the earth. Analogous too Google Maps API position.
 */
export interface GeoPosition {
    lat(): number;
    lng(): number;
}

export class JsCommon {
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
    };
}
