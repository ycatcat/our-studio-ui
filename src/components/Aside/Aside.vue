<template>
  <div>
    <el-menu
      :default-active= "activeIndex"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="r">
      <el-menu-item index="/userinfo">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/software">
        <i class="el-icon-monitor"></i>
        <span slot="title">推荐软件</span>
      </el-menu-item>
      <el-menu-item index="/essay" >
        <i class="el-icon-reading"></i>
        <span slot="title">分享文章</span>
      </el-menu-item>
      <el-menu-item index="/video" >
        <i class="el-icon-film"></i>
        <span slot="title">分享视频</span>
      </el-menu-item>
      <el-menu-item index="/award" >
        <i class="el-icon-trophy"></i>
        <span slot="title">获奖信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>


  export default {
    name: "Aside",
    data(){
      return{
        r:true,
        activeIndex:"/userinfo"
      }
    },
    mounted () {
      //获取当前路径并且给参数赋值
      let href = window.location.href
      this.activeIndex = href.split('/#')[1]
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //动态改变参数的值
      getPath () {
        this.activeIndex = this.$route.path
      }
    },
    //监听路由变化
    watch: {
      '$route': 'getPath'
    },
  }
</script>

<style scoped>
  ul{
    height: 900px;
  }
</style>
