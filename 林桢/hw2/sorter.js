window.onload = function(){
	var tables = getAllTables();
	makeAllTablesSorTable(tables);
};
function getAllTables(){                           //return all tables.
	return document.getElementsByTagName("table");
}
function makeAllTablesSorTable(table){             //make all table sort in makeChange function.
	for(var j=0;j<table.length;++j){
		makeChange(table[j]);
	}
}
function makeAllTablesFilterable(table){
	for(var j=0;j<table.length;++j){
		makeFilter(table[j]);
	}
}
function makeChange(table){                         //makeChange: change the evenrow's background ;change the clicked row's style;sort the clicked row.
	var th = table.getElementsByTagName("th");
	var tr = table.getElementsByTagName("tr");
	for (var i=1; i<tr.length; i++){
		if(i%2 == 0) tr[i].className = "evenRow";
		else tr[i].className = "oddRow";
	}
	for (var i=0; i<th.length; i++) {
		(function(i) {
			th[i].onclick = function(){
				changeStyle(table,th[i]);
				SortTable(table,SortRow(table,th[i]),rowSortOrder(table,th[i]));
			};
		})(i);
	}
}
function changeStyle(table,th){                      //change the clicked row's style by changing it's className.
	var t_th = table.getElementsByTagName("th");
	if(th.className == "ascend") th.className = "descend";
	else th.className = "ascend";
	for (var i=0;i<t_th.length;i++){
		if(t_th[i].innerHTML!= th.innerHTML) t_th[i].className="";
	}
}
function SortRow(table,th){                           //return the clicked row's array number.
	var t_th = table.getElementsByTagName("th");
	var sortRow;
	for (var i=0; i < t_th.length; i++){
		if(t_th[i].innerHTML == th.innerHTML) {
			sortRow = i;
		}
	}
	return sortRow;
}
function rowSortOrder(table,th){        //return the clicked row's sort order by checking the th's className(ascend or descend).
	var t_th = table.getElementsByTagName("th");
	var order;
	for (var i=0; i < t_th.length; i++){
		if(t_th[i].innerHTML == th.innerHTML) {
			order = th.className;
		}
	}
	return order;
}
function SortTable(table,sortRow,order){       //sort table in SortTable , already know the sortRow and sort order(ascend or descend).
	this.table = table;
	var tr = table.querySelectorAll("tbody tr");  
	var newRows = [];
	for(var i=0;i<tr.length;i++){
		newRows.push(tr[i]);
	}
	if (order == "ascend") 
		newRows.sort(function(row1,row2){
			if(row1.cells[sortRow].innerHTML == row2.cells[sortRow].innerHTML)
				return 0;
			else if(row1.cells[sortRow].innerHTML > row2.cells[sortRow].innerHTML)
				return 1;
			else return -1;
		});
	else newRows.sort(function(row1,row2){
		if(row1.cells[sortRow].innerHTML == row2.cells[sortRow].innerHTML)
			return 0;
		else if(row1.cells[sortRow].innerHTML > row2.cells[sortRow].innerHTML)
			return -1;
		else return 1;
	});
	var n_tbody = document.createElement("tbody");
	for(var i=0;i<newRows.length;i++){
		var n_row = newRows[i];
		n_tbody.appendChild(n_row);
	}
	table.appendChild(n_tbody);
	var n_tr = table.getElementsByTagName("tr");
	for (var i=1; i<n_tr.length; i++){
		if(i%2 == 0) n_tr[i].className = "evenRow";
		else n_tr[i].className = "oddRow";
	}
}