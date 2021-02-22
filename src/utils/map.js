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
      projection: "EPSG:4326",    //使用这个坐标系
      center: obj.center,
      zoom: obj.zoom
    }),
  });
    this.map = map;
  },
  //定义添加titleLayer的方法，可以在全局进行添加
  addTitleLayer(layer) {
    this.map.addLayer(layer)
  },
}