<?php
	$client_id = '9d8a811fa728491f96385a90358e2343'; 
$client_secret = '9d5cf461a2c24ad2847d0544951b20c8';
	$query = array(
	      'grant_type' => 'authorization_code',
	        'code' => 'AQAAAAAZOwojAAOBfoxGgqss3knnhhe18tTmm7s',
		      'client_id' => $client_id,
		        'client_secret' => $client_secret
			    );
	$query = http_build_query($query);

	    $header = "Content-type: application/x-www-form-urlencoded";
	$opts = array('http' =>
	      array(
		        'method'  => 'POST',
			      'header'  => $header,
			        'content' => $query
				      ) 
				      );
	    $context = stream_context_create($opts);
	    $result = file_get_contents('https://oauth.yandex.ru/token', false, $context);
		    $result = json_decode($result);
		    echo $result->access_token;

?>
