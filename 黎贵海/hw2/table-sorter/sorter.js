// JavaScript Document
window.onload = function () {
    var tables = getAllTables();
    makeAllTablesSortalbe(tables);
};

function getAllTables() {
    return document.getElementsByTagName("table");
}


function makeAllTablesSortalbe(tables) {
    for (var i = 0; i < tables.length; i++)
        makeSortable(tables[i]);
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