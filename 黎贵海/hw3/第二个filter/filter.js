window.onload = function() {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
}

function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesFilterable(tables) {
    for (var i = 0; i < tables.length; ++i) {
        filter(tables[i]);
    }
}

function filter(table) {
    var ipt = document.createElement('input');
    ipt.type = 'text';
    ipt.className = 'input';
    ipt.placeholder= "input the words";
	var div1 = document.createElement('div');
    div1.appendChild(ipt);
    table.parentNode.insertBefore(div1, table);
    var atr = table.getElementsByTagName('tr');
	var ath = table.getElementsByTagName('th');
    var atb = table.getElementsByTagName('tbody')[0];
    var trarr = new Array();
    for (var i = 1; i < atr.length; ++i) {
        trarr.push(atr[i]);
    }
    ipt.oninput = function() {
        for (j = 0; j < trarr.length; ++j) {
            trarr[j].style.display = "none";
        }
        for (j = 0; j < trarr.length; ++j) {
            for (k = 0; k < trarr[j].cells.length; ++k) {
                trarr[j].cells[k].innerHTML = trarr[j].cells[k].innerHTML.replace(/<\/?span[^>]*>/gi, "");  
                if (trarr[j].cells[k].innerHTML.indexOf(ipt.value) >= 0) {
                    trarr[j].style.display = "";
                    var reg = new RegExp(ipt.value, 'g');
                    trarr[j].cells[k].innerHTML = trarr[j].cells[k].innerHTML.replace(reg, '<span style=\"font-weight: bold;\">'+ipt.value+'</span>');
                }
            }
        }
        for (var k = trarr.length-1; k >= 0; --k) {
            if (trarr[k].style.display == "") {
                atb.insertBefore(trArr[k], atb.firstChild.nextSibling);
            }
        }
    }
}

