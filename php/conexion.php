<?php
	include('config_sql.php');
	class conexion{
		private $host;
		private $user;
		private $pass;
		private $db;
		private $link;
		private $_instance;
		public function __construct(){
			$this->host = HOST;
			$this->user = USER;
			$this->pass = PASS;
			$this->db = DB;
			$this->conectar();
		}
		public function conectar(){
			$this->link = mysql_connect($this->host, $this->user, $this->pass);
			mysql_select_db($this->db,$this->link);
			@mysql_query("SET NAMES 'utf8'");
		}
		public function ejecutar($sql){
			$this->result=mysql_query($sql,$this->link);
			return $this->result;
		}
		public function close(){
			mysql_close($this->link);
		}
	}
?>