window.onload = function() {
      var tables = getAllTables();
      makeFilterable(tables);
}

function getAllTables() {
    var alltables = document.getElementsByTagName("table");
    return alltables
}

function makeFilterable(tables) {
    for (var i = 0; i < tables.length; i++) {
        toFilter(tables[i]);
    }
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

