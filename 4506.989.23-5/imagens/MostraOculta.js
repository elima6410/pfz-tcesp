function initPartes() {
	if(window.jQuery) {
		$('#Partes span').hide();
	} else {
		var ar = document.getElementById("Partes").getElementsByTagName("span");
		for (var i=0; i<ar.length; i++){
				ar[i].style.display = "none";
		} 
	}
}
function mostra(obj){
	if(window.jQuery) {
		$('#'+obj).toggle();
	} else {
	 if(document.getElementById){
	  var el = document.getElementById(obj);
	  if(el.style.display != "block"){
	   el.style.display = "block";
	  }else{
	   el.style.display = "none"; } 
	  }
	}
}
function oculta(obj){
	if(window.jQuery) {
		$('#'+obj).hide();
	} else {
		if(document.getElementById){
			var el = document.getElementById(obj);
			el.style.display = "none";
		}
	}
}
function exibe(obj){
	if(window.jQuery) {
		$('#'+obj).show();
	} else {
		if(document.getElementById){
			var el = document.getElementById(obj);
			el.style.display = "block";
	 	}
	}
}
