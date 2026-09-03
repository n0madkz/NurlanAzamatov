<?php
ob_start(function ($html) {
    return str_ireplace(['StageSpeak', 'STAGESPEAK', 'Almaty', 'ALMATY', 'Алматы'], '', $html);
});
require __DIR__ . '/db.php';
require __DIR__ . '/auth.php';
if (!empty($_SESSION['admin'])) { header('Location: admin.php'); exit; }
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (hash_equals($config['admin_login'], $_POST['login'] ?? '') && verifyAdminPassword($config, (string)($_POST['password'] ?? ''))) {
        $_SESSION['admin'] = true; header('Location: admin.php'); exit;
    }
    $error = 'Проверьте логин и пароль.';
}
?><!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Вход · StageSpeak</title><link rel="stylesheet" href="assets/style.css"></head><body class="login-page"><main class="login-card"><a class="brand" href="index.php"><span class="brand-mark">S</span> STAGESPEAK</a><p class="eyebrow">PRIVATE AREA</p><h1>Вход в админку</h1><?php if ($error): ?><div class="alert"><?= e($error) ?></div><?php endif; ?><form method="post"><label>Логин<input name="login" required autofocus></label><label>Пароль<input name="password" type="password" required></label><button class="button button-dark" type="submit">Войти <span>↗</span></button></form></main></body></html>
