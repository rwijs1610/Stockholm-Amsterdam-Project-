<?php

$env = parse_ini_file(__DIR__ . '/../.env');

$host = $env['DB_HOST'];
$user = $env['DB_USER'];
$password = $env['DB_PASSWORD'];
$database = $env['DB_NAME'];

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("verbinding mislukt: " . $conn->connect_error);
}
?>