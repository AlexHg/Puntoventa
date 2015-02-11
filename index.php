<?php 
	include('topskin.html');
	$url = ''.$_SERVER["REQUEST_URI"].'';
	include(url($url));
	include('js/chat.html');
	echo '<div width="100%" height="100px"></div>';
	include('bottomskin.html');

	function url($url){
		switch($url){
			case '/puntoventa/index.php?page=hacerventa':echo '<script src="js/qrscanner/html5-qrcode.min.js"></script>';
				echo '<script>
						document.getElementById("phacerventa").className = "active";
					  </script>';
				return 'content/hacerventa.html';
				break;
			case '/puntoventa/index.php?page=estadisticas':
				echo '<script>
						document.getElementById("pestadisticas").className = "active";
					  </script>';
				return 'content/estadisticas.html';
				break;
			//Sub-categoria de productos
			case '/puntoventa/index.php?page=productos/inventario':
				echo '<script>
						document.getElementById("pinventario").className = "active";
						document.getElementById("pproductos").className = "active";
					  </script>';
				return 'content/inventario.html';
				break;
			case '/puntoventa/index.php?page=productos/ventaslocales':
				echo '<script>
						document.getElementById("pventaslocales").className = "active";
						document.getElementById("pproductos").className = "active";
					  </script>';
				return 'content/ventaslocales.html';
				break;
			case '/puntoventa/index.php?page=productos/ventasonline':
				echo '<script>
						document.getElementById("pventasonline").className = "active";
						document.getElementById("pproductos").className = "active";
					  </script>';
				return 'content/ventasonline.html';
				break;
			case '/puntoventa/index.php?page=productos/devoluciones':
				echo '<script>
						document.getElementById("pdevoluciones").className = "active";
						document.getElementById("pproductos").className = "active";
					  </script>';
				return 'content/devoluciones.html';
				break;
			case '/puntoventa/index.php?page=productos/traspasos':
				echo '<script>
						document.getElementById("ptraspasos").className = "active";
						document.getElementById("pproductos").className = "active";
					  </script>';
				return 'content/traspasos.html';
				break;
			//fin subcategoria de productos
			case '/puntoventa/index.php?page=empleados':
				echo '<script>
						document.getElementById("pempleados").className = "active";
					  </script>';
				return 'content/empleados.html';
				break;
			case '/puntoventa/index.php?page=proveedores':
				echo '<script>
						document.getElementById("pproveedores").className = "active";
					  </script>';
				return 'content/proveedores.html';
				break;
			case '/puntoventa/index.php?page=clientes':
				echo '<script>
						document.getElementById("pclientes").className = "active";
					  </script>';
				return 'content/clientes.html';
				break;
			case '/puntoventa/index.php?page=calendario':
				echo '<script>
						document.getElementById("pcalendario").className = "active";
					  </script>';
				return 'content/calendario.html';
				break;
			case '/puntoventa/index.php':
				echo '<script>window.location = "index.php?page=hacervental";</script>'; 
				break;
			default: 
				include('content/error-404.html');
				echo '
					<script>
						var i = 5;
						setInterval(function(){ document.getElementById("seci").innerHTML = ""+i--+""; }, 1000);
						setTimeout(function(){window.location = "index.php?page=hacerventa"}, 5000);
					</script>
				';

				echo $url;
				break;
		}
	}
?>