import { APIFormat, OmvDataSource } from "@here/harp-omv-datasource";
import { booleanPointInPolygon, point, polygon } from '@turf/turf';
// @ts-ignore
import { PruneCluster, PruneClusterForLeaflet } from 'exports-loader?PruneCluster,PruneClusterForLeaflet!prunecluster/dist/PruneCluster.js'; // tslint:disable-line:max-line-length
import HarpGL from "harp-leaflet";
import * as L from "leaflet";
import * as config from "./config";
// @ts-ignore
import('prunecluster/dist/LeafletStyleSheet.css');
// @ts-ignore
import('leaflet-draw/dist/leaflet.draw.css');
import 'leaflet-draw';
import data from '../resources/realties.json';
import ukraine from '../resources/ukraine.json';

// @ts-ignore
const { items } = data;

const map = L.map("map").setView([48.43031171152962, 33.46435546875001], 6);

const harpGL = new HarpGL({
    // @ts-ignore
    tilt: 45,
    decoderUrl: "./build/decoder.bundle.js",
    theme: "resources/harp-map-theme/berlin_tilezen_base.json"
}).addTo(map);

const hereBaseDataSource = new OmvDataSource({
    baseUrl: "https://xyz.api.here.com/tiles/herebase.02",
    apiFormat: APIFormat.XYZOMV,
    styleSetName: config.styleSetName,
    maxZoomLevel: 17,
    authenticationCode: config.accessToken,
    concurrentDecoderScriptUrl: config.decoderPath
});

harpGL.mapView.addDataSource(hereBaseDataSource);

const leafletView = new PruneClusterForLeaflet();
// @ts-ignore
leafletView.PrepareLeafletMarker = (marker, data) => {// tslint:disable-line:no-shadowed-variable
    marker.on('click', () => {
        if (marker.getPopup()) {
            marker.setPopupContent(`${data.id}`);
        } else {
            marker.bindPopup(`${data.id}`);
            marker.openPopup();
        }
    });
};

// @ts-ignore
const realtyMarkers = [];
// @ts-ignore
items.forEach((item) => {
    const marker = new PruneCluster.Marker(item.latitude, item.longitude, {id: item.realty_id});
    realtyMarkers.push(marker);
    leafletView.RegisterMarker(marker);
});
map.addLayer(leafletView);
// @ts-ignore
let clickedLayer;
// @ts-ignore
L.geoJSON(ukraine, {
    style() {
        return {color: 'blue', fillOpacity: 0};
    }
})
    // @ts-ignore
    .eachLayer((layer) => {
    // @ts-ignore
    layer.bindPopup((popLayer) => {
        return popLayer.feature.properties['name:uk'];
    });
    // @ts-ignore
    layer.on('click', (e) => {
        // @ts-ignore
        if (clickedLayer === layer) {
            return;
            // @ts-ignore
        } else if (clickedLayer) { clickedLayer.setStyle({color: 'blue'}); }
        layer.setStyle({color: 'yellow'});
        const poly = polygon(layer.feature.geometry.coordinates);
        map.fitBounds(e.target.getBounds());
        // @ts-ignore
        realtyMarkers.map((marker) => {
            const { position: { lat, lng }} = marker;
            marker.filtered = !booleanPointInPolygon(point([lng, lat]), poly);
        });
        leafletView.ProcessView();
        clickedLayer = layer;
    });
}).addTo(map);

const drawnItems = new L.FeatureGroup();

map.addLayer(drawnItems);
// @ts-ignore
const drawControl = new L.Control.Draw({
    draw: {
        polyline: false,
        marker: false,
        circlemarker:false,
        circle:false
    },
    edit: {
        featureGroup: drawnItems,
        edit: false,
    }
});
map.addControl(drawControl);
// @ts-ignore
map.on('draw:created', (event) => {
    // @ts-ignore
    const layer = event.layer;
    map.fitBounds(layer.getBounds());
    const poly = polygon(
        [
            // @ts-ignore
            layer._latlngs[0].map(({ lat, lng }) => [lng, lat])
                .concat([[layer._latlngs[0][0].lng, layer._latlngs[0][0].lat]])
        ],
    );
    // const { geometry: { coordinates: [lng, lat] } } = center(poly);
    // mymap.flyTo([lat, lng]);
    // @ts-ignore
    realtyMarkers.map((marker) => {
        const { position: { lat, lng }} = marker;
        // console.log(booleanPointInPolygon(point([lng, lat]), poly));
        marker.filtered = !booleanPointInPolygon(point([lng, lat]), poly);
    });
    leafletView.ProcessView();
});
