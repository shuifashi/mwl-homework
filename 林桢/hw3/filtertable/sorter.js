window.onload = function(){
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
};
function getAllTables(){             //return all tables.
	return document.getElementsByTagName("table");
}
function makeAllTablesFilterable(tables){
	for(var i=0;i<tables.length;i++){
		makeFilterable(tables[i]);
	}
}
function makeFilterable(table){
	var inputBox = document.createElement("input");
	inputBox.type = "text";
	inputBox.name = "input";
	var button = document.createElement("button");
	button.type = " submit";
	button.value = "Submit";
	table.parentNode.insertBefore(inputBox, table);
	table.parentNode.insertBefore(button,table);
	button.onclick = function(){
		var text = inputBox.value;
		isExist(table,text);
	};
}
function isExist(table,text){
	 var value = text;
	 var rows = table.tBodies[0].rows;
	 for (var i = 0; i < rows.length; i++) {      
	     rows[i].style.display = 'table-row';
	 }
	 var isFound = false;
	 for (var i = 0; i < rows.length; i++) {
	     isFound = false;
	     for (var j = 0; j < rows[i].cells.length; j++) {
	            var innerText = rows[i].cells[j].innerText;   
	            var position = innerText.indexOf(value);
	            if (position >= 0) {
	                var style = "<span class='highLight'>"+value+"</span>";    
	                var html = innerText.replace(value, style);
	                rows[i].cells[j].innerHTML = html;
	                isFound = true;
	            } else {
	                rows[i].cells[j].innerHTML = innerText;
	            }
	        }
	        if (!isFound) {   
	            rows[i].style.display = "none";
	        }
	   }
}