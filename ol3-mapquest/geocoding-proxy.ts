import * as $ from "jquery";

const MapQuestKey = "cwm3pF5yuEGNp54sh96TF0irs5kCLd5y";

function jsonp<T>(url: string, args = <any>{}, callback = "callback") {
    let d = $.Deferred<T>();
    {
        args[callback] = "define";
        let uri = url + "?" + Object.keys(args).map(k => `${k}=${args[k]}`).join('&');
        require([uri], (data: T) => d.resolve(data));
    }
    return d;
}

export module MapQuestGeocoding {

    export interface ProvidedLocation {
        latLng: LatLng;
    }

    export interface LatLng2 {
        lat: number;
        lng: number;
    }

    export interface Location {
        mapUrl: string;
    }

    export interface ReverseResponse {
        info: Info;
        options: Options;
        results: Result[];
    }

}

export module MapQuestGeocoding {

    export interface Copyright {
        text: string;
        imageUrl: string;
        imageAltText: string;
    }

    export interface Info {
        statuscode: number;
        copyright: Copyright;
        messages: any[];
    }

    export interface Ul {
        lat: number;
        lng: number;
    }

    export interface Lr {
        lat: number;
        lng: number;
    }

    export interface BoundingBox {
        ul: Ul;
        lr: Lr;
    }

    export interface Options {
        boundingBox: BoundingBox;
        maxResults: number;
        thumbMaps: boolean;
        ignoreLatLngInput: boolean;
    }

    export interface ProvidedLocation {
        location: string;
    }

    export interface LatLng {
        lat: number;
        lng: number;
    }

    export interface DisplayLatLng {
        lat: number;
        lng: number;
    }

    export interface Location {
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

    export interface Result {
        providedLocation: ProvidedLocation;
        locations: Location[];
    }

    export interface AddressResponse {
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
    }) {

        let req = $.extend({
            inFormat: "kvp",
            outFormat: "json"
        }, data);

        return jsonp<MapQuestGeocoding.ReverseResponse>(url, req).then(response => {
            return response;
        });

    }

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
    }) {

        let req = $.extend({
            maxResults: 1,
            thumbMaps: false,
            ignoreLatLngInput: false,
            delimiter: ",",
            intlMode: "AUTO",
            inFormat: "kvp",
            outFormat: "json"
        }, data);

        return jsonp<MapQuestGeocoding.AddressResponse>(url, req).then(response => {
            return response;
        });
    }

}

