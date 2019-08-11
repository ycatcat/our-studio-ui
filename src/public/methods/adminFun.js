/*
* 公用方法
* */
export function amend(index, row){
  //关闭“是否删除”提示
  row.visible=false;
  //删除数据
  this.axios.get('http://49.234.9.206/Gaindata/delete_mysql.php',{
    params:{
      list:this.api,
      ID:row.ID
    }
  })
    .then(body => {//删除请求成功
      if(body.data.status_code == 1011){//删除状态码正常
        this.open2("删除数据成功");
        //加载最新数据
        this.axios.get('http://49.234.9.206/Gaindata/selet_mysql.php',{
          params:{
            list:this.api,
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
      }else {//删除状态码异常
        this.open4("删除数据失败");
      }
    })
    .catch(error => {
      //删除请求失败
      this.$nextTick(() => {
        loadingInstance.close();
      });
      this.open4("删除数据失败");
      console.log(error);
    });
}

export function open2(hint) {
  this.$message({
    center:true,
    showClose: false,
    message: hint,
    type: 'success'
  });
}

export function open4(hint) {
  this.$message({
    center:true,
    showClose: false,
    message: hint,
    type: 'error'
  });
}


