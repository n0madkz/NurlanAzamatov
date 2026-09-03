<?php
header('Content-Type: application/json; charset=utf-8');
$result = ['gallery' => [], 'certificates' => [], 'main_backgrounds' => [], 'ambient_backgrounds' => []];
foreach (array_keys($result) as $type) {
    $dir = __DIR__ . '/assets/uploads/' . $type;
    foreach (glob($dir . '/*') ?: [] as $file) {
        if (is_file($file) && preg_match('/\.(jpe?g|png|webp)$/i', $file)) $result[$type][] = 'assets/uploads/' . $type . '/' . rawurlencode(basename($file));
    }
}
foreach (['main_backgrounds' => 'backgrounds/main', 'ambient_backgrounds' => 'backgrounds/ambient'] as $key => $folder) { foreach (glob(__DIR__ . '/assets/uploads/' . $folder . '/*') ?: [] as $file) { if (is_file($file) && preg_match('/\.(jpe?g|png|webp)$/i', $file)) $result[$key][] = 'assets/uploads/' . $folder . '/' . rawurlencode(basename($file)); } }
echo json_encode($result, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
