window.onload = function() {
	  var tables = getAllTables();
	  makeSortable(makeFilterable(tables));
}

function getAllTables() {
    var alltables = document.getElementsByTagName("table");
    return alltables;
}

function makeFilterable(tables) {
    for (var i = 0; i < tables.length; i++) {
        toFilter(tables[i]);
    }
    return getAllTables();
}

function toFilter(table) {
    var toinput = document.createElement("input");
    table.parentNode.insertBefore(toinput, table);
    toinput.oninput = function() {
        var trs = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        for (var i = 0; i < trs.length; i++) {
            trs[i].classList.remove("hidden");
            trs[i].innerHTML = trs[i].innerHTML.replace(/<strong>/g, '');
        }
        for (var i = 0; i < trs.length; i++) {
            filter(trs[i], this.value);
        }
    }
}

function filter(ele, value) {
    if (value == "") return;
    var tds = ele.getElementsByTagName("td");
    var len = value.length;
    var flag = 0;
    for (var i = 0; i < tds.length; i++) {
        var temp = tds[i].innerHTML;
        var offset = 0;
        while (1) {
            offset = temp.indexOf(value, offset);
            if (offset == -1) break;
            flag = 1;
            var len_ = temp.length;
            temp = temp.substring(0, offset)+"<strong>"+value+"</strong>"+temp.substring(offset+len, len_+1);
            offset += len+17;
        }
        tds[i].innerHTML = temp;
    }
    if (flag == 0) {
        ele.classList.add("hidden");
    }
}

function makeSortable(tables) {
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
var finish;
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



function clearAll() {
	var ths = document.getElementsByTagName("th");
	for (var i = 0; i < ths.length; i++) {
     ths[i].classList.remove("DownSort");
     ths[i].classList.remove("UpSort");
	}
}


