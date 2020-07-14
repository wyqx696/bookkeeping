function showdate(plan_code="CSI666"){
	var url="https://danjuanapp.com/djapi/plan/"+plan_code+"/trade_history?size=20&page=1"
	//创建下载任务
	plus.io.resolveLocalFileSystemURL('_downloads/trade_history', function(entry) {
		entry.remove(function(entry) {
			console.log("文件删除成功==" + '_downloads/trade_history');
		}, function(e) {
			console.log("文件删除失败=" + '_downloads/trade_history');
		});
	});
	var dtask=plus.downloader.createDownload(url,{},function(d,status){
	if(status == 200){ 
		//文件下载成功
		var fileurl=d.filename;
		plus.io.resolveLocalFileSystemURL(fileurl, function( entry ) {
			entry.file( function(file){
				var fileReader = new plus.io.FileReader();
				fileReader.readAsText(file, 'utf-8');
				fileReader.onloadend = function(evt) {					
					var json=JSON.parse(evt.target.result);
					var arr=json.data.items;
					var timearr=[],oldtime=[];
					
					//将时间戳转化为i日期格式
					for(var i in arr){
						var date = new Date(parseInt(arr[i].trade_date));
						//时间戳为10位需*1000，时间戳为13位的话不需乘1000
						var Y = date.getFullYear() + '-';
						var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
						var D = date.getDate();
						timearr[i]=Y+M+D;
						oldtime[i]=arr[i].trade_date;
					}
					var html="";
					for(var j in timearr){
						html+="<option value='"+oldtime[j]+"'>"+timearr[j]+"</option>";
					}
					$("#trade_time").empty();
					$("#trade_time").append(html);
					
					//加载默认投资组合
					showdetail(+oldtime[0]);
					
				}
			} );
		}, function ( e ) {
			console.log( "文件目录错误: " + e.message );
		} );
	}else{
		//文件下载失败
		console.log("文件下载失败: " + status); 
	}  
	});
	//开始下载任务
	dtask.start(); 
}