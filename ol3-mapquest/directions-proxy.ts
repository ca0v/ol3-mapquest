import * as $ from "jquery";
/**
 * http://www.mapquestapi.com/directions/v2/route?key=cwm3pF5yuEGNp54sh96TF0irs5kCLd5y&from=Lancaster,PA&to=York,PA&callback=define
 * http://www.mapquestapi.com/directions/v2/route?key=cwm3pF5yuEGNp54sh96TF0irs5kCLd5y?from=Lancaster,PA&to=York,PA&callback=define
 * http://www.mapquestapi.com/directions/v2/route?key=cwm3pF5yuEGNp54sh96TF0irs5kCLd5y?from=Lancaster,PA&to=York,PA&callback=define
 */

/**
 * If "to" is an array then multiple "to" query strings should be provided (seriously)
 */
function mapquest<T>(url: string, args = <any>{}, callback = "callback") {
    let d = $.Deferred<T>();
    {
        args[callback] = "define";
        let values = <Array<{ name: string, value: string }>>[];
        Object.keys(args).forEach(k => {
            let value = args[k];
            if (Array.isArray(value)) {
                let arr = <Array<string>>value;
                arr.forEach(v => values.push({ name: k, value: v }));
            } else {
                values.push({ name: k, value: value });
            }
        });

        let uri = url + "?" + values.map(k => `${k.name}=${k.value}`).join('&');
        require([uri], (data: T) => d.resolve(data));
    }
    return d;
}

export module MapQuestDirections {

    export interface Ul {
        lng: number;
        lat: number;
    }

    export interface Lr {
        lng: number;
        lat: number;
    }

    export interface BoundingBox {
        ul: Ul;
        lr: Lr;
    }

    export interface LatLng {
        lng: number;
        lat: number;
    }

    export interface DisplayLatLng {
        lng: number;
        lat: number;
    }

    export interface Location {
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

    export interface Sign {
        text?: string;
        extraText?: string;
        direction?: number;
        type?: number;
        url?: string;
    }

    export interface StartPoint {
        lng: number;
        lat: number;
    }

    export interface Maneuver {
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

    export interface Leg {
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

    export interface RouteError {
        message: string;
        errorCode: number;
    }

    export interface Options {
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

    export interface Route {
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
        }
    }

    export interface Copyright {
        text: string;
        imageUrl: string;
        imageAltText: string;
    }

    export interface Info {
        copyright: Copyright;
        statuscode: number;
        messages: any[];
    }

    export interface Response {
        route: Route;
        info: Info;
    }

}

export class MapQuestDirections {

    private sessionId = "";

    directions(url: string, data: {
        key: string;
        from: string;
        to: string | string[];
        session?: string;
        unit?: string;
        avoids?: string;
    }) {

        let req = $.extend({
            outFormat: "json",
            unit: "m",
            routeType: "fastest",
            avoidTimedConditions: false,
            doReverseGeocode: true,
            narrativeType: "text",
            enhancedNarrative: false,
            maxLinkId: 0,
            locale: "en_US",
            // no way to handle multiple avoids without hand-coding url?
            // [toll road, unpaved, ferry, limited access, approximate seasonal closure, country border crossing]
            inFormat: "kvp",
            avoids: "unpaved",
            stateBoundaryDisplay: true,
            countryBoundaryDisplay: true,
            sideOfStreetDisplay: false,
            destinationManeuverDisplay: false,
            fullShape: false,
            shapeFormat: "raw",
            inShapeFormat: "raw",
            outShapeFormat: "raw",
            generalize: 10,
            drivingStyle: "normal",
            highwayEfficiency: 20,
            manMaps: false
        }, data);

        if (this.sessionId) req.sessionId = this.sessionId;

        return mapquest<MapQuestDirections.Response>(url, req).then(response => {
            this.sessionId = response.route.sessionId;
            return response;
        });
    }

}
