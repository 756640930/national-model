<template>
  <div>
    <Menu active-name="alabama">
        <Submenu name="stateNetwork">
            <template slot="title">
                <van-icon name="location" />
                Network of States
            </template>
            <Submenu :name="index" v-for="(item, index) in stateName" :key="index">
                <template slot="title">
                  <van-icon name="location-o" v-if="nowState == item" />
                  {{item}}
                </template>
                <MenuItem :name="item+1"><div @click="addNetwork(item,'rail')">rail</div></MenuItem>
                <MenuItem :name="item+2"><div @click="addNetwork(item,'motorway')">motorway</div></MenuItem>
                <MenuItem :name="item+3"><div @click="addNetwork(item,'primary')">primary</div></MenuItem>
                <MenuItem :name="item+4"><div @click="addNetwork(item,'secondary')">secondary</div></MenuItem>
                <MenuItem :name="item+5"><div @click="addNetwork(item,'trunk')">trunk</div></MenuItem>
                <MenuItem :name="item+6"><div @click="addNetwork(item,'high_ranking_road')">High_Ranking_Road</div></MenuItem>
            </Submenu>
        </Submenu>
        <Submenu name="gmns">
            <template slot="title">
                <van-icon name="wap-nav" />
                GMNS_Network
            </template>
            <Submenu name="Phoenix">
                <template slot="title">
                  Phoenix
                </template>
                <MenuItem name="agent1">
                  <Checkbox v-model="agent1">Agent1</Checkbox>
                </MenuItem>
                <MenuItem name="agent2">
                  <Checkbox v-model="agent2">Agent2</Checkbox>
                </MenuItem>
                <MenuItem name="macronet">
                  <Checkbox v-model="macronet">Macronet</Checkbox>
                </MenuItem>
                <MenuItem name="mesonet">
                  <Checkbox v-model="mesonet">Mesonet</Checkbox>
                </MenuItem>
                <MenuItem name="micronet">
                  <Checkbox v-model="micronet">Micronet</Checkbox>
                </MenuItem>
            </Submenu>
            <Submenu name="Sioux Falls">
                <template slot="title">
                  Sioux Falls
                </template>
                <MenuItem name="link">
                  <Checkbox v-model="link">Link</Checkbox>
                </MenuItem>
            </Submenu>
        </Submenu>
    </Menu>
  </div>
  
</template>

<script>
import layers from "@/utils/layers.js"
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {transform} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';




export default {
  name: 'cityList',
  components: {
  },
  data() {
    return {
      stateName: ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District-of-columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New-hampshire','New-jersey','New-mexico','New-york','North-carolina','North-dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Puerto-rico','Rhode-island','South-carolina','South-dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West-virginia','Wisconsin','Wyoming'],
      vectorLayer: '',
      agent1Layer: '',
      agent2Layer: '',
      //当前点击的state
      nowState: 'Alabama',
      single: false,
      //复选框的状态
      agent1: false,
      agent2: false,
      macronet: false,
      mesonet: false,
      micronet: false,
      link: false,

    }
  },
  mounted() {
    this.addNetwork('Alabama','rail');
  },
  //监听复选框的状态
  watch: {
    macronet: function(newData,oldData) {
      if(newData == true) {
        this.addNetwork('Net1','network');
        this.micronet = false;
        this.mesonet = false;
        this.link = false;
      }else {
        this.map.map.removeLayer(this.vectorLayer);
      }
    },
    mesonet: function(newData,oldData) {
      if(newData == true) {
        this.addNetwork('Net2','network');
        this.macronet = false;
        this.micronet = false;
        this.link = false;
      }else {
        this.map.map.removeLayer(this.vectorLayer);
      }
    },
    micronet: function(newData,oldData) {
      if(newData == true) {
        this.addNetwork('Net3','network');
        this.macronet = false;
        this.mesonet = false;
        this.link = false;
      }else {
        this.map.map.removeLayer(this.vectorLayer);
      }
    },
    link: function(newData,oldData) {
      if(newData == true) {
        this.addNetwork('Link','network');
        this.micronet = false;
        this.mesonet = false;
        this.macronet = false;
      }else {
        this.map.map.removeLayer(this.vectorLayer);
      }
    },
    agent1: function(newData,oldData) {
      if(newData == true) {
        this.addNetwork('Agent1','network');
      }else {
        this.map.map.removeLayer(this.agent1Layer);
      }
    },
    agent2: function(newData,oldData) {
      if(newData == true) {
        this.addNetwork('Agent2','network');
      }else {
        this.map.map.removeLayer(this.agent2Layer);
      }
    },
  },
  methods: {
    addNetwork(item,type) {
      this.nowState = item;
      //解决如果网络多选框没关就点击state的路网导致多选框还存在的问题
      if(item !== "Net1" && item !== "Net2" && item !== "Net3" && item !== "Agent1" && item !== "Agent2") {
        this.micronet = false;
        this.mesonet = false;
        this.macronet = false;        
      }
      let baseUrl = 'static/link/' + type + '/' + item +  '.json';
      this.$axios({
        method: 'get',
        url: baseUrl,
      }).then( (response) => {
      // console.log(this.map.map.getLayers())
      //先移除上一个图层  
      this.map.map.removeLayer(this.vectorLayer);
      //根据不同的地区设置不同的zoom层级
      let zoomLevel = 8;
      switch(item) {
        case 'Net1':
          zoomLevel = 13;
          break;
        case 'Net2':
          zoomLevel = 13;
          break;
        case 'Net3':
          zoomLevel = 13;
          break;
        case 'Link':
          zoomLevel = 13;
          break;
        case 'Agent1':
          zoomLevel = 13;
          break;
        case 'Agent2':
          zoomLevel = 13;
          break;
        default: 
          zoomLevel = 8;
      };
      //网络的颜色
      var net_color = 'rgba(153,48,124)';
      switch(type) {
        case 'rail':
          net_color = 'rgba(238,198,139)';
          break;
        case 'motorway':
          net_color = 'rgba(60,139,153)';
          break;
        case 'primary':
          net_color = 'rgba(68,152,111)';
          break;
        case 'secondary':
          net_color = 'rgba(154,192,67)';
          break;
        case 'trunk':
          net_color = 'rgba(179,68,56)';
          break;
        case 'high_ranking_road':
          net_color = 'rgba(67,153,188)';
          break;
        default: 
          net_color = 'rgba(60,139,153)';
      };
      this.map.map.getView().animate({
        center: response.data.features[0].geometry.coordinates[0],
        zoom: zoomLevel,
        }
      );
      let linkJSON = (new GeoJSON()).readFeatures(response.data);
      var vectorSource = new VectorSource({
        features: linkJSON
      });
      if(item=="Agent1") {
        this.agent1Layer = new VectorLayer({
          source: vectorSource,
          style: new Style({
            stroke: new Stroke({
              color: 'blue',
              width: 3
            }),
            fill: new Fill({
              color: 'rgba(255,255,0)'
            })
          }),
          zIndex: 999
        });
        this.map.map.addLayer(this.agent1Layer);
      }else if(item=="Agent2") {
        this.agent2Layer = new VectorLayer({
          source: vectorSource,
          style: new Style({
            stroke: new Stroke({
              color: 'blue',
              width: 3
            }),
            fill: new Fill({
              color: 'rgba(255,255,0)'
            })
          }),
          zIndex: 999
        });  
        this.map.map.addLayer(this.agent2Layer);      
      }else {
        this.vectorLayer = new VectorLayer({
          source: vectorSource,
          style: new Style({
            stroke: new Stroke({
              color: net_color,
              width: 3
            }),
            fill: new Fill({
              color: 'rgba(255,255,0)'
            })
          }),
          zIndex: 999
        });
        this.map.map.addLayer(this.vectorLayer);
      }
      })
    },

}
}
</script>

<style>



</style>
