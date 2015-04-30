window.onload = function() {
    var tables = getAllTables();
    makeAllTablefiltable(tables);
};


//返回table数组
function getAllTables() {
    var tables = document.getElementsByTagName("table");
    return tables;
}

//---------------------------------------------------------------------------------------//

function makeAllTablefiltable(tables) {          //  获取被点击的输入框ID
        document.onclick = function(e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.tagName.toLowerCase() === "input" && target.type == "submit") {
                var filter_id = target.previousElementSibling.id;
                filter(filter_id);
            } 
            
        }
}

function filter(filter_id){
    originalText="";
    var condition = document.getElementById(filter_id).value;

    if (condition == "")return;          
    
    var table = document.getElementsByTagName("table");

    var inputs = document.getElementsByTagName('input');
    var index = 0
    for (var index = 0; index < inputs.length; index++) {
        if (inputs[index].id == filter_id)break;          //  遍历所有输入框找出有输入的那个
    }   

        var row = table[index/2].tBodies[0].rows;
        var row_len=row.length;
        var arr_row=row;
        var cell_len=row[0].cells.length
        //遍历每一行的每一格看是否有某格含有条件字符，有则将这一行设置为highlight属性，并且将条件
        //字符用span标记替换原来位子

        //高亮
        
        for(var i=0;i<arr_row.length;i++){
            var flag=0;

            for(var j=0 ; j<cell_len ; j++ ){
                    var strObj = arr_row[i].cells[j].innerHTML.toString()
    
                    if(strObj.indexOf(condition) != -1){
                        flag=1;
                        addClass(row[i],"highlight");
                        var reg=new RegExp("("+condition+")","g");
                        row[i].cells[j].innerHTML=strObj.replace(reg,"<span>"+condition+"</span>");
                    }
            }
            
        }
        //删除不合条件的行
        var fragment=document.createDocumentFragment();
        for (var j = 0, n = cell_len, count = 0; j < n; j++) {
            if (row[0].innerText.indexOf(condition) != -1) {
                //row[0].cells[k].innerHTML = row[0].cells[k].innerText;
                fragment.appendChild(row[0]);
            }
            else {
                
                table[index/2].tBodies[0].removeChild(row[0]);
                //alert("remove_row"+count);
            }
            count++;
        }

        table[index/2].tBodies[0].appendChild(fragment);

}

function check() {return false;}



//----------------------------------------------------------//

function setBackGround (Rows) {
    for (var i = 1; i < Rows.length; i++) {
        if (i%2) {
            removeClass(Rows[i], "alternate");
        } else {
            addClass(Rows[i], "alternate");
        }
    }
}

function hasClass(element, className) {
    if (!element) return;  
    var elementClassName = element.className;  
    if (elementClassName.length == 0) return false;  
    if (elementClassName == className || elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))  
      return true;  
    return false; 
}

function addClass(element, className) {
    if (!this.hasClass(element, className))
    {
        element.className += " "+className;
    }
}
 
function removeClass(element, className) {
    if (!element) return;  
    var elementClassName = element.className;  
    if (elementClassName.length == 0) return;  
    if(elementClassName == className)  
    {  
        element.className = "";  
        return;  
    }  
    if (elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))  
        element.className = elementClassName.replace((new RegExp("(^|\\s)" + className + "(\\s|$)"))," "); 
}

//------------------------------------------------------------//

