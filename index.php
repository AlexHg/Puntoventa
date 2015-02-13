<?php 
	$titulosoft = 'Punto Venta!!';
	$skin = 'skin-1'; // skin-1, skin-2, skin-3. para dejarlo default solo dejarlo en blanco

	$url = ''.$_SERVER["REQUEST_URI"].'';
	session_start();
	$conexion = session_status();	
	if(!isset($_SESSION["username"])){session_destroy();}

if(is_session_started()){
	include('content/template/topskin.html');
	include(url($url));
	echo "<div class='row-fluid'><div class='span12' style='height:100px'></div><div>";
	include('js/chat.html');
	include('content/template/bottomskin.html');
}else{
	if($url != '/puntoventa/index.php?page=login'){
		echo "<script>window.location ='index.php?page=login'</script>";
	}
	if(!isset($_SESSION["username"])){
	include("php/loginstyle.php");
	/*echo "<div class = 'container'>
			 <link rel='stylesheet' href='css/stylepass.css'>
		       <link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
		       <link href='http://fonts.googleapis.com/css?family=Pacifico&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
				<center>
					<h1>
						Login Users 
					</h1>
					<form action='".request()."' method = 'post'>
						<input type = 'text' name = 'username' placeholder='Username' required><br>
						<input type = 'password' name = 'password' placeholder = 'Password' required>
						<button>Iniciar secion</button>
					</form>
					<form action='registro.php' method = 'post'>
						<button>Registrarse</button>
					</form>
				</center>
		</div>";*/
	}
}
function is_session_started()
{
    if ( php_sapi_name() !== 'cli' ) {
        if ( version_compare(phpversion(), '5.4.0', '>=') ) {
            return session_status() === PHP_SESSION_ACTIVE ? TRUE : FALSE;
        } else {
            return session_id() === '' ? FALSE : TRUE;
        }
    }
    return FALSE;
}
// Example
function request(){
	include ('php/conexion.php');
	if(isset($_POST["username"]) && isset($_POST["password"])){
			$db = new conexion();
			$pquery = "SELECT * FROM empleados WHERE usuario = '".$_POST["username"]."' and contrasena = '".$_POST["password"]."'";
			$res = $db->ejecutar($pquery);
			if($row = mysql_fetch_array($res) > 0){
				session_start();
				$_SESSION['username'] = $_POST['username'];
				echo '<script>location.reload();</script>';
		}else{
			echo '<script language="javascript">alert("Error en las credenciales");</script>'; 
		}
	}
}
function url($url){
	switch($url){
		case '/puntoventa/index.php?page=hacerventa':
			echo '<script src="js/qrscanner/html5-qrcode.min.js"></script>';
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
		case '/puntoventa/index.php?page=login':
			echo '<script>window.location = "index.php?page=hacerventa";</script>'; 
			break;
		case '/puntoventa/index.php':
			echo '<script>window.location = "index.php?page=hacerventa";</script>'; 
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