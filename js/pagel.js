//手动切换页面
function page(page){
	// 关闭数据库
	if(plus.sqlite.isOpenDatabase({name: 'table',path: '_doc/table.db'})){
		plus.sqlite.closeDatabase({name: 'table'});
	}
	
	//切换页面
	if(page==1){
		$("#page-1").animate({   
			left:"0px"
		}, 500);
		$("#page-2").animate({
			left:"100%"
		}, 500);
		$("#page-3").animate({
			left:"200%"
		}, 500);
		$("#navbar-1").css({ "border-top":"2px solid #FFF"});
		$("#navbar-2").css({ "border-top":"none"});
		$("#navbar-3").css({ "border-top":"none"});
		$("#header").html("新建投资记录");
	}
	if(page==2){
		//加载要添加数据
		// detailone();
		
		$("#page-1").animate({   
			left:"-100%"
		}, 500);
		$("#page-3").animate({
			left:"100%"
		}, 500);
		$("#page-2").animate({
			left:"0px"
		}, 500);
		$("#navbar-1").css({ "border-top":"none"});
		$("#navbar-2").css({ "border-top":"2px solid #FFF"});
		$("#navbar-3").css({ "border-top":"none"});
		$("#header").html("全部投资记录");
	}
	if(page==3){
		//加载要添加数据
		// detailone();
		
		$("#page-1").animate({   
			left:"-200%"
		}, 500);
		$("#page-2").animate({
			left:"-100%"
		}, 500);
		$("#page-3").animate({
			left:"0px"
		}, 500);
		$("#navbar-1").css({ "border-top":"none"});
		$("#navbar-2").css({ "border-top":"none"});
		$("#navbar-3").css({ "border-top":"2px solid #FFF"});
		$("#header").html("全部基金组合");
	}
}

//屏幕手势滑动，切换页面
function moveleft(){
	var position=parseInt($("#page-1").css("left"));
	var width=parseInt($("#page-1").width());
	if(position==0){
		//加载要添加数据
		// detailone();
		
		$("#page-1").animate({   
			left:"-100%"
		}, 500);
		$("#page-2").animate({
			left:"0px"
		}, 500);
		$("#page-3").animate({
			left:"100%"
		}, 500);
		$("#navbar-1").css({ "border-top":"none"});
		$("#navbar-2").css({ "border-top":"2px solid #FFF"}); 
		$("#header").html("全部投资记录");
	}
 }
 function moveright(){
	var position=parseInt($("#page-1").css("left"));
	var width=parseInt($("#page-1").width());
	if(position==-width){
		$("#page-1").animate({   
			left:"0px"
		}, 500);
		$("#page-2").animate({
			left:"100%"
		}, 500);
		$("#page-3").animate({
			left:"200%"
		}, 500);
		$("#navbar-1").css({ "border-top":"2px solid #FFF"});
		$("#navbar-2").css({ "border-top":"none"});
		$("#header").html("新建投资记录");
	}
 }