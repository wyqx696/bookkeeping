function adddata(){
	//初始化数据库
	if(!localStorage.addDB){
		addDB();
	}
	if($("#date").val().length==0){
		alert("时间不能为空");
	}else{
		if($("#money-0").val().length==0){
			alert("购买金额不能为空");
		}else{
			var date=$("#date").val();
			var money=$("#money").val();
			var i=$("#addtable>tbody").children().length-1;
			var itemsname,itemsmoney,detail="";
			for(var j=0;j<i;j++){
				itemsname=$("#fd_name-"+j).html();
				itemsmoney=parseFloat($("#money-"+j).val());
				detail+=itemsname+"="+itemsmoney+"&";
			}
			detail=detail.slice(0,detail.length-1);
			
			//打开数据库
			plus.sqlite.openDatabase({
				name: 'table',
				path: '_doc/table.db'
			});
			plus.sqlite.selectSql({
				name: 'table',
				sql: 'select * from cffl',
				success: function(data){
					if(data.length){
						var id=data.length+1;
					}else{
						var id=1;
					}
					var sql="insert into cffl values('"+id+"','"+date+"','"+money+"','"+detail+"')";
					plus.sqlite.executeSql({
						name: 'table',
						sql: sql,
						success: function(e){
							
							
							//清除添加页面数据
							$("#date").val("");
							$("#money").val("");
							$("#percent").val("主理人比例");
							
							//输出添加成功消息
							alert("新的投资记录添加成功");
							
							//跳转全部基金页
							$("#page-1").animate({
								left:"-100%"
							}, 500);
							$("#page-2").animate({
								left:"0px"
							}, 500);
							$("#navbar-1").css({ "border-top":"none"});
							$("#navbar-2").css({ "border-top":"2px solid #FFF"});
							$("#header").html("全部投资记录");
							
							//加载新数据
							alldata();
						},
						fail: function(e){
							console.log("记录添加失败"+JSON.stringify(e));
						}
					});
				},
				fail:function(e){
					console.log('记录数据查询失败: '+JSON.stringify(e));
				},
			});
		}
	}
}