/*El siguiente script tiene diversas funciones, todas en la misma pag: 'Hacer venta', cuando
Se invoca a la camara para poder encontrar un codigo qr y este encuentra una cioncidencia
osea un codigo qr que el script 'qrscanner.js' pueda descifrar, se reproducira un sonido y 
se auto completaran los inputs de 'informacion producto' con la informacion que se baje de la
base de datos con la coincidencia de id;

En este script tambien esta ejecutandose el boton de 'agregar' al carrito, toma los valores de
los inputs anteriores y los mete a una tabla, suma los valores de ese y los anteriores productos
para sacar un total;

Easando a la parte de 'realizar venta' como boton, este ejecuta la parte del script que calcula
el importe del cliente y se le resta al costo, se multiplica por -1 (pues el importe debe ser mayo
por lo que el resultado queda negativo) y saca el cambio que debe de dar el cajero al cliente*/

var sound_access = true;
$(document).ready(function () {
	//la funcion html_qrcode busca coincidencias de patrones (codigo QR) cada 0.5 segundos
	$('#reader').html5_qrcode(function (data) {
		//Accion producida al detectar codigo QR.
		//-data: es el valor que devuelve el lector QR; es el mensaje oculto.
		$('#qrcode').val(data);
		//Agrega nombre del producto
		$('#nombreproducto').val('nombreproducto');
		//Asigna el valor de 1 a la cantidad del producto
		$('#cantidadproducto').val(1);
		//agrega el precio al producto
		$('#precioproducto').val(50.00);
		$('#descripcionproducto').val('esta es la descripcion asignado al producto con el id '+$('#qrcode').val());
		$('#addarticle').focus();
		if(sound_access){
			//reproduce el sonido de check
			$.playSound('sounds/qrscanner/check');
			sound_access = false;
			change();
		}
		//Establece que debe pasar 1.5 segundos para el proximo sonido.
		setTimeout(function(){sound_access = true;}, 1500);
	},
	function (error) {
		//en caso de error
		console.log(error);
	}, 
	function (videoError) {
		//en caso de error de video
		console.log(videoError);
	});
});

//bind valida multiples eventos a la vez, cualquier cosa de ellas que pase ejecuaran el codigo
$("#qrcode").bind("change paste keypress",function(){change()});
function change(){
	//Codigo jquery con el metodo de prograacion ajax donde, por medio de este, se pasa el id del producto hacia php y este se encarga de buscar una coincidencia en la base de datos, devolviendo hacia el mismo php una serie de variables con las caracteristicas del producto.
	
	//var phpnombre_producto, phpprecio_producto, phpdescripcion_producto, phpstock_producto;
	var elid = $("#qrcode").val();
	//alert($("#qrcode").val());
	//alert("cambio!");
	var idGo = {'elid' : elid };
	$.ajax({
	    data:  idGo,
	    url:   'php/datosproducto.php',
	    type:  'post',
	    beforeSend: function () {
	        //$("#resultado").html("Procesando, espere por favor...");
	    },
		success:  function (response) {
			//Aqui, jquery recibe una cadena de texto generada desde php con las variables generadas a partir de los datos recibidos de la base de datos y este script de respuesta se encarga de convertir esa cadena, desmenusandola a detalle, en variables aparte segun la gerarquia de contenido anteriormente programada.
			var nombre = "";
			var precio = "";
			var descripcion = "";
			var stock = "";
			var a = 1;
			var b = 0;
			var c = 0;
			var d = 0;
			var tamano = response.length-1;
		    for(a; a < response.length; a++){
		    	if(response[a] != "[" || response[a] != "]"){
		    		nombre = "" + nombre + response[a] + "";
		    	}
		    	if (response[a] == "]") {
		    		b = a+2;
		    		a = response.length;
		    	};
		    }
		    for(b; b < response.length; b++){
		    	if(response[b] != "[" || response[b] != "]"){
		    		precio = "" + precio + response[b] + "";
		    	}
		    	if (response[b] == "]") {
		    		c = b+2;
		    		b = response.length;
		    	};
		    }
		    for(c; c < response.length; c++){
		    	if(response[c] != "[" || response[c] != "]"){
		    		descripcion = "" + descripcion + response[c] + "";
		    	}
		    	if (response[c] == "]") {
		    		d = c+2;
		    		c = response.length;
		    	};
		    }
		    for(d; d < response.length; d++){
		    	if(response[d] != "[" || response[d] != "]"){
		    		stock = "" + stock + response[d] + "";
		    	}
		    }
		    //elimina los corchetes al final de cada una de las cadenas.
		    nombre = nombre.replace("]", "");
		    precio = precio.replace("]", "");
		    descripcion = descripcion.replace("]", "");
		    stock = stock.replace("]", "");
		    $("#nombreproducto").val(nombre);
		    $("#precioproducto").val(precio);
		    $("#descripcionproducto").val(descripcion);
		    $("#stockproducto").html(stock);
		    $("#cantidadproducto").val(1)
		    $('#addarticle').focus();
		}
	});
}

(function($){
	$.extend({
    	playSound: function(){
    		//Agrega el sonido al html para posteriormente reproducirlo.
    		return $("<embed src='"+arguments[0]+".mp3' hidden='true' autostart='true' loop='false' class='playSound'>" + "<audio autoplay='autoplay' style='display:none;' controls='controls'><source src='"+arguments[0]+".mp3' /><source src='"+arguments[0]+".ogg' /></audio>").appendTo('body');
    	}
	});
})(jQuery);  

//Agrega el articulo al carrito cuando se toca el boton 'Agregar'
var id_producto, nombre_producto, fecha_hora, cant_producto, precio_producto;
var contador = -1;
var precio_producto = [];
var total = 0.00;
var n_productos = 0;
$('#addarticle').click(function(){
	var cero_ms = "";
	var cero_da = "";
	var cero_hr = "";
	var cero_mn = "";
	var cero_sg = "";
	if ((new Date().getMonth()+1) < 10) {cero_ms = "0";}if (new Date().getDate() < 10) {cero_da = "0";}if (new Date().getHours() < 10) {cero_hr = "0";}if (new Date().getMinutes() < 10) {cero_mn = "0";}if (new Date().getSeconds() <10) {cero_sg = "0";}
	//toma los valores de el formulario
	id_producto = $('#qrcode').val();
	nombre_producto = $('#nombreproducto').val();
	fecha_hora = ""+new Date().getFullYear()+"/"+cero_ms+(new Date().getMonth()+1)+"/"+cero_da+new Date().getDate()+" - "+cero_hr+new Date().getHours()+":"+cero_mn+new Date().getMinutes()+":"+cero_sg+new Date().getSeconds()+"";
	cant_producto = parseInt($('#cantidadproducto').val());
	if(id_producto != false && cant_producto != false && nombre_producto!= false && $('#precioproducto').val() != "00.00"){
		/*for(var conti = 0; conti < n_productos; conti++ ){
			if(id_producto == $("#carritotabla tr:nth-child("+conti+") td:nth-child(1)").html()){
				$("#carritotabla tr:nth-child("+conti+") td:nth-child(4)").html(parseInt($("#carritotabla tr:nth-child("+conti+") td:nth-child(4)").html())+cant_producto);
			}
		}*/ //Este pedaso de script(que se encuentra comentado) intenta, fallidamente, comparar si en la tabla inferior al boton #addarticle, se encuentra un id igual al producto a agregar, siendo el caso se sumaria la cantidad añadida en este momento con la anteriormente impresa en la tabla.
		n_productos++;
		//suma el valor del contador
		contador = contador+1;
		//calcula el precio del o los productos del mismo id (precio.unidad * cantidad)
		precio_producto[contador] = parseFloat($('#precioproducto').val()*cant_producto);
		//toma el valor anterior de la tabla
		var tabla_anterior = $('#carritotabla').html();
		//introduce el valor del producto nuevo pero no sin antes sumar los anteriores
		$('#carritotabla').html(tabla_anterior+"<tr id='fila"+contador+"'><td id='id"+contador+"' class='idpr'>"+id_producto+"</td><td id='nombre"+contador+"'class='hidden-480 nombrepr'>"+nombre_producto+"</td><td id='fecha"+contador+"'class='fechapr hidden-phone'>"+fecha_hora+"</td><td id='cantidad"+contador+"' class'cantpr>"+cant_producto+"</td><td>$<span id='precio"+contador+"' class='preciopr'>"+precio_producto[contador]+"</td><td style='text-align:center;' class='deletebutton'><button id='delete"+contador+"' onclick='delet("+contador+")' class='btn btn-mini btn-danger'><i class='icon-trash bigger-120'></i></button></td></tr>");
		//se agrega un valor al array en la posicion x (x = al valor del contador ) 
		total = parseFloat(total) + parseFloat(precio_producto[contador]);
		$('#totalprecio').html(""+total);
		$('#total_neto_iva').html($('#totalprecio').html());
		var iva = total*0.16;
		var neto = total-iva;
		$('#totaliva').html(""+iva);
		$('#totalneto').html(""+neto);
		//$('#fila'+num_contador_delete).remove();
		$("#cont-productos").html(""+(n_productos)+"");
	}else {alert("Recuerde escanear o escribir el id de su producto antes de intentar agregarlo al carrito.");}
});


//Elimina el articulo del cual se haya presionado el boton para elminar
var num_filas_eliminadas = []; //en esta cadena se guardaran los valores que no se tomaran en cuenta
var cont_num_fil_el = 0;
function delet(num_contador_delete){
	var producto_a_restar = precio_producto[num_contador_delete];
	total = total-producto_a_restar;
	n_productos--;
	$('#totalprecio').html(""+total);
	$('#total_neto_iva').html($('#totalprecio').html());
	var iva = total*0.16;
	var neto = total-iva;
	$('#totaliva').html(""+iva);
	$('#totalneto').html(""+neto);
	$('#fila'+num_contador_delete).remove();
	//El siguiente array guarda los numeros de las filas que no deben ser tomados en cuenta, cont_num_fil_el es el espacio del array en el que debe ser guardado y luego suma mas 1
	num_filas_eliminadas[cont_num_fil_el] = num_contador_delete;
	cont_num_fil_el++;
	$("#cont-productos").html(""+(n_productos)+"");
}

//Elabora un ticket y lo imprime.
//primero decide si el importe es mayor que el total y que el total sea mayor a 0, para poder proceder
//despues calcula el cambio restando el importe del total y multiplicandolo por -1 para hacerlo positivo
var actualizar = 0;
$('#realizar_venta').click(function(){if($('#importe_input').val() >= total && total > 0 ){
	$('#importe_regis').html(""+$('#importe_input').val());
	var cam = total - $('#importe_input').val();
	var cambio = -1*cam;
	$('#cambio').html(""+cambio);
	//Esta parte de la funcion envia una respuesta al servidor mediante el metodo de programacion ajax, llamando el archivo proceso.php que se encarga de hacerlo.
	var valorcont = $("#cont-productos").html();
	if(parseInt(valorcont) != 0 || parseInt(valorcont) != "0"){
		var i = parseInt(valorcont) - 1;
	    var parametro = "";
	    //Jquery envia una cadena con todos los parametros de cada uno de los productos, despues, php, se encargara de desmenusar la cadena de texto inteligente mente para extraer los datos del array.
	    for(var fi = 0; fi <= i; fi++){
	    	var idprod_parametro = $("#carritotabla tr:nth-child("+(fi+1)+") td:nth-child(1)").html();
	    	var fecha_parametro = $("#carritotabla tr:nth-child("+(fi+1)+") td:nth-child(3)").html();
	    	var cantprod_parametro = $("#carritotabla tr:nth-child("+(fi+1)+") td:nth-child(4)").html();
	    	parametro = ""+parametro+"["+idprod_parametro+","+fecha_parametro+","+cantprod_parametro+"]";
	    	cantidad_parametro = valorcont;
	    	idcliente_parametro = $("#clienteid").val();
	    }
	    var dataGo = {
	    	'parametro' : parametro,
	    	'cantidad_parametro' : cantidad_parametro,
	    	'idcliente_parametro' : idcliente_parametro
	    };
	    $.ajax({
	        data:  dataGo,
	        url:   'php/enviarventa.php',
	        type:  'post',
	        beforeSend: function () {
	            $("#resultado").html("Procesando, espere por favor...");
	        },
		    success:  function (response) {
			    $("#resultado").html(response);
			    //una vez recibida la respuesta del php exitosamente, refrescamos la pagina
			    location.reload();
			}
		});
	}
	//fin de la respuesta al servidor.
	//Generador del ticket con una funcion javascript e impresion
	if(confirm('Se ha generado un ticket. ¿Desea imprimirlo?')){
		var ficha = $('#comprascontainer').html();
		var totales_ficha = $('#totales').html();
		var ventimp=window.open(' ', "_blank", "toolbar=yes, scrollbars=yes, width=1000, height=900 ");
		var head = '<h1 align="center">Mi Empresa/Negocio <br><small>'+""+new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear()+" - "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds()+""+'</small></h1><br>';

		var mensaje = 'Gracias por comprar en mi empresa/negocio, vuelve pronto! <br>';
		var vendedor = usuario_session;
		var compradorId = $("#clienteid").val();

		var infoCompraV = '<span >Vendedor: '+vendedor+'';
		if($("#clienteid").val()){infoCompraV=''+infoCompraV+' &nbsp;&nbsp;Cliente ID: '+compradorId+'';} 
		infoCompraV =  ''+infoCompraV+'</span>';

		var cssstyle = '<head><title>Imprimir factura</title></head><link href="assets/css/bootstrap.min.css" rel="stylesheet" /><link href="assets/css/bootstrap-responsive.min.css" rel="stylesheet" /><link rel="stylesheet" href="assets/css/font-awesome.min.css" /><link rel="stylesheet" href="assets/css/ace.min.css" /><link rel="stylesheet" href="assets/css/ace-responsive.min.css" /><link rel="stylesheet" href="assets/css/ace-skins.min.css" />';
		var jscript = '<script src="js/jquery-1.11.2.min.js"></script><script>$(".deletebutton").remove(); $(".idpr").remove();</script>';
		ventimp.document.write(cssstyle+'<div style="width: auto !important;">'+head+mensaje+'<br>'+infoCompraV+ficha+'<div class="span5">'+totales_ficha+'</div></div>'+jscript);
		ventimp.document.close();
		ventimp.print();
		ventimp.close();

		alert('Gracias por su compra, vuelva pronto!');
	}
}else{alert('Recuerde que debe ingresar un importe mayor o igual al total y tiene que haber productos en el carrito antes de intentar proceder.');}});