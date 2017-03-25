declare module "bower_components/ol3-fun/ol3-fun/common" {
    export function asArray<T extends HTMLInputElement>(list: NodeList): T[];
    export function toggle(e: HTMLElement, className: string, toggle?: boolean): void;
    export function parse<T>(v: string, type: T): T;
    export function getQueryParameters(options: any, url?: string): void;
    export function getParameterByName(name: string, url?: string): string;
    export function doif<T>(v: T, cb: (v: T) => void): void;
    export function mixin<A extends any, B extends any>(a: A, b: B): A & B;
    export function defaults<A extends any, B extends any>(a: A, ...b: B[]): A & B;
    /**
     * Adds exactly one instance of the CSS to the app with a mechanism
     * for disposing by invoking the destructor returned by this method.
     * Note the css will not be removed until the dependency count reaches
     * 0 meaning the number of calls to cssin('id') must match the number
     * of times the destructor is invoked.
     * let d1 = cssin('foo', '.foo { background: white }');
     * let d2 = cssin('foo', '.foo { background: white }');
     * d1(); // reduce dependency count
     * d2(); // really remove the css
     * @param name unique id for this style tag
     * @param css css content
     * @returns destructor
     */
    export function cssin(name: string, css: string): () => void;
    export function debounce<T extends Function>(func: T, wait?: number, immediate?: boolean): T;
    /**
     * poor $(html) substitute due to being
     * unable to create <td>, <tr> elements
     */
    export function html(html: string): HTMLElement;
    export function pair<A, B>(a1: A[], a2: B[]): [A, B][];
    export function range(n: number): any[];
    export function shuffle<T>(array: T[]): T[];
}
declare module "bower_components/ol3-fun/ol3-fun/navigation" {
    import ol = require("openlayers");
    /**
     * A less disorienting way of changing the maps extent (maybe!)
     * Zoom out until new feature is visible
     * Zoom to that feature
     */
    export function zoomToFeature(map: ol.Map, feature: ol.Feature, options?: {
        duration?: number;
        padding?: number;
        minResolution?: number;
    }): void;
}
declare module "bower_components/ol3-fun/ol3-fun/parse-dms" {
    export function parse(dmsString: string): number | {
        [x: number]: number;
    };
}
declare module "bower_components/ol3-fun/index" {
    import common = require("bower_components/ol3-fun/ol3-fun/common");
    import navigation = require("bower_components/ol3-fun/ol3-fun/navigation");
    import dms = require("bower_components/ol3-fun/ol3-fun/parse-dms");
    let index: typeof common & {
        dms: typeof dms;
        navigation: typeof navigation;
    };
    export = index;
}
declare module "ol3-mapquest/directions-proxy" {
    export module MapQuestDirections {
        interface Ul {
            lng: number;
            lat: number;
        }
        interface Lr {
            lng: number;
            lat: number;
        }
        interface BoundingBox {
            ul: Ul;
            lr: Lr;
        }
        interface LatLng {
            lng: number;
            lat: number;
        }
        interface DisplayLatLng {
            lng: number;
            lat: number;
        }
        interface Location {
            latLng: LatLng;
            adminArea4: string;
            adminArea5Type: string;
            adminArea4Type: string;
            adminArea5: string;
            street: string;
            adminArea1: string;
            adminArea3: string;
            type: string;
            displayLatLng: DisplayLatLng;
            linkId: number;
            postalCode: string;
            sideOfStreet: string;
            dragPoint: boolean;
            adminArea1Type: string;
            geocodeQuality: string;
            geocodeQualityCode: string;
            adminArea3Type: string;
        }
        interface Sign {
            text?: string;
            extraText?: string;
            direction?: number;
            type?: number;
            url?: string;
        }
        interface StartPoint {
            lng: number;
            lat: number;
        }
        interface Maneuver {
            signs?: Sign[];
            index?: number;
            maneuverNotes?: any[];
            direction?: number;
            narrative?: string;
            iconUrl?: string;
            distance?: number;
            time?: number;
            linkIds?: any[];
            streets?: string[];
            attributes?: number;
            transportMode?: string;
            formattedTime?: string;
            directionName?: string;
            mapUrl?: string;
            startPoint?: StartPoint;
            turnType?: number;
        }
        interface Leg {
            hasTollRoad?: boolean;
            index?: number;
            roadGradeStrategy?: any[][];
            hasHighway?: boolean;
            hasUnpaved?: boolean;
            distance?: number;
            time?: number;
            origIndex?: number;
            hasSeasonalClosure?: boolean;
            origNarrative?: string;
            hasCountryCross?: boolean;
            formattedTime?: string;
            destNarrative?: string;
            destIndex?: number;
            maneuvers?: Maneuver[];
            hasFerry?: boolean;
        }
        interface RouteError {
            message: string;
            errorCode: number;
        }
        interface Options {
            mustAvoidLinkIds?: any[];
            drivingStyle?: number;
            countryBoundaryDisplay?: boolean;
            generalize?: number;
            narrativeType?: string;
            locale?: string;
            avoidTimedConditions?: boolean;
            destinationManeuverDisplay?: boolean;
            enhancedNarrative?: boolean;
            filterZoneFactor?: number;
            timeType?: number;
            maxWalkingDistance?: number;
            routeType?: string;
            transferPenalty?: number;
            stateBoundaryDisplay?: boolean;
            walkingSpeed?: number;
            maxLinkId?: number;
            arteryWeights?: any[];
            tryAvoidLinkIds?: any[];
            unit?: string;
            routeNumber?: number;
            shapeFormat?: string;
            maneuverPenalty?: number;
            useTraffic?: boolean;
            returnLinkDirections?: boolean;
            avoidTripIds?: any[];
            manmaps?: string;
            highwayEfficiency?: number;
            sideOfStreetDisplay?: boolean;
            cyclingRoadFactor?: number;
            urbanAvoidFactor?: number;
        }
        interface Route {
            hasTollRoad?: boolean;
            computedWaypoints?: any[];
            fuelUsed?: number;
            hasUnpaved?: boolean;
            hasHighway?: boolean;
            realTime?: number;
            boundingBox?: BoundingBox;
            distance?: number;
            time?: number;
            locationSequence?: number[];
            hasSeasonalClosure?: boolean;
            sessionId?: string;
            locations?: Location[];
            hasCountryCross?: boolean;
            legs?: Leg[];
            formattedTime?: string;
            routeError?: RouteError;
            options?: Options;
            hasFerry?: boolean;
            shape?: {
                legIndexes: number[];
                maneuverIndexes: number[];
                shapePoints: number[];
            };
        }
        interface Copyright {
            text: string;
            imageUrl: string;
            imageAltText: string;
        }
        interface Info {
            copyright: Copyright;
            statuscode: number;
            messages: any[];
        }
        interface Response {
            route: Route;
            info: Info;
        }
    }
    export class MapQuestDirections {
        private sessionId;
        directions(url: string, data: {
            key: string;
            from: string;
            to: string | string[];
            session?: string;
            unit?: string;
            avoids?: string;
        }): JQueryPromise<MapQuestDirections.Response>;
    }
}
declare module "ol3-mapquest/geocoding-proxy" {
    export module MapQuestGeocoding {
        interface ProvidedLocation {
            latLng: LatLng;
        }
        interface LatLng2 {
            lat: number;
            lng: number;
        }
        interface Location {
            mapUrl: string;
        }
        interface ReverseResponse {
            info: Info;
            options: Options;
            results: Result[];
        }
    }
    export module MapQuestGeocoding {
        interface Copyright {
            text: string;
            imageUrl: string;
            imageAltText: string;
        }
        interface Info {
            statuscode: number;
            copyright: Copyright;
            messages: any[];
        }
        interface Ul {
            lat: number;
            lng: number;
        }
        interface Lr {
            lat: number;
            lng: number;
        }
        interface BoundingBox {
            ul: Ul;
            lr: Lr;
        }
        interface Options {
            boundingBox: BoundingBox;
            maxResults: number;
            thumbMaps: boolean;
            ignoreLatLngInput: boolean;
        }
        interface ProvidedLocation {
            location: string;
        }
        interface LatLng {
            lat: number;
            lng: number;
        }
        interface DisplayLatLng {
            lat: number;
            lng: number;
        }
        interface Location {
            street: string;
            adminArea6: string;
            adminArea6Type: string;
            adminArea5: string;
            adminArea5Type: string;
            adminArea4: string;
            adminArea4Type: string;
            adminArea3: string;
            adminArea3Type: string;
            adminArea1: string;
            adminArea1Type: string;
            postalCode: string;
            geocodeQualityCode: string;
            geocodeQuality: string;
            dragPoint: boolean;
            sideOfStreet: string;
            linkId: string;
            unknownInput: string;
            type: string;
            latLng: LatLng;
            displayLatLng: DisplayLatLng;
        }
        interface Result {
            providedLocation: ProvidedLocation;
            locations: Location[];
        }
        interface AddressResponse {
            info: Info;
            options: Options;
            results: Result[];
        }
    }
    export class MapQuestGeocoding {
        reverse(url: string, data: {
            key: string;
            lat: number;
            lng: number;
        }): JQueryPromise<MapQuestGeocoding.ReverseResponse>;
        address(url: string, data: {
            key: string;
            boundingBox: number[];
            location?: string;
            street?: string;
            city?: string;
            state?: string;
            postalCode?: number;
            maxResults?: number;
            thumbMaps?: boolean;
            ignoreLatLngInput?: boolean;
            delimiter?: string;
            intlMode?: string;
        }): JQueryPromise<MapQuestGeocoding.AddressResponse>;
    }
}
declare module "ol3-mapquest/optimized-route-proxy" {
    import { MapQuestDirections } from "ol3-mapquest/directions-proxy";
    export module MapQuestRoute {
        interface Response extends MapQuestDirections.Response {
        }
    }
    export class MapQuestRoute {
        private sessionId;
        /**
         * Returns
         * | locationSequence | a sequence array that can be used to determine the index in the original location object list. |
         * | locations | a collection of locations in the form of an address. The origin and destination locations remain fixed, but the intermediate locations are re-ordered as appropriate. |
         */
        route(url: string, data: {
            key: string;
            from: string;
            to: string;
            locations: string[];
            session?: string;
            unit?: string;
            avoids?: string;
        }): JQueryDeferred<MapQuestRoute.Response>;
    }
}
declare module "bower_components/ol3-fun/ol3-fun/google-polyline" {
    /**
     * https://developers.google.com/maps/documentation/utilities/polylinealgorithm?csw=1
     * https://github.com/DeMoehn/Cloudant-nyctaxi/blob/2e48cb6c53bd4ac4f58d50d9302f00fc72f6681e/app/js/polyline.js
     */
    class PolylineEncoder {
        private encodeCoordinate(coordinate, factor);
        decode(str: string, precision?: number): number[][];
        encode(coordinates: number[][], precision?: number): string;
    }
    export = PolylineEncoder;
}
declare module "ol3-mapquest/search-proxy" {
    export module MapQuestSearch {
        interface LatLng {
            lng: number;
            lat: number;
        }
        interface MqapGeography {
            latLng: LatLng;
        }
        interface Fields {
            phone: string;
            side_of_street: string;
            group_sic_code: string;
            state: string;
            lng: number;
            group_sic_code_name: string;
            city: string;
            country: string;
            group_sic_code_name_ext: string;
            id: string;
            mqap_geography: MqapGeography;
            address: string;
            postal_code: string;
            name: string;
            mqap_id: string;
            group_sic_code_ext: string;
            disp_lat: number;
            lat: number;
            disp_lng: number;
        }
        interface SearchResult {
            resultNumber: number;
            distance: number;
            sourceName: string;
            name: string;
            shapePoints: number[];
            distanceUnit: string;
            key: string;
            fields: Fields;
        }
        interface Origin {
            latLng: LatLng;
            postalCode: string;
            adminArea5Type: string;
            adminArea4: string;
            adminArea5: string;
            adminArea4Type: string;
            street: string;
            adminArea1Type: string;
            adminArea1: string;
            adminArea3: string;
            adminArea3Type: string;
        }
        interface HostedData {
            tableName: string;
            extraCriteria: string;
            columnNames: any[];
        }
        interface Copyright {
            text: string;
            imageUrl: string;
            imageAltText: string;
        }
        interface Info {
            statusCode: number;
            copyright: Copyright;
            messages: any[];
        }
        interface Options {
            kmlStyleUrl: string;
            shapeFormat: string;
            ambiguities: boolean;
            pageSize: number;
            radius: number;
            currentPage: number;
            units: string;
            maxMatches: number;
        }
        interface SearchResponse {
            searchResults: SearchResult[];
            origin: Origin;
            resultsCount: number;
            hostedData: HostedData[];
            totalPages: number;
            info: Info;
            options: Options;
        }
    }
    export class MapQuestSearch {
        key: string;
        url: string;
        constructor(key: string, url?: string);
        search(data: any, type?: string): JQueryDeferred<MapQuestSearch.SearchResponse>;
        radius(data: {
            origin: number[];
            maxMatches?: number;
        }): JQueryDeferred<MapQuestSearch.SearchResponse>;
        rectangle(data: {
            boundingBox: number[];
            maxMatches?: number;
        }): JQueryDeferred<MapQuestSearch.SearchResponse>;
        polygon(data: {
            polygon: number[];
            maxMatches?: number;
            shapeFormat?: string;
        }): JQueryDeferred<MapQuestSearch.SearchResponse>;
        corridor(data: {
            line: number[];
            width?: number;
            bufferWidth?: number;
            maxMatches?: number;
            shapeFormat?: "raw" | "cmp6";
        }): JQueryDeferred<MapQuestSearch.SearchResponse>;
    }
}
declare module "ol3-mapquest/traffic-proxy" {
    export module MapQuestTraffic {
        interface ParameterizedDescription {
            crossRoad2: string;
            crossRoad1: string;
            position2: string;
            direction: string;
            position1: string;
            eventText: string;
            toLocation: string;
            roadName: string;
            fromLocation: string;
        }
        interface Incident {
            parameterizedDescription: ParameterizedDescription;
            delayFromFreeFlow: number;
            delayFromTypical: number;
            fullDesc: string;
            severity: number;
            lng: number;
            shortDesc: string;
            type: number;
            endTime: Date;
            id: string;
            startTime: Date;
            distance: number;
            impacting: boolean;
            eventCode: number;
            lat: number;
            iconURL: string;
        }
        interface Copyright {
            text: string;
            imageUrl: string;
            imageAltText: string;
        }
        interface Info {
            copyright: Copyright;
            statuscode: number;
            messages: any[];
        }
        interface IncidentsResponse {
            incidents: Incident[];
            mqURL: string;
            info: Info;
        }
    }
    export class MapQuestTraffic {
        incidents(url: string, data: {
            boundingBox: number[];
            filters?: string;
        }): JQueryPromise<MapQuestTraffic.IncidentsResponse>;
    }
}
declare module "index" {
    import { MapQuestDirections } from "ol3-mapquest/directions-proxy";
    import { MapQuestGeocoding } from "ol3-mapquest/geocoding-proxy";
    import { MapQuestRoute } from "ol3-mapquest/optimized-route-proxy";
    import { MapQuestSearch } from "ol3-mapquest/search-proxy";
    import { MapQuestTraffic } from "ol3-mapquest/traffic-proxy";
    const API: {
        Directions: typeof MapQuestDirections;
        Geocoding: typeof MapQuestGeocoding;
        Route: typeof MapQuestRoute;
        Search: typeof MapQuestSearch;
        Traffic: typeof MapQuestTraffic;
    };
    export = API;
}
declare module "ol3-mapquest/examples/index" {
    export function run(): void;
}
declare module "ol3-mapquest/tests/directions" {
    import { MapQuestDirections } from "ol3-mapquest/directions-proxy";
    export function run(options?: {
        from: string;
        to: string | string[];
    }): JQueryPromise<MapQuestDirections.Response>;
}
declare module "ol3-mapquest/tests/geocoding" {
    export function run(): void;
}
declare module "ol3-mapquest/tests/index" {
    export function run(): void;
}
declare module "ol3-mapquest/tests/optimized-route" {
    import { MapQuestRoute } from "ol3-mapquest/optimized-route-proxy";
    export function run(options: {
        from: string;
        to: string;
        locations: string[];
    }): JQueryPromise<MapQuestRoute.Response>;
}
declare module "ol3-mapquest/tests/search" {
    export function run(): void;
}
declare module "ol3-mapquest/tests/traffic" {
    export function run(): void;
}
