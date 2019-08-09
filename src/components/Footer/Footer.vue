<template>
  <el-pagination
    background
    layout="prev, pager, next"
    @current-change="show"
    :total="len">
  </el-pagination>
</template>

<script>
  import jiaohu from "../jiaohu";
    export default {
        name: "Footer",
      data(){
          return{
            len:this.bbtn()
          }
      },
      methods:{
          bbtn:function () {
            jiaohu.$on("len",(lens)=>{
              this.len = lens.length+1;
            })
          },
        show:function (ye) {
          jiaohu.$emit("ye",ye);
        }
      },
    }
</script>

<style scoped>
</style>
