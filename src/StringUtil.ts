export class StringUtil {

    /**
     * Trim any number of repetitions of `x` from `s`.
     */
    public static trimX(s: string, x: string) {
        let trimmed = s;
        while (trimmed.startsWith(x)) {
            trimmed = trimmed.substring(x.length);
        }
        while (trimmed.endsWith(x)) {
            trimmed = trimmed.substring(0, trimmed.length - x.length);
        }
        return trimmed;
    }
}
