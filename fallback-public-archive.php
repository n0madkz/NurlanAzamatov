<?php
// Hide fallback posters archived from the admin panel when PostgreSQL is unavailable.
ob_start(function (string $html): string {
    $path = __DIR__ . '/data/posters-archive.json';
    if (!is_file($path)) return $html;
    $state = json_decode((string)file_get_contents($path), true);
    $ids = array_values(array_unique(array_map('intval', is_array($state['archived'] ?? null) ? $state['archived'] : [])));
    if (!$ids) return $html;
    preg_match_all('~<article class="poster-card reveal">.*?</article>~s', $html, $matches, PREG_OFFSET_CAPTURE);
    if (empty($matches[0])) return $html;
    foreach (array_reverse($ids) as $id) {
        $index = $id - 1;
        if (isset($matches[0][$index])) {
            $match = $matches[0][$index][0];
            $html = substr_replace($html, '', $matches[0][$index][1], strlen($match));
        }
    }
    return $html;
});
