<template>
  <el-container>
    <el-aside width="200px" ><Aside></Aside></el-aside>
    <el-container>
      <el-header><div id="Header"></div>宇宙互联后台管理界面</el-header>
      <el-main><div id="div01"><router-view></router-view></div></el-main>
      <el-footer><Footer></Footer></el-footer>
    </el-container>
  </el-container>
</template>
<script>
  import Aside from "./components/Aside/Aside"
  import Main from "./components/Main/the-userInfo"
  import Footer from "./components/Footer/Footer"
export default {
  name: 'App',
  data(){
    return{
    }
  },
  components :{Aside,Main,Footer}
}
</script>

<style>
  #div01{
    height: 740px;
  }
  *{
    margin: 0;
    padding: 0;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    overflow: hidden;
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
