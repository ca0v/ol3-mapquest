import { mixin } from "ol3-fun";
import { MapQuestDirections } from "./ol3-mapquest/directions-proxy";
import { MapQuestGeocoding } from "./ol3-mapquest/geocoding-proxy";
import { MapQuestRoute } from "./ol3-mapquest/optimized-route-proxy";
import { MapQuestSearch } from "./ol3-mapquest/search-proxy";
import { MapQuestTraffic } from "./ol3-mapquest/traffic-proxy";

const API = {
    Directions: MapQuestDirections,
    Geocoding: MapQuestGeocoding,
    Route: MapQuestRoute,
    Search: MapQuestSearch,
    Traffic: MapQuestTraffic
};

export = API;