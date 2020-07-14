function alldata(){
	//初始化数据库
	if(localStorage.addDB){
		if(!plus.sqlite.isOpenDatabase({name: 'table',path: '_doc/table.db'})){
			//打开数据库
			plus.sqlite.openDatabase({
				name: 'table',
				path: '_doc/table.db'
			});
		}
		
		//查询数据
		plus.sqlite.selectSql({
			name: 'table',
			sql: "select * from cffl",
			success: function(data){
				var html="",items=[],detail;
				if(data.length==0){
					html+="<p><span name='no'id='no'>没有任何记录</span></p>";
				}else{
					for(var i=data.length-1;i>=0;i--){
						html+="<p><span name='date'id='date'>时间："+data[i].time+"</span></p>";
						html+="<p><span name='money'id='money'>总金额："+data[i].all+"</span></p>";
						detail=data[i].detail;
						items=detail.split('&');
						for(j=0;j<items.length;j++){
							span=items[j].split("=");
							html+="<p><span name='itemsmoney'>"+span[0]+"："+span[1]+"</span></p>";
						}
						if(i!=data.length-1){
							html+="<hr>";
						}
					}
				}
				//清除原有数据
				$("#alldata").empty();
				
				$("#alldata").append(html);
				// 关闭数据库
				// plus.sqlite.closeDatabase({name: 'table'});
			}
		});
	}else{
		addDB();
		var html="";
		html+="<p><span name='no'id='no'>没有任何记录</span></p>";
		//清除原有数据
		$("#alldata").empty();
		
		$("#alldata").append(html);
		
	}
	
}