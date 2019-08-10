<template>
  <div id="video">
    <el-table
      :data="list.filter(data => !search || (data.name == search) || (data.ID == search) || (data.access == search)).slice(ye*10-10,ye*10)"
      style="width: 100%">
      <el-table-column
        label="ID"
        prop="ID">
      </el-table-column>
      <el-table-column
        label="标题"
        prop="title">
      </el-table-column>
      <el-table-column
        label="简介"
        prop="abstract">
      </el-table-column>
      <el-table-column
        label="视频文件路径"
        prop="video_file">
      </el-table-column>
      <el-table-column
        label="发布者"
        prop="promulgator">
      </el-table-column>
      <el-table-column
        label="发布时间"
        prop="release_time">
      </el-table-column>
      <el-table-column
        label="阅读量"
        prop="reading_quantity">
      </el-table-column>
      <el-table-column
        label="下载量"
        prop="downloads">
      </el-table-column>
      <el-table-column
        label="权限"
        prop="access">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-popover
            placement="top"
            width="160"
            v-model="scope.row.visible"
            @click="">
            <p>确定要删除该数据吗</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="amend(scope.$index, scope.row)">确定</el-button>
              <el-button type="primary" size="mini" @click="scope.row.visible = false">取消</el-button>
            </div>
            <el-button
              size="mini"
              slot="reference"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <p v-if="endye" style="color: #ada9af; height: 50px; line-height:50px;">没有更多啦！</p>
  </div>
</template>


<script>
  import jiaohu from "../jiaohu"
  export default {
    name: "theVideo",
    data(){
      return{
        list:[],
        search:'',
        ye:1,
        endye:0,
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px'
      }
    },
    methods :{
      handleEdit(index, row) {
      },
      handleDelete(index, row) {
      },
      end(ye){
        var i =(this.list.filter(data => !this.search || data.username.toLowerCase().includes(this.search.toLowerCase()) || data.nickname.toLowerCase().includes(this.search.toLowerCase()) || (data.ID == this.search) || (data.email == this.search))).length/10;
        if(ye > i){
          this.endye = true;
        } else {
          this.endye = false;

        }
      },
      amend(index, row){
        //关闭“是否删除”提示
        row.visible=false;
        //删除数据
        this.axios.get('http://49.234.9.206/Gaindata/delete_mysql.php',{
          params:{
            list:"video",
            ID:row.ID
          }
        })
          .then(body => {//删除请求成功
            if(body.data.status_code == 1011){//删除状态码正常
              this.open2("删除数据成功");
              //加载最新数据
              this.axios.get('http://49.234.9.206/Gaindata/selet_mysql.php',{
                params:{
                  list:"video"
                }
              })
                .then(body => {//加载请求成功
                  if(body.data.status_code == 1009){//加载状态码正常
                    this.list = body.data.datas;
                    for(var i=0;i<this.list.length;i++){
                      this.$set(this.list[i],'visible',false);
                    }
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            }else {//状态码异常
              this.open4("删除数据失败");
            }
          })
          .catch(error => {
            //请求失败
            this.$nextTick(() => {
              loadingInstance.close();
            });
            this.open4("删除数据失败");
            console.log(error);
          });

      },
      open2(hint) {
        this.$message({
          center:true,
          showClose: false,
          message: hint,
          type: 'success'
        });
      },
      open4(hint) {
        this.$message({
          center:true,
          showClose: false,
          message: hint,
          type: 'error'
        });
      },
    },
    beforeUpdate() {
      this.end(this.ye);
      jiaohu.$emit("len",this.list.filter(data => !this.search || (data.name == this.search) || (data.ID == this.search) || (data.access == this.search)))
      jiaohu.$on("ye",(ye)=>{
        this.ye = ye;
      })
    },
    created() {
      let loadingInstance = this.$loading({text:"数据加载中",fullscreen:false,});
      this.axios.get('http://49.234.9.206/Gaindata/selet_mysql.php',{
        params:{
          list:"video"
        }
      })
        .then(body => {//请求成功
          if(body.data.status_code == 1009){//状态码正常
            this.list = body.data.datas;
            this.open2("加载成功");
          }else {//状态码异常
            this.open4("加载失败");
          }
          for(var i=0;i<this.list.length;i++){
            this.$set(this.list[i],'visible',false);
          }
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          })
        })
        .catch(error => {
          //请求失败
          this.$nextTick(() => {
            loadingInstance.close();
          });
          this.open4("加载失败");
          console.log(error);
        });
    },
  }
</script>

<style scoped>

</style>
