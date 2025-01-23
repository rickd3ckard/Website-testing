<?php
header('Content-Type: application/json'); 

$directory = './Level1/'; 
$files = scandir($directory);
$result = array();

foreach ($files as $file) {
    if ($file != '.' && $file != '..' && !is_dir($directory . $file)) { 
        $result[] = $file;
    }
}

echo json_encode($result);
?>