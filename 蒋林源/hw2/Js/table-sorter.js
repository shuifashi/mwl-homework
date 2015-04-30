
var finish;

function makeAllTablesSortable(tables) {
	for (i = 0; i < tables.length; i++) {
		(function(i) {
		var dom_th = tables[i].getElementsByTagName("th");
		for (j = 0; j < dom_th.length; j++) {
		(function(j) {
			dom_th[j].onclick = function() { 
				sorttable(i, j);
			};
		})(j);
		}
		})(i);
	}
}

function sorttable(table_i, j) {   
	var tables = getAllTables();
	var tbody = tables[table_i].tBodies[0];
	var th_ = tables[table_i].getElementsByTagName("th");  
	var all_th = document.getElementsByTagName("th");  
	var th = th_[j];   
	var trow_ = tables[table_i].rows;
	temp = new Array;   
	for (var i = 1; i < trow_.length; i++) {
		temp[i-1] = trow_[i];
	}	
	if (finish == j) {
        temp.reverse();  
    } else {
		temp.sort(Compare(j));  
	}
    for (i = 0; i < temp.length; i++) {
        tbody.appendChild(temp[i]);
    }
    finish = j;
    class_name = th_[j].className;
    for (i = 0; i < all_th.length; i++) {
    	all_th[i].className = 'NoSort';  
    	changebackgroud(th_,j);
    }

}

function changebackgroud(th,k){
	    if (class_name == 'DownSort' || class_name == 'NoSort') {
    	th[k].className = 'UpSort';
    } else if (class_name == '') {
    	th[k].className = 'UpSort';
    }
     else if (class_name == 'UpSort') {
    	th[k].className = 'DownSort';
    }
}

function Compare(j) {
return function cmp(tr1, tr2) {
        var val1, val2;
        val1 = tr1.cells[j].textContent; 
        val2 = tr2.cells[j].textContent;
        if (!isNaN(Number(val1))) { 
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) return -1;
        else if (val1 > val2) return 1;
        else return 0;
    }
}

window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	var table = document.getElementsByTagName("table");
	return table;
}
