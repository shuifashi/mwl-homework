window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortableAndFilterable(tables);
}

function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesSortableAndFilterable(tables) {
    for (var i = 0; i < tables.length; ++i) {
        makeSortable(makeFilterable(tables[i]));
    }
}

function makeSortable(table) {
	var atr = table.getElementsByTagName('tr');
    var ath = table.getElementsByTagName('th');
    var atb = table.getElementsByTagName('tbody')[0];
    for (var i = 0; i < ath.length; ++i) {
        ath[i].onclick = function() {
            var trarr = new Array();
            for (var k = 1; k < atr.length; ++k) {
                trarr.push(atr[k]);
            }
            for (var j = 0; j < ath.length; ++j) {
                ath[j].style.backgroundColor = "rgb(0, 0, 255)";
            }
            this.style.backgroundColor = "rgb(65, 105, 225)";
            if (this.className == "" || this.className == "descend") {
                this.className = "ascend";
                var pos = this.cellIndex;
                trarr.sort(function(a, b) {
                    return a.cells[pos].textContent > b.cells[pos].textContent;
                });
            } else {
                this.className = "descend";
                trarr.reverse();
            }
            for (var k = trarr.length-1; k >= 0; --k) {
                atb.insertBefore(trarr[k], atb.firstChild.nextSibling);
            }
        };
    }
    return table;
}

function makeFilterable(table) {
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
	return table;
}
