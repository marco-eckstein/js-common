import { StringUtil } from "./StringUtil";

export class BrowserUtil {

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

    public static getRelativeBaseURI() {
        if (document.baseURI) {
            if (document.location == null) {
                throw new Error("document.location is null");
            }
            const origin = StringUtil.trimX(document.location.origin, "/");
            return StringUtil.trimX(document.baseURI.substring(origin.length), "/");
        } else {
            return "";
        }
    }

    /**
     * Get the event's coordinates relative to the event target's containing SVG element.
     * Adapted from https://stackoverflow.com/a/42711775.
     *
     * @param event A MouseEvent inside the SVG Element
     * @param svgElement The SVG element containing the event target
     */
    public static getRelativeCoordinates(event: MouseEvent, svgElement: SVGSVGElement): DOMPoint {
        const point = svgElement.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        return point.matrixTransform(svgElement.getScreenCTM()!.inverse());
    }

    /**
     * Append a script tag with the given source, unless one is already present.
     */
    public static appendScriptIfNotPresent(src: string) {
        if (!document.querySelector(`script[src="${src}"]`)) {
            const scriptElement = document.createElement("script");
            scriptElement.src = src;
            document.body.appendChild(scriptElement);
        }
    }

    /**
     * Gets the has parameters of a location/URL as an object, where each parameters becomes a property.
     *
     * Example: For a URL ending in "#a=1&b=2", the object { a: "1", b: "2" } is returned.
     *
     * Adapted from https://glitch.com/edit/#!/futuristic-bamboo?path=script.js:16:0
     */
    public static getHashParametersAsObject<T>(location: Location | URL): T {
        return location.hash
            .substring(1)
            .split("&")
            .reduce((object, item) => {
                if (item) {
                    const parts = item.split("=");
                    object[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
                return object;
            }, {} as any) as T;
    }

    /**
     * Removes the has portion of the current URL by replacing history state.
     *
     * Adapted from https://stackoverflow.com/a/5298684.
     */
    public static removeHashFromUrl() {
        history.replaceState("", document.title, window.location.pathname + window.location.search);
    }
}
