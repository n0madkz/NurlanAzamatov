<?php
session_start();
function requireAdmin(): void {
    if (empty($_SESSION['admin'])) { header('Location: login.php'); exit; }
}
function adminPasswordHash(array $config): string {
    $file = __DIR__ . '/data/admin-password.hash';
    if (is_file($file)) return trim((string)file_get_contents($file));
    return password_hash((string)$config['admin_password'], PASSWORD_DEFAULT);
}
function verifyAdminPassword(array $config, string $password): bool { return password_verify($password, adminPasswordHash($config)); }
function saveAdminPassword(string $password): bool {
    $dir = __DIR__ . '/data'; if (!is_dir($dir)) mkdir($dir, 0775, true);
    return file_put_contents($dir . '/admin-password.hash', password_hash($password, PASSWORD_DEFAULT), LOCK_EX) !== false;
}
