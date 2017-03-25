import { MapQuestDirections } from "../directions-proxy";

const MapQuestKey = "cwm3pF5yuEGNp54sh96TF0irs5kCLd5y";
const serviceUrl = "//www.mapquestapi.com/directions/v2/route";

export function run(options?: {
    from: string;
    to: string | string[];
}) {

    if (!options) {
        options = {
            from: "50 Datastream Plaza, Greenville, SC",
            to: "550 S Main St 101, Greenville, SC 29601"
        };
    }


    return MapQuestDirections.create({
        url: serviceUrl,
        key: MapQuestKey
    }).directions({
        from: options.from,
        to: options.to
    }).then(result => {
        console.log("directions", result);
        result.route.legs.forEach(leg => {
            console.log(leg.destNarrative, leg.maneuvers.map(m => m.narrative).join("\n\t"));
        });
        return result;
    });
}
