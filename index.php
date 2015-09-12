<?php

// $login = $_GET["login"];
// $logout = $_GET["logout"];


// data transfered to db, image is uploaded


  
       



     $_phone1 = $_GET["phone1"];
	 //$final = "%".$_phone1."%";
	 
	  $shop_id_num =  shop_id($final);
  login();
   











function shop_id($number){
	 $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "darul";
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
		
		 $sql = "SELECT id FROM test WHERE json_dump LIKE '$number'";
        $result = $conn->query($sql);
        $conn->close();
        if ($result->num_rows > 0) {
            // output data of each row
            while ($row = $result->fetch_assoc()) {
                
                return $row["id"];
            }
        } else {
            return -1;
        }
}
      



 if (isset($_GET['login'])) {
	echo "Login" . "<br/>";
 login();
}
 
 
if (isset($_GET['logout'])) {
	echo "Logout" . "<br/>";
   logout();
}

function login() {
	setcookie("login", true);
	setcookie("username", "Vicky");
}

function logout() {
	setcookie("login", null, -1);
	setcookie("username", null, -1);
	unset($_COOKIE['login']);
	unset($_COOKIE['username']);
}

if (isset($_COOKIE['login'])) {
	echo "Hey ".$_COOKIE['username']." <br/>";
} else {
	echo "You are logged out "."<br/>";
}
?>

