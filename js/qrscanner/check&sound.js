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
	if(id_producto != false && cant_producto != false){
		//suma el valor del contador
		contador = contador+1;
		//calcula el precio del o los productos del mismo id (precio.uidad * cantidad)
		precio_producto[contador] = parseInt($('#precioproducto').val()*cant_producto);
		//toma el valor anterior de la tabla
		var tabla_anterior = $('#carritotabla').html();
		//introduce el valor del producto nuevo pero no sin antes sumar los anteriores
		$('#carritotabla').html(tabla_anterior+"<tr id='fila"+contador+"'><td id='id"+contador+"' class='idpr'>"+id_producto+"</td><td id='nombre"+contador+"'class='hidden-480 nombrepr'>"+nombre_producto+"</td><td id='fecha"+contador+"'class='fechapr hidden-phone'>"+fecha_hora+"</td><td id='cantidad"+contador+"' class'cantpr>"+cant_producto+"</td><td>$<span id='precio"+contador+"' class='preciopr'>"+precio_producto[contador]+"</td><td style='text-align:center;' class='deletebutton'><button id='delete"+contador+"' onclick='delet("+contador+")' class='btn btn-mini btn-danger'><i class='icon-trash bigger-120'></i></button></td></tr>");
		//se agrega un valor al array en la posicion x (x = al valor del contador ) 
		total = parseInt(total) + parseInt(precio_producto[contador]);
		$('#totalprecio').html(""+total);
		$('#total_neto_iva').html($('#totalprecio').html());
		var iva = total*0.16;
		var neto = total-iva;
		$('#totaliva').html(""+iva);
		$('#totalneto').html(""+neto);
		//$('#fila'+num_contador_delete).remove();
	}else {alert("Recuerde escanear o escribir el id de su producto antes de intentar agregarlo al carrito.");}
});


//Elimina el articulo del cual se haya presionado el boton para elminar
var num_filas_eliminadas = []; //en esta cadena se guardaran los valores que no se tomaran en cuenta
var cont_num_fil_el = 0;
function delet(num_contador_delete){
	var producto_a_restar = precio_producto[num_contador_delete];
	total = total-producto_a_restar;
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
}

//Elabora un ticket y lo imprime.
//primero decide si el importe es mayor que el total y que el total sea mayor a 0, para poder proceder
//despues calcula el cambio restando el importe del total y multiplicandolo por -1 para hacerlo positivo
$('#realizar_venta').click(function(){if($('#importe_input').val() >= total && total > 0 ){
	$('#importe_regis').html(""+$('#importe_input').val());
	var cam = total - $('#importe_input').val();
	var cambio = -1*cam;
	$('#cambio').html(""+cambio);
	if(confirm('Se ha generado un ticket. ¿Desea imprimirlo?')){
		var ficha = $('#comprascontainer').html();
		var totales_ficha = $('#totales').html();
		var ventimp=window.open(' ','popimpr');
		var head = '<h1>Mi Empresa/Negocio <small>'+""+new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear()+" - "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds()+""+'</small></h1><br><br>';
		var cssstyle = '<link href="assets/css/bootstrap.min.css" rel="stylesheet" /><link href="assets/css/bootstrap-responsive.min.css" rel="stylesheet" /><link rel="stylesheet" href="assets/css/font-awesome.min.css" /><link rel="stylesheet" href="assets/css/ace.min.css" /><link rel="stylesheet" href="assets/css/ace-responsive.min.css" /><link rel="stylesheet" href="assets/css/ace-skins.min.css" />';
		var jscript = '<script src="js/jquery-1.11.2.min.js"></script><script>$(".deletebutton").remove(); $(".idpr").remove();</script>';
		ventimp.document.write(cssstyle+'<div style="width: 8cm !important;">'+head+ficha+'<div class="span5">'+totales_ficha+'</div></div>'+jscript);
		ventimp.document.close();
		ventimp.print();
		ventimp.close();

		alert('Gracias por su compra, vuelva pronto!');
		location.reload();
	}	
}else{alert('Recuerde que debe ingresar un importe mayor o igual al total y tiene que haber productos en el carrito antes de intentar proceder.');}});