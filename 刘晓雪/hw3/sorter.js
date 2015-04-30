window.onload =function(){
	var tables = getAllTables();
	makeAllTablesSortable(tables);
	makeAllTablesFilterable(tables);		
};

function getAllTables(){
	return document.getElementsByTagName("table");
};

function makeAllTablesSortable(tables){
	for(var i=0;i<tables.length;i++)
	{
		var flag;//选中元素位置
		var config;//0升序或1降序
		var str = new Array();
		var arr = new Array();
		var thd = tables[i].getElementsByTagName("thead");
		var tr = thd[0].getElementsByTagName("tr");
		var th = tr[0].getElementsByTagName("th");
		for(var j=0;j<th.length;j++)
		{
			th[j].onclick = function(){
				var allth = this.parentNode.getElementsByTagName('th');
				for(var s=0;s<allth.length;s++){//得到选中元素位置
					if(allth[s] == this)
						flag=s;
					else
						allth[s].className = "";
				}
				addClass(this);
				var c=this.getAttribute("class");
				if(c=="dsort")
					config = 1;
				else
					config = 0;

				//得到要比较元素的数组
				var ttbd = this.parentNode.parentNode.nextSibling.nextSibling;
				var ttr = ttbd.getElementsByTagName('tr');
				for(var h=0;h<3;h++){
	 				var td=ttr[h].getElementsByTagName('td');
	 				str[h]=td[flag].innerHTML;
	 				arr[h]=h;
				 }

				sorting(str,arr,config);
				//alert(str[0]+str[1]+str[2]);
				//alert(arr[1]);
				var m=0;
				for(s=0;s<3;s++){
	 				td=ttr[s].getElementsByTagName('td');
	 				str[m]=td[0].innerHTML;//m=0~2第1排
	 				str[m+3]=td[1].innerHTML;//m=3~5第2排
	 				str[m+6]=td[2].innerHTML;//m=6~8第3排
	 				m++;
				 }
				 for(s=0;s<9;s++){
	 				td=ttr[s].getElementsByTagName('td');
	 				h=arr[s];
	 				td[0].innerHTML=str[h];
	 				td[1].innerHTML=str[h+3];
	 				td[2].innerHTML=str[h+6];
				 }
			}
		}
	}
};

function addClass(elem){
	var oldClass = elem.getAttribute("class");
	if(!oldClass)//如果原来没有 class
		elem.className = "asort";
	else if(oldClass == "asort")
		elem.className = "dsort";
	else
		elem.className = "asort";
};


var sorting=function(str,arr,config){
	//alert(str[0]+str[1]+str[2]);
	var min;
	var m;
	if(str[0] < str[1])
			{min=str[0];arr[0]=0;arr[1]=1;}
	else
			{min=str[1];arr[0]=1;arr[1]=0;}
	if(str[2] < min)
			{
				arr[2]=arr[1];
				arr[1]=arr[0];
				arr[0]=2;
			}
	else{
		m=arr[1];
		if(str[2]<str[m])
		{
			arr[2] = arr[1];
			arr[1] = 2;
		}
		else
			arr[2] = 2;	
	}
if(config == 1){
	var tmp;
	tmp=arr[0];
	arr[0]=arr[2];
	arr[2]=tmp;
}	
};



function makeAllTablesFilterable(tables){
	for(var i=0;i<tables.length;i++)
	{
		var input=document.createElement("input");//加input
		tables[i].appendChild(input);
	}
	for(var i=0;i<tables.length;i++)
	{
		var tbd = tables[i].getElementsByTagName("tbody");
		var tr = tbd[0].getElementsByTagName("tr");

		var ipt = tables[i].getElementsByTagName("input");

		ipt[0].onkeyup=function(){
			var t=this.parentNode;
			var tbd = t.getElementsByTagName("tbody");
			var tr = tbd[0].getElementsByTagName("tr");
			//alert(tr[0].innerHTML);
			for(var m=0;m<tr.length;m++)
			{
				clearHighLight(tr[m]);
			}
			
        	showAllTr(t);

       		if(this.value)
			{	
				for(var j=0;j<tr.length;j++)
						{
							 if (tr[j].innerHTML.indexOf(this.value) == -1) {
							 	tr[j].hidden = true;
							 }
							 else{
							 	var td = tr[j].getElementsByTagName("td");
							 	 for (var h = 0; h <  td.length; h++)

               					 highLight(td[h], this.value);
							 }
						}
			}
		}
	}
};

//高亮显示
function highLight(node,keyword){
	node.innerHTML = node.innerHTML.replace(new RegExp(keyword,"g"),"<span class='highlight'>"+keyword+"</span>");
};

//清除高亮
function clearHighLight(node){
	node.innerHTML = node.innerHTML.replace(/<span class=\"highlight\">/g,"").replace(/<\/span>/g,"");
};

//显示所有表格
function showAllTr(table){
	var tbd = table.getElementsByTagName("tbody");
	var tr = tbd[0].getElementsByTagName("tr");
	for(var i=0;i<tr.length;i++)
		tr[i].hidden = false;
};