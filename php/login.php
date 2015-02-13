<?php 
	session_start();
	if(isset($_SESSION['username'])){
		#header('Location:index.php?page=hacerventa');
	}else {
		echo "<div class = 'container'>
		 <link rel='stylesheet' href='css/stylepass.css'>
	       <link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
	       <link href='http://fonts.googleapis.com/css?family=Pacifico&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
			<center>
				<h1>
					Login Users 
				</h1>
				<form action='request.php' method = 'post'>
					<input type = 'text' name = 'username' placeholder='Username' required><br>
					<input type = 'password' name = 'password' placeholder = 'Password' required>
					<button>Iniciar secion</button>
				</form>
				<form action='registro.php' method = 'post'>
					<button>Registrarse</button>
				</form>
			</center>
		</div>";

	}
?>

	