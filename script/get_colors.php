<?php
header('Content-Type: application/json');
require 'db_config.php';

try {
    $stmt = $pdo->query(
        "SELECT erstellt_am, name, farbe
         FROM re_act_colors
         ORDER BY erstellt_am DESC LIMIT 10"
    );
    $rows = [];
    while ($r = $stmt->fetch()) {
        $rows[] = [
            'time'   => date('d.m.y H:i', strtotime($r['erstellt_am'])),
            'name'   => $r['name'],
            'colors' => json_decode($r['farbe'], true)['color']
        ];
    }
    echo json_encode($rows);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error'=>'DB error']);
}