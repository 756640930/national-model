//图层管理和创建
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import BingMaps from "ol/source/BingMaps";



export default {
  osmTitleLayer: new TileLayer({
    source: new OSM(),
    //默认显示osm图层
    visible: true
  }),
  bingTitleLayer: new TileLayer({                 
    // Bing Map图层
    source: new BingMaps({
    key: 'Av4ovOw8t6AxyGYHajcc5mzcpBcJnySmdIOmwUBc3zHA7NKzpB6qsAx0zhWXvGUT',  
    imagerySet: 'Aerial'
    }),
    visible: true                
  }),



}