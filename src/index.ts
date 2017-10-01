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
}
