tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()));


tableData.filter(function(data){
  return (!search || data.name.toLowerCase().includes(search.toLowerCase()))
});
