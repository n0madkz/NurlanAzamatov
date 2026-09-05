<?php
require_once __DIR__ . '/training-store.php';
$publicTraining = $publicTraining ?? (new TrainingStore($pdo ?? null))->load();
if ($publicTraining['archived']) return;
$trainingSummaryOnly = $trainingSummaryOnly ?? false;
$trainingHeadingTag = $trainingSummaryOnly ? 'h2' : 'h1';
// Trusted local editorial content; escape text before applying the supported Markdown markup.
$trainingRegistration = $publicTraining['registration_url'];
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
$trainingSections = preg_split('/\R---\R/u', trim($publicTraining['content']));
$trainingIntro = array_shift($trainingSections);
$trainingIntro = preg_replace('/^# .+\R/u', '', $trainingIntro);
?>
<section id="events" class="training-feature">
  <div class="training-cover">
    <div class="training-cover-copy">
      <span class="training-tag"><?= trainingEscape($publicTraining['tag']) ?></span>
      <<?= $trainingHeadingTag ?>><?= trainingEscape($publicTraining['title']) ?></<?= $trainingHeadingTag ?>>
      <p class="training-lead"><?= trainingEscape($publicTraining['lead']) ?></p>
      <div class="training-date"><?= trainingEscape($publicTraining['dates']) ?> <span><?= trainingEscape($publicTraining['year']) ?></span></div>
      <p><?= trainingEscape($publicTraining['location']) ?></p>
      <a class="training-cta" href="<?= $trainingSummaryOnly ? 'training-details.php' : '#training' ?>"><?= $trainingSummaryOnly ? 'Толығырақ' : 'Толық бағдарламаны көру' ?> <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14m-6-6 6 6 6-6"/></svg></a>
    </div>
    <div class="training-cover-photo"><img src="<?= trainingEscape($publicTraining['image']) ?>" alt="Тренер Нұрлан Азаматов" loading="lazy"><div class="training-photo-caption">Жаттықтырушы<strong>Нұрлан Азаматов</strong></div></div>
    <div class="training-stats"><div><strong><?= trainingEscape($publicTraining['days']) ?></strong><span>Практикалық дайындық</span></div><div><strong><?= trainingEscape($publicTraining['hours']) ?></strong><span>Тренерлік оқу</span></div><div><strong><?= trainingEscape($publicTraining['lessons']) ?></strong><span>Дайын курс бағдарламасы</span></div><div><strong><?= trainingEscape($publicTraining['price']) ?></strong><span>Толық оқу құны</span></div></div>
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
    <details class="<?= $classes ?>"<?= $number === 0 ? ' open' : '' ?>>
      <summary><span class="training-section-number"><?= sprintf('%02d', $number + 1) ?></span><span class="training-card-title"><?= trainingInline($parts[1]) ?></span><svg class="training-toggle" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>
      <div class="training-card-body"><?= trainingBody($parts[2], $trainingRegistration) ?></div>
    </details>
  <?php endforeach; ?>
  </div>
</section>
<?php endif; ?>
