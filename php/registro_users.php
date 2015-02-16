<?php
include('conexion.php');
$db = new conexion();
$nombre = $_POST['nombre_nusuario'];
$usuario = $_POST['nick_nusuario'];
$contrasenas = $_POST['pass'];
$contrasena_as = $_POST['pass2'];
$edad = $_POST['edad_nunsuario'];
$telefono = $_POST['telefono'];
$antiguedad = $_POST['date_register'];
$pais = $_POST['pais'];
$estado = $_POST['estado'];
$ciudad = $_POST['ciudad'];
$direccion = $_POST['direccion1'];
$cp = $_POST['cp'];
$img = $_POST['img'];
$id_suc = $_POST['sucursal'];
$coment = $_POST['notas_nusuario'];
$id_pemiso = $_POST['permisos'];
$direccion_tot = $pais.", ".$estado.", ".$ciudad.", ".$direccion.", ".$cp;
if($contrasenas != $contrasena_as){
	echo '
		<script type="text/javascript" charset="utf-8" async defer>
		alert("Las contraseñas ingresadas no coinciden");
		</script>
	';
}else{
	$sql = "INSERT INTO empleados(nombre,usuario,contrasena,edad, antiguedad, direccion, url_img, id_sucursal, comentarios, id_permiso, telefono) VALUES ('$nombre', '$usuario', $contrasenas, '$edad', '$antiguedad', '$direccion_tot', '$img', '$id_suc', '$coment', 'id_permiso','$telefono')";
	$db->ejecutar($sql);
	$db->close();
	echo "

		<script>window.location = '../index.php?page=empleados'</script>

	";
}
?>