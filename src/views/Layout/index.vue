<template>
  <div>
    <!-- 侦听路由信息 -->
    <!-- fixed为 固定定位 -->
    <van-nav-bar :title="activeTitle" fixed/> 
    <!-- <van-nav-bar :title="active==0? '首页' : '搜索' " />   -->

  <div class="main">
  <router-view></router-view>
  </div>
  

    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/layout/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0,
        activeTitle:this.$route.meta.title, //路由切换不会自己变 所以要监听路由的变化
      };
    },
    watch: {
      $route(){
        this.activeTitle=this.$route.meta.title;
      }
    },

  };
</script>

<style scoped>
  /* 中间内容区域 - 容器样式(留好上下导航所占位置) */
  .main {
    padding-top: 46px;
    padding-bottom: 50px;
  }
</style>