window.onload = function(){
	count();
}
function count(){
	var buttons = document.getElementsByClassName('button');
	var count;//用来存储按钮被摁下个数
	var sum; //用来存储和

	var auto;//1为自动

	document.getElementsByClassName('info')[0].state = 0;
	
	document.getElementsByClassName('info')[0].onclick = function(){
		if(this.state == 1){
			this.innerHTML = sum;
			count = 0;
		}
	}

	document.getElementsByClassName('apb')[0].onclick = function(){
			auto = 1;
			var h =Math.floor(Math.random()*5);
			buttons[h].onclick();
	}//点击@,开始启动机器人

	document.getElementById('button').onmouseout = function(event){
		var target = event.relatedTarget;  
		while(target && target != this ) target = target.parentNode;
		 //防止事件冒泡
		if(target != this ){                                  
			//恢复各个变量
			count = 0;sum = 0;
			document.getElementsByClassName('info')[0].innerHTML = '';
			for(var i = 0; i < buttons.length; i++){
				buttons[i].state = 1;
				buttons[i].clicked = 0;
				buttons[i].style.background = '#303f9f';
				buttons[i].getElementsByClassName('unread')[0].style.opacity = 0;
			}
			document.getElementsByClassName('info')[0].state = 0;
			}
		}

	for(i=0;i<buttons.length;i++){
		buttons[i].state = 1;
		buttons[i].clicked = 0;
		buttons[i].onclick = function(){
			if(this.state && this.clicked){
			this.state = 0
			//按钮状态，1表示激活，0表示灭活
			this.clicked = 1
			//按钮是否被点击过,0表示未点击，1表示点击过
			this.style.background = '#303f9f';
			var unreads = this.getElementsByClassName('unread');
			unreads[0].innerHTML = "...";
			unreads[0].style.opacity="1";
			var b = this.parentNode.getElementsByClassName('button');
			for(var j=0;j<b.length;j++){
				if(b[j] != this)
					b[j].style.background = 'gray';
			}
			
			var xmlhttp;			
			if (window.XMLHttpRequest) {
					xmlhttp = new XMLHttpRequest();
				}
				else{
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200){           //服务器响应后执行的操作
						this.getElementsByClassName('unread')[0].innerHTML = xmlhttp.responseText; //显示随机数
						for(j = 0; j < buttons.length; j++){                 //将其他按钮变为可按转态
							if(!buttons[j].clicked){
								buttons[j].style.background = 'blue';
							}
							buttons[j].state = 1;
						}
						that.style.background = 'gray';
						count++;
						sum += parseInt(xmlhttp.responseText);
						if(count == buttons.length)
						{
							var info = document.getElementsByClassName('info');
							info[0].state = 1;//激活
							if(auto)
								document.getElementsByClassName('info')[0].onclick();
						}
						else
							document.getElementsByClassName('apb')[0].onclick();
					}
				}
				xmlhttp.open("GET","/",true);
				xmlhttp.send();
				this.clicked = 1;
				for(j = 0; j < buttons.length; j++){                         //发送请求后，将所有按钮灭活
					buttons[j].state = 0;
					buttons[j].style.background = 'gray';
				}
				this.style.background = '#303f9f';
			}
		}
	}
}