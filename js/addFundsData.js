function addFundsData(){
	
	var openFundDB =(dbName,version) =>{
		return new Promise((resolve,reject) => {
			var db;
			var request = window.indexedDB.open(dbName,version);
			
			request.onerror = function(event){
				console.log("数据库打开报错");
				reject(new Error("数据库打开报错"));
			};
			
			request.onsuccess = function(event){
				db = request.result;
				console.log("数据库打开成功");
				if(!localStorage.getItem(dbName)){
					localStorage.setItem(dbName,1);
				}
				resolve(db);
			};
			
			request.onupgradeneeded = function(event){
				db = event.target.result;
				var objectStore;
			
				if(!db.objectStoreNames.contains(dbName)){
					objectStore = db.createObjectStore(dbName,  
					{ 
						keyPath: 'fundCode'
					});
					objectStore.createIndex('combination','combination');
					console.log("创建了新的表");
					
				}
			};
			
		})
	}
	

	var addFundsDB =(db,dbName,data) =>{
		
		return new Promise((resolve,reject) => {
			
			let transaction = db.transaction(dbName,'readwrite');
			let store = transaction.objectStore(dbName);

			let request = store.get(data.fundCode);
			
			request.onsuccess = function(e){
				let result = e.target.result;
				//如果可以查到，以前添加过
				if(result){
					// console.log(result.fundAccount);
					data.fundAccount += result.fundAccount*1;
					// console.log(data.fundAccount);
					
					let requestUpdate = db.transaction(dbName, 'readwrite')
						.objectStore(dbName)
						.put(data);
						
						requestUpdate.onsuccess = function (event) {
						console.log(result.fundName+'基金数据数据更新成功');
						resolve("基金数据更新成功！")
						
						};
					
						requestUpdate.onerror = function (event) {
						console.log(result.fundName+'数据更新失败');
						reject("基金数据更新失败")
					}

				}
				//第一次添加这只基金
				else{
					
					console.log("第一次添加"+data.fundName);
					
					let requestAdd = db.transaction(dbName, 'readwrite')
						.objectStore(dbName)
						.add(data);
					
						requestAdd.onsuccess = function (event) {
						console.log(data.fundName+'数据添加成功');
						resolve("基金数据添加成功！")
						};
					
						requestAdd.onerror = function (event) {
						console.log(data.fundName+'数据添加失败'+ event.target.error);
						reject("基金数据添加失败")
					}							
						
				}
			};
		})
	};
	
	// var readAll =(dbName,db) =>{
	// 	return new Promise((resolve,reject) =>{
	// 		let data = {list:[]};
	// 		let Sum = 0
	// 		let objectStore = db.transaction(dbName).objectStore(dbName);
			
	// 		objectStore.openCursor().onsuccess = function () {
	// 			 let cursor = event.target.result;
	// 			 if (cursor) {
	// 				data.list.push({fundName:cursor.value.fundName,Account:cursor.value.fundAccount});
	// 				Sum += cursor.value.fundAccount;
	// 				data.combination = cursor.value.combination;
	// 			    cursor.continue();
	// 			} else {
					
	// 				data.Sum = Sum;
	// 				let html = template('tempProperty', data);
	// 				console.log(data);
	// 				$("#tbd").empty();
	// 				$("#tbd").append(html);
	// 			  console.log('没有更多数据了！');
	// 			  db.close();
	// 			  resolve("关闭数据库！")

	// 			}
	// 		};
	// 	})

	// }


	var addFund = async ()=>{
		
		if($("#date").val().length==0){
			alert("时间不能为空");
		}else{
			if($("#money-0").val().length==0){
				alert("购买金额不能为空");
			}else{
				let mySelect = document.getElementById("trade_id");
				let index=mySelect.selectedIndex ;
				let dbName = mySelect.options[index].value;
				let version = 1;
				let db = await openFundDB(dbName,version);
				
				let i=$("#addtable>tbody").children().length-1;
				console.log(i)
				for(let j=0;j<i;j++){
					fundName=$("#fd_name-"+j).html();
					fundAccount=parseFloat($("#money-"+j).val());
					fundCode=$("#fd_code-"+j).html();
					
					let data={
						fundCode:fundCode,
						fundName:fundName,
						fundAccount:fundAccount,
						combination:mySelect.options[index].text
					};		
					await addFundsDB(db,dbName,data);
						
				}
				db.close();
				console.log(await showFundData());
			}
		}
	}
	
	addFund();
	
}
