import "ol/ol.css";
import { Map, View } from "ol";
import mapLayers from "@/utils/layers.js";

export default {
  map: '',
  obj: {
    zoom: 8,
    center: [-86.671308,32.6253636],
    target: 'map',
  },
  layers: [mapLayers.osmTitleLayer],
  initialMap: function(obj) {
    let map = new Map({
    target: obj.target,
    layers: this.layers,
    view: new View({
      projection: "EPSG:4326",    
      center: obj.center,
      zoom: obj.zoom
    }),
  });
    this.map = map;
  },
  addTitleLayer(layer) {
    this.map.addLayer(layer)
  },
}