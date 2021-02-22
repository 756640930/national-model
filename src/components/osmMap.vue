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
      //添加全屏控件
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
/*隐藏ol的一些自带元素*/
.ol-attribution,.ol-zoom { display: none;}

</style>