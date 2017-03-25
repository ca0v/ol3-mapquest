import { MapQuestSearch } from "../search-proxy";

const MapQuestKey = "cwm3pF5yuEGNp54sh96TF0irs5kCLd5y";

export function run() {
    let search = new MapQuestSearch(MapQuestKey);
    search.radius({ origin: [34.85, -82.4] }).then(result => console.log("radius", result));
    search.rectangle({ boundingBox: [34.85, -82.4, 34.9, -82.35] }).then(result => console.log("rectangle", result));
    search.polygon({ polygon: [34.85, -82.4, 34.85, -82.35, 34.9, -82.35, 34.85, -82.4] }).then(result => console.log("polygon", result));
    search.corridor({ line: [34.85, -82.4, 34.9, -82.4], shapeFormat: "raw" }).then(result => console.log("corridor", result));
}
