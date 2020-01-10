import ol = require("openlayers");
import { create as makeMap } from "./mapmaker";

export function run() {

    let { map, source } = makeMap();
    let outSrs = map.getView().getProjection();
    let reader = new ol.format.WKT();

    function findStop(coordinate: ol.Coordinate, cb: (id: number) => void) {
        let [lon, lat] = coordinate;
        fetch(`http://localhost:3000/routing/closest?lat=${lat}&lon=${lon}`).then(response => {
            response.json().then((data: Array<{
                distance: number;
                geom: string;
                id: number;
            }>) => {
                if (!data.length) return;
                let geom = reader.readGeometry(data[0].geom);
                geom.transform("EPSG:4326", outSrs);
                source.addFeature(new ol.Feature(geom));
                cb(data[0].id);
            });
        });
    }

    function addRoute(stop1, stop2) {

        fetch(`http://localhost:3000/routing/route?stops=${stop1},${stop2}`).then(response => {
            response.json().then(data => {
                let route = <Array<{ geom: string; cost: number }>>data.route;
                let linestrings = route.map(r => r.geom);
                let geoms = linestrings.map(g => reader.readGeometry(g));
                geoms.forEach(g => g.transform("EPSG:4326", outSrs));
                geoms.forEach(g => source.addFeature(new ol.Feature(g)));
            });
        });

    }

    fetch("http://localhost:3000/routing/route?stops=4,10").then(response => {
        response.json().then(data => {
            let reader = new ol.format.WKT();
            let route = <Array<{ geom: string; cost: number }>>data.route;
            let linestrings = route.map(r => r.geom);
            let geoms = linestrings.map(g => reader.readGeometry(g));
            geoms.forEach(g => g.transform("EPSG:4326", outSrs));
            geoms.forEach(g => source.addFeature(new ol.Feature(g)));
        });
    });

    let priorStop = null;
    map.on("click", (args: ol.MapBrowserEvent) => {
        let point = new ol.geom.Point(args.coordinate);
        point.transform("EPSG:3857", "EPSG:4326");

        findStop(point.getCoordinates(), currentStop => {
            if (!currentStop) return;
            if (priorStop) {
                addRoute(priorStop, currentStop);
            }
            priorStop = currentStop;
        });
    });

}