import { MapQuestGeocoding } from "../geocoding-proxy";

const MapQuestKey = "cwm3pF5yuEGNp54sh96TF0irs5kCLd5y";

export function run() {

    new MapQuestGeocoding().address(`http://www.mapquestapi.com/geocoding/v1/address`, {
        key: MapQuestKey,
        location: "50 Datastream Plaza, Greenville, SC 29615",
        boundingBox: [34.85, -82.4, 35, -82]
    }).then(result => {
        console.log("geocoding address", result);
        result.results.forEach(r => console.log(r.providedLocation.location, r.locations.map(l => l.linkId).join(",")))
    });

    new MapQuestGeocoding().reverse(`http://www.mapquestapi.com/geocoding/v1/reverse`, {
        key: MapQuestKey,
        lat: 34.790672,
        lng: -82.407674
    }).then(result => {
        console.log("geocoding reverse", result);
        result.results.forEach(r => console.log(r.providedLocation.latLng, r.locations.map(l => l.linkId).join(",")))
    });

}
