var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("bower_components/ol3-fun/ol3-fun/common", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Generate a UUID
     * @returns UUID
     *
     * Adapted from http://stackoverflow.com/a/2117523/526860
     */
    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    function asArray(list) {
        var result = new Array(list.length);
        for (var i = 0; i < list.length; i++) {
            result.push(list[i]);
        }
        return result;
    }
    exports.asArray = asArray;
    // ie11 compatible
    function toggle(e, className, toggle) {
        if (toggle === void 0) { toggle = false; }
        !toggle ? e.classList.remove(className) : e.classList.add(className);
    }
    exports.toggle = toggle;
    function parse(v, type) {
        if (typeof type === "string")
            return v;
        if (typeof type === "number")
            return parseFloat(v);
        if (typeof type === "boolean")
            return (v === "1" || v === "true");
        if (Array.isArray(type)) {
            return (v.split(",").map(function (v) { return parse(v, type[0]); }));
        }
        throw "unknown type: " + type;
    }
    exports.parse = parse;
    function getQueryParameters(options, url) {
        if (url === void 0) { url = window.location.href; }
        var opts = options;
        Object.keys(opts).forEach(function (k) {
            doif(getParameterByName(k, url), function (v) {
                var value = parse(v, opts[k]);
                if (value !== undefined)
                    opts[k] = value;
            });
        });
    }
    exports.getQueryParameters = getQueryParameters;
    function getParameterByName(name, url) {
        if (url === void 0) { url = window.location.href; }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    exports.getParameterByName = getParameterByName;
    function doif(v, cb) {
        if (v !== undefined && v !== null)
            cb(v);
    }
    exports.doif = doif;
    function mixin(a, b) {
        Object.keys(b).forEach(function (k) { return a[k] = b[k]; });
        return a;
    }
    exports.mixin = mixin;
    function defaults(a) {
        var b = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            b[_i - 1] = arguments[_i];
        }
        b.forEach(function (b) {
            Object.keys(b).filter(function (k) { return a[k] === undefined; }).forEach(function (k) { return a[k] = b[k]; });
        });
        return a;
    }
    exports.defaults = defaults;
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
    function cssin(name, css) {
        var id = "style-" + name;
        var styleTag = document.getElementById(id);
        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = id;
            styleTag.type = "text/css";
            document.head.appendChild(styleTag);
            styleTag.appendChild(document.createTextNode(css));
        }
        var dataset = styleTag.dataset;
        dataset["count"] = parseInt(dataset["count"] || "0") + 1 + "";
        return function () {
            dataset["count"] = parseInt(dataset["count"] || "0") - 1 + "";
            if (dataset["count"] === "0") {
                styleTag.remove();
            }
        };
    }
    exports.cssin = cssin;
    function debounce(func, wait, immediate) {
        var _this = this;
        if (wait === void 0) { wait = 50; }
        if (immediate === void 0) { immediate = false; }
        var timeout;
        return (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var later = function () {
                timeout = null;
                if (!immediate)
                    func.apply(_this, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow)
                func.call(_this, args);
        });
    }
    exports.debounce = debounce;
    /**
     * poor $(html) substitute due to being
     * unable to create <td>, <tr> elements
     */
    function html(html) {
        var a = document.createElement("div");
        a.innerHTML = html;
        return (a.firstElementChild || a.firstChild);
    }
    exports.html = html;
    function pair(a1, a2) {
        var result = [];
        a1.forEach(function (v1) { return a2.forEach(function (v2) { return result.push([v1, v2]); }); });
        return result;
    }
    exports.pair = pair;
    function range(n) {
        var result = new Array(n);
        for (var i = 0; i < n; i++)
            result[i] = i;
        return result;
    }
    exports.range = range;
    // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffle(array) {
        var currentIndex = array.length;
        var temporaryValue;
        var randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    exports.shuffle = shuffle;
});
define("bower_components/ol3-fun/ol3-fun/navigation", ["require", "exports", "openlayers", "bower_components/ol3-fun/ol3-fun/common"], function (require, exports, ol, common_1) {
    "use strict";
    /**
     * A less disorienting way of changing the maps extent (maybe!)
     * Zoom out until new feature is visible
     * Zoom to that feature
     */
    function zoomToFeature(map, feature, options) {
        options = common_1.defaults(options || {}, {
            duration: 1000,
            padding: 256,
            minResolution: 2 * map.getView().getMinResolution()
        });
        var view = map.getView();
        var currentExtent = view.calculateExtent(map.getSize());
        var targetExtent = feature.getGeometry().getExtent();
        var doit = function (duration) {
            view.fit(targetExtent, {
                size: map.getSize(),
                padding: [options.padding, options.padding, options.padding, options.padding],
                minResolution: options.minResolution,
                duration: duration
            });
        };
        if (ol.extent.containsExtent(currentExtent, targetExtent)) {
            // new extent is contained within current extent, pan and zoom in
            doit(options.duration);
        }
        else if (ol.extent.containsExtent(currentExtent, targetExtent)) {
            // new extent is contained within current extent, pan and zoom out
            doit(options.duration);
        }
        else {
            // zoom out until target extent is in view
            var fullExtent = ol.extent.createEmpty();
            ol.extent.extend(fullExtent, currentExtent);
            ol.extent.extend(fullExtent, targetExtent);
            var dscale = ol.extent.getWidth(fullExtent) / ol.extent.getWidth(currentExtent);
            var duration = 0.5 * options.duration;
            view.fit(fullExtent, {
                size: map.getSize(),
                padding: [options.padding, options.padding, options.padding, options.padding],
                minResolution: options.minResolution,
                duration: duration
            });
            setTimeout(function () { return doit(0.5 * options.duration); }, duration);
        }
    }
    exports.zoomToFeature = zoomToFeature;
});
// ported from https://github.com/gmaclennan/parse-dms/blob/master/index.js
define("bower_components/ol3-fun/ol3-fun/parse-dms", ["require", "exports"], function (require, exports) {
    "use strict";
    function decDegFromMatch(m) {
        var signIndex = {
            "-": -1,
            "N": 1,
            "S": -1,
            "E": 1,
            "W": -1
        };
        var latLonIndex = {
            "-": "",
            "N": "lat",
            "S": "lat",
            "E": "lon",
            "W": "lon"
        };
        var degrees, minutes, seconds, sign, latLon;
        sign = signIndex[m[2]] || signIndex[m[1]] || signIndex[m[6]] || 1;
        degrees = Number(m[3]);
        minutes = m[4] ? Number(m[4]) : 0;
        seconds = m[5] ? Number(m[5]) : 0;
        latLon = latLonIndex[m[1]] || latLonIndex[m[6]];
        if (!inRange(degrees, 0, 180))
            throw 'Degrees out of range';
        if (!inRange(minutes, 0, 60))
            throw 'Minutes out of range';
        if (!inRange(seconds, 0, 60))
            throw 'Seconds out of range';
        return {
            decDeg: sign * (degrees + minutes / 60 + seconds / 3600),
            latLon: latLon
        };
    }
    function inRange(value, a, b) {
        return value >= a && value <= b;
    }
    function parse(dmsString) {
        dmsString = dmsString.trim();
        // Inspired by https://gist.github.com/JeffJacobson/2955437
        // See https://regex101.com/r/kS2zR1/3
        var dmsRe = /([NSEW])?(-)?(\d+(?:\.\d+)?)[°º:d\s]?\s?(?:(\d+(?:\.\d+)?)['’‘′:]\s?(?:(\d{1,2}(?:\.\d+)?)(?:"|″|’’|'')?)?)?\s?([NSEW])?/i;
        var dmsString2;
        var m1 = dmsString.match(dmsRe);
        if (!m1)
            throw 'Could not parse string';
        // If dmsString starts with a hemisphere letter, then the regex can also capture the 
        // hemisphere letter for the second coordinate pair if also in the string
        if (m1[1]) {
            m1[6] = undefined;
            dmsString2 = dmsString.substr(m1[0].length - 1).trim();
        }
        else {
            dmsString2 = dmsString.substr(m1[0].length).trim();
        }
        var decDeg1 = decDegFromMatch(m1);
        var m2 = dmsString2.match(dmsRe);
        var decDeg2 = m2 && decDegFromMatch(m2);
        if (typeof decDeg1.latLon === 'undefined') {
            if (!isNaN(decDeg1.decDeg) && decDeg2 && isNaN(decDeg2.decDeg)) {
                // If we only have one coordinate but we have no hemisphere value,
                // just return the decDeg number
                return decDeg1.decDeg;
            }
            else if (!isNaN(decDeg1.decDeg) && decDeg2 && !isNaN(decDeg2.decDeg)) {
                // If no hemisphere letter but we have two coordinates,
                // infer that the first is lat, the second lon
                decDeg1.latLon = 'lat';
                decDeg2.latLon = 'lon';
            }
            else {
                throw 'Could not parse string';
            }
        }
        // If we parsed the first coordinate as lat or lon, then assume the second is the other
        if (typeof decDeg2.latLon === 'undefined') {
            decDeg2.latLon = decDeg1.latLon === 'lat' ? 'lon' : 'lat';
        }
        return _a = {},
            _a[decDeg1.latLon] = decDeg1.decDeg,
            _a[decDeg2.latLon] = decDeg2.decDeg,
            _a;
        var _a;
    }
    exports.parse = parse;
});
define("bower_components/ol3-fun/index", ["require", "exports", "bower_components/ol3-fun/ol3-fun/common", "bower_components/ol3-fun/ol3-fun/navigation", "bower_components/ol3-fun/ol3-fun/parse-dms"], function (require, exports, common, navigation, dms) {
    "use strict";
    var index = common.defaults(common, {
        dms: dms,
        navigation: navigation
    });
    return index;
});
define("ol3-mapquest/directions-proxy", ["require", "exports", "jquery", "bower_components/ol3-fun/index"], function (require, exports, $, ol3_fun_1) {
    "use strict";
    /**
     * http://www.mapquestapi.com/directions/v2/route?key=cwm3pF5yuEGNp54sh96TF0irs5kCLd5y&from=Lancaster,PA&to=York,PA&callback=define
     * http://www.mapquestapi.com/directions/v2/route?key=cwm3pF5yuEGNp54sh96TF0irs5kCLd5y?from=Lancaster,PA&to=York,PA&callback=define
     * http://www.mapquestapi.com/directions/v2/route?key=cwm3pF5yuEGNp54sh96TF0irs5kCLd5y?from=Lancaster,PA&to=York,PA&callback=define
     */
    /**
     * If "to" is an array then multiple "to" query strings should be provided (seriously)
     */
    function mapquest(url, args, callback) {
        if (args === void 0) { args = {}; }
        if (callback === void 0) { callback = "callback"; }
        var d = $.Deferred();
        {
            args[callback] = "define";
            var values_1 = [];
            Object.keys(args).forEach(function (k) {
                var value = args[k];
                if (Array.isArray(value)) {
                    var arr = value;
                    arr.forEach(function (v) { return values_1.push({ name: k, value: v }); });
                }
                else {
                    values_1.push({ name: k, value: value });
                }
            });
            var uri = url + "?" + values_1.map(function (k) { return k.name + "=" + k.value; }).join('&');
            require([uri], function (data) { return d.resolve(data); });
        }
        return d;
    }
    var MapQuestDirections = (function () {
        function MapQuestDirections(options) {
            this.sessionId = "";
            this.options = ol3_fun_1.defaults(options, MapQuestDirections.DEFAULT_OPTIONS);
        }
        MapQuestDirections.create = function (options) {
            return new MapQuestDirections(options);
        };
        MapQuestDirections.prototype.directions = function (data) {
            var _this = this;
            var req = ol3_fun_1.defaults(data, {
                key: this.options.key,
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
                manMaps: false,
            });
            return mapquest(this.options.url, req).then(function (response) {
                _this.sessionId = response.route.sessionId;
                return response;
            });
        };
        return MapQuestDirections;
    }());
    MapQuestDirections.DEFAULT_OPTIONS = {
        url: '//www.mapquestapi.com/directions/v2/route',
        key: '[YOUR-MAPQUEST-API-KEY]'
    };
    exports.MapQuestDirections = MapQuestDirections;
});
define("ol3-mapquest/geocoding-proxy", ["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    var MapQuestKey = "cwm3pF5yuEGNp54sh96TF0irs5kCLd5y";
    function jsonp(url, args, callback) {
        if (args === void 0) { args = {}; }
        if (callback === void 0) { callback = "callback"; }
        var d = $.Deferred();
        {
            args[callback] = "define";
            var uri = url + "?" + Object.keys(args).map(function (k) { return k + "=" + args[k]; }).join('&');
            require([uri], function (data) { return d.resolve(data); });
        }
        return d;
    }
    var MapQuestGeocoding = (function () {
        function MapQuestGeocoding() {
        }
        MapQuestGeocoding.prototype.reverse = function (url, data) {
            var req = $.extend({
                inFormat: "kvp",
                outFormat: "json"
            }, data);
            return jsonp(url, req).then(function (response) {
                return response;
            });
        };
        MapQuestGeocoding.prototype.address = function (url, data) {
            var req = $.extend({
                maxResults: 1,
                thumbMaps: false,
                ignoreLatLngInput: false,
                delimiter: ",",
                intlMode: "AUTO",
                inFormat: "kvp",
                outFormat: "json"
            }, data);
            return jsonp(url, req).then(function (response) {
                return response;
            });
        };
        return MapQuestGeocoding;
    }());
    exports.MapQuestGeocoding = MapQuestGeocoding;
});
/*
https://www.mapquestapi.com/directions/#optimized
https://www.mapquestapi.com/common/locations.html

Location objects are either

Strings, which are assumed to be single-line addresses (as described above), or
Location objects, which are JSON objects containing the parameters described in the table below.

| Format | Example |
city (AA5), state (AA3)	Lancaster, PA
city, state, postalCode	Lancaster, PA, 17603
postalCode	17603
street, city, state	1090 N Charlotte St, Lancaster, PA
street, city, state, postalCode	1090 N Charlotte St, Lancaster, PA 17603
street, postalCode	1090 N Charlotte St, 17603
latLng	40.05323,-76.313632

REQUEST URL:

https://www.mapquestapi.com/directions/v2/optimizedroute?key=YOUR_KEY_HERE

REQUEST BODY:
{
   locations:[
      "Boalsburg, PA",
      "York, PA",
      "State College, PA",
      "Lancaster, PA"
   ]
}
*/
define("ol3-mapquest/optimized-route-proxy", ["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    var MapQuestKey = "cwm3pF5yuEGNp54sh96TF0irs5kCLd5y";
    var MapQuestRoute = (function () {
        function MapQuestRoute() {
            this.sessionId = "";
        }
        /**
         * Returns
         * | locationSequence | a sequence array that can be used to determine the index in the original location object list. |
         * | locations | a collection of locations in the form of an address. The origin and destination locations remain fixed, but the intermediate locations are re-ordered as appropriate. |
         */
        MapQuestRoute.prototype.route = function (url, data) {
            var _this = this;
            var req = $.extend({
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
            if (this.sessionId)
                req.sessionId = this.sessionId;
            /** GET + POST work with from/to but how to set locations? */
            var d = $.Deferred();
            $.ajax({
                url: url + "?key=" + req.key,
                data: {
                    locations: data.locations
                },
                method: 'POST'
            }).then(function (response) {
                _this.sessionId = response.route.sessionId;
                d.resolve(response);
            });
            return d;
        };
        return MapQuestRoute;
    }());
    exports.MapQuestRoute = MapQuestRoute;
});
define("bower_components/ol3-fun/ol3-fun/google-polyline", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * https://developers.google.com/maps/documentation/utilities/polylinealgorithm?csw=1
     * https://github.com/DeMoehn/Cloudant-nyctaxi/blob/2e48cb6c53bd4ac4f58d50d9302f00fc72f6681e/app/js/polyline.js
     */
    var PolylineEncoder = (function () {
        function PolylineEncoder() {
        }
        PolylineEncoder.prototype.encodeCoordinate = function (coordinate, factor) {
            coordinate = Math.round(coordinate * factor);
            coordinate <<= 1;
            if (coordinate < 0) {
                coordinate = ~coordinate;
            }
            var output = '';
            while (coordinate >= 0x20) {
                output += String.fromCharCode((0x20 | (coordinate & 0x1f)) + 0x3f);
                coordinate >>= 5;
            }
            output += String.fromCharCode(coordinate + 0x3f);
            return output;
        };
        PolylineEncoder.prototype.decode = function (str, precision) {
            if (precision === void 0) { precision = 5; }
            var index = 0, lat = 0, lng = 0, coordinates = [], latitude_change, longitude_change, factor = Math.pow(10, precision);
            while (index < str.length) {
                var byte = 0;
                var shift = 0;
                var result = 0;
                do {
                    byte = str.charCodeAt(index++) - 0x3f;
                    result |= (byte & 0x1f) << shift;
                    shift += 5;
                } while (byte >= 0x20);
                var latitude_change_1 = ((result & 1) ? ~(result >> 1) : (result >> 1));
                shift = result = 0;
                do {
                    byte = str.charCodeAt(index++) - 0x3f;
                    result |= (byte & 0x1f) << shift;
                    shift += 5;
                } while (byte >= 0x20);
                longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
                lat += latitude_change_1;
                lng += longitude_change;
                coordinates.push([lat / factor, lng / factor]);
            }
            return coordinates;
        };
        PolylineEncoder.prototype.encode = function (coordinates, precision) {
            if (precision === void 0) { precision = 5; }
            if (!coordinates.length)
                return '';
            var factor = Math.pow(10, precision), output = this.encodeCoordinate(coordinates[0][0], factor) + this.encodeCoordinate(coordinates[0][1], factor);
            for (var i = 1; i < coordinates.length; i++) {
                var a = coordinates[i], b = coordinates[i - 1];
                output += this.encodeCoordinate(a[0] - b[0], factor);
                output += this.encodeCoordinate(a[1] - b[1], factor);
            }
            return output;
        };
        return PolylineEncoder;
    }());
    return PolylineEncoder;
});
/**
 * http://www.mapquestapi.com/search/common-parameters.html
 *
 * http://www.mapquestapi.com/search/v2/search?key=cwm3pF5yuEGNp54sh96TF0irs5kCLd5y&shapePoints=34.85,-82.4
 */
define("ol3-mapquest/search-proxy", ["require", "exports", "jquery", "bower_components/ol3-fun/ol3-fun/google-polyline"], function (require, exports, $, G) {
    "use strict";
    var g = new G();
    var MapQuestSearch = (function () {
        function MapQuestSearch(key, url) {
            if (url === void 0) { url = "http://www.mapquestapi.com/search/v2"; }
            this.key = key;
            this.url = url;
        }
        MapQuestSearch.prototype.search = function (data, type) {
            if (type === void 0) { type = "search"; }
            var req = $.extend({
                key: this.key,
                inFormat: "json",
                outFormat: "json",
                ambiguities: "ignore",
                units: "m",
                maxMatches: 100,
                shapeFormat: "cmp6"
            }, data);
            var url = this.url + "/" + type;
            var d = $.Deferred();
            $.ajax({
                url: url,
                method: 'GET',
                data: req,
                dataType: 'json'
            }).then(function (response) {
                g.decode; // TODO
                d.resolve(response);
                return response;
            });
            return d;
        };
        MapQuestSearch.prototype.radius = function (data) {
            return this.search(data, "radius");
        };
        MapQuestSearch.prototype.rectangle = function (data) {
            return this.search(data, "rectangle");
        };
        MapQuestSearch.prototype.polygon = function (data) {
            return this.search(data, "polygon");
        };
        MapQuestSearch.prototype.corridor = function (data) {
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
        };
        return MapQuestSearch;
    }());
    exports.MapQuestSearch = MapQuestSearch;
});
define("ol3-mapquest/traffic-proxy", ["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    function jsonp(url, args, callback) {
        if (args === void 0) { args = {}; }
        if (callback === void 0) { callback = "callback"; }
        var d = $.Deferred();
        {
            args[callback] = "define";
            var uri = url + "?" + Object.keys(args).map(function (k) { return k + "=" + args[k]; }).join('&');
            require([uri], function (data) { return d.resolve(data); });
        }
        return d;
    }
    var MapQuestTraffic = (function () {
        function MapQuestTraffic() {
        }
        MapQuestTraffic.prototype.incidents = function (url, data) {
            var req = $.extend({
                inFormat: "kvp",
                outFormat: "json"
            }, data);
            return jsonp(url, req).then(function (response) {
                return response;
            });
        };
        return MapQuestTraffic;
    }());
    exports.MapQuestTraffic = MapQuestTraffic;
});
define("index", ["require", "exports", "ol3-mapquest/directions-proxy", "ol3-mapquest/geocoding-proxy", "ol3-mapquest/optimized-route-proxy", "ol3-mapquest/search-proxy", "ol3-mapquest/traffic-proxy"], function (require, exports, directions_proxy_1, geocoding_proxy_1, optimized_route_proxy_1, search_proxy_1, traffic_proxy_1) {
    "use strict";
    var API = {
        Directions: directions_proxy_1.MapQuestDirections,
        Geocoding: geocoding_proxy_1.MapQuestGeocoding,
        Route: optimized_route_proxy_1.MapQuestRoute,
        Search: search_proxy_1.MapQuestSearch,
        Traffic: traffic_proxy_1.MapQuestTraffic
    };
    return API;
});
define("bower_components/ol3-fun/ol3-fun/snapshot", ["require", "exports", "openlayers"], function (require, exports, ol) {
    "use strict";
    function getStyle(feature) {
        var style = feature.getStyle();
        if (!style) {
            var styleFn = feature.getStyleFunction();
            if (styleFn) {
                style = styleFn(0);
            }
        }
        if (!style) {
            style = new ol.style.Style({
                text: new ol.style.Text({
                    text: "?"
                })
            });
        }
        if (!Array.isArray(style))
            style = [style];
        return style;
    }
    var Snapshot = (function () {
        function Snapshot() {
        }
        Snapshot.render = function (canvas, feature) {
            feature = feature.clone();
            var geom = feature.getGeometry();
            var extent = geom.getExtent();
            var isPoint = extent[0] === extent[2];
            var _a = ol.extent.getCenter(extent), dx = _a[0], dy = _a[1];
            var scale = isPoint ? 1 : Math.min(canvas.width / ol.extent.getWidth(extent), canvas.height / ol.extent.getHeight(extent));
            geom.translate(-dx, -dy);
            geom.scale(scale, -scale);
            geom.translate(canvas.width / 2, canvas.height / 2);
            var vtx = ol.render.toContext(canvas.getContext("2d"));
            var styles = getStyle(feature);
            if (!Array.isArray(styles))
                styles = [styles];
            styles.forEach(function (style) { return vtx.drawFeature(feature, style); });
        };
        /**
         * convert features into data:image/png;base64;
         */
        Snapshot.snapshot = function (feature) {
            var canvas = document.createElement("canvas");
            var geom = feature.getGeometry();
            this.render(canvas, feature);
            return canvas.toDataURL();
        };
        return Snapshot;
    }());
    return Snapshot;
});
define("bower_components/ol3-grid/ol3-grid/ol3-grid", ["require", "exports", "openlayers", "bower_components/ol3-fun/index", "bower_components/ol3-fun/ol3-fun/snapshot", "bower_components/ol3-fun/ol3-fun/navigation"], function (require, exports, ol, ol3_fun_2, Snapshot, navigation_1) {
    "use strict";
    var grid_html = "\n<div class='ol-grid-container'>\n    <table class='ol-grid-table'>\n        <tbody><tr><td/></tr></tbody>\n    </table>\n</div>\n";
    var olcss = {
        CLASS_CONTROL: 'ol-control',
        CLASS_UNSELECTABLE: 'ol-unselectable',
        CLASS_UNSUPPORTED: 'ol-unsupported',
        CLASS_HIDDEN: 'ol-hidden'
    };
    var expando = {
        right: '»',
        left: '«'
    };
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid(options) {
            var _this = this;
            if (options.hideButton) {
                options.canCollapse = false;
                options.autoCollapse = false;
                options.expanded = true;
            }
            _this = _super.call(this, {
                element: options.element,
                target: options.target
            }) || this;
            _this.options = options;
            _this.features = new ol.source.Vector();
            _this.featureMap = [];
            _this.handlers = [];
            _this.cssin();
            var button = _this.button = document.createElement('button');
            button.setAttribute('type', 'button');
            button.title = options.placeholderText;
            options.element.appendChild(button);
            if (options.hideButton) {
                button.style.display = "none";
            }
            var grid = ol3_fun_2.html(grid_html.trim());
            _this.grid = grid.getElementsByClassName("ol-grid-table")[0];
            options.element.appendChild(grid);
            if (_this.options.autoCollapse) {
                button.addEventListener("mouseover", function () {
                    !options.expanded && _this.expand();
                });
                button.addEventListener("focus", function () {
                    !options.expanded && _this.expand();
                });
                button.addEventListener("blur", function () {
                    options.expanded && _this.collapse();
                });
            }
            button.addEventListener("click", function () {
                options.expanded ? _this.collapse() : _this.expand();
            });
            options.expanded ? _this.expand() : _this.collapse();
            // render
            _this.features.on(["addfeature", "addfeatures"], ol3_fun_2.debounce(function () { return _this.redraw(); }));
            if (_this.options.currentExtent) {
                _this.options.map.getView().on(["change:center", "change:resolution"], ol3_fun_2.debounce(function () { return _this.redraw(); }));
            }
            if (_this.options.layers) {
                _this.options.layers.forEach(function (l) {
                    var source = l.getSource();
                    source.on("addfeature", function (args) {
                        _this.add(args.feature, l);
                    });
                    source.on("removefeature", function (args) {
                        _this.remove(args.feature, l);
                    });
                });
            }
            return _this;
        }
        Grid.create = function (options) {
            // provide computed and static defaults
            options = ol3_fun_2.defaults(ol3_fun_2.mixin({
                openedText: options.position && -1 < options.position.indexOf("left") ? expando.left : expando.right,
                closedText: options.position && -1 < options.position.indexOf("left") ? expando.right : expando.left,
            }, options), Grid.DEFAULT_OPTIONS);
            var element = document.createElement('div');
            element.className = options.className + " " + options.position + " " + olcss.CLASS_UNSELECTABLE + " " + olcss.CLASS_CONTROL;
            var gridOptions = ol3_fun_2.mixin({
                map: options.map,
                element: element,
                expanded: false
            }, options);
            var grid = new Grid(gridOptions);
            if (options.map) {
                options.map.addControl(grid);
            }
            grid.handlers.push(function () { return element.remove(); });
            return grid;
        };
        Grid.prototype.destroy = function () {
            this.handlers.forEach(function (h) { return h(); });
            this.setTarget(null);
        };
        Grid.prototype.setPosition = function (position) {
            var _this = this;
            this.options.position.split(' ')
                .forEach(function (k) { return _this.options.element.classList.remove(k); });
            position.split(' ')
                .forEach(function (k) { return _this.options.element.classList.add(k); });
            this.options.position = position;
        };
        Grid.prototype.cssin = function () {
            var className = this.options.className;
            var positions = ol3_fun_2.pair("top left right bottom".split(" "), ol3_fun_2.range(24))
                .map(function (pos) { return "." + className + "." + (pos[0] + (-pos[1] || '')) + " { " + pos[0] + ":" + (0.5 + pos[1]) + "em; }"; });
            this.handlers.push(ol3_fun_2.cssin(className, "\n." + className + " ." + className + "-container {\n    max-height: 16em;\n    overflow-y: auto;\n}\n." + className + " ." + className + "-container.ol-hidden {\n    display: none;\n}\n." + className + " .feature-row {\n    cursor: pointer;\n}\n." + className + " .feature-row:hover {\n    background: black;\n    color: white;\n}\n." + className + " .feature-row:focus {\n    background: #ccc;\n    color: black;\n}\n" + positions.join('\n') + "\n"));
        };
        Grid.prototype.redraw = function () {
            var _this = this;
            var options = this.options;
            var map = options.map;
            var extent = map.getView().calculateExtent(map.getSize());
            var tbody = this.grid.tBodies[0];
            tbody.innerHTML = "";
            var features = [];
            if (this.options.currentExtent) {
                this.features.forEachFeatureInExtent(extent, function (f) { return void features.push(f); });
            }
            else {
                this.features.forEachFeature(function (f) { return void features.push(f); });
            }
            features.forEach(function (feature) {
                var tr = document.createElement("tr");
                tr.tabIndex = 0;
                tr.className = "feature-row";
                if (_this.options.showIcon) {
                    var td = document.createElement("td");
                    var canvas = document.createElement("canvas");
                    td.appendChild(canvas);
                    canvas.className = "icon";
                    canvas.width = 160;
                    canvas.height = 64;
                    tr.appendChild(td);
                    Snapshot.render(canvas, feature);
                }
                if (_this.options.labelAttributeName) {
                    var td = document.createElement("td");
                    var label = ol3_fun_2.html("<label class=\"label\">" + feature.get(_this.options.labelAttributeName) + "</label>");
                    td.appendChild(label);
                    tr.appendChild(td);
                }
                ["click", "keypress"].forEach(function (k) {
                    return tr.addEventListener(k, function () {
                        if (_this.options.autoCollapse) {
                            _this.collapse();
                        }
                        _this.dispatchEvent({
                            type: "feature-click",
                            feature: feature,
                            row: tr[0]
                        });
                        if (_this.options.autoPan) {
                            navigation_1.zoomToFeature(map, feature, {
                                duration: options.zoomDuration,
                                padding: options.zoomPadding,
                                minResolution: options.zoomMinResolution
                            });
                        }
                    });
                });
                tbody.appendChild(tr);
            });
        };
        Grid.prototype.add = function (feature, layer) {
            var _this = this;
            var style = feature.getStyle();
            if (!style && layer && this.options.showIcon) {
                style = layer.getStyleFunction()(feature, 0);
                // need to capture style but don't want to effect original feature
                var originalFeature_1 = feature;
                feature = originalFeature_1.clone();
                feature.setStyle(style);
                // how to keep geometry in sync?
                originalFeature_1.on("change", ol3_fun_2.debounce(function () {
                    feature.setGeometry(originalFeature_1.getGeometry());
                    _this.redraw();
                }));
                this.featureMap.push({ f1: originalFeature_1, f2: feature });
            }
            this.features.addFeature(feature);
        };
        Grid.prototype.remove = function (feature, layer) {
            var _this = this;
            this.featureMap.filter(function (map) { return map.f1 === feature; }).forEach(function (m) { return _this.features.removeFeature(m.f2); });
            this.redraw();
        };
        Grid.prototype.clear = function () {
            var tbody = this.grid.tBodies[0];
            tbody.innerHTML = "";
        };
        Grid.prototype.collapse = function () {
            var options = this.options;
            if (!options.canCollapse)
                return;
            options.expanded = false;
            this.grid.parentElement.classList.toggle(olcss.CLASS_HIDDEN, true);
            this.button.classList.toggle(olcss.CLASS_HIDDEN, false);
            this.button.innerHTML = options.closedText;
        };
        Grid.prototype.expand = function () {
            var options = this.options;
            options.expanded = true;
            this.grid.parentElement.classList.toggle(olcss.CLASS_HIDDEN, false);
            this.button.classList.toggle(olcss.CLASS_HIDDEN, true);
            this.button.innerHTML = options.openedText;
        };
        Grid.prototype.on = function (type, cb) {
            return _super.prototype.on.call(this, type, cb);
        };
        return Grid;
    }(ol.control.Control));
    Grid.DEFAULT_OPTIONS = {
        className: 'ol-grid',
        position: 'top right',
        expanded: false,
        autoCollapse: true,
        autoPan: true,
        canCollapse: true,
        currentExtent: true,
        hideButton: false,
        showIcon: false,
        labelAttributeName: "",
        closedText: expando.right,
        openedText: expando.left,
        // what to show on the tooltip
        placeholderText: 'Features',
        // zoom-to-feature options
        zoomDuration: 2000,
        zoomPadding: 256,
        zoomMinResolution: 1 / Math.pow(2, 22)
    };
    exports.Grid = Grid;
});
define("bower_components/ol3-grid/index", ["require", "exports", "bower_components/ol3-grid/ol3-grid/ol3-grid"], function (require, exports, Grid) {
    "use strict";
    return Grid;
});
define("bower_components/ol3-symbolizer/ol3-symbolizer/common/ajax", ["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    var Ajax = (function () {
        function Ajax(url) {
            this.url = url;
            this.options = {
                use_json: true,
                use_cors: true
            };
        }
        Ajax.prototype.jsonp = function (args, url) {
            if (url === void 0) { url = this.url; }
            var d = $.Deferred();
            args["callback"] = "define";
            var uri = url + "?" + Object.keys(args).map(function (k) { return k + "=" + args[k]; }).join('&');
            require([uri], function (data) { return d.resolve(data); });
            return d;
        };
        // http://www.html5rocks.com/en/tutorials/cors/    
        Ajax.prototype.ajax = function (method, args, url) {
            if (url === void 0) { url = this.url; }
            var isData = method === "POST" || method === "PUT";
            var isJson = this.options.use_json;
            var isCors = this.options.use_cors;
            var d = $.Deferred();
            var client = new XMLHttpRequest();
            if (isCors)
                client.withCredentials = true;
            var uri = url;
            var data = null;
            if (args) {
                if (isData) {
                    data = JSON.stringify(args);
                }
                else {
                    uri += '?';
                    var argcount = 0;
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (argcount++) {
                                uri += '&';
                            }
                            uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                        }
                    }
                }
            }
            client.open(method, uri, true);
            if (isData && isJson)
                client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            client.send(data);
            client.onload = function () {
                console.log("content-type", client.getResponseHeader("Content-Type"));
                if (client.status >= 200 && client.status < 300) {
                    isJson = isJson || 0 === client.getResponseHeader("Content-Type").indexOf("application/json");
                    d.resolve(isJson ? JSON.parse(client.response) : client.response);
                }
                else {
                    d.reject(client.statusText);
                }
            };
            client.onerror = function () { return d.reject(client.statusText); };
            // Return the promise
            return d;
        };
        Ajax.prototype.get = function (args) {
            return this.ajax('GET', args);
        };
        Ajax.prototype.post = function (args) {
            return this.ajax('POST', args);
        };
        Ajax.prototype.put = function (args) {
            return this.ajax('PUT', args);
        };
        Ajax.prototype.delete = function (args) {
            return this.ajax('DELETE', args);
        };
        return Ajax;
    }());
    return Ajax;
});
define("bower_components/ol3-symbolizer/ol3-symbolizer/ags/ags-catalog", ["require", "exports", "bower_components/ol3-symbolizer/ol3-symbolizer/common/ajax"], function (require, exports, Ajax) {
    "use strict";
    /**
     * assigns undefined values
     */
    function defaults(a) {
        var b = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            b[_i - 1] = arguments[_i];
        }
        b.filter(function (b) { return !!b; }).forEach(function (b) {
            Object.keys(b).filter(function (k) { return a[k] === undefined; }).forEach(function (k) { return a[k] = b[k]; });
        });
        return a;
    }
    var Catalog = (function () {
        function Catalog(url) {
            this.ajax = new Ajax(url);
        }
        Catalog.prototype.about = function (data) {
            var req = defaults({
                f: "pjson"
            }, data);
            return this.ajax.jsonp(req);
        };
        Catalog.prototype.aboutFolder = function (folder) {
            var ajax = new Ajax(this.ajax.url + "/" + folder);
            var req = {
                f: "pjson"
            };
            return ajax.jsonp(req);
        };
        Catalog.prototype.aboutFeatureServer = function (name) {
            var ajax = new Ajax(this.ajax.url + "/" + name + "/FeatureServer");
            var req = {
                f: "pjson"
            };
            return defaults(ajax.jsonp(req), { url: ajax.url });
        };
        Catalog.prototype.aboutMapServer = function (name) {
            var ajax = new Ajax(this.ajax.url + "/" + name + "/MapServer");
            var req = {
                f: "pjson"
            };
            return defaults(ajax.jsonp(req), { url: ajax.url });
        };
        Catalog.prototype.aboutLayer = function (layer) {
            var ajax = new Ajax(this.ajax.url + "/" + layer);
            var req = {
                f: "pjson"
            };
            return ajax.jsonp(req);
        };
        return Catalog;
    }());
    exports.Catalog = Catalog;
});
define("bower_components/ol3-symbolizer/ol3-symbolizer/format/base", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("bower_components/ol3-symbolizer/ol3-symbolizer/format/ol3-symbolizer", ["require", "exports", "openlayers"], function (require, exports, ol) {
    "use strict";
    function doif(v, cb) {
        if (v !== undefined && v !== null)
            cb(v);
    }
    function mixin(a, b) {
        Object.keys(b).forEach(function (k) { return a[k] = b[k]; });
        return a;
    }
    var StyleConverter = (function () {
        function StyleConverter() {
        }
        StyleConverter.prototype.fromJson = function (json) {
            return this.deserializeStyle(json);
        };
        StyleConverter.prototype.toJson = function (style) {
            return this.serializeStyle(style);
        };
        /**
         * uses the interior point of a polygon when rendering a 'point' style
         */
        StyleConverter.prototype.setGeometry = function (feature) {
            var geom = feature.getGeometry();
            if (geom instanceof ol.geom.Polygon) {
                geom = geom.getInteriorPoint();
            }
            return geom;
        };
        StyleConverter.prototype.assign = function (obj, prop, value) {
            //let getter = prop[0].toUpperCase() + prop.substring(1);
            if (value === null)
                return;
            if (value === undefined)
                return;
            if (typeof value === "object") {
                if (Object.keys(value).length === 0)
                    return;
            }
            if (prop === "image") {
                if (value.hasOwnProperty("radius")) {
                    prop = "circle";
                }
                if (value.hasOwnProperty("points")) {
                    prop = "star";
                }
            }
            obj[prop] = value;
        };
        StyleConverter.prototype.serializeStyle = function (style) {
            var _this = this;
            var s = {};
            if (!style)
                return null;
            if (typeof style === "string")
                return style;
            if (typeof style === "number")
                return style;
            if (style.getColor)
                mixin(s, this.serializeColor(style.getColor()));
            if (style.getImage)
                this.assign(s, "image", this.serializeStyle(style.getImage()));
            if (style.getFill)
                this.assign(s, "fill", this.serializeFill(style.getFill()));
            if (style.getOpacity)
                this.assign(s, "opacity", style.getOpacity());
            if (style.getStroke)
                this.assign(s, "stroke", this.serializeStyle(style.getStroke()));
            if (style.getText)
                this.assign(s, "text", this.serializeStyle(style.getText()));
            if (style.getWidth)
                this.assign(s, "width", style.getWidth());
            if (style.getOffsetX)
                this.assign(s, "offset-x", style.getOffsetX());
            if (style.getOffsetY)
                this.assign(s, "offset-y", style.getOffsetY());
            if (style.getWidth)
                this.assign(s, "width", style.getWidth());
            if (style.getFont)
                this.assign(s, "font", style.getFont());
            if (style.getRadius)
                this.assign(s, "radius", style.getRadius());
            if (style.getRadius2)
                this.assign(s, "radius2", style.getRadius2());
            if (style.getPoints)
                this.assign(s, "points", style.getPoints());
            if (style.getAngle)
                this.assign(s, "angle", style.getAngle());
            if (style.getRotation)
                this.assign(s, "rotation", style.getRotation());
            if (style.getOrigin)
                this.assign(s, "origin", style.getOrigin());
            if (style.getScale)
                this.assign(s, "scale", style.getScale());
            if (style.getSize)
                this.assign(s, "size", style.getSize());
            if (style.getAnchor) {
                this.assign(s, "anchor", style.getAnchor());
                "anchorXUnits,anchorYUnits,anchorOrigin".split(",").forEach(function (k) {
                    _this.assign(s, k, style[k + "_"]);
                });
            }
            // "svg"
            if (style.path) {
                if (style.path)
                    this.assign(s, "path", style.path);
                if (style.getImageSize)
                    this.assign(s, "imgSize", style.getImageSize());
                if (style.stroke)
                    this.assign(s, "stroke", style.stroke);
                if (style.fill)
                    this.assign(s, "fill", style.fill);
                if (style.scale)
                    this.assign(s, "scale", style.scale); // getScale and getImgSize are modified in deserializer               
                if (style.imgSize)
                    this.assign(s, "imgSize", style.imgSize);
            }
            // "icon"
            if (style.getSrc)
                this.assign(s, "src", style.getSrc());
            if (s.points && s.radius !== s.radius2)
                s.points /= 2; // ol3 defect doubles point count when r1 <> r2  
            return s;
        };
        StyleConverter.prototype.serializeColor = function (color) {
            if (color instanceof Array) {
                return {
                    color: ol.color.asString(color)
                };
            }
            else if (color instanceof CanvasGradient) {
                return {
                    gradient: color
                };
            }
            else if (color instanceof CanvasPattern) {
                return {
                    pattern: color
                };
            }
            else if (typeof color === "string") {
                return {
                    color: color
                };
            }
            throw "unknown color type";
        };
        StyleConverter.prototype.serializeFill = function (fill) {
            return this.serializeStyle(fill);
        };
        StyleConverter.prototype.deserializeStyle = function (json) {
            var _this = this;
            var image;
            var text;
            var fill;
            var stroke;
            if (json.circle)
                image = this.deserializeCircle(json.circle);
            else if (json.star)
                image = this.deserializeStar(json.star);
            else if (json.icon)
                image = this.deserializeIcon(json.icon);
            else if (json.svg)
                image = this.deserializeSvg(json.svg);
            else if (json.image && (json.image.img || json.image.path))
                image = this.deserializeSvg(json.image);
            else if (json.image && json.image.src)
                image = this.deserializeIcon(json.image);
            else if (json.image)
                throw "unknown image type";
            if (json.text)
                text = this.deserializeText(json.text);
            if (json.fill)
                fill = this.deserializeFill(json.fill);
            if (json.stroke)
                stroke = this.deserializeStroke(json.stroke);
            var s = new ol.style.Style({
                image: image,
                text: text,
                fill: fill,
                stroke: stroke
            });
            image && s.setGeometry(function (feature) { return _this.setGeometry(feature); });
            return s;
        };
        StyleConverter.prototype.deserializeText = function (json) {
            json.rotation = json.rotation || 0;
            json.scale = json.scale || 1;
            var _a = [json["offset-x"] || 0, json["offset-y"] || 0], x = _a[0], y = _a[1];
            {
                var p = new ol.geom.Point([x, y]);
                p.rotate(json.rotation, [0, 0]);
                p.scale(json.scale, json.scale);
                _b = p.getCoordinates(), x = _b[0], y = _b[1];
            }
            return new ol.style.Text({
                fill: json.fill && this.deserializeFill(json.fill),
                stroke: json.stroke && this.deserializeStroke(json.stroke),
                text: json.text,
                font: json.font,
                offsetX: x,
                offsetY: y,
                rotation: json.rotation,
                scale: json.scale
            });
            var _b;
        };
        StyleConverter.prototype.deserializeCircle = function (json) {
            var image = new ol.style.Circle({
                radius: json.radius,
                fill: json.fill && this.deserializeFill(json.fill),
                stroke: json.stroke && this.deserializeStroke(json.stroke)
            });
            image.setOpacity(json.opacity);
            return image;
        };
        StyleConverter.prototype.deserializeStar = function (json) {
            var image = new ol.style.RegularShape({
                radius: json.radius,
                radius2: json.radius2,
                points: json.points,
                angle: json.angle,
                fill: json.fill && this.deserializeFill(json.fill),
                stroke: json.stroke && this.deserializeStroke(json.stroke)
            });
            doif(json.rotation, function (v) { return image.setRotation(v); });
            doif(json.opacity, function (v) { return image.setOpacity(v); });
            return image;
        };
        StyleConverter.prototype.deserializeIcon = function (json) {
            if (!json.anchor) {
                json.anchor = [json["anchor-x"] || 0.5, json["anchor-y"] || 0.5];
            }
            var image = new ol.style.Icon({
                anchor: json.anchor || [0.5, 0.5],
                anchorOrigin: json.anchorOrigin || "top-left",
                anchorXUnits: json.anchorXUnits || "fraction",
                anchorYUnits: json.anchorYUnits || "fraction",
                //crossOrigin?: string;
                img: undefined,
                imgSize: undefined,
                offset: json.offset,
                offsetOrigin: json.offsetOrigin,
                opacity: json.opacity,
                scale: json.scale,
                snapToPixel: json.snapToPixel,
                rotateWithView: json.rotateWithView,
                rotation: json.rotation,
                size: json.size,
                src: json.src,
                color: json.color
            });
            image.load();
            return image;
        };
        StyleConverter.prototype.deserializeSvg = function (json) {
            json.rotation = json.rotation || 0;
            json.scale = json.scale || 1;
            if (json.img) {
                var symbol = document.getElementById(json.img);
                if (!symbol) {
                    throw "unable to find svg element: " + json.img;
                }
                if (symbol) {
                    // but just grab the path is probably good enough
                    var path = (symbol.getElementsByTagName("path")[0]);
                    if (path) {
                        if (symbol.viewBox) {
                            if (!json.imgSize) {
                                json.imgSize = [symbol.viewBox.baseVal.width, symbol.viewBox.baseVal.height];
                            }
                        }
                        json.path = (json.path || "") + path.getAttribute('d');
                    }
                }
            }
            var canvas = document.createElement("canvas");
            if (json.path) {
                {
                    // rotate a rectangle and get the resulting extent
                    _a = json.imgSize.map(function (v) { return v * json.scale; }), canvas.width = _a[0], canvas.height = _a[1];
                    if (json.stroke && json.stroke.width) {
                        var dx = 2 * json.stroke.width * json.scale;
                        canvas.width += dx;
                        canvas.height += dx;
                    }
                }
                var ctx = canvas.getContext('2d');
                var path2d = new Path2D(json.path);
                // rotate  before it is in the canvas (avoids pixelation)
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.scale(json.scale, json.scale);
                ctx.translate(-json.imgSize[0] / 2, -json.imgSize[1] / 2);
                if (json.fill) {
                    ctx.fillStyle = json.fill.color;
                    ctx.fill(path2d);
                }
                if (json.stroke) {
                    ctx.strokeStyle = json.stroke.color;
                    ctx.lineWidth = json.stroke.width;
                    ctx.stroke(path2d);
                }
            }
            var icon = new ol.style.Icon({
                img: canvas,
                imgSize: [canvas.width, canvas.height],
                rotation: json.rotation,
                scale: 1,
                anchor: json.anchor || [canvas.width / 2, canvas.height],
                anchorOrigin: json.anchorOrigin,
                anchorXUnits: json.anchorXUnits || "pixels",
                anchorYUnits: json.anchorYUnits || "pixels",
                //crossOrigin?: string;
                offset: json.offset,
                offsetOrigin: json.offsetOrigin,
                opacity: json.opacity,
                snapToPixel: json.snapToPixel,
                rotateWithView: json.rotateWithView,
                size: [canvas.width, canvas.height],
                src: undefined
            });
            return mixin(icon, {
                path: json.path,
                stroke: json.stroke,
                fill: json.fill,
                scale: json.scale,
                imgSize: json.imgSize
            });
            var _a;
        };
        StyleConverter.prototype.deserializeFill = function (json) {
            var fill = new ol.style.Fill({
                color: json && this.deserializeColor(json)
            });
            return fill;
        };
        StyleConverter.prototype.deserializeStroke = function (json) {
            var stroke = new ol.style.Stroke();
            doif(json.color, function (v) { return stroke.setColor(v); });
            doif(json.lineCap, function (v) { return stroke.setLineCap(v); });
            doif(json.lineDash, function (v) { return stroke.setLineDash(v); });
            doif(json.lineJoin, function (v) { return stroke.setLineJoin(v); });
            doif(json.miterLimit, function (v) { return stroke.setMiterLimit(v); });
            doif(json.width, function (v) { return stroke.setWidth(v); });
            return stroke;
        };
        StyleConverter.prototype.deserializeColor = function (fill) {
            if (fill.color) {
                return fill.color;
            }
            if (fill.gradient) {
                var type = fill.gradient.type;
                var gradient_1;
                if (0 === type.indexOf("linear(")) {
                    gradient_1 = this.deserializeLinearGradient(fill.gradient);
                }
                else if (0 === type.indexOf("radial(")) {
                    gradient_1 = this.deserializeRadialGradient(fill.gradient);
                }
                if (fill.gradient.stops) {
                    // preserve
                    mixin(gradient_1, {
                        stops: fill.gradient.stops
                    });
                    var stops = fill.gradient.stops.split(";");
                    stops = stops.map(function (v) { return v.trim(); });
                    stops.forEach(function (colorstop) {
                        var stop = colorstop.match(/ \d+%/m)[0];
                        var color = colorstop.substr(0, colorstop.length - stop.length);
                        gradient_1.addColorStop(parseInt(stop) / 100, color);
                    });
                }
                return gradient_1;
            }
            if (fill.pattern) {
                var repitition = fill.pattern.repitition;
                var canvas = document.createElement('canvas');
                var spacing = canvas.width = canvas.height = fill.pattern.spacing | 6;
                var context = canvas.getContext('2d');
                context.fillStyle = fill.pattern.color;
                switch (fill.pattern.orientation) {
                    case "horizontal":
                        for (var i = 0; i < spacing; i++) {
                            context.fillRect(i, 0, 1, 1);
                        }
                        break;
                    case "vertical":
                        for (var i = 0; i < spacing; i++) {
                            context.fillRect(0, i, 1, 1);
                        }
                        break;
                    case "cross":
                        for (var i = 0; i < spacing; i++) {
                            context.fillRect(i, 0, 1, 1);
                            context.fillRect(0, i, 1, 1);
                        }
                        break;
                    case "forward":
                        for (var i = 0; i < spacing; i++) {
                            context.fillRect(i, i, 1, 1);
                        }
                        break;
                    case "backward":
                        for (var i = 0; i < spacing; i++) {
                            context.fillRect(spacing - 1 - i, i, 1, 1);
                        }
                        break;
                    case "diagonal":
                        for (var i = 0; i < spacing; i++) {
                            context.fillRect(i, i, 1, 1);
                            context.fillRect(spacing - 1 - i, i, 1, 1);
                        }
                        break;
                }
                return mixin(context.createPattern(canvas, repitition), fill.pattern);
            }
            throw "invalid color configuration";
        };
        StyleConverter.prototype.deserializeLinearGradient = function (json) {
            var rx = /\w+\((.*)\)/m;
            var _a = JSON.parse(json.type.replace(rx, "[$1]")), x0 = _a[0], y0 = _a[1], x1 = _a[2], y1 = _a[3];
            var canvas = document.createElement('canvas');
            // not correct, assumes points reside on edge
            canvas.width = Math.max(x0, x1);
            canvas.height = Math.max(y0, y1);
            var context = canvas.getContext('2d');
            var gradient = context.createLinearGradient(x0, y0, x1, y1);
            mixin(gradient, {
                type: "linear(" + [x0, y0, x1, y1].join(",") + ")"
            });
            return gradient;
        };
        StyleConverter.prototype.deserializeRadialGradient = function (json) {
            var rx = /radial\((.*)\)/m;
            var _a = JSON.parse(json.type.replace(rx, "[$1]")), x0 = _a[0], y0 = _a[1], r0 = _a[2], x1 = _a[3], y1 = _a[4], r1 = _a[5];
            var canvas = document.createElement('canvas');
            // not correct, assumes radial centered
            canvas.width = 2 * Math.max(x0, x1);
            canvas.height = 2 * Math.max(y0, y1);
            var context = canvas.getContext('2d');
            var gradient = context.createRadialGradient(x0, y0, r0, x1, y1, r1);
            mixin(gradient, {
                type: "radial(" + [x0, y0, r0, x1, y1, r1].join(",") + ")"
            });
            return gradient;
        };
        return StyleConverter;
    }());
    exports.StyleConverter = StyleConverter;
});
define("bower_components/ol3-symbolizer/ol3-symbolizer/format/ags-symbolizer", ["require", "exports", "bower_components/ol3-symbolizer/ol3-symbolizer/format/ol3-symbolizer"], function (require, exports, Symbolizer) {
    "use strict";
    var symbolizer = new Symbolizer.StyleConverter();
    // esri -> ol mappings
    var styleMap = {
        "esriSMSCircle": "circle",
        "esriSMSDiamond": "diamond",
        "esriSMSX": "x",
        "esriSMSCross": "cross",
        "esriSLSSolid": "solid",
        "esriSFSSolid": "solid",
        "esriSLSDot": "dot",
        "esriSLSDash": "dash",
        "esriSLSDashDot": "dashdot",
        "esriSLSDashDotDot": "dashdotdot",
        "esriSFSForwardDiagonal": "forward-diagonal",
    };
    // esri -> ol mappings
    var typeMap = {
        "esriSMS": "sms",
        "esriSLS": "sls",
        "esriSFS": "sfs",
        "esriPMS": "pms",
        "esriPFS": "pfs",
        "esriTS": "txt",
    };
    function range(a, b) {
        var result = new Array(b - a + 1);
        while (a <= b)
            result.push(a++);
        return result;
    }
    function clone(o) {
        return JSON.parse(JSON.stringify(o));
    }
    // convert from ags style to an internal format
    var StyleConverter = (function () {
        function StyleConverter() {
        }
        StyleConverter.prototype.asWidth = function (v) {
            return v * 4 / 3; // not sure why
        };
        // see ol.color.asString
        StyleConverter.prototype.asColor = function (color) {
            if (color.length === 4)
                return "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] / 255 + ")";
            if (color.length === 3)
                return "rgb(" + color[0] + "," + color[1] + "," + color[2] + "})";
            return "#" + color.map(function (v) { return ("0" + v.toString(16)).substr(0, 2); }).join("");
        };
        StyleConverter.prototype.fromSFSSolid = function (symbol, style) {
            style.fill = {
                color: this.asColor(symbol.color)
            };
            this.fromSLS(symbol.outline, style);
        };
        StyleConverter.prototype.fromSFS = function (symbol, style) {
            switch (symbol.style) {
                case "esriSFSSolid":
                    this.fromSFSSolid(symbol, style);
                    break;
                case "esriSFSForwardDiagonal":
                    this.fromSFSSolid(symbol, style);
                    break;
                default:
                    throw "invalid-style: " + symbol.style;
            }
        };
        StyleConverter.prototype.fromSMSCircle = function (symbol, style) {
            style.circle = {
                opacity: 1,
                radius: this.asWidth(symbol.size / 2),
                stroke: {
                    color: this.asColor(symbol.outline.color),
                },
                snapToPixel: true
            };
            this.fromSFSSolid(symbol, style.circle);
            this.fromSLS(symbol.outline, style.circle);
        };
        StyleConverter.prototype.fromSMSCross = function (symbol, style) {
            style.star = {
                points: 4,
                angle: 0,
                radius: this.asWidth(symbol.size / Math.sqrt(2)),
                radius2: 0
            };
            this.fromSFSSolid(symbol, style.star);
            this.fromSLS(symbol.outline, style.star);
        };
        StyleConverter.prototype.fromSMSDiamond = function (symbol, style) {
            style.star = {
                points: 4,
                angle: 0,
                radius: this.asWidth(symbol.size / Math.sqrt(2)),
                radius2: this.asWidth(symbol.size / Math.sqrt(2))
            };
            this.fromSFSSolid(symbol, style.star);
            this.fromSLS(symbol.outline, style.star);
        };
        StyleConverter.prototype.fromSMSPath = function (symbol, style) {
            var size = 2 * this.asWidth(symbol.size);
            style.svg = {
                imgSize: [size, size],
                path: symbol.path,
                rotation: symbol.angle
            };
            this.fromSLSSolid(symbol, style.svg);
            this.fromSLS(symbol.outline, style.svg);
        };
        StyleConverter.prototype.fromSMSSquare = function (symbol, style) {
            style.star = {
                points: 4,
                angle: Math.PI / 4,
                radius: this.asWidth(symbol.size / Math.sqrt(2)),
                radius2: this.asWidth(symbol.size / Math.sqrt(2))
            };
            this.fromSFSSolid(symbol, style.star);
            this.fromSLS(symbol.outline, style.star);
        };
        StyleConverter.prototype.fromSMSX = function (symbol, style) {
            style.star = {
                points: 4,
                angle: Math.PI / 4,
                radius: this.asWidth(symbol.size / Math.sqrt(2)),
                radius2: 0
            };
            this.fromSFSSolid(symbol, style.star);
            this.fromSLS(symbol.outline, style.star);
        };
        StyleConverter.prototype.fromSMS = function (symbol, style) {
            switch (symbol.style) {
                case "esriSMSCircle":
                    this.fromSMSCircle(symbol, style);
                    break;
                case "esriSMSCross":
                    this.fromSMSCross(symbol, style);
                    break;
                case "esriSMSDiamond":
                    this.fromSMSDiamond(symbol, style);
                    break;
                case "esriSMSPath":
                    this.fromSMSPath(symbol, style);
                    break;
                case "esriSMSSquare":
                    this.fromSMSSquare(symbol, style);
                    break;
                case "esriSMSX":
                    this.fromSMSX(symbol, style);
                    break;
                default:
                    throw "invalid-style: " + symbol.style;
            }
        };
        StyleConverter.prototype.fromPMS = function (symbol, style) {
            style.image = {};
            style.image.src = symbol.url;
            if (symbol.imageData) {
                style.image.src = "data:image/png;base64," + symbol.imageData;
            }
            style.image["anchor-x"] = this.asWidth(symbol.xoffset);
            style.image["anchor-y"] = this.asWidth(symbol.yoffset);
            style.image.imgSize = [this.asWidth(symbol.width), this.asWidth(symbol.height)];
        };
        StyleConverter.prototype.fromSLSSolid = function (symbol, style) {
            style.stroke = {
                color: this.asColor(symbol.color),
                width: this.asWidth(symbol.width),
                lineDash: [],
                lineJoin: "",
                miterLimit: 4
            };
        };
        StyleConverter.prototype.fromSLS = function (symbol, style) {
            switch (symbol.style) {
                case "esriSLSSolid":
                    this.fromSLSSolid(symbol, style);
                    break;
                case "esriSLSDot":
                    this.fromSLSSolid(symbol, style);
                    break;
                case "esriSLSDash":
                    this.fromSLSSolid(symbol, style);
                    break;
                case "esriSLSDashDot":
                    this.fromSLSSolid(symbol, style);
                    break;
                case "esriSLSDashDotDot":
                    this.fromSLSSolid(symbol, style);
                    break;
                default:
                    this.fromSLSSolid(symbol, style);
                    console.warn("invalid-style: " + symbol.style);
                    break;
            }
        };
        StyleConverter.prototype.fromPFS = function (symbol, style) {
            throw "not-implemented";
        };
        StyleConverter.prototype.fromTS = function (symbol, style) {
            throw "not-implemented";
        };
        StyleConverter.prototype.fromJson = function (symbol) {
            var style = {};
            this.fromSymbol(symbol, style);
            return symbolizer.fromJson(style);
        };
        StyleConverter.prototype.fromSymbol = function (symbol, style) {
            switch (symbol.type) {
                case "esriSFS":
                    this.fromSFS(symbol, style);
                    break;
                case "esriSLS":
                    this.fromSLS(symbol, style);
                    break;
                case "esriPMS":
                    this.fromPMS(symbol, style);
                    break;
                case "esriPFS":
                    this.fromPFS(symbol, style);
                    break;
                case "esriSMS":
                    this.fromSMS(symbol, style);
                    break;
                case "esriTS":
                    this.fromTS(symbol, style);
                    break;
                default:
                    throw "invalid-symbol-type: " + symbol.type;
            }
        };
        // convert drawing info into a symbology rule
        StyleConverter.prototype.fromRenderer = function (renderer, args) {
            var _this = this;
            switch (renderer.type) {
                case "simple":
                    {
                        return this.fromJson(renderer.symbol);
                    }
                case "uniqueValue":
                    {
                        var styles_1 = {};
                        var defaultStyle_1 = (renderer.defaultSymbol) && this.fromJson(renderer.defaultSymbol);
                        if (renderer.uniqueValueInfos) {
                            renderer.uniqueValueInfos.forEach(function (info) {
                                styles_1[info.value] = _this.fromJson(info.symbol);
                            });
                        }
                        return function (feature) { return styles_1[feature.get(renderer.field1)] || defaultStyle_1; };
                    }
                case "classBreaks": {
                    var styles_2 = {};
                    var classBreakRenderer_1 = renderer;
                    if (classBreakRenderer_1.classBreakInfos) {
                        console.log("processing classBreakInfos");
                        if (classBreakRenderer_1.visualVariables) {
                            classBreakRenderer_1.visualVariables.forEach(function (vars) {
                                switch (vars.type) {
                                    /**
                                     * This renderer adjusts the size of the symbol to between [minSize..maxSize]
                                     * based on the range of values [minDataValue, maxDataValue]
                                     */
                                    case "sizeInfo": {
                                        var steps_1 = range(classBreakRenderer_1.authoringInfo.visualVariables[0].minSliderValue, classBreakRenderer_1.authoringInfo.visualVariables[0].maxSliderValue);
                                        var dx_1 = (vars.maxSize - vars.minSize) / steps_1.length;
                                        var dataValue_1 = (vars.maxDataValue - vars.minDataValue) / steps_1.length;
                                        classBreakRenderer_1.classBreakInfos.forEach(function (classBreakInfo) {
                                            var icons = steps_1.map(function (step) {
                                                var json = $.extend({}, classBreakInfo.symbol);
                                                json.size = vars.minSize + dx_1 * (dataValue_1 - vars.minDataValue);
                                                var style = _this.fromJson(json);
                                                styles_2[dataValue_1] = style;
                                            });
                                        });
                                        debugger;
                                        break;
                                    }
                                    default:
                                        debugger;
                                        break;
                                }
                            });
                        }
                    }
                    return function (feature) {
                        debugger;
                        var value = feature.get(renderer.field1);
                        for (var key in styles_2) {
                            // TODO: scan until key > value, return prior style
                            return styles_2[key];
                        }
                    };
                }
                default:
                    {
                        debugger;
                        console.error("unsupported renderer type: ", renderer.type);
                        break;
                    }
            }
        };
        return StyleConverter;
    }());
    exports.StyleConverter = StyleConverter;
});
define("bower_components/ol3-symbolizer/ol3-symbolizer/common/common", ["require", "exports"], function (require, exports) {
    "use strict";
    function getParameterByName(name, url) {
        if (url === void 0) { url = window.location.href; }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    exports.getParameterByName = getParameterByName;
    function doif(v, cb) {
        if (v !== undefined && v !== null)
            cb(v);
    }
    exports.doif = doif;
    function mixin(a, b) {
        Object.keys(b).forEach(function (k) { return a[k] = b[k]; });
        return a;
    }
    exports.mixin = mixin;
    function defaults(a, b) {
        Object.keys(b).filter(function (k) { return a[k] == undefined; }).forEach(function (k) { return a[k] = b[k]; });
        return a;
    }
    exports.defaults = defaults;
    function cssin(name, css) {
        var id = "style-" + name;
        var styleTag = document.getElementById(id);
        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = id;
            styleTag.innerText = css;
            document.head.appendChild(styleTag);
        }
        var dataset = styleTag.dataset;
        dataset["count"] = parseInt(dataset["count"] || "0") + 1 + "";
        return function () {
            dataset["count"] = parseInt(dataset["count"] || "0") - 1 + "";
            if (dataset["count"] === "0") {
                styleTag.remove();
            }
        };
    }
    exports.cssin = cssin;
});
/**
 * See https://openlayers.org/en/latest/examples/vector-esri.html
 * Ultimately this will only query for features it does not already have
 * It will make use the map SRS and the resulttype="tile" and exceededTransferLimit
 * See https://github.com/ca0v/ol3-lab/issues/4
 */
define("bower_components/ol3-symbolizer/ol3-symbolizer/ags/ags-source", ["require", "exports", "jquery", "openlayers", "bower_components/ol3-symbolizer/ol3-symbolizer/ags/ags-catalog", "bower_components/ol3-symbolizer/ol3-symbolizer/format/ags-symbolizer", "bower_components/ol3-symbolizer/ol3-symbolizer/common/common"], function (require, exports, $, ol, AgsCatalog, Symbolizer, common_2) {
    "use strict";
    var esrijsonFormat = new ol.format.EsriJSON();
    function asParam(options) {
        return Object
            .keys(options)
            .map(function (k) { return k + "=" + options[k]; })
            .join("&");
    }
    ;
    var DEFAULT_OPTIONS = {
        tileSize: 512,
        where: "1=1"
    };
    var ArcGisVectorSourceFactory = (function () {
        function ArcGisVectorSourceFactory() {
        }
        ArcGisVectorSourceFactory.create = function (options) {
            var d = $.Deferred();
            options = common_2.defaults(options, DEFAULT_OPTIONS);
            var srs = options.map.getView()
                .getProjection()
                .getCode()
                .split(":")
                .pop();
            var all = options.layers.map(function (layerId) {
                var d = $.Deferred();
                var tileGrid = ol.tilegrid.createXYZ({
                    tileSize: options.tileSize
                });
                var strategy = ol.loadingstrategy.tile(tileGrid);
                var loader = function (extent, resolution, projection) {
                    var box = {
                        xmin: extent[0],
                        ymin: extent[1],
                        xmax: extent[2],
                        ymax: extent[3]
                    };
                    var params = {
                        f: "json",
                        returnGeometry: true,
                        spatialRel: "esriSpatialRelIntersects",
                        geometry: encodeURIComponent(JSON.stringify(box)),
                        geometryType: "esriGeometryEnvelope",
                        resultType: "tile",
                        where: encodeURIComponent(options.where),
                        inSR: srs,
                        outSR: srs,
                        outFields: "*",
                    };
                    var query = options.services + "/" + options.serviceName + "/FeatureServer/" + layerId + "/query?" + asParam(params);
                    $.ajax({
                        url: query,
                        dataType: 'jsonp',
                        success: function (response) {
                            if (response.error) {
                                alert(response.error.message + '\n' +
                                    response.error.details.join('\n'));
                            }
                            else {
                                // dataProjection will be read from document
                                var features = esrijsonFormat.readFeatures(response, {
                                    featureProjection: projection,
                                    dataProjection: projection
                                });
                                if (features.length > 0) {
                                    source.addFeatures(features);
                                }
                            }
                        }
                    });
                };
                var source = new ol.source.Vector({
                    strategy: strategy,
                    loader: loader
                });
                var catalog = new AgsCatalog.Catalog(options.services + "/" + options.serviceName + "/FeatureServer");
                var converter = new Symbolizer.StyleConverter();
                catalog.aboutLayer(layerId).then(function (layerInfo) {
                    var layer = new ol.layer.Vector({
                        title: layerInfo.name,
                        source: source
                    });
                    var styleMap = converter.fromRenderer(layerInfo.drawingInfo.renderer, { url: "for icons?" });
                    layer.setStyle(function (feature, resolution) {
                        if (styleMap instanceof ol.style.Style) {
                            return styleMap;
                        }
                        else {
                            return styleMap(feature);
                        }
                    });
                    d.resolve(layer);
                });
                return d;
            });
            $.when.apply($, all).then(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return d.resolve(args);
            });
            return d;
        };
        return ArcGisVectorSourceFactory;
    }());
    exports.ArcGisVectorSourceFactory = ArcGisVectorSourceFactory;
});
define("bower_components/ol3-symbolizer/index", ["require", "exports", "bower_components/ol3-symbolizer/ol3-symbolizer/format/ol3-symbolizer"], function (require, exports, Symbolizer) {
    "use strict";
    return Symbolizer;
});
define("ol3-mapquest/examples/mapmaker", ["require", "exports", "openlayers", "bower_components/ol3-grid/index", "bower_components/ol3-symbolizer/ol3-symbolizer/ags/ags-source", "bower_components/ol3-symbolizer/index", "bower_components/ol3-fun/index"], function (require, exports, ol, ol3_grid_1, ags_source_1, ol3_symbolizer_1, ol3_fun_3) {
    "use strict";
    function create() {
        var center = ol.proj.transform([-120, 35], 'EPSG:4326', 'EPSG:3857');
        var mapContainer = document.getElementsByClassName("map")[0];
        var map = new ol.Map({
            loadTilesWhileAnimating: true,
            target: mapContainer,
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM(),
                    opacity: 0.8
                })
            ],
            view: new ol.View({
                center: center,
                projection: 'EPSG:3857',
                zoom: 6
            })
        });
        var source = new ol.source.Vector();
        var symbolizer = new ol3_symbolizer_1.StyleConverter();
        var vector = new ol.layer.Vector({
            source: source,
            style: function (feature, resolution) {
                var style = feature.getStyle();
                if (!style) {
                    switch (feature.getGeometry().getType()) {
                        case "Point":
                            style = symbolizer.fromJson({
                                circle: {
                                    radius: 4,
                                    fill: {
                                        color: "rgba(33, 33, 33, 0.2)"
                                    },
                                    stroke: {
                                        color: "#F00"
                                    }
                                },
                                text: {
                                    text: feature.get("text")
                                }
                            });
                            break;
                        case "LineString":
                            style = symbolizer.fromJson({
                                fill: {
                                    color: "rgba(33, 33, 33, 0.2)"
                                },
                                stroke: {
                                    color: "#F00"
                                },
                                text: {
                                    text: feature.get("text")
                                }
                            });
                            break;
                        default:
                            debugger;
                            style = symbolizer.fromJson({
                                fill: {
                                    color: "rgba(33, 33, 33, 0.2)"
                                },
                                stroke: {
                                    color: "#F00"
                                },
                                circle: {
                                    radius: 4,
                                    fill: {
                                        color: "rgba(33, 33, 33, 0.2)"
                                    },
                                    stroke: {
                                        color: "#F00"
                                    }
                                },
                                text: {
                                    text: feature.get("text")
                                }
                            });
                            break;
                    }
                    feature.setStyle(style);
                }
                return style;
            }
        });
        ags_source_1.ArcGisVectorSourceFactory.create({
            map: map,
            services: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services',
            serviceName: 'USA_States_Generalized',
            layers: [0]
        }).then(function (layers) {
            layers.forEach(function (layer) {
                layer.setStyle(function (feature, resolution) {
                    var style = feature.getStyle();
                    if (!style) {
                        style = symbolizer.fromJson({
                            fill: {
                                color: "rgba(200,200,200,0.5)"
                            },
                            stroke: {
                                color: "rgba(33,33,33,0.8)",
                                width: 3
                            },
                            text: {
                                text: feature.get("STATE_ABBR")
                            }
                        });
                        feature.setStyle(style);
                    }
                    return style;
                });
                map.getLayers().insertAt(0, layer);
                var grid = ol3_grid_1.Grid.create({
                    map: map,
                    className: "ol-grid",
                    position: "statecode top left-2",
                    expanded: true,
                    currentExtent: true,
                    autoCollapse: true,
                    // we do it ourselves
                    autoPan: false,
                    showIcon: true,
                    layers: [layer]
                });
                grid.on("feature-click", function (args) {
                    ol3_fun_3.navigation.zoomToFeature(map, args.feature);
                });
                grid.on("feature-hover", function (args) {
                    // TODO: highlight args.feature
                });
            });
        }).then(function () {
            map.addLayer(vector);
        });
        return {
            map: map,
            source: source
        };
    }
    exports.create = create;
});
define("ol3-mapquest/examples/directions", ["require", "exports", "openlayers", "ol3-mapquest/examples/mapmaker"], function (require, exports, ol, mapmaker_1) {
    "use strict";
    function run() {
        var _a = mapmaker_1.create(), map = _a.map, source = _a.source;
        var outSrs = map.getView().getProjection();
        var reader = new ol.format.WKT();
        function findStop(coordinate, cb) {
            var lon = coordinate[0], lat = coordinate[1];
            fetch("http://localhost:3000/routing/closest?lat=" + lat + "&lon=" + lon).then(function (response) {
                response.json().then(function (data) {
                    if (!data.length)
                        return;
                    var geom = reader.readGeometry(data[0].geom);
                    geom.transform("EPSG:4326", outSrs);
                    source.addFeature(new ol.Feature(geom));
                    cb(data[0].id);
                });
            });
        }
        function addRoute(stop1, stop2) {
            fetch("http://localhost:3000/routing/route?stops=" + stop1 + "," + stop2).then(function (response) {
                response.json().then(function (data) {
                    var route = data.route;
                    var linestrings = route.map(function (r) { return r.geom; });
                    var geoms = linestrings.map(function (g) { return reader.readGeometry(g); });
                    geoms.forEach(function (g) { return g.transform("EPSG:4326", outSrs); });
                    geoms.forEach(function (g) { return source.addFeature(new ol.Feature(g)); });
                });
            });
        }
        fetch("http://localhost:3000/routing/route?stops=4,10").then(function (response) {
            response.json().then(function (data) {
                var reader = new ol.format.WKT();
                var route = data.route;
                var linestrings = route.map(function (r) { return r.geom; });
                var geoms = linestrings.map(function (g) { return reader.readGeometry(g); });
                geoms.forEach(function (g) { return g.transform("EPSG:4326", outSrs); });
                geoms.forEach(function (g) { return source.addFeature(new ol.Feature(g)); });
            });
        });
        var priorStop = null;
        map.on("click", function (args) {
            var point = new ol.geom.Point(args.coordinate);
            point.transform("EPSG:3857", "EPSG:4326");
            findStop(point.getCoordinates(), function (currentStop) {
                if (!currentStop)
                    return;
                if (priorStop) {
                    addRoute(priorStop, currentStop);
                }
                priorStop = currentStop;
            });
        });
    }
    exports.run = run;
});
define("ol3-mapquest/examples/index", ["require", "exports"], function (require, exports) {
    "use strict";
    function run() {
        var l = window.location;
        var path = "" + l.origin + l.pathname + "?run=ol3-mapquest/examples/";
        var labs = "\n    index\n    directions\n    ";
        var styles = document.createElement("style");
        document.head.appendChild(styles);
        styles.innerText += "\n    #map {\n        display: none;\n    }\n    .test {\n        margin: 20px;\n    }\n    ";
        var html = labs
            .split(/ /)
            .map(function (v) { return v.trim(); })
            .filter(function (v) { return !!v; })
            .map(function (lab) { return "<div class='test'><a href='" + path + lab + "&debug=0'>" + lab + "</a></div>"; })
            .join("\n");
        html += "<a href='" + l.origin + l.pathname + "?run=ol3-mapquest/tests/index'>tests</a>";
        document.write(html);
    }
    exports.run = run;
    ;
});
define("ol3-mapquest/tests/directions", ["require", "exports", "ol3-mapquest/directions-proxy"], function (require, exports, directions_proxy_2) {
    "use strict";
    var MapQuestKey = "cwm3pF5yuEGNp54sh96TF0irs5kCLd5y";
    var serviceUrl = "//www.mapquestapi.com/directions/v2/route";
    var SAMPLE_ERROR = {
        "copyright": { "text": "© 2017 MapQuest, Inc.", "imageUrl": "http://api.mqcdn.com/res/mqlogo.gif", "imageAltText": "© 2017 MapQuest, Inc." },
        "statuscode": 602,
        "messages": ["Unable to calculate route."]
    };
    function run(options) {
        if (!options) {
            options = {
                from: "50 Datastream Plaza, Greenville, SC",
                to: "550 S Main St 101, Greenville, SC 29601"
            };
        }
        return directions_proxy_2.MapQuestDirections.create({
            url: serviceUrl,
            key: MapQuestKey
        }).directions({
            from: options.from,
            to: options.to
        }).then(function (result) {
            console.log("directions", result);
            result.route.legs.forEach(function (leg) {
                console.log(leg.destNarrative, leg.maneuvers.map(function (m) { return m.narrative; }).join("\n\t"));
            });
            return result;
        });
    }
    exports.run = run;
});
define("ol3-mapquest/tests/geocoding", ["require", "exports", "ol3-mapquest/geocoding-proxy"], function (require, exports, geocoding_proxy_2) {
    "use strict";
    var MapQuestKey = "cwm3pF5yuEGNp54sh96TF0irs5kCLd5y";
    function run() {
        new geocoding_proxy_2.MapQuestGeocoding().address("http://www.mapquestapi.com/geocoding/v1/address", {
            key: MapQuestKey,
            location: "50 Datastream Plaza, Greenville, SC 29615",
            boundingBox: [34.85, -82.4, 35, -82]
        }).then(function (result) {
            console.log("geocoding address", result);
            result.results.forEach(function (r) { return console.log(r.providedLocation.location, r.locations.map(function (l) { return l.linkId; }).join(",")); });
        });
        new geocoding_proxy_2.MapQuestGeocoding().reverse("http://www.mapquestapi.com/geocoding/v1/reverse", {
            key: MapQuestKey,
            lat: 34.790672,
            lng: -82.407674
        }).then(function (result) {
            console.log("geocoding reverse", result);
            result.results.forEach(function (r) { return console.log(r.providedLocation.latLng, r.locations.map(function (l) { return l.linkId; }).join(",")); });
        });
    }
    exports.run = run;
});
define("ol3-mapquest/tests/index", ["require", "exports"], function (require, exports) {
    "use strict";
    function run() {
        var l = window.location;
        var path = "" + l.origin + l.pathname + "?run=ol3-mapquest/tests/";
        var labs = "\n    directions\n    geocoding\n    optimized-route\n    search\n    traffic\n    index\n    ";
        var styles = document.createElement("style");
        document.head.appendChild(styles);
        styles.innerText += "\n    #map {\n        display: none;\n    }\n    .test {\n        margin: 20px;\n    }\n    ";
        var html = labs
            .split(/ /)
            .map(function (v) { return v.trim(); })
            .filter(function (v) { return !!v; })
            .map(function (lab) { return "<div class='test'><a href='" + path + lab + "&debug=0'>" + lab + "</a></div>"; })
            .join("\n");
        html += "<a href='" + l.origin + l.pathname + "?run=ol3-mapquest/tests/index'>tests</a>";
        document.write(html);
    }
    exports.run = run;
    ;
});
define("ol3-mapquest/tests/optimized-route", ["require", "exports", "ol3-mapquest/optimized-route-proxy"], function (require, exports, optimized_route_proxy_2) {
    "use strict";
    var MapQuestKey = "cwm3pF5yuEGNp54sh96TF0irs5kCLd5y";
    function run(options) {
        var serviceUrl = "http://www.mapquestapi.com/directions/v2/optimizedRoute";
        var request = {
            key: MapQuestKey,
            from: options.from,
            to: options.to,
            locations: options.locations
        };
        return new optimized_route_proxy_2.MapQuestRoute().route(serviceUrl, request).then(function (result) {
            console.log("directions", result);
            result.route.legs.forEach(function (leg) {
                console.log(leg.destNarrative, leg.maneuvers.map(function (m) { return m.narrative; }).join("\n\t"));
            });
            return result;
        });
    }
    exports.run = run;
});
define("ol3-mapquest/tests/search", ["require", "exports", "ol3-mapquest/search-proxy"], function (require, exports, search_proxy_2) {
    "use strict";
    var MapQuestKey = "cwm3pF5yuEGNp54sh96TF0irs5kCLd5y";
    function run() {
        var search = new search_proxy_2.MapQuestSearch(MapQuestKey);
        search.radius({ origin: [34.85, -82.4] }).then(function (result) { return console.log("radius", result); });
        search.rectangle({ boundingBox: [34.85, -82.4, 34.9, -82.35] }).then(function (result) { return console.log("rectangle", result); });
        search.polygon({ polygon: [34.85, -82.4, 34.85, -82.35, 34.9, -82.35, 34.85, -82.4] }).then(function (result) { return console.log("polygon", result); });
        search.corridor({ line: [34.85, -82.4, 34.9, -82.4], shapeFormat: "raw" }).then(function (result) { return console.log("corridor", result); });
    }
    exports.run = run;
});
define("ol3-mapquest/tests/traffic", ["require", "exports", "ol3-mapquest/traffic-proxy"], function (require, exports, traffic_proxy_2) {
    "use strict";
    var MapQuestKey = "cwm3pF5yuEGNp54sh96TF0irs5kCLd5y";
    function run() {
        var serviceUrl = "http://www.mapquestapi.com/traffic/v2/incidents";
        var request = {
            key: MapQuestKey,
            filters: "construction,incidents",
            boundingBox: [34.85, -82.4, 35, -82]
        };
        new traffic_proxy_2.MapQuestTraffic().incidents(serviceUrl, request).then(function (result) {
            console.log("traffic incidents", result);
            result.incidents.forEach(function (i) {
                console.log(i.shortDesc, i.fullDesc);
            });
        });
    }
    exports.run = run;
});
//# sourceMappingURL=index.js.map