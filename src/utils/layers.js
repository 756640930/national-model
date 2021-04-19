
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import BingMaps from "ol/source/BingMaps";



export default {
  osmTitleLayer: new TileLayer({
    source: new OSM(),
    visible: true
  }),
  bingTitleLayer: new TileLayer({                 
    source: new BingMaps({
    key: 'Av4ovOw8t6AxyGYHajcc5mzcpBcJnySmdIOmwUBc3zHA7NKzpB6qsAx0zhWXvGUT',  
    imagerySet: 'Aerial'
    }),
    visible: true                
  }),



}