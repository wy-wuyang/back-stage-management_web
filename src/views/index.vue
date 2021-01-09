<template>
  <div class="index">
    <HeadNav></HeadNav>
    <Leftmenu></Leftmenu>
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav";
import Leftmenu from "../components/LeftMenu";

export default {
  name: "index",
  components: {
    HeadNav,
    Leftmenu
  }
};
</script>

<style>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: -6px;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 60px);
  overflow: auto;
}
</style>
