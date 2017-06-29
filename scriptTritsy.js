function configure(client){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var token = xhttp.responseText;
      var elementQR = document.getElementById('tritsyQR');
      elementQR.setAttribute('src', "https://transfer-it-easy.herokuapp.com/apiserver/qr?token="+token );
      elementQR.width = 200;
      elementQR.height = 200;
      requestEquivalence(client, token);
    }
  };
  xhttp.open("GET", "https://transfer-it-easy.herokuapp.com/apiserver/token", true);
  xhttp.send();
}

function requestEquivalence(client, token){
  var xhttp1 = new XMLHttpRequest();
  xhttp1.onreadystatechange = function() {
    if (xhttp1.readyState == 4 && xhttp1.status == 200) {
      var equivalence = xhttp1.responseText;
      var jsEquivalence = JSON.parse(equivalence);
      requestDataUser(token, jsEquivalence);
    }
  };
  xhttp1.open("GET", "https://transfer-it-easy.herokuapp.com/apiserver/equivalence?clientId="+client, true);
  xhttp1.send();
}

var inter;

function requestDataUser(token, equivalencias){
  inter = setInterval(function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        var dataUser = xhttp.responseText;
        var jsDataUser = JSON.parse(dataUser);
        fill(jsDataUser, equivalencias);
      }
    };
    xhttp.open("GET", "https://transfer-it-easy.herokuapp.com/apiserver/user?userId="+token, true);
    xhttp.send();
  },3000);
}

function fill(jsUserData, jsEquivalencias){
    clearInterval(inter);
    Object.keys(jsEquivalencias).forEach(function(key){
		element = document.getElementById(jsEquivalencias[key]);
		if (element != null){
			if (element.type == "radio" && jsUserData[key] == true){
				element.checked = true;
			}
			if (jsUserData[key] != undefined){
			  element.value = jsUserData[key];
      }else{
        element.value = "";
      }	
						
		}
	})
}
























