<?php
header('Content-Type: application/json'); //response to be returned as JSON

$directory = './Level1/'; //target folder
$files = scandir($directory);
$result = array();

foreach ($files as $file) {
    if ($file != '.' && $file != '..' && !is_dir($directory . $file)) { //. is for current dir & .. is for sub dirs (we exclude both)
        $result[] = $file;
    }
}

echo json_encode($result);
?>