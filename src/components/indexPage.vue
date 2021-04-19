<template>
  <div id="home-page">
    <div id="header">
      <img id="logo" src="@/assets/image/logo.svg">
      <!-- <img id="list" src="@/assets/image/list.svg" @click="value = true"> -->
      <h2 id="labLabel">ASU Trans+AI Lab</h2>
      <img id="changeLayer" src="@/assets/image/integral.svg" @click="openModal">
      <a href="https://github.com/asu-trans-ai-lab"><img id="git" src="@/assets/image/github.svg"></a>
      <a href="https://github.com/asu-trans-ai-lab/integrated_modeling_GMNS/tree/main/examples/United_States_network"><img id="data" src="@/assets/image/data.svg"></a>
    </div>
    <aside class="sidebar">
      <div class="sidebar-nav">
        <city-list></city-list>
      </div>
    </aside>
    <section class="content">
        <osm-map></osm-map>
        <layer-modal></layer-modal>
        <Drawer :closable="false" width="340" v-model="value">
          <drawer></drawer>
        </Drawer>
    </section>
    <div>
      <img id="color-title" src="@/assets/image/color.png">
    </div>
  </div>
</template>



<script>

import osmMap from "@/components/osmMap.vue"
import cityList from "@/components/cityList.vue"
import layerModal from "@/components/layerModal.vue"
import drawer from "@/components/drawer.vue"
import Drawer from './drawer.vue'




export default {
  name: 'indexPage',
  components: {
    osmMap,
    cityList,
    layerModal,
    drawer,
  },
  data() {
    return {
      listValue: false,
      searchValue: '',
      value: false
    }
  },
  methods: {
    openModal() {
      this.$store.commit('isLayerModal')
    }
  }
}
</script>

<style>
#header{
  background: rgba(36, 40, 45);
  color: #fff;
  border-bottom: .3em solid #2f333e;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  z-index: 1000;
  margin: 0 !important;
  padding: 0;
  justify-content: space-between;
  }
.sidebar, .sidebar-toggle {
    position: fixed;
}
#color-title {
  position: fixed;
  right: 20px;
  bottom: 40px;
  width: 161px;
  height: 189px;
}
.sidebar {
    padding-top: 0;
    color: #364149;
    background-color: rgba(247, 248, 250);
    border-right: 1px solid rgba(0,0,0,.07);
    overflow-y: auto;
    padding: 60px 0 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 8px;
    transition: transform .25s ease-out;
    /* width: 300px; */
    z-index: 3;
}
.search {
  left: 15px;
}
aside {
    display: block;
}
/* .sidebar::-webkit-scrollbar {
    width: 4px;
}
.sidebar::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 4px;
} */
/* #footer {
  background: #f4f5f8;
  color: rgb(224, 219, 219);
  position: fixed;
  height: 6%;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
} */
/* #container {
  position: fixed;
  top: 8%;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem;
} */
section {
  display: block;
}
.content {
    padding-top: 50px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 240px;
    transition: left .25s ease;
    background-color: rgb(231, 221, 221);
}
.van-index-bar__sidebar{
        top: 0;
        transform: translateY(0);
        left: 0;
        right: 0;
        flex-direction: row;
        justify-content: space-between;
        background: #fff;
    }
#git {
  position: fixed;
  right: 23px;
  top: 8px;
  align-self: center;
  width: 2rem;
}
#data {
  position: fixed;
  right: 120px;
  top: 13px;
  align-self: center;
  width: 1.5rem;
}
#changeLayer {
  position: fixed;
  right: 70px;
  top: 8px;
  align-self: center;
  width: 2.2rem;
  cursor: pointer;
}
#list {
  position: fixed;
  right: 120px;
  top: 9px;
  align-self: center;
  width: 1.9rem;
  cursor: pointer;
}
#logo {
  position: fixed;
  left: 23px;
  top: -9px;
  align-self: center;
  width: 4.5rem;
}
#labLabel {
  position: fixed;
  left: 90px;
  top: 10px;
  font-family:sans-serif
}
</style>
