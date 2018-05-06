export interface LatitudeLongitude {
    latitude: number;
    longitude: number;
}

export class GeoUtil {
    /**
     * Adapted from http://stackoverflow.com/q/18883601/443836
     */
    public static getDistanceInKm(l1: LatitudeLongitude, l2: LatitudeLongitude) {
        const earthRadiusInKm = 6371;
        const dLat = degToRad(l2.latitude - l1.latitude);
        const dLng = degToRad(l2.longitude - l1.longitude);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(degToRad(l1.latitude)) * Math.cos(degToRad(l2.latitude))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadiusInKm * c;

        function degToRad(deg: number) {
            return deg * (Math.PI / 180);
        }
    }
}
