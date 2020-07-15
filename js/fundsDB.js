//创建相关数据库，或者打开相关数据库
function fundsDB(){
	if(!plus.sqlite.isOpenDatabase({name: 'funds',path: '_doc/funds.db'})){
		//打开数据库
		plus.sqlite.openDatabase({
			name: 'funds',
			path: '_doc/funds.db',
			success: function(e){
				console.log('openFundsDatabase success!');
			},
			fail: function(e){
				console.log('openFundsDatabase failed: '+JSON.stringify(e));
			}			
		});
	}
	//没有就创建数据表，有则不用创建
	plus.sqlite.executeSql({
		name: 'funds',
		sql: 'create table if not exists CSI666("fundName" CHAR(100),"fundAccount" CHAR(100),"fundCode" CHAR(100))',
		// sql: 'create table if not exists CSI666("fundName" CHAR,"fundAccount" CHAR)',
		success: function(e){
			localStorage.addFundsDB="yes";
			console.log("数据表创建成功")
		},
		fail: function(e){
			alert("数据表创建失败");
		}
	});
	
	
}