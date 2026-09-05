<?php
$trainingSummaryOnly = $trainingSummaryOnly ?? false;
$trainingHeadingTag = $trainingSummaryOnly ? 'h2' : 'h1';
// Trusted local editorial content; escape text before applying the supported Markdown markup.
$trainingRegistration = 'https://docs.google.com/forms/d/e/1FAIpQLSfcUPKYhnZmBe1D7deasaZU56Amx5WIWxsGDvrWwB7GDQ8deA/viewform';
function trainingInline(string $text): string {
    return preg_replace('/\*\*(.+?)\*\*/u', '<strong>$1</strong>', htmlspecialchars($text, ENT_QUOTES, 'UTF-8'));
}
function trainingBody(string $text, string $url): string {
    $html = ''; $list = null;
    foreach (preg_split('/\R/u', trim($text)) as $line) {
        $line = trim($line);
        $kind = preg_match('/^- (.+)$/u', $line, $match) ? 'ul' : (preg_match('/^\d+\.\s+(.+)$/u', $line, $match) ? 'ol' : null);
        if ($list !== $kind && $list) { $html .= '</' . $list . '>'; $list = null; }
        if ($kind) { if (!$list) { $list = $kind; $html .= '<' . $list . '>'; } $html .= '<li>' . trainingInline($match[1]) . '</li>'; continue; }
        if (!$line) continue;
        if (preg_match('/^\*\*\[(.+)\]\*\*$/u', $line, $match)) {
            $html .= '<a class="training-cta" href="' . htmlspecialchars($url, ENT_QUOTES) . '" target="_blank" rel="noopener noreferrer">' . trainingInline($match[1]) . '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a>';
        } elseif (preg_match('/^## (.+)$/u', $line, $match)) { $html .= '<h3>' . trainingInline($match[1]) . '</h3>'; }
        else { $html .= '<p>' . trainingInline($line) . '</p>'; }
    }
    return $html . ($list ? '</' . $list . '>' : '');
}
$trainingSections = preg_split('/\R---\R/u', trim(file_get_contents(__DIR__ . '/training-content.md')));
$trainingIntro = array_shift($trainingSections);
$trainingIntro = preg_replace('/^# .+\R/u', '', $trainingIntro);
?>
<section id="events" class="training-feature">
  <div class="training-cover">
    <div class="training-cover-copy">
      <span class="training-tag">АСТАНА · 15 ОРЫН · ҚАЗАҚ ТІЛІНДЕ</span>
      <<?= $trainingHeadingTag ?>>«Шешендік өнер» <br><em>курсының тренерін даярлау</em></<?= $trainingHeadingTag ?>>
      <p class="training-lead">Өзіңіз үйреніңіз. Өзгелерге үйретіңіз.</p>
      <div class="training-date">28 қыркүйек — 4 қазан <span>2026</span></div>
      <p>Yourt Arena Garden · Төле би көшесі, 28/1</p>
      <a class="training-cta" href="<?= $trainingSummaryOnly ? 'training-details.php' : '#training' ?>"><?= $trainingSummaryOnly ? 'Толығырақ' : 'Толық бағдарламаны көру' ?> <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14m-6-6 6 6 6-6"/></svg></a>
    </div>
    <div class="training-cover-photo"><img src="assets/uploads/backgrounds/main/nurlan-portrait.JPG" alt="Тренер Нұрлан Азаматов" loading="lazy"><div class="training-photo-caption">Жаттықтырушы<strong>Нұрлан Азаматов</strong></div></div>
    <div class="training-stats"><div><strong>7 күн</strong><span>Практикалық дайындық</span></div><div><strong>42 сағат</strong><span>Тренерлік оқу</span></div><div><strong>12 сабақ</strong><span>Дайын курс бағдарламасы</span></div><div><strong>200 000 ₸</strong><span>Толық оқу құны</span></div></div>
  </div>
</section>
<?php if (!$trainingSummaryOnly): ?>
<section id="training" class="training-details">
  <div class="training-intro"><?= trainingBody($trainingIntro, $trainingRegistration) ?></div>
  <div class="training-info-grid">
  <?php foreach ($trainingSections as $number => $block):
      preg_match('/^# (.+)\R([\s\S]*)$/u', trim($block), $parts);
      if (!$parts) continue;
      $classes = 'training-info-card';
      if (in_array($number, [5, 6, 7, 8], true)) $classes .= ' training-offer';
      if ($number >= 10) $classes .= ' training-wide';
  ?>
    <article class="<?= $classes ?>"><span class="training-section-number"><?= sprintf('%02d', $number + 1) ?></span><h2><?= trainingInline($parts[1]) ?></h2><?= trainingBody($parts[2], $trainingRegistration) ?></article>
  <?php endforeach; ?>
  </div>
</section>
<?php endif; ?>
