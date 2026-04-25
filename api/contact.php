<?php
header('Content-Type: application/json');

// CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = ['https://hb-metalle.de', 'https://www.hb-metalle.de'];
if (in_array($origin, $allowed, true)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

$name    = trim(strip_tags($data['name']    ?? ''));
$phone   = trim(strip_tags($data['phone']   ?? ''));
$email   = trim(strip_tags($data['email']   ?? ''));
$service = trim(strip_tags($data['service'] ?? ''));
$message = trim(strip_tags($data['message'] ?? ''));

if (!$name || !$phone || !$service) {
    http_response_code(400);
    echo json_encode(['error' => 'Pflichtfelder fehlen']);
    exit;
}

// Limit lengths
$name    = mb_substr($name,    0, 200);
$phone   = mb_substr($phone,   0, 50);
$email   = mb_substr($email,   0, 200);
$service = mb_substr($service, 0, 200);
$message = mb_substr($message, 0, 2000);

$to      = 'info@hb-metalle.de';
$subject = "=?UTF-8?B?" . base64_encode("Neue Anfrage: $service von $name") . "?=";

$body  = "Name:     $name\n";
$body .= "Telefon:  $phone\n";
$body .= "E-Mail:   $email\n";
$body .= "Leistung: $service\n";
if ($message) {
    $body .= "Nachricht:\n$message\n";
}

$headers  = "From: HB-Metalle Kontaktformular <noreply@hb-metalle.de>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Versand fehlgeschlagen']);
}
