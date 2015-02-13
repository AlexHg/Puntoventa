<?php
	session_start();
	$_SESSION['username']  = array();
	session_destroy();
	header("Location:../index.php");
?>