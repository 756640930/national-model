<template>
  <div>
    <Modal
      v-model="$store.state.ifLayerModal"
      title="select a base map"
      @on-ok="ok"
      @on-cancel="cancel"
      :mask-closable=false
      ok-text="ok"
      cancel-text="cancel">
      <div style="text-align: center">
        <RadioGroup 
        v-model="mapSource" 
        @on-change="changeLayer">
          <Radio label="osm">
              <span>OSM</span>
          </Radio>
          <Radio label="bing">
              <span>Bing</span>
          </Radio>
        </RadioGroup>
      </div>
    </Modal>
  </div>
</template>
<script>
import layers from "@/utils/layers.js"

    export default {
        data () {
            return {
              mapSource: 'osm'
            }
        },
        methods: {
            ok () {
                //modal框的state中的布尔值为false
                this.$store.commit('notLayerModal');
            },
            cancel () {
                this.$store.commit('notLayerModal')
            },
            //图层切换操作
            changeLayer() {
              switch(this.mapSource) {
                case 'bing':
                  this.map.addTitleLayer(layers.bingTitleLayer);
                  console.log(this.map.map)
                  this.map.map.removeLayer(layers.osmTitleLayer);
                  break;
                case 'osm':
                  this.map.addTitleLayer(layers.osmTitleLayer);
                  this.map.map.removeLayer(layers.bingTitleLayer);
                  break;
              }
            }


        }
    }
</script>
