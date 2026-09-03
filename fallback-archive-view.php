<?php
// Render archived fallback posters when PostgreSQL is unavailable.
ob_start(function (string $html): string {
    $path = __DIR__ . '/data/posters-archive.json';
    if (!is_file($path)) return $html;
    $state = json_decode((string)file_get_contents($path), true);
    $ids = array_values(array_unique(array_map('intval', is_array($state['archived'] ?? null) ? $state['archived'] : [])));
    if (!$ids) return $html;
    $fallback = [
        1 => ['title' => 'Естілетін дауыс', 'date' => '18.09.2026', 'image' => 'assets/uploads/gallery/481510086_28816670704644510_3530916731107346624_n.jpg'],
        2 => ['title' => 'Қорқынышсыз сахна', 'date' => '03.10.2026', 'image' => 'assets/uploads/gallery/483528293_28821656594145921_3746918195898899378_n.jpg'],
    ];
    $rows = '';
    foreach ($ids as $id) {
        if (!isset($fallback[$id])) continue;
        $item = $fallback[$id];
        $rows .= '<div class="admin-row"><img src="' . htmlspecialchars($item['image'], ENT_QUOTES, 'UTF-8') . '" alt=""><div><strong>' . htmlspecialchars($item['title'], ENT_QUOTES, 'UTF-8') . '</strong><small>' . $item['date'] . '</small></div></div>';
    }
    if (!$rows) return $html;
    $html = preg_replace('~(ARCHIVE\s*/\s*)\d+~', '$1' . count($ids), $html, 1);
    $html = preg_replace('~(LIVE\s*/\s*)\d+~', '$1' . max(0, 2 - count($ids)), $html, 1);
    $html = preg_replace('~<p class="muted">.*?</p>~s', $rows, $html, 1);
    return $html;
});
