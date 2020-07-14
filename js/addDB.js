//创建相关数据库，或者打开相关数据库
function addDB(){
	if(!plus.sqlite.isOpenDatabase({name: 'table',path: '_doc/table.db'})){
		//打开数据库
		plus.sqlite.openDatabase({
			name: 'table',
			path: '_doc/table.db'
		});
	}
	//没有就创建数据表，有则不用创建
	plus.sqlite.executeSql({
		name: 'table',
		sql: 'create table if not exists cffl("id" int(11),"time" CHAR(50),"all" CHAR(20),"detail" text)',
		success: function(e){
			localStorage.addDB="yes";
		},
		fail: function(e){
			alert("数据表创建失败");
		}
	});
	
}