<?php
require_once __DIR__ . '/training-store.php';
try { $managedTraining=(new TrainingStore($pdo))->load(); } catch (Throwable $error) { $managedTraining=null; }
?>
<div class="admin-card">
  <div class="card-title"><h2>Тренинг және толық бағдарлама</h2></div>
  <?php if ($managedTraining): ?>
  <p><?= e($managedTraining['title']) ?></p>
  <p><?= e($managedTraining['dates'] . ' ' . $managedTraining['year']) ?> · <?= $managedTraining['archived'] ? 'Архивте' : 'Жарияланған' ?></p>
  <a class="button button-dark" href="training-edit.php">Өңдеу / архивтеу</a>
  <?php if (!$managedTraining['archived']): ?><a class="text-link" href="training-details.php">Сайттан көру</a><?php endif; ?>
  <?php else: ?><p>Тренинг деректерін оқу мүмкін болмады. Кейінірек қайталап көріңіз.</p><?php endif; ?>
</div>
