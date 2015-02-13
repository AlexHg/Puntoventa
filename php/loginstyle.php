<?PHP
echo '
<head>
<meta charset="UTF-8">
</head>
	<link rel="stylesheet" type="text/css" href="css/login.css">
	<link rel="stylesheet" href="dist/fonts/foundation-icons.css">
		<link rel="stylesheet" type="text/css" href="dist/css/foundation.css" />
	<script src="dist/js/jquery.js"></script>
    <script src="dist/js/modernizr.js"></script>
	<style type="text/css">
		/*ESCONDER CAJAS POR MEDIO DE CLASES*/
		body .invisible{display:none;}
	    body .visible{display:display;}
	    body .visiblei{display:display !important}
		/*REGLAS: class="va1-var2"
		var1= visible || hidden; (mostrar || esconder)
		var2= phone || tablet || desktop; (telefono || tableta || PC)
		*armar convinacion adecuada* */
	    .hidden{display:none;visibility:hidden}
	    .visible-phone{display:none !important}
	    .visible-tablet{display:none !important}
	    .hidden-desktop{display:none !important}
	    .visible-desktop{display:inherit !important}
	    @media (min-width: 768px) and (max-width: 979px){.hidden-desktop{display:inherit !important}
	    .visible-desktop{display:none !important}
	    .visible-tablet{display:inherit !important}
	    .hidden-tablet{display:none !important}}
	    @media (max-width: 767px){.hidden-desktop{display:inherit !important}
	    .visible-desktop{display:none !important}
	    .visible-phone{display:inherit !important}
	    .hidden-phone{display:none !important}}
	</style>
	<header></header>
	<section id="indexLogIn">
		<div class="row" align="center">
			<div class="contenedorX">
				<style type="text/css">
				@media (min-width: 568px){
					.contOfLogin{ width: 442px !important }
				}
				</style>
				<div class="cont-4 contOfLogin columna ">
					<div id="logoIndexApp">
						<div id="icontainer"><i class="fi-cloud"></i></div><h2>'.$titulosoft.'</h2>
					</div>
				</div><br>
				<div class="cont-4 panel columna contOfLogin">
					<form action="'.request().'" method = "post"> <!--method="post" action="login.php" id="login"-->
						<!-- name = user-login  -->
						<label for="user"><i class="fi-torso-business"></i></label> <input id="username" name="username" type="text" required placeholder="Nombre de usuario"><br>
						<!-- name = pass-login  -->
						<label for="pass"><i class="fi-lock"></i></label> <input id="password" name="password" type="password" required placeholder="Contraseña"><br>
						<div id="contCheck">
						
							<span for="checkbox1" ><h4><small style="padding-top: 5px;">Tu sesión permanecerá abierta hasta que salgas de ella.</small></h4></span><br>
						</div>
						<div><input type="submit" class="button alert" value="login"></div>
						<br>
					</form>	
				</div>
				<div class="cont-12"></div>
				<style type="text/css">
					#boton1, #boton2 {
						width: 49%;
					}
					#contOfLogin{
						position: relative;
						margin-top: -45px;
					}
				</style>
				<div class="cont-4 panel columna contOfLogin" id="contOfLogin">
					<a href="#" data-reveal-id="myModal" class="radius button" id="boton1">Example Modal…</a>
					<div id="myModal" class="reveal-modal" data-reveal>
					  <h2>Awesome. I have it.</h2>
					  <p class="lead">Your couch.  It is mine.</p>
					  <p>Im a cool paragraph that lives inside of an even cooler modal. Wins</p>
					  <a class="close-reveal-modal">&#215;</a>
					</div>

					<a href="#" data-reveal-id="myModal2" class="radius button success" id="boton2">Example Modal…</a>
					<div id="myModal2" class="reveal-modal" data-reveal>
					  <h2>Awesome. I have it.</h2>
					  <p class="lead">Your couch.  It is mine.</p>
					  <p>Im a cool paragraph that lives inside of an even cooler modal. Wins</p>
					  <a class="close-reveal-modal">&#215;</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</body>
    <script src="dist/js/foundation.min.js"></script>
    <script src="dist/js/foundation/foundation.clearing.js"></script>
    <script>
    	$(document).foundation();
    </script>

	';
?>