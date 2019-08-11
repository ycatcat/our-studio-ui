<template>
  <div>
    <el-table
      :data="list.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()) || data.nickname.toLowerCase().includes(search.toLowerCase()) || (data.ID == search) || (data.email == search)).slice(ye*10-10,ye*10)"
      style="width: 100%">
      <el-table-column
        label="ID"
        prop="ID"
        width="120px"
      >
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="username">
      </el-table-column>
      <el-table-column
        label="邮件地址"
        prop="email">
      </el-table-column>
      <el-table-column
        label="密码"
        prop="password">
      </el-table-column>
      <el-table-column
        label="昵称"
        prop="nickname">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="creation_time">
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
          <el-popover
            placement="top"
            width="160"
            v-model="scope.row.visible"
            @click="">
            <p>此操作可能会造成无法挽回的损失，确定要继续修改用户信息吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="amend(scope.$index, scope.row)">确定</el-button>
              <el-button type="primary" size="mini" @click="scope.row.visible = false">取消</el-button>
            </div>
            <el-button
              slot="reference"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          </el-popover>
          <el-dialog title="请提供您的管理员权限码（该功能尚未开发，您还没有权限修改用户信息）" :visible.sync="dialogFormVisible">
            <form action="" method="post" style="text-align: center" :id="scope.$index" name="access">
              权限码：<input type="password" style="width: 50%; height: 38px; border-radius: 5px">
            </form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="access(scope.$index)">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div class="el-add-button">
      <el-button type="primary" plain>添加按钮</el-button>
    </div>
    <p v-if="endye" style="color: #ada9af; height: 50px; line-height:50px;">没有更多啦！</p>
  </div>
</template>
<script>
  import jiaohu from "../jiaohu"
  export default {
    name: "theUserInfo",
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
      end(ye){
        var i =(this.list.filter(data => !this.search || data.username.toLowerCase().includes(this.search.toLowerCase()) || data.nickname.toLowerCase().includes(this.search.toLowerCase()) || (data.ID == this.search) || (data.email == this.search))).length/10;
        if(ye > i){
            this.endye = true;
        } else {
          this.endye = false;

        }
      },amend(index, row){
        row.visible=false;
        this.dialogFormVisible = true;
      },access(i){
        this.dialogFormVisible = false;
        document.getElementById(""+i).submit();
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
      jiaohu.$emit("len",this.list.filter(data => !this.search || data.username.toLowerCase().includes(this.search.toLowerCase()) || data.nickname.toLowerCase().includes(this.search.toLowerCase()) || (data.ID == this.search) || (data.email == this.search)))
      jiaohu.$on("ye",(ye)=>{
        this.ye = ye;
      })
    },
    created() {
      let loadingInstance = this.$loading({text:"数据加载中",fullscreen:false,});
      this.axios.get('http://49.234.9.206/Gaindata/selet_mysql.php',{
        params:{
          list:"userinfo"
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
  .el-add-button{
    position: absolute;
    top: 155px;
    left: 225px;
  }
</style>
