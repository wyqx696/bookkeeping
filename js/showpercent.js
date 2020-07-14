function showpercent(money){
	var value,text;
	var html="";
	for(var i=0.01;i<1.01;){
		value=money*i;
		text=Math.floor(value*100)/100;
		html+="<option value='"+text+"'>"+parseInt(i*100)+"%（￥"+text+"）</option>";
		i=i+0.01
	}
	$("#percent").append(html);
}