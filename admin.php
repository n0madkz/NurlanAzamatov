<?php
ob_start(function ($html) {
    return str_ireplace(['StageSpeak', 'STAGESPEAK', 'Almaty', 'ALMATY', 'Алматы'], '', $html);
});
require __DIR__ . '/db.php'; require __DIR__ . '/auth.php'; requireAdmin(); require __DIR__ . '/fallback-archive-view.php';
foreach (['gallery', 'certificates'] as $mediaType) { if (!is_dir(__DIR__ . '/assets/uploads/' . $mediaType)) mkdir(__DIR__ . '/assets/uploads/' . $mediaType, 0775, true); }
foreach (['posters', 'backgrounds/main', 'backgrounds/ambient'] as $uploadType) { if (!is_dir(__DIR__ . '/assets/uploads/' . $uploadType)) mkdir(__DIR__ . '/assets/uploads/' . $uploadType, 0775, true); }
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['cover_file']) && ($_FILES['cover_file']['error'] ?? 1) === UPLOAD_ERR_OK && getimagesize($_FILES['cover_file']['tmp_name']) !== false) { $ext = strtolower(pathinfo($_FILES['cover_file']['name'], PATHINFO_EXTENSION)); if (in_array($ext, ['jpg','jpeg','png','webp'], true)) { $name = bin2hex(random_bytes(8)) . '.' . ($ext === 'jpeg' ? 'jpg' : $ext); move_uploaded_file($_FILES['cover_file']['tmp_name'], __DIR__ . '/assets/uploads/posters/' . $name); $_POST['image_url'] = 'assets/uploads/posters/' . $name; } }
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['background_upload']) && ($_FILES['background_file']['error'] ?? 1) === UPLOAD_ERR_OK && getimagesize($_FILES['background_file']['tmp_name']) !== false) { $type = in_array($_POST['background_type'] ?? '', ['main','ambient'], true) ? $_POST['background_type'] : 'ambient'; $ext = strtolower(pathinfo($_FILES['background_file']['name'], PATHINFO_EXTENSION)); if (in_array($ext, ['jpg','jpeg','png','webp'], true)) { $name = bin2hex(random_bytes(8)) . '.' . ($ext === 'jpeg' ? 'jpg' : $ext); move_uploaded_file($_FILES['background_file']['tmp_name'], __DIR__ . '/assets/uploads/backgrounds/' . $type . '/' . $name); $message = 'Фон жаңартылды.'; } }
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['background_delete'])) { $type = in_array($_POST['background_type'] ?? '', ['main','ambient'], true) ? $_POST['background_type'] : 'ambient'; $name = basename($_POST['background_name'] ?? ''); $path = __DIR__ . '/assets/uploads/backgrounds/' . $type . '/' . $name; if ($name && is_file($path)) { unlink($path); $message = 'Фон өшірілді.'; } }
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['media_upload'])) {
    $type = in_array($_POST['media_type'] ?? '', ['gallery', 'certificates'], true) ? $_POST['media_type'] : 'gallery'; $allowed = ['jpg'=>'jpg','jpeg'=>'jpg','png'=>'png','webp'=>'webp']; $count = 0;
    foreach ($_FILES['media_files']['tmp_name'] ?? [] as $i => $tmp) { if (!is_uploaded_file($tmp) || ($_FILES['media_files']['error'][$i] ?? 1) !== UPLOAD_ERR_OK) continue; $ext = strtolower(pathinfo($_FILES['media_files']['name'][$i] ?? '', PATHINFO_EXTENSION)); if (!isset($allowed[$ext]) || getimagesize($tmp) === false) continue; $name = bin2hex(random_bytes(8)) . '.' . $allowed[$ext]; if (move_uploaded_file($tmp, __DIR__ . '/assets/uploads/' . $type . '/' . $name)) $count++; }
    $message = 'Медиафайлдар қосылды: ' . $count;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['media_delete'])) {
    $type = in_array($_POST['media_type'] ?? '', ['gallery', 'certificates'], true) ? $_POST['media_type'] : 'gallery'; $name = basename($_POST['media_name'] ?? ''); $path = __DIR__ . '/assets/uploads/' . $type . '/' . $name;
    if ($name && is_file($path)) { unlink($path); $message = 'Файл өшірілді.'; }
}
$fallbackArchiveFile = __DIR__ . '/data/posters-archive.json';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !$pdo && isset($_POST['archive'])) {
    $stateDir = dirname($fallbackArchiveFile);
    if (!is_dir($stateDir)) mkdir($stateDir, 0775, true);
    $state = is_file($fallbackArchiveFile) ? json_decode((string)file_get_contents($fallbackArchiveFile), true) : [];
    $state = is_array($state) ? $state : [];
    $state['archived'] = array_values(array_unique(array_map('intval', $state['archived'] ?? [])));
    $id = (int)$_POST['archive'];
    if ($id && !in_array($id, $state['archived'], true)) $state['archived'][] = $id;
    file_put_contents($fallbackArchiveFile, json_encode($state, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
    $message = 'Афиша отправлена в архив.';
}
define('ADMIN_MEDIA_PANEL', true);
$fallbackArchivedIds = [];
if (is_file(__DIR__ . '/data/posters-archive.json')) {
    $fallbackState = json_decode((string)file_get_contents(__DIR__ . '/data/posters-archive.json'), true);
    $fallbackArchivedIds = array_values(array_unique(array_map('intval', is_array($fallbackState['archived'] ?? null) ? $fallbackState['archived'] : [])));
}
ob_start(function ($html) use ($fallbackArchivedIds) {
    if (!$fallbackArchivedIds) return $html;
    foreach ($fallbackArchivedIds as $id) {
        $html = preg_replace('~<div class="admin-row">.*?<button class="archive-btn" name="archive" value="' . preg_quote((string)$id, '~') . '".*?</form></div>~s', '', $html);
    }
    return $html;
});
ob_start(); require __DIR__ . '/media-panel.php'; $mediaPanel = ob_get_clean();
define('ADMIN_BACKGROUND_PANEL', true); ob_start(); require __DIR__ . '/background-panel.php'; $backgroundPanel = ob_get_clean();
ob_start(function ($html) use ($mediaPanel, $backgroundPanel) { $marker = '<form method="post" class="admin-form">'; $pos = strpos($html, $marker); if ($pos !== false) { $replacement = '<form method="post" enctype="multipart/form-data" class="admin-form"><label class="wide">Обложка афиши<input type="file" name="cover_file" accept="image/jpeg,image/png,image/webp"></label>'; $html = substr_replace($html, $replacement, $pos, strlen($marker)); } return str_replace('</section></main>', $mediaPanel . $backgroundPanel . '</section></main>', $html); });
if (!isset($message)) $message = '';
ob_start(function ($html) {
    $nav = '<nav class="admin-nav" aria-label="Навигация админки"><button type="button" data-tab="posters">▣ Афиши</button><button type="button" data-tab="gallery">▧ Галерея</button><button type="button" data-tab="certificates">▤ Сертификаты</button><button type="button" data-tab="main">▥ Главный фон</button><button type="button" data-tab="ambient">〰 Задний фон</button><button type="button" data-tab="security">♢ Безопасность</button></nav>';
    $html = str_replace('</aside>', $nav . '</aside>', $html);
    return str_replace('</body>', '<script src="assets/admin.js"></script></body>', $html);
});
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['change_password'])) {
    $new = (string)($_POST['new_password'] ?? ''); $confirm = (string)($_POST['confirm_password'] ?? '');
    if (!verifyAdminPassword($config, (string)($_POST['current_password'] ?? ''))) $message = 'Қазіргі құпиясөз дұрыс емес.';
    elseif (strlen($new) < 8) $message = 'Жаңа құпиясөз кемінде 8 таңба болуы керек.';
    elseif ($new !== $confirm) $message = 'Құпиясөздер сәйкес келмейді.';
    elseif (saveAdminPassword($new)) $message = 'Құпиясөз сәтті өзгертілді.';
    else $message = 'Құпиясөзді сақтау мүмкін болмады.';
}
define('ADMIN_SECURITY_PANEL', true);
ob_start(); require __DIR__ . '/security-panel.php'; $securityPanel = ob_get_clean();
ob_start(function ($html) use ($securityPanel) { return str_replace('</section></main>', $securityPanel . '</section></main>', $html); });
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $pdo && (isset($_POST['archive']) || isset($_POST['title']))) {
    if (isset($_POST['archive'])) { $stmt=$pdo->prepare('UPDATE posters SET is_archived = TRUE WHERE id = ?'); $stmt->execute([(int)$_POST['archive']]); $message='Афиша отправлена в архив.'; }
    else { $stmt=$pdo->prepare('INSERT INTO posters (title, description, event_date, event_time, location, category, image_url, registration_url) VALUES (?,?,?,?,?,?,?,?)'); $stmt->execute([trim($_POST['title']),trim($_POST['description']),$_POST['event_date'],$_POST['event_time'],trim($_POST['location']),trim($_POST['category']),trim($_POST['image_url']),trim($_POST['registration_url'])]); $message='Новая афиша опубликована.'; }
}
$active = $pdo ? $pdo->query('SELECT * FROM posters WHERE is_archived = FALSE ORDER BY event_date')->fetchAll() : [];
$archived = $pdo ? $pdo->query('SELECT * FROM posters WHERE is_archived = TRUE ORDER BY event_date DESC')->fetchAll() : [];
if (!$pdo && !$active) $active = [['id'=>1,'title'=>'Естілетін дауыс','description'=>'Өзіне сенімді ұстау, дауыс пен интонацияны жетілдіруге арналған практикум.','event_date'=>'2026-09-18','event_time'=>'19:00','location'=>'Жеке афиша','category'=>'Практика','image_url'=>'assets/uploads/gallery/481510086_28816670704644510_3530916731107346624_n.jpg'],['id'=>2,'title'=>'Қорқынышсыз сахна','description'=>'Еркін әрі сенімді сөйлеуге арналған бір күндік интенсив.','event_date'=>'2026-10-03','event_time'=>'11:00','location'=>'Жеке афиша','category'=>'Интенсив','image_url'=>'assets/uploads/gallery/483528293_28821656594145921_3746918195898899378_n.jpg']];
ob_start(); require __DIR__ . '/training-admin-card.php'; $trainingPanel = ob_get_clean();
ob_start(function ($html) use ($trainingPanel) { return str_replace('<section class="admin-content">', '<section class="admin-content">' . $trainingPanel, $html); });
?><!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Админка · StageSpeak</title><link rel="stylesheet" href="assets/style.css"></head><body class="admin-page"><header class="site-header"><a class="brand" href="index.php"><span class="brand-mark">S</span> STAGESPEAK</a><div class="admin-user">ADMIN · <a href="logout.php">Выйти</a></div></header><main class="admin-layout"><aside><p class="eyebrow">CONTROL ROOM</p><h1>Афиши<br><em>проекта.</em></h1><p>Добавляйте события, управляйте актуальной афишей и убирайте прошедшие тренинги в архив.</p><a class="text-link" href="index.php">Открыть сайт ↗</a></aside><section class="admin-content"><?php if ($message): ?><div class="success"><?= e($message) ?></div><?php endif; ?><div class="admin-card"><div class="card-title"><div><p class="eyebrow">NEW POSTER</p><h2>Новая афиша</h2></div></div><form method="post" class="admin-form"><label>Название<input name="title" required placeholder="Например, Голос, который слышно"></label><label>Категория<input name="category" value="Практика" required></label><label class="wide">Описание<textarea name="description" required placeholder="Коротко о тренинге"></textarea></label><label>Дата<input type="date" name="event_date" required></label><label>Время<input type="time" name="event_time" value="19:00" required></label><label>Место<input name="location" required placeholder="Алматы · Talan Towers"></label><label>Изображение URL<input name="image_url" required placeholder="https://images.unsplash.com/..."></label><label>Ссылка на регистрацию<input name="registration_url" value="#"></label><button class="button button-dark" type="submit">Опубликовать <span>↗</span></button></form></div><div class="admin-card"><div class="card-title"><div><p class="eyebrow">LIVE / <?= count($active) ?></p><h2>Опубликованные</h2></div></div><?php foreach ($active as $item): ?><div class="admin-row"><img src="<?= e($item['image_url']) ?>" alt=""><div><strong><?= e($item['title']) ?></strong><small><?= formatDate($item['event_date']) ?> · <?= e($item['location']) ?></small></div><form method="post"><button class="archive-btn" name="archive" value="<?= $item['id'] ?>">В архив</button></form></div><?php endforeach; ?></div><div class="admin-card archived"><div class="card-title"><div><p class="eyebrow">ARCHIVE / <?= count($archived) ?></p><h2>Архив</h2></div></div><?php if (!$archived): ?><p class="muted">Архив пока пуст.</p><?php endif; ?><?php foreach ($archived as $item): ?><div class="admin-row"><div><strong><?= e($item['title']) ?></strong><small><?= formatDate($item['event_date']) ?></small></div></div><?php endforeach; ?></div></section></main></body></html>
