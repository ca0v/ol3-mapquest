import { MapQuestTraffic } from "../traffic-proxy";

const MapQuestKey = "cwm3pF5yuEGNp54sh96TF0irs5kCLd5y";

export function run() {
    let serviceUrl = `http://www.mapquestapi.com/traffic/v2/incidents`;
    let request = {
        key: MapQuestKey,
        filters: "construction,incidents",
        boundingBox: [34.85, -82.4, 35, -82]
    };

    new MapQuestTraffic().incidents(serviceUrl, request).then(result => {
        console.log("traffic incidents", result);
        result.incidents.forEach(i => {
            console.log(i.shortDesc, i.fullDesc);
        });
    });
}
