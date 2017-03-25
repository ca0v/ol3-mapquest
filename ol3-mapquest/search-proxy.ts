/**
 * http://www.mapquestapi.com/search/common-parameters.html
 * 
 * http://www.mapquestapi.com/search/v2/search?key=cwm3pF5yuEGNp54sh96TF0irs5kCLd5y&shapePoints=34.85,-82.4 
 */

import * as $ from "jquery";
import G = require("ol3-fun/ol3-fun/google-polyline");

const g = new G();

export module MapQuestSearch {

    export interface LatLng {
        lng: number;
        lat: number;
    }

    export interface MqapGeography {
        latLng: LatLng;
    }

    export interface Fields {
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

    export interface SearchResult {
        resultNumber: number;
        distance: number;
        sourceName: string;
        name: string;
        shapePoints: number[];
        distanceUnit: string;
        key: string;
        fields: Fields;
    }

    export interface Origin {
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

    export interface HostedData {
        tableName: string;
        extraCriteria: string;
        columnNames: any[];
    }

    export interface Copyright {
        text: string;
        imageUrl: string;
        imageAltText: string;
    }

    export interface Info {
        statusCode: number;
        copyright: Copyright;
        messages: any[];
    }

    export interface Options {
        kmlStyleUrl: string;
        shapeFormat: string;
        ambiguities: boolean;
        pageSize: number;
        radius: number;
        currentPage: number;
        units: string;
        maxMatches: number;
    }

    export interface SearchResponse {
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

    constructor(public key: string, public url = "http://www.mapquestapi.com/search/v2") {
    }

    search(data: any, type = "search") {

        let req = $.extend({
            key: this.key,
            inFormat: "json",
            outFormat: "json",
            ambiguities: "ignore",
            units: "m",
            maxMatches: 100,
            shapeFormat: "cmp6"
        }, data);

        let url = this.url + "/" + type;

        let d = $.Deferred<MapQuestSearch.SearchResponse>();

        $.ajax({
            url: url,
            method: 'GET',
            data: req,
            dataType: 'json'
        }).then((response: MapQuestSearch.SearchResponse) => {
            g.decode; // TODO
            d.resolve(response);
            return response;
        });

        return d;
    }

    radius(data: {
        origin: number[];
        maxMatches?: number;
    }) {
        return this.search(data, "radius");
    }

    rectangle(data: {
        boundingBox: number[];
        maxMatches?: number;
    }) {
        return this.search(data, "rectangle");
    }

    polygon(data: {
        polygon: number[];
        maxMatches?: number;
        shapeFormat?: string;
    }) {
        return this.search(data, "polygon");
    }

    corridor(data: {
        line: number[];
        width?: number;
        bufferWidth?: number;
        maxMatches?: number;
        shapeFormat?: "raw" | "cmp6";
    }) {
        /**
raw: 39.96488,-76.729949,41.099998,-76.305603,39.899011,-76.164335,39.099998,-78.305603
simple: LINESTRING(-76.305603 40.099998,-76.305603 41.099998,-77.305603 41.099998,-78.305603 39.099998)
compressed: os|rFdiisMou|Ee{qAdqiF}qZx`{C|eaL
         */
        //g.encode(data.line); // http://www.mapquestapi.com/search/geometry.html
        return this.search($.extend({
            width: 5,
            bufferWidth: 0.25
        }, data), "corridor");
    }

}
