window.onload = function () {
	var DOM_Button = document.getElementById("button");
	var apb = document.getElementsByClassName("apb")[0];
	var ALL_botton = document.getElementsByClassName("button");
	var info = document.getElementById("info-bar");
	AddClassdisabled(info);
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsot.XMLHTTP");
	}

	info.addEventListener("click", function(event) {  
		var that = event.target;
		if (that.classList.contains('enable')) {
			var res = 0;
			for (var i = ALL_botton.length - 1; i >= 0; i--) {
				res += Number(ALL_botton[i].children[1].innerHTML);
			}
			that.innerHTML = res;
		}
	})

	DOM_Button.addEventListener('mouseout', function(event) {
		var target = event.relatedTarget ? event.relatedTarget : event.toElement;
		while (target && target != this) {
			target = target.parentNode;
		}
		if (target != this) {
			for (var i = ALL_botton.length - 1; i >= 0; i--) {
				ALL_botton[i].children[1].classList.add('unseen');
				ALL_botton[i].children[1].innerHTML = "...";
				xmlhttp.abort();
				AddClassenable(ALL_botton[i]);
			}
				info.innerHTML = "";
				AddClassdisabled(info);

		}
	})

	for (var i = 0; i < ALL_botton.length; i++) {
		ALL_botton[i].addEventListener("click", Click_Event, false);
	}

	function Click_Event() {
		var that = this;
		if (!that.classList.contains('disabled')) {
			var Tep = [];
			for (var i = ALL_botton.length - 1; i >= 0; i--) {
				if (ALL_botton[i].children[0].innerHTML !== that.children[0].innerHTML) {
					Tep.push(ALL_botton[i]);
				}
			}
			AddClassdisabled(Tep);
			var smallIcon = that.getElementsByTagName("span")[0];
			smallIcon.innerHTML = "...";
			smallIcon.classList.remove("unseen");

			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					smallIcon.innerHTML = xmlhttp.responseText;
					AddClassenable(Tep);
					AddClassdisabled(that);
					if (CherkIsAllClick(ALL_botton)) {
						AddClassenable(info);
					}
				}
			}
			xmlhttp.open("GET", "/", true);
			xmlhttp.send();
		}
	}

};


var AddClassdisabled = function(ArrayOrElement) {
	if (Array.isArray(ArrayOrElement)) {
		for (var i = ArrayOrElement.length - 1; i >= 0; i--) {
			ArrayOrElement[i].classList.remove('enable');
			ArrayOrElement[i].classList.add("disabled");
		}
	} else {
		ArrayOrElement.classList.remove('enable');
		ArrayOrElement.classList.add("disabled");
	}
};



var AddClassenable = function(ArrayOrElement) {
	if (Array.isArray(ArrayOrElement)) {
		for (var i = ArrayOrElement.length - 1; i >= 0; i--) {
			if (ArrayOrElement[i].children[1].innerHTML == '...') {
				ArrayOrElement[i].classList.remove('disabled');
			}
		}
	} else {
		ArrayOrElement.classList.remove("disabled");
		ArrayOrElement.classList.add('enable');
	}
};


var CherkIsAllClick = function(array) {
  var l=array.length;
  var i=0;
  for(i;i<l;i++){
    if (array[i].children[1].innerHTML== '...') {return false;};
  }
  return true;
};