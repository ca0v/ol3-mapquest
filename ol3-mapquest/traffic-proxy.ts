/**
 * http://www.mapquestapi.com/traffic/v2/incidents?key=cwm3pF5yuEGNp54sh96TF0irs5kCLd5y&callback=handleIncidentsResponse&boundingBox=39.950960,-105.259451,39.528562,-104.710135&filters=construction,incidents&inFormat=kvp&outFormat=json
 * http://www.mapquestapi.com/traffic/v2/incidents?key=cwm3pF5yuEGNp54sh96TF0irs5kCLd5y&callback=handleIncidentsResponse&boundingBox=34.85,-82.4,35,-82&filters=construction,incidents&inFormat=kvp&outFormat=json
 * http://www.mapquestapi.com/directions/v2/incidents?inFormat=kvp&outFormat=json&key=cwm3pF5yuEGNp54sh96TF0irs5kCLd5y&filters=construction,incidents&boundingBox=34.85,-82.4,35,-82&callback=define
 */
import * as $ from "jquery";

function jsonp<T>(url: string, args = <any>{}, callback = "callback") {
    let d = $.Deferred<T>();
    {
        args[callback] = "define";
        let uri = url + "?" + Object.keys(args).map(k => `${k}=${args[k]}`).join('&');
        require([uri], (data: T) => d.resolve(data));
    }
    return d;
}

export module MapQuestTraffic {

    export interface ParameterizedDescription {
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

    export interface Incident {
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

    export interface IncidentsResponse {
        incidents: Incident[];
        mqURL: string;
        info: Info;
    }

}


export class MapQuestTraffic {

    incidents(url: string, data: {
        boundingBox: number[];
        filters?: string;
    }) {

        let req = $.extend({
            inFormat: "kvp",
            outFormat: "json"
        }, data);

        return jsonp<MapQuestTraffic.IncidentsResponse>(url, req).then(response => {
            return response;
        });
    }

}
