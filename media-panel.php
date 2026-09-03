<?php
if (!defined('ADMIN_MEDIA_PANEL')) { exit; }
$mediaPanel = '<div class="admin-card media-admin"><div class="card-title"><div><p class="eyebrow">MEDIA LIBRARY</p><h2>Галерея және сертификаттар</h2></div></div>';
foreach ([['gallery', 'Галерея'], ['certificates', 'Сертификаттар']] as [$type, $label]) {
    $dir = __DIR__ . '/assets/uploads/' . $type;
    $mediaPanel .= '<div class="media-admin-block"><h3>' . $label . '</h3><form method="post" enctype="multipart/form-data" class="media-upload"><input type="hidden" name="media_upload" value="1"><input type="hidden" name="media_type" value="' . $type . '"><input type="file" name="media_files[]" accept="image/jpeg,image/png,image/webp" multiple required><button class="button button-dark" type="submit">Қосу</button></form><div class="media-admin-grid">';
    foreach (glob($dir . '/*') ?: [] as $file) { if (!is_file($file)) continue; $name = basename($file); $url = 'assets/uploads/' . $type . '/' . rawurlencode($name); $mediaPanel .= '<div class="media-admin-item"><img src="' . e($url) . '" alt=""><form method="post"><input type="hidden" name="media_delete" value="1"><input type="hidden" name="media_type" value="' . $type . '"><input type="hidden" name="media_name" value="' . e($name) . '"><button class="archive-btn" type="submit">Жою</button></form></div>'; }
    $mediaPanel .= '</div></div>';
}
$mediaPanel .= '</div>';
echo $mediaPanel;
