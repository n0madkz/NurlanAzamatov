<?php
if (!defined('ADMIN_BACKGROUND_PANEL')) exit;
$backgroundPanel = '<div class="admin-card media-admin"><div class="card-title"><div><p class="eyebrow">BACKGROUNDS</p><h2>Фондар</h2></div></div>';
foreach ([['main', 'Главный фон'], ['ambient', 'Анимациялық задний фон']] as [$type, $label]) {
    $dir = __DIR__ . '/assets/uploads/backgrounds/' . $type;
    $backgroundPanel .= '<div class="media-admin-block"><h3>' . $label . '</h3><form method="post" enctype="multipart/form-data" class="media-upload"><input type="hidden" name="background_upload" value="1"><input type="hidden" name="background_type" value="' . $type . '"><input type="file" name="background_file" accept="image/jpeg,image/png,image/webp" required><button class="button button-dark" type="submit">Сменить фон</button></form><div class="media-admin-grid">';
    foreach (glob($dir . '/*') ?: [] as $file) { if (!is_file($file)) continue; $name = basename($file); $url = 'assets/uploads/backgrounds/' . $type . '/' . rawurlencode($name); $backgroundPanel .= '<div class="media-admin-item"><img src="' . e($url) . '" alt=""><form method="post"><input type="hidden" name="background_delete" value="1"><input type="hidden" name="background_type" value="' . $type . '"><input type="hidden" name="background_name" value="' . e($name) . '"><button class="archive-btn" type="submit">Жою</button></form></div>'; }
    $backgroundPanel .= '</div></div>';
}
echo $backgroundPanel . '</div>';
