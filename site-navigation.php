<?php
// Render both layouts on the server: mobile positioning must not depend on JavaScript.
$trainingPage = $trainingPage ?? false;
$homePrefix = $trainingPage ? 'index.php' : '';
$publicLinks = [
    ['training', 'Тренинг', 'training-details.php', '<path d="M4 19.5V5a2 2 0 0 1 2-2h14v18H6a2 2 0 0 1 0-4h14M8 7h8M8 11h6"/>'],
    ['events', 'Афишалар', $homePrefix . '#events', '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2"/>'],
    ['about', 'Жоба туралы', $homePrefix . '#about', '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>'],
    ['gallery', 'Галерея', $homePrefix . '#gallery', '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>'],
    ['certificates', 'Сертификаттар', $homePrefix . '#certificates', '<circle cx="12" cy="8" r="5"/><path d="m8.2 11.5-1.7 10L12 18l5.5 3.5-1.7-10"/>'],
];
$mobileLinks = [
    ['home', 'Басты бет', 'index.php', '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/>'],
    $publicLinks[0],
    $publicLinks[1],
    $publicLinks[3],
    $publicLinks[4],
];
?>
<header class="public-header">
  <a class="public-brand" href="index.php">Нұрлан Азаматов<span>Шешендік өнер мектебі</span></a>
  <nav class="public-desktop-nav" aria-label="Негізгі мәзір">
    <?php foreach ($publicLinks as [$key, $label, $href, $icon]): ?>
      <a href="<?= $href ?>" data-nav-key="<?= $key ?>"<?= $trainingPage && $key === 'training' ? ' aria-current="page"' : '' ?>><svg viewBox="0 0 24 24" aria-hidden="true"><?= $icon ?></svg><span><?= $label ?></span></a>
    <?php endforeach; ?>
  </nav>
</header>
<!-- Direct child of body, outside any transformed or filtered header. -->
<nav class="public-bottom-nav" aria-label="Төменгі мәзір">
  <?php foreach ($mobileLinks as [$key, $label, $href, $icon]): ?>
    <a href="<?= $href ?>" data-nav-key="<?= $key ?>"<?= $trainingPage && $key === 'training' ? ' aria-current="page"' : '' ?>><svg viewBox="0 0 24 24" aria-hidden="true"><?= $icon ?></svg><span><?= $key === 'certificates' ? 'Сертифи<wbr>каттар' : $label ?></span></a>
  <?php endforeach; ?>
</nav>
