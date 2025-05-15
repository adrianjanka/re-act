<?php

// Fehleranzeigen aktivieren
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// save_colors.php
header('Content-Type: application/json');
require 'db_config.php';

// Roh-Payload einlesen und dekodieren
$input = file_get_contents('php://input');
$data  = json_decode($input, true);
if (!$data || !isset($data['farbe'])) {
    http_response_code(400);
    exit;
}

// error_log('data: ' . print_r($data, true));


$name  = $data['name'] ?? null;
$farbe = json_encode($data['farbe'], JSON_UNESCAPED_UNICODE);

// error_log('farbe: ' . $farbe);

try {
    $stmt = $pdo->prepare("
        INSERT INTO re_act_colors (name, farbe)
        VALUES (:name, :farbe)
    ");
    $stmt->execute([
        ':name'  => $name,
        ':farbe' => $farbe
    ]);
    http_response_code(201);
} catch (Exception $e) {
    http_response_code(500);
}