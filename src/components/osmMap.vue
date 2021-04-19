<template>
    <div id="map">

    </div>
</template>

<script>
import osmMap from "@/utils/map.js";
import {FullScreen} from 'ol/control';
export default {
  data() {
    return {

    };
  },
  methods: {
    initMap() {
      this.map.initialMap(this.map.obj);
      let fullscreen = new FullScreen();
      this.map.map.addControl(fullscreen);
      function onClick(id, callback) {
        document.getElementById(id).addEventListener('click', callback);
      };
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style>
#map{height:100%;}
.ol-attribution,.ol-zoom { display: none;}

</style>