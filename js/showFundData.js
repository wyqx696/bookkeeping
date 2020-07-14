function showFundData(){
	
	var allFundsDB =(dbName,version) =>{
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
	
	var readAll =(dbName,db) =>{
		return new Promise((resolve,reject) =>{
			let data = {list:[]};
			let Sum = 0
			let objectStore = db.transaction(dbName).objectStore(dbName);
			
			objectStore.openCursor().onsuccess = function () {
				 let cursor = event.target.result;
				 if (cursor) {
					data.list.push({fundName:cursor.value.fundName,Account:cursor.value.fundAccount});
					Sum += cursor.value.fundAccount;
					data.combination = cursor.value.combination;
				    cursor.continue();
				} else {
					
					data.Sum = Sum;
					let html = template('tempProperty', data);
					// console.log(html);
					if(!$("#"+dbName).length>0){
						let frameDiv = $("<div>");
						frameDiv.attr("id",dbName);
						$("#tbd").append(frameDiv);
					}
					$("#"+dbName).empty();
					$("#"+dbName).append(html);

				  console.log('没有更多数据了！');
				  db.close();
				  resolve("关闭数据库！")

				}
			};
		})

	}


	var showFund = async ()=>{
		
		for(let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);
			if (key!='addDB'){
				let dbName = key;
				console.log("key:"+key )
				let version = 1;
				let db = await allFundsDB(dbName,version);
				console.log(await readAll(dbName,db));
			}


		}
	}

	showFund();
	
}
