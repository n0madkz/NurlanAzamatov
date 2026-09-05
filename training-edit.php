<?php
require __DIR__.'/db.php';
require __DIR__.'/auth.php';
requireAdmin();
require __DIR__.'/training-store.php';
$_SESSION['training_csrf'] ??= bin2hex(random_bytes(32));
$store=new TrainingStore($pdo);
$error='';
try {$training=$store->load();} catch(Throwable $exception) {http_response_code(503);exit('Тренинг деректері уақытша қолжетімсіз.');}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (!hash_equals($_SESSION['training_csrf'],(string)($_POST['csrf'] ?? ''))) throw new RuntimeException('Сессия жаңарды. Бетті жаңартыңыз.');
        $revision=filter_var($_POST['revision'] ?? '',FILTER_VALIDATE_INT);
        if ($revision === false || $revision !== (int)$training['revision']) throw new RuntimeException('Деректер өзгерді. Бетті жаңартыңыз.');
        $action=$_POST['action'] ?? '';
        if ($action === 'save') {
            foreach (['title','tag','lead','dates','year','location','days','hours','lessons','price','image','registration_url','content'] as $field) {
                $value=trim((string)($_POST[$field] ?? ''));
                if ($value === '' || strlen($value)>($field === 'content' ? 200000 : 2000)) throw new RuntimeException('Барлық өрістерді толтырыңыз. Мәтін тым ұзын болмауы керек.');
                $training[$field]=$value;
            }
            if (!filter_var($training['registration_url'],FILTER_VALIDATE_URL) || parse_url($training['registration_url'],PHP_URL_SCHEME) !== 'https') throw new RuntimeException('Тіркелу сілтемесі https:// арқылы басталуы керек.');
            if (($_FILES['training_cover']['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE && (!preg_match('~^assets/(?:uploads|drive)/[a-zA-Z0-9_./-]+$~D',$training['image']) || str_contains($training['image'],'..') || !is_file(__DIR__.'/'.$training['image']))) throw new RuntimeException('Сайттағы суреттің дұрыс жолын көрсетіңіз.');
            if (($_FILES['training_cover']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
                $file=$_FILES['training_cover'];
                if ($file['error'] !== UPLOAD_ERR_OK || $file['size']>10*1024*1024 || !is_uploaded_file($file['tmp_name'])) throw new RuntimeException('Сурет жүктелмеді (ең көбі 10 МБ).');
                $info=getimagesize($file['tmp_name']);
                $ext=[IMAGETYPE_JPEG=>'jpg',IMAGETYPE_PNG=>'png',IMAGETYPE_WEBP=>'webp'][$info[2] ?? 0] ?? null;
                if (!$ext) throw new RuntimeException('JPG, PNG немесе WebP суретін таңдаңыз.');
                $folder=__DIR__.'/assets/uploads/posters';
                if (!is_dir($folder)) mkdir($folder,0775,true);
                $training['image']='assets/uploads/posters/training-'.bin2hex(random_bytes(12)).'.'.$ext;
                if (!move_uploaded_file($file['tmp_name'],__DIR__.'/'.$training['image'])) throw new RuntimeException('Сурет сақталмады.');
            }
        } elseif ($action === 'archive' || $action === 'restore') {$training['archived']=$action === 'archive';}
        else throw new RuntimeException('Белгісіз әрекет.');
        $store->save($training,$revision);
        header('Location: training-edit.php?saved=1');exit;
    } catch(Throwable $exception) {$error=$exception instanceof RuntimeException && !($exception instanceof PDOException) ? $exception->getMessage() : 'Сақтау мүмкін болмады. Қайта көріңіз.';}
}
$labels=['title'=>'Тренинг атауы','tag'=>'Афишаның жоғарғы белгісі','lead'=>'Қысқаша сипаттама','dates'=>'Өтетін күндері','year'=>'Жыл','location'=>'Өтетін орны','days'=>'Ұзақтығы','hours'=>'Оқу сағаты','lessons'=>'Сабақ саны','price'=>'Оқу құны','image'=>'Қазіргі обложка жолы','registration_url'=>'Тіркелу сілтемесі'];
?><!doctype html><html lang="kk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Тренингті басқару</title>
<style>body{margin:0;background:#07171d;color:#f2f4f3;font:16px/1.5 Arial,sans-serif}main{max-width:960px;margin:32px auto;padding:24px}a{color:#e6cb25}form{display:grid;grid-template-columns:1fr 1fr;gap:20px}label{display:grid;gap:8px}input,textarea,button{box-sizing:border-box;width:100%;font:inherit;padding:12px;border:1px solid #36505a;border-radius:8px;background:#082c39;color:#fff}textarea{min-height:600px;line-height:1.6}button{cursor:pointer;background:#e6cb25;color:#07171d;min-height:48px}.wide{grid-column:1/-1}.status{padding:16px;border:1px solid #08a9d0;border-radius:8px}.preview{max-height:180px;max-width:100%;object-fit:contain}input:focus-visible,textarea:focus-visible,button:focus-visible,a:focus-visible{outline:3px solid #08a9d0;outline-offset:3px}@media(max-width:650px){main{padding:16px;margin:0}form{grid-template-columns:1fr}}</style></head><body><main>
<a href="admin.php#posters">Афишаларға оралу</a><h1>Тренинг және бағдарлама</h1>
<p class="status"><?= $training['archived'] ? 'Архивте — сайтта көрсетілмейді.' : 'Жарияланған — сайтта көрсетіледі.' ?></p>
<?php if ($error): ?><p role="alert"><?= e($error) ?></p><?php elseif(isset($_GET['saved'])): ?><p role="status">Өзгерістер сақталды.</p><?php endif; ?>
<form method="post" enctype="multipart/form-data">
<input type="hidden" name="csrf" value="<?= e($_SESSION['training_csrf']) ?>"><input type="hidden" name="revision" value="<?= (int)$training['revision'] ?>">
<?php foreach($labels as $field=>$label): ?><label><?= e($label) ?><input name="<?= $field ?>" value="<?= e($training[$field]) ?>" required maxlength="2000"<?= $field==='registration_url' ? ' type="url"' : '' ?>></label><?php endforeach; ?>
<label class="wide">Обложканы ауыстыру (JPG, PNG, WebP, 10 МБ дейін)<img class="preview" src="<?= e($training['image']) ?>" alt="Қазіргі обложка"><input type="file" name="training_cover" accept="image/jpeg,image/png,image/webp"></label>
<label class="wide">Толық бағдарлама<textarea name="content" required><?= e($training['content']) ?></textarea></label>
<p class="wide">Бөлім атауы: # Атауы. Бөлімдерді --- жолымен бөліңіз. Тізім: - мәтін. Қалың мәтін: **мәтін**. Тіркелу батырмасы: **[Тіркелу]**. Бағдарлама ішіндегі күндер мен бағаны да жаңартыңыз.</p>
<button class="wide" name="action" value="save">Өзгерістерді сақтау</button></form>
<hr><form method="post"><input type="hidden" name="csrf" value="<?= e($_SESSION['training_csrf']) ?>"><input type="hidden" name="revision" value="<?= (int)$training['revision'] ?>"><button class="wide" name="action" value="<?= $training['archived'] ? 'restore' : 'archive' ?>"><?= $training['archived'] ? 'Архивтен шығару және жариялау' : 'Архивке жіберу' ?></button></form>
</main></body></html>
