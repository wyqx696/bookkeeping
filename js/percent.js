function percent(addmoney){
	var i=$("#addtable>tbody").children().length-1
	var money,percent;
	if(addmoney=="主理人比例"){
		for(var j=0;j<i;j++){
			$("#money-"+j).val("");
		}
		$("#money").val("");
	}else{
		for(var j=0;j<i;j++){
			percent=parseFloat($("#percent-"+j).html());
			// alert($("#percent-"+j).html());
			money=parseFloat(addmoney)*percent/100;
			money=Math.floor(money*100)/100;
			$("#money-"+j).val(money);
		}
		$("#money").val(addmoney);
	}
}