	<?php
		include ('content/conexion.php');
		if(isset($_POST["username"]) && isset($_POST["password"])){
			$db = new conexion();
			$pquery = "SELECT * FROM empleados WHERE usuario = '".$_POST["username"]."' and contrasena = '".$_POST["password"]."'";
			$res = $db->ejecutar($pquery);
			if($row = mysql_fetch_array($res) > 0){
				session_start();
				$_SESSION['username'] = $_POST['username'];
				header("index.php");
			}else{
				echo  '<script language="javascript">alert("Error en las credenciales");</script>'; 
			}
			include('login.php');
		}
	?>