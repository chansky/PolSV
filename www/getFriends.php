<?php 
$path = session_save_path('../');session_start(); ?>

<?php 

include("config.php");
date_default_timezone_set('UTC');


if($_SERVER["REQUEST_METHOD"] == "GET") {
    
    $username = $_SESSION['login_user'];
    
    //get user id
    //set up a follower class:
	   class user {
	       public $username = "";
	       public $fullname  = "";
	       
  	    }
    
    $followar = array();   
    
    $sql = " SELECT u_id FROM User WHERE fullname LIKE '%$username%' or username LIKE '%$username%' ";
    
    $result = mysql_query($sql);
    $uid = mysql_result($result, 0);
    $type = $_GET["type"];

   
    if($type == "followers") {
   	    $sql = "SELECT u_id1 FROM Follows WHERE u_id2 = '$uid'";
       	  
       	  $result = mysql_query($sql);
  	while($row = mysql_fetch_array( $result )) {
  	$tempFollower = new user();

  	$tempID=$row["u_id1"];
  	$sql = "SELECT username FROM User WHERE u_id='$tempID'";  
  	$tr = mysql_query($sql);
  	$tempUserName=mysql_result($tr, 0);
  	
  	$tempFollower->username =$tempUserName;
  	
  	
  	$sql = "SELECT fullname FROM User WHERE u_id='$tempID'";  
  	$tr = mysql_query($sql);
  	$tempFullName=mysql_result($tr, 0);
  	$tempFollower->fullname = $tempFullName;
  	
	array_push($followar, $tempFollower);
  	}  
    }
    else {
    	
       	  $sql = "SELECT u_id2 FROM Follows WHERE u_id1 = '$uid'";
       	  
       	  $result = mysql_query($sql);
  	while($row = mysql_fetch_array( $result )) {
  	$tempFollower = new user();
  	
  	$tempID=$row["u_id2"];
  	$sql = "SELECT username FROM `User` WHERE u_id='$tempID'";  
  	
  	$tr = mysql_query($sql);
  	$tempUserName=mysql_result($tr, 0);
  	$tempFollower->username =$tempUserName;

	array_push($followar, $tempFollower);
  	}
  }
  	echo json_encode($followar);
	//	json_encode($followers);
	//echo "var javascript_array = ". $followers . ";\n";
	
	
	//echo mysql_errno($bd) . ": " . mysql_error($bd) . "\n";
    	
}
?>