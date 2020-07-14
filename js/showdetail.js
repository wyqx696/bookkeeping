function showdetail(date){
	plus.io.resolveLocalFileSystemURL("_downloads/trade_history", function( entry ) {
		entry.file( function(file){
			var fileReader = new plus.io.FileReader();
			fileReader.readAsText(file, 'utf-8');
			fileReader.onloadend = function(evt) {					
				var json=JSON.parse(evt.target.result);
				var arr=json.data.items;
				var html="",money;
				var addhtml="";
				for(var i in arr){
					if(date==parseInt(arr[i].trade_date)){
						var buy_amount=arr[i].buy_amount;
						money=parseInt(arr[i].buy_amount);
						var remark=arr[i].remark;
						html+="<p class='buy_amount'>本期买入金额（示例）："+buy_amount+"</p>";
						html+="<p class='remark'>本期投资说明："+remark+"</p>";
						html+="<table><tbody>";
						html+="<tr><td>基金</td><td>买入金额</td><td>配比</td></tr>";
						var trading_elements=arr[i].trading_elements;
						for(var j in trading_elements){
							html+="<tr>";
							html+="<td><span class='fd_name'>"+trading_elements[j].fd_name+"</span><br><span class='fd_code'>"+trading_elements[j].fd_code+"</span></td>";
							html+="<td>"+trading_elements[j].money+"</td>";
							html+="<td>"+trading_elements[j].percent+"</td>";
							html+="</tr>";
						}
						html+="</tbody></table>";
						
						//投资记录添加模板
						addhtml+="<table id='addtable'><tbody>";
						addhtml+="<tr><td>基金</td><td>买入金额</td><td>配比</td></tr>";
						for(var n in trading_elements){
							addhtml+="<tr>";
							addhtml+="<td><span class='fd_name' id='fd_name-"+n+"'>"+trading_elements[n].fd_name+"</span></td>";
							addhtml+="<td><input type='number' name='money-"+n+"' id='money-"+n+"' placeholder='"+trading_elements[n].money+"'/></td>";
							addhtml+="<td id='percent-"+n+"'>"+trading_elements[n].percent+"</td>";
							addhtml+="</tr>";
						}
						addhtml+="</tbody></table>";
					}
				}
				//消除详细信息
				$("#detail").empty();
				//显示详细信息
				$("#detail").append(html);
				
				//加载默认投资组合投资比例
				showpercent(money);
				
				//消除详细信息
				$("#record").empty();
				//显示投资详细信息
				$("#record").append(addhtml);
			}
		} );
	}, function ( e ) {
		console.log( "文件目录错误: " + e.message );
	} );
}