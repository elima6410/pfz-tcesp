function buttonOn(nomeBotao) {
    nomeBotao.className='Botao';
}

function buttonOver(nomeCampo) {
    nomeCampo.className='BotaoOn';
}

function abre(url) {
    window.open(url,'janela', 'width=750,height=500,left=10,top=30,' + 
        'screenX=10,screenY=30,toolbar=no,location=no,' +
        'directories=no,status=no,menubar=yes,scrollbars=yes,' +
        'copyhistory=no,resizable=yes');
}

function abreManual(url) {
    window.open(url,'janela','width=750,height=450,left=10,top=30,' +
        'screenX=10,screenY=30,toolbar=yes,location=no,' + 
        'directories=no,status=no,menubar=yes,scrollbars=yes,' +
        'copyhistory=no,resizable=yes');
}

function setFocus(campo) {
    document.getElementById(campo).focus();
}

/**
 * Fun��o utilizada para retornar qual o browser o usu�rio est� utilizando.
 * Tipos de retornos poss�veis (string):
 * Opera: "opera"
 * Firefox: "firefox"
 * Internet Explorer: "ie"
 **/
function detectBrowser() {
    var ie = document.all != undefined;
    var opera = window.opera != undefined;

    if (opera) return "opera";
    if (ie) return "ie";
    if ((window)&&(window.netscape)&&(window.netscape.security)) {
        return "firefox";
    }
    return "ie"; // se n�o for qualquer um dos outros, retorna ie
}

/**
 * Fun��o utilizada para retornar qual o valor adequado de display (css)
 * para exibir uma linha (tr)
 **/  
function estiloLinhaVisivel(){
    if(detectBrowser()=='firefox'){//Firefox
        return "table-row";              
    }
    else{//IE
        return "block";              
    }
}

/**
 * Fun��o utilizada para m�scara de entrada de data no formato XX/XX/XXXX
 */
function dateMask(event) {
    var sMask = "0123456789";
    var KeyTyped = String.fromCharCode(getKeyCode(event));
    // IE only version var KeyTyped = String.fromCharCode(window.event.keyCode);
    // ** IE only var srcObject = window.event.srcElement;
    var targ = getTarget(event);
    //alert(window.event.keyCode);
    keyCount = targ.value.length;
    keyCode = getKeyCode(event);
    if (keyCode < 15) /* del, backspace and other movement characters are okay */ {
        return true;
    } else if (sMask.indexOf(KeyTyped.toString()) == -1) {
        return false;
    }
	
    keyEntered = KeyTyped;
    keyCount++;
    switch (keyCount) {
	case 2:
            targ.value += keyEntered + "/";
            break;
	case 5:
            targ.value += keyEntered + "/";
            break;
	default:
            return true;
    }
    return false;
}

/**
 * Fun��o utilizada para m�scara de entrada de data e hora no formato XX/XX/XXXX XX:XX
 */
function dateHourMask(event) {
    var sMask = "0123456789";
    var KeyTyped = String.fromCharCode(getKeyCode(event));
    // IE only version var KeyTyped = String.fromCharCode(window.event.keyCode);
    // ** IE only var srcObject = window.event.srcElement;
    var targ = getTarget(event);
    //alert(window.event.keyCode);
    keyCount = targ.value.length;
    keyCode = getKeyCode(event);
    if (keyCode < 15) /* del, backspace and other movement characters are okay */ {
        return true;
    } else if (sMask.indexOf(KeyTyped.toString()) == -1) {
        return false;
    }

    keyEntered = KeyTyped;
    keyCount++;
    switch (keyCount) {
        case 2:
            targ.value += keyEntered + "/";
            break;
        case 5:
            targ.value += keyEntered + "/";
            break;
        case 10:
            targ.value += keyEntered + " ";
            break;
        case 13:
            targ.value += keyEntered + ":";
            break;
        default:
            return true;
    }
    return false;
    }

/**
 * Fun��o utilizada para mudar o foto dos campos ao digitar. Recebe como par�metros o componente atual, o tamanho m�ximo (numero de caracteres)
 * que apos este ser� mudado o foco, o elemento para qual ir� o foco e o listener do evento utilizado (ouvinte).
 **/
function mudaFoco(componente,tamanho,proximo,event){
    keyCode = getKeyCode(event);
    if(keyCode == 32 || (keyCode > 40 && keyCode != 127 && keyCode != 144 && keyCode != 145 && keyCode != 154 && keyCode != 155 && keyCode < 224) || 
        keyCode > 227){ /* Caracteres de movimento nao entram. */
        if(document.getElementById(componente).value.length >= tamanho){
            document.getElementById(proximo).focus();
        }
    }
}

function getKeyCode(e) {
    //IE5
    if (e.srcElement) {
        return e.keyCode
    }
    // NC5
    if (e.target) {
        return e.which
    }
}

function getTarget(e) {
    // IE5
    if (e.srcElement) {
        return e.srcElement;
    }
    if (e.target) {
        return e.target;
    }
}

/**
 * Fun��o utilizada para concatenar caracteres a esquerda de uma string utilizando o tamanho e a mascara passados
 * como par�metro.
 *
 * Exemplo: LPad("a",  "00000"), retornaria "0000a".
 *
 * @param string string que sera concatenada
 * @param mascara mascara para concatena��o
 */
function LPad(string, mascara){
    var retorno = '';
    var tamCodigo = string.length;
    var tamMascara = mascara.length;

    if(tamCodigo < tamMascara){
        retorno = mascara.substring(0, tamMascara-tamCodigo).concat(string);
    }
    else{
        retorno = string;
    }

    return (retorno);
}

/**
*Verifica se a data � v�lida.
*@Autor: Maxwell Rocha
*@Param: campo (input de texto DATA)
*@Event: onBlur=validarCampoData(this)
**/
function validarCampoData(campo)  
{
	if(campo.value.length == 10 || campo.value.length == 16)
	{			

            var arrayData = campo.value.split('/');  
		  
	    //Os dias da data  
	    var dia = Number(arrayData[0]);  
	    //O m�s da data  
	    var mes = Number(arrayData[1]);  
	    //O ano da data  
	    var ano = Number(arrayData[2].substring(0,4));  
		
	    //Para guardar o total de dias que tem no m�s  
	    var totalDiasMes;  
	  
	    //Nos primeiro 7 meses do ano os impares que s�o os meses que tem 31 dias  
	    // depois do 7 primeiros os meses que tem 31 s�o os pares, seta o resultado  
	    //que deve dar da opera��o MOD de acordo com esse padr�o  
	    var mod = (mes <= 7 ? 1 : 0);  
	  
	    //Se for fevereiro tem que saber se � bissexto ou n�o  
	    if(mes == 2)  
	    {  
	        //Bissexto 29, sen�o 28  
	        totalDiasMes = (isLeap(ano) == true ? 29 : 28);  
	    }  
	    else  
	    {  
	        totalDiasMes = (mes%2==mod ? 31 : 30);  
	    }  
	  
	    //Se o dia for maior que o total de dias no m�s, ent�o ele ser� o ultimo  
	    if(dia > totalDiasMes)  
	    {
	        alert('O dia informado � maior que o dia permitido.');
	        campo.value="";
	        return false;
	    }
	    else if(dia <= 0)  
	    {
	        alert('O dia informado � menor que o dia permitido.');
	        campo.value="";
	        return false;
	    }
	    //Se o m�s for maior que 12 ent�o seta o m�s para o ultimo m�s  
	    if(mes > 12)  
	    {
	        alert('O m�s informado � maior que o m�s permitido.');
	        campo.value="";
	        return false;
	    }
	    else if(mes <= 0)  
	    {
	        alert('O m�s informado � menor que o m�s permitido.');
	        campo.value="";
	        return false;
	    }
	    //Verifica se o ano esta no intervalo permitido pelo sistema.
	    if((""+ano).length == 4)  
	    {
	    	dataAtual = new Date();
	    	anoAtual = dataAtual.getFullYear();
	    	if(parseInt(ano) >= (anoAtual-100) && parseInt(ano) <= (anoAtual + 30))
		{
		    //Linha de codigo adicionado para validar as horas informada pelo usu�rio.
		    if(campo.value.length == 16)
		    {
			var hora = campo.value.charAt(11) + campo.value.charAt(12);			
			var minutos = campo.value.charAt(14) + campo.value.charAt(15)			
			if(parseInt(hora)>=25)
			{
			    alert("Hora Inv�lida.");
			    campo.value="";
	    	            return false;	
			}
			if(parseInt(minutos)>=60)
			{
			    alert("Minutos Inv�lido.");
			    campo.value="";
	    	            return false;	
			}			
		     }
		     /////////////////////////////////////////////////////////////////////////////		    


		    return true;		    	
		}
		else
		{
	            alert("Ano informado n�o � permitido.");
       	            campo.value="";
  	            return false;
		}
	    }
	    else
	    {
		alert("Quantidade de d�gitos inv�lido para o ano informado.");
		campo.value="";
	        return false;
	    }		                     		

	    if((""+dia).length == 1)
	        dia = "0" + dia;  
	  
	    return ( dia + '/' + mes + '/' + ano);
	}
	else
	{
	    campo.value="";
	    return false;
	}
}  

  /**
  *Verifica se o ano passado por par�metro � bissexto.
  *@Autor: Maxwell Rocha
  *@Param: year="ano corrente"
  **/
  function isLeap(year)  
  {  
    return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));    
  }  
  
  
  /**
  *Formata o um campo html com a m�scara informada pelo usu�rio.
  *@autor: Maxwell
  *@param: campo(objeto html), mask(m�scara), event(Evento do obj). 
  *@exemplo: onkeypress="return formata(this, '???.???.???-??', event)" - adiciona automaticamente a m�scara de cpf.
  *@observacao:O caracter "?" define que s� ser� permitido n�meros
  *            O caracter "!" define que � permitido qualquer caracter
  *
  **/
  function formata(campo, mask, evt) {
	  
	  if(document.all) { // Internet Explorer
	     key = evt.keyCode; }
	     else{ // Nestcape
	        key = evt.which;
	      }

	 if (key == 8) {
	 return true;
	 }

	  string = campo.value;  
	  i = string.length;

	  if (i < mask.length) {
	   if (mask.charAt(i) == '?') {
	        return (key > 47 && key < 58);
	       } else {
	        if (mask.charAt(i) == '!') {  return true;  }
	    for (c = i; c < mask.length; c++) {
	          if (mask.charAt(c) != '?' && mask.charAt(c) != '!')
	          campo.value = campo.value + mask.charAt(c);
	       else if (mask.charAt(c) == '!'){
	                 return true;
	        } else {
	          return (key > 47 && key < 58);
	           }
	        }
	     }
	   } else return false;
	 }
  
  /**
  *Fun��o respons�vel por escrever somente n�meros nas caixas de texto.
  *@autor: Maxwell
  *@param: evento
  *@exemplo: onkeypress='return SomenteNumero(event)'
  **/
  function SomenteNumero(e){
	    var tecla=e.which?e.which:e.keyCode;
	    if((tecla > 47 && tecla < 58)) return true;
	    else{
	    if (tecla != 8 && tecla != 9) return false;
	    else return true;
	    }
	}
	 
	 

  /**
   *Fun��o para "pintar" as linhas de uma lista com cores (classes) alternadas.
   *@autor: rosato
   *@param: sBusca - string de busca de elementos DOM. Ex: "#id .classe"
   *@param: aClasses - lista de classes a serem alternadas 
   *@exemplo: 
   *	<table id="tabela" ...
   *		<tr><th>Cabe��rio<th></tr>
   *		<tr class="zebra"><td>Linha 1</td></tr>
   *		<tr class="zebra"><td>Linha 2</td></tr>
   *		<tr class="zebra"><td>Linha 3</td></tr>
   *		<tr class="zebra"><td>Linha 4</td></tr>
   *		<tr class="zebra">(...)</tr>
   *	</table>
   *	para este caso, defina as classes "par" e "impar" no CSS e fa�a a chamada: 
   *
   *		listaZebrada('#tabela .zebra', ['par', 'impar']);
   *
   **/
  function listaZebrada(sBusca, aClasses)
  {
      var idx = 0;
	  $(sBusca).each(
		function(index)
		{
			if ($(this).is(':visible'))
			{
				$(this).addClass( aClasses[(idx++%aClasses.length)] );
			}
		}
	  );
  }

  // http://blog.vishalon.net/javascript-getting-and-setting-caret-position-in-textarea
  function getCaretPosition (ctrl) {
		// IE < 9 Support
		if (document.selection) {
			ctrl.focus();
			var range = document.selection.createRange();
			var rangelen = range.text.length;
			range.moveStart ('character', -ctrl.value.length);
			var start = range.text.length - rangelen;
			return {'start': start, 'end': start + rangelen };
		}
		// IE >=9 and other browsers
		else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
			return {'start': ctrl.selectionStart, 'end': ctrl.selectionEnd };
		} else {
			return {'start': 0, 'end': 0};
		}
	}


	function setCaretPosition(ctrl, start, end) {
		// IE >= 9 and other browsers
		if(ctrl.setSelectionRange)
		{
			ctrl.focus();
			ctrl.setSelectionRange(start, end);
		}
		// IE < 9
		else if (ctrl.createTextRange) {
			var range = ctrl.createTextRange();
			range.collapse(true);
			range.moveEnd('character', end);
			range.moveStart('character', start);
			range.select();
		}
	}