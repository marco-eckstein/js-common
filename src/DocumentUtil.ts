export class DocumentUtil {

    // Adapted from https://stackoverflow.com/a/15203639 (also see comments)
    public static isElementVisible(element: Element) {
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
}
