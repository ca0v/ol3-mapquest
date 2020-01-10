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
    export interface MapQuestDirectionsOptions {
        key: string;
        url?: string;
    }
    export class MapQuestDirections {
        static DEFAULT_OPTIONS: MapQuestDirectionsOptions;
        static create(options: MapQuestDirectionsOptions): MapQuestDirections;
        options: MapQuestDirectionsOptions;
        private constructor(options);
        private sessionId;
        directions(data: MapQuestDirections.Options & {
            from: string;
            to: string | string[];
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
declare module "bower_components/ol3-fun/ol3-fun/snapshot" {
    import ol = require("openlayers");
    class Snapshot {
        static render(canvas: HTMLCanvasElement, feature: ol.Feature): void;
        /**
         * convert features into data:image/png;base64;
         */
        static snapshot(feature: ol.Feature): string;
    }
    export = Snapshot;
}
declare module "bower_components/ol3-grid/ol3-grid/ol3-grid" {
    import ol = require("openlayers");
    export interface GridOptions {
        map?: ol.Map;
        className?: string;
        position?: string;
        expanded?: boolean;
        hideButton?: boolean;
        autoCollapse?: boolean;
        autoPan?: boolean;
        canCollapse?: boolean;
        currentExtent?: boolean;
        showIcon?: boolean;
        labelAttributeName?: string;
        closedText?: string;
        openedText?: string;
        element?: HTMLElement;
        target?: HTMLElement;
        layers?: ol.layer.Vector[];
        placeholderText?: string;
        zoomDuration?: number;
        zoomPadding?: number;
        zoomMinResolution?: number;
    }
    export class Grid extends ol.control.Control {
        static DEFAULT_OPTIONS: GridOptions;
        static create(options: GridOptions): Grid;
        private features;
        private button;
        private grid;
        private options;
        handlers: Array<() => void>;
        private constructor(options);
        destroy(): void;
        setPosition(position: string): void;
        cssin(): void;
        redraw(): void;
        private featureMap;
        add(feature: ol.Feature, layer?: ol.layer.Vector): void;
        remove(feature: ol.Feature, layer: ol.layer.Vector): void;
        clear(): void;
        collapse(): void;
        expand(): void;
        on(type: string, cb: Function): ol.Object | ol.Object[];
        on(type: "feature-click", cb: (args: {
            type: "feature-click";
            feature: ol.Feature;
            row: HTMLTableRowElement;
        }) => void): void;
    }
}
declare module "bower_components/ol3-grid/index" {
    import Grid = require("bower_components/ol3-grid/ol3-grid/ol3-grid");
    export = Grid;
}
declare module "bower_components/ol3-symbolizer/ol3-symbolizer/common/ajax" {
    class Ajax {
        url: string;
        options: {
            use_json: boolean;
            use_cors: boolean;
        };
        constructor(url: string);
        jsonp<T>(args?: any, url?: string): JQueryDeferred<T>;
        private ajax<T>(method, args?, url?);
        get<T>(args?: any): JQueryDeferred<T>;
        post<T>(args?: any): JQueryDeferred<T>;
        put<T>(args?: any): JQueryDeferred<T>;
        delete(args?: any): JQueryDeferred<{}>;
    }
    export = Ajax;
}
declare module "bower_components/ol3-symbolizer/ol3-symbolizer/ags/ags-catalog" {
    export interface Service {
        name: string;
        type: string;
    }
    export interface CatalogInfo {
        currentVersion: number;
        folders: string[];
        services: Service[];
    }
    export interface SpatialReference {
        wkid: number;
        latestWkid: number;
        wkt: string;
    }
    export interface Extent {
        xmin: number;
        ymin: number;
        xmax: number;
        ymax: number;
        spatialReference: SpatialReference;
    }
    export interface DocumentInfo {
        Title: string;
        Author: string;
        Comments: string;
        Subject: string;
        Category: string;
        AntialiasingMode: string;
        TextAntialiasingMode: string;
        Keywords: string;
    }
    export interface Layer {
        id: number;
        name: string;
        parentLayerId: number;
        defaultVisibility: boolean;
        subLayerIds?: any;
        minScale: number;
        maxScale: number;
    }
    export interface FeatureServerInfo {
        currentVersion: number;
        serviceDescription: string;
        hasVersionedData: boolean;
        supportsDisconnectedEditing: boolean;
        syncEnabled: boolean;
        supportedQueryFormats: string;
        maxRecordCount: number;
        capabilities: string;
        description: string;
        copyrightText: string;
        spatialReference: SpatialReference;
        initialExtent: Extent;
        fullExtent: Extent;
        allowGeometryUpdates: boolean;
        units: string;
        documentInfo: DocumentInfo;
        layers: Layer[];
        tables: any[];
        enableZDefaults: boolean;
        zDefault: number;
    }
    export interface AdvancedQueryCapabilities {
        supportsPagination: boolean;
        supportsStatistics: boolean;
        supportsOrderBy: boolean;
        supportsDistinct: boolean;
    }
    export interface EsriTSSymbol {
        type: string;
        color: number[];
        backgroundColor?: any;
        borderLineColor?: any;
        borderLineSize?: any;
        verticalAlignment: string;
        horizontalAlignment: string;
        rightToLeft: boolean;
        angle: number;
        xoffset: number;
        yoffset: number;
        kerning: boolean;
        haloColor?: any;
        haloSize?: any;
        font: Font;
    }
    export interface DefaultSymbol {
        type: string;
        url: string;
        imageData: string;
        contentType: string;
        width: number;
        height: number;
        angle: number;
        xoffset: number;
        yoffset: number;
    }
    export interface UniqueValueInfo {
        symbol: DefaultSymbol;
        value: string;
        label: string;
        description: string;
    }
    export interface Renderer {
        type: string;
        field1: string;
        field2?: any;
        field3?: any;
        fieldDelimiter: string;
        defaultSymbol: DefaultSymbol;
        defaultLabel: string;
        uniqueValueInfos: UniqueValueInfo[];
    }
    export interface Font {
        family: string;
        size: number;
        style: string;
        weight: string;
        decoration: string;
    }
    export interface LabelingInfo {
        labelPlacement: string;
        where?: any;
        labelExpression: string;
        useCodedValues: boolean;
        symbol: DefaultSymbol & EsriTSSymbol;
        minScale: number;
        maxScale: number;
    }
    export interface DrawingInfo {
        renderer: Renderer;
        transparency: number;
        labelingInfo: LabelingInfo[];
    }
    export interface CodedValue {
        name: string;
        code: any;
    }
    export interface Domain {
        type: string;
        name: string;
        codedValues: CodedValue[];
        range: number[];
    }
    export interface Field {
        name: string;
        type: string;
        alias: string;
        domain: Domain;
        editable: boolean;
        nullable: boolean;
        length?: number;
    }
    export interface Domains {
        [n: string]: {
            type: string;
        };
    }
    export interface Attributes {
        [n: string]: string;
    }
    export interface Prototype {
        attributes: Attributes;
    }
    export interface Template {
        name: string;
        description: string;
        prototype: Prototype;
        drawingTool: string;
    }
    export interface Type {
        id: string;
        name: string;
        domains: Domains;
        templates: Template[];
    }
    export interface FeatureLayerInfo {
        currentVersion: number;
        id: number;
        name: string;
        type: string;
        description: string;
        copyrightText: string;
        defaultVisibility: boolean;
        editFieldsInfo?: any;
        ownershipBasedAccessControlForFeatures?: any;
        syncCanReturnChanges: boolean;
        relationships: any[];
        isDataVersioned: boolean;
        supportsRollbackOnFailureParameter: boolean;
        supportsStatistics: boolean;
        supportsAdvancedQueries: boolean;
        advancedQueryCapabilities: AdvancedQueryCapabilities;
        geometryType: string;
        minScale: number;
        maxScale: number;
        extent: Extent;
        drawingInfo: DrawingInfo;
        hasM: boolean;
        hasZ: boolean;
        enableZDefaults: boolean;
        zDefault: number;
        allowGeometryUpdates: boolean;
        hasAttachments: boolean;
        htmlPopupType: string;
        objectIdField: string;
        globalIdField: string;
        displayField: string;
        typeIdField: string;
        fields: Field[];
        types: Type[];
        templates: any[];
        maxRecordCount: number;
        supportedQueryFormats: string;
        capabilities: string;
        useStandardizedQueries: boolean;
    }
    export interface Origin {
        x: number;
        y: number;
    }
    export interface Lod {
        level: number;
        resolution: number;
        scale: number;
    }
    export interface TileInfo {
        rows: number;
        cols: number;
        dpi: number;
        format: string;
        compressionQuality: number;
        origin: Origin;
        spatialReference: SpatialReference;
        lods: Lod[];
    }
    export interface InitialExtent {
        xmin: number;
        ymin: number;
        xmax: number;
        ymax: number;
        spatialReference: SpatialReference;
    }
    export interface FullExtent {
        xmin: number;
        ymin: number;
        xmax: number;
        ymax: number;
        spatialReference: SpatialReference;
    }
    export interface MapServerInfo {
        currentVersion: number;
        serviceDescription: string;
        mapName: string;
        description: string;
        copyrightText: string;
        supportsDynamicLayers: boolean;
        layers: Layer[];
        tables: any[];
        spatialReference: SpatialReference;
        singleFusedMapCache: boolean;
        tileInfo: TileInfo;
        initialExtent: InitialExtent;
        fullExtent: FullExtent;
        minScale: number;
        maxScale: number;
        units: string;
        supportedImageFormatTypes: string;
        documentInfo: DocumentInfo;
        capabilities: string;
        supportedQueryFormats: string;
        exportTilesAllowed: boolean;
        maxRecordCount: number;
        maxImageHeight: number;
        maxImageWidth: number;
        supportedExtensions: string;
    }
    export class Catalog {
        private ajax;
        constructor(url: string);
        about(data?: any): JQueryDeferred<CatalogInfo>;
        aboutFolder(folder: string): JQueryDeferred<CatalogInfo>;
        aboutFeatureServer(name: string): JQueryDeferred<FeatureServerInfo> & {
            url: string;
        };
        aboutMapServer(name: string): JQueryDeferred<MapServerInfo> & {
            url: string;
        };
        aboutLayer(layer: number): JQueryDeferred<FeatureLayerInfo>;
    }
}
declare module "bower_components/ol3-symbolizer/ol3-symbolizer/format/base" {
    /**
     * implemented by all style serializers
     */
    export interface IConverter<T> {
        fromJson: (json: T) => ol.style.Style;
        toJson(style: ol.style.Style): T;
    }
}
declare module "bower_components/ol3-symbolizer/ol3-symbolizer/format/ol3-symbolizer" {
    import ol = require("openlayers");
    import Serializer = require("bower_components/ol3-symbolizer/ol3-symbolizer/format/base");
    export namespace Format {
        type Color = number[] | string;
        type Size = number[];
        type Offset = number[];
        type LineDash = number[];
        interface Fill {
            color?: string;
            gradient?: {
                type?: string;
                stops?: string;
            };
        }
        interface Stroke {
            color?: string;
            width?: number;
            lineCap?: string;
            lineJoin?: string;
            lineDash?: LineDash;
            miterLimit?: number;
        }
        interface Style {
            fill?: Fill;
            image?: Image;
            stroke?: Stroke;
            text?: Text;
            zIndex?: number;
        }
        interface Image {
            opacity?: number;
            rotateWithView?: boolean;
            rotation?: number;
            scale?: number;
            snapToPixel?: boolean;
        }
        interface Circle {
            radius: number;
            stroke?: Stroke;
            fill?: Fill;
            snapToPixel?: boolean;
        }
        interface Star extends Image {
            angle?: number;
            fill?: Fill;
            points?: number;
            stroke?: Stroke;
            radius?: number;
            radius2?: number;
        }
        interface Icon extends Image {
            anchor?: Offset;
            anchorOrigin?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
            anchorXUnits?: "fraction" | "pixels";
            anchorYUnits?: "fraction" | "pixels";
            color?: Color;
            crossOrigin?: string;
            src?: string;
            offset?: Offset;
            offsetOrigin?: 'top_left' | 'top_right' | 'bottom-left' | 'bottom-right';
            size?: Size;
        }
        interface Text {
            fill?: Fill;
            font?: string;
            offsetX?: number;
            offsetY?: number;
            rotation?: number;
            scale?: number;
            stroke?: Stroke;
            text?: string;
            textAlign?: string;
            textBaseline?: string;
        }
    }
    export namespace Format {
        interface Style {
            image?: Icon & Svg;
            icon?: Icon;
            svg?: Svg;
            star?: Star;
            circle?: Circle;
            text?: Text;
            fill?: Fill;
            stroke?: Stroke;
        }
        interface Icon {
            "anchor-x"?: number;
            "anchor-y"?: number;
        }
        interface Text {
            "offset-x"?: number;
            "offset-y"?: number;
        }
        interface Circle {
            opacity?: number;
        }
        interface Svg {
            anchor?: Offset;
            anchorOrigin?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
            anchorXUnits?: string;
            anchorYUnits?: string;
            color?: Color;
            crossOrigin?: string;
            img?: string;
            imgSize?: Size;
            offset?: Offset;
            offsetOrigin?: 'top_left' | 'top_right' | 'bottom-left' | 'bottom-right';
            path?: string;
            stroke?: Stroke;
            fill?: Fill;
        }
    }
    export class StyleConverter implements Serializer.IConverter<Format.Style> {
        fromJson(json: Format.Style): ol.style.Style;
        toJson(style: ol.style.Style): Format.Style;
        /**
         * uses the interior point of a polygon when rendering a 'point' style
         */
        setGeometry(feature: ol.Feature): ol.geom.Geometry;
        private assign(obj, prop, value);
        private serializeStyle(style);
        private serializeColor(color);
        private serializeFill(fill);
        private deserializeStyle(json);
        private deserializeText(json);
        private deserializeCircle(json);
        private deserializeStar(json);
        private deserializeIcon(json);
        private deserializeSvg(json);
        private deserializeFill(json);
        private deserializeStroke(json);
        private deserializeColor(fill);
        private deserializeLinearGradient(json);
        private deserializeRadialGradient(json);
    }
}
declare module "bower_components/ol3-symbolizer/ol3-symbolizer/format/ags-symbolizer" {
    export namespace ArcGisFeatureServerLayer {
        type SpatialReference = {
            wkid: string;
        };
        type Extent = {
            xmin: number;
        };
        type Styles = "esriSMSCircle" | "esriSMSCross" | "esriSMSDiamond" | "esriSMSPath" | "esriSMSSquare" | "esriSMSX" | "esriSFSSolid" | "esriSFSForwardDiagonal" | "esriSLSSolid" | "esriSLSDot" | "esriSLSDash" | "esriSLSDashDot" | "esriSLSDashDotDot";
        type SymbolTypes = "esriSMS" | "esriSLS" | "esriSFS" | "esriPMS" | "esriPFS" | "esriTS";
        type Color = number[];
        interface AdvancedQueryCapabilities {
            supportsPagination: boolean;
            supportsStatistics: boolean;
            supportsOrderBy: boolean;
            supportsDistinct: boolean;
        }
        interface Outline {
            style?: Styles;
            color?: number[];
            width?: number;
            type?: SymbolTypes;
            d?: Date;
        }
        interface Font {
            weight: string;
            style: string;
            family: string;
            size: number;
        }
        interface Symbol {
            type: SymbolTypes;
            style?: Styles;
            color?: number[];
            outline?: Outline;
            width?: number;
            horizontalAlignment?: string;
            verticalAlignment?: string;
            font?: Font;
            height?: number;
            xoffset?: number;
            yoffset?: number;
            contentType?: string;
            url?: string;
            size?: number;
            angle?: number;
            imageData?: string;
            path?: string;
        }
        interface UniqueValueInfo {
            symbol: Symbol;
            value?: string;
            label?: string;
            description?: string;
        }
        interface VisualVariable {
            type: string;
            field: string;
            valueUnit: string;
            minSize: number;
            maxSize: number;
            minDataValue: number;
            maxDataValue: number;
            minSliderValue: number;
            maxSliderValue: number;
        }
        interface ClassBreakInfo {
            symbol: Symbol;
            classMaxValue: number;
        }
        interface Renderer extends Attributes {
            type: string;
            label?: string;
            description?: string;
            field1?: string;
            field2?: string;
            field3?: string;
            fieldDelimiter?: string;
            defaultSymbol?: Symbol;
            defaultLabel?: any;
            symbol?: Symbol;
            uniqueValueInfos?: UniqueValueInfo[];
        }
        interface ClassBreakRenderer extends Renderer {
            field?: string;
            minValue?: number;
            classBreakInfos?: ClassBreakInfo[];
            visualVariables?: VisualVariable[];
            authoringInfo: {
                visualVariables: VisualVariable[];
            };
        }
        interface DrawingInfo {
            renderer: Renderer;
            transparency?: number;
            labelingInfo?: any;
        }
        interface CodedValue {
            name: string;
            code: string;
        }
        interface Domain {
            type: string;
            name: string;
            codedValues: CodedValue[];
        }
        interface Field {
            name: string;
            type: string;
            alias: string;
            domain: Domain;
            editable: boolean;
            nullable: boolean;
            length?: number;
        }
        interface Domains {
        }
        interface Attributes {
            [attribute: string]: any;
        }
        interface Prototype {
            attributes: Attributes;
        }
        interface Template {
            name: string;
            description: string;
            prototype: Prototype;
            drawingTool: string;
        }
        interface Type {
            id: string;
            name: string;
            domains: Domains;
            templates: Template[];
        }
        interface RootObject {
            currentVersion: string | number;
            id: number;
            name: string;
            type: string;
            description: string;
            copyrightText: string;
            defaultVisibility: boolean;
            editFieldsInfo?: any;
            ownershipBasedAccessControlForFeatures?: any;
            syncCanReturnChanges: boolean;
            relationships: any[];
            isDataVersioned: boolean;
            supportsRollbackOnFailureParameter: boolean;
            supportsStatistics: boolean;
            supportsAdvancedQueries: boolean;
            advancedQueryCapabilities: AdvancedQueryCapabilities;
            geometryType: string;
            minScale: number;
            maxScale: number;
            extent: Extent;
            drawingInfo: DrawingInfo;
            hasM: boolean;
            hasZ: boolean;
            allowGeometryUpdates: boolean;
            hasAttachments: boolean;
            htmlPopupType: string;
            objectIdField: string;
            globalIdField: string;
            displayField: string;
            typeIdField: string;
            fields: Field[];
            types: Type[];
            templates: any[];
            maxRecordCount: number;
            supportedQueryFormats: string;
            capabilities: string;
            useStandardizedQueries: boolean;
            spatialReference?: SpatialReference;
            displayFieldName?: string;
        }
    }
    export class StyleConverter {
        private asWidth(v);
        private asColor(color);
        private fromSFSSolid(symbol, style);
        private fromSFS(symbol, style);
        private fromSMSCircle(symbol, style);
        private fromSMSCross(symbol, style);
        private fromSMSDiamond(symbol, style);
        private fromSMSPath(symbol, style);
        private fromSMSSquare(symbol, style);
        private fromSMSX(symbol, style);
        private fromSMS(symbol, style);
        private fromPMS(symbol, style);
        private fromSLSSolid(symbol, style);
        private fromSLS(symbol, style);
        private fromPFS(symbol, style);
        private fromTS(symbol, style);
        fromJson(symbol: ArcGisFeatureServerLayer.Symbol): ol.style.Style;
        private fromSymbol(symbol, style);
        fromRenderer(renderer: ArcGisFeatureServerLayer.Renderer, args: {
            url: string;
        }): ol.style.Style | ((feature: ol.Feature) => ol.style.Style);
    }
}
declare module "bower_components/ol3-symbolizer/ol3-symbolizer/common/common" {
    export function getParameterByName(name: string, url?: string): string;
    export function doif<T>(v: T, cb: (v: T) => void): void;
    export function mixin<A extends any, B extends any>(a: A, b: B): A & B;
    export function defaults<T extends any>(a: T, b: T): T;
    export function cssin(name: string, css: string): () => void;
}
declare module "bower_components/ol3-symbolizer/ol3-symbolizer/ags/ags-source" {
    import ol = require("openlayers");
    export interface IOptions extends olx.source.VectorOptions {
        services: string;
        serviceName: string;
        map: ol.Map;
        layers: number[];
        tileSize?: number;
        where?: string;
    }
    export class ArcGisVectorSourceFactory {
        static create(options: IOptions): JQueryDeferred<ol.layer.Vector[]>;
    }
}
declare module "bower_components/ol3-symbolizer/index" {
    import Symbolizer = require("bower_components/ol3-symbolizer/ol3-symbolizer/format/ol3-symbolizer");
    export = Symbolizer;
}
declare module "ol3-mapquest/examples/mapmaker" {
    import ol = require("openlayers");
    export function create(): {
        map: ol.Map;
        source: ol.source.Vector;
    };
}
declare module "ol3-mapquest/examples/directions" {
    export function run(): void;
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
