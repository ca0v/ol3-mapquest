import { MapQuestRoute } from "../optimized-route-proxy";

const MapQuestKey = "cwm3pF5yuEGNp54sh96TF0irs5kCLd5y";

export function run(options: {
    from: string;
    to: string;
    locations: string[];
}) {

    let serviceUrl = `http://www.mapquestapi.com/directions/v2/optimizedRoute`;

    let request = {
        key: MapQuestKey,
        from: options.from,
        to: options.to,
        locations: options.locations
    };

    return new MapQuestRoute().route(serviceUrl, request).then(result => {
        console.log("directions", result);
        result.route.legs.forEach(leg => {
            console.log(leg.destNarrative, leg.maneuvers.map(m => m.narrative).join("\n\t"));
        });
        return result;
    });
}

