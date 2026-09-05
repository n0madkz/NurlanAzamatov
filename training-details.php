<?php
header('Cache-Control: no-cache, must-revalidate');
$trainingPage = true;
require __DIR__ . '/db.php';
require_once __DIR__ . '/training-store.php';
try { $publicTraining=(new TrainingStore($pdo))->load(); }
catch (Throwable $error) { $publicTraining=['archived'=>true]; http_response_code(503); }
if ($publicTraining['archived'] && http_response_code() !== 503) http_response_code(404);
?>
<!doctype html>
<html lang="kk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title><?= $publicTraining['archived'] ? 'Тренинг қолжетімсіз' : e($publicTraining['title']) ?></title>
  <meta name="description" content="<?= $publicTraining['archived'] ? 'Тренинг қазір қолжетімсіз' : e($publicTraining['lead']) ?>">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css?v=<?= filemtime(__DIR__ . '/assets/style.css') ?>">
  <link rel="stylesheet" href="assets/training.css?v=<?= filemtime(__DIR__ . '/assets/training.css') ?>">
  <link rel="stylesheet" href="assets/site-navigation.css?v=<?= filemtime(__DIR__ . '/assets/site-navigation.css') ?>">
</head>
<body class="public-page training-page">
<?php require __DIR__ . '/site-navigation.php'; ?>
<main>
  <a class="training-back" href="index.php#events"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg>Афишаға оралу</a>
  <?php if (!$publicTraining['archived']): require __DIR__ . '/training.php'; else: ?><section class="training-feature"><h1>Тренинг қазір қолжетімсіз</h1><p>Жаңа афишаларды басты беттен көре аласыз.</p></section><?php endif; ?>
</main>
<footer><p>2026</p></footer>
<script src="assets/site-navigation.js?v=<?= filemtime(__DIR__ . '/assets/site-navigation.js') ?>"></script>
</body>
</html>
