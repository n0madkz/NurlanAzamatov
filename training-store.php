<?php
final class TrainingStore {
    public function __construct(private ?PDO $pdo, private string $directory = __DIR__ . '/data') {}
    public static function defaults(): array {
        return [
            'title'=>'«Шешендік өнер» курсының тренерін даярлау',
            'tag'=>'АСТАНА · 15 ОРЫН · ҚАЗАҚ ТІЛІНДЕ',
            'lead'=>'Өзіңіз үйреніңіз. Өзгелерге үйретіңіз.',
            'dates'=>'28 қыркүйек — 4 қазан', 'year'=>'2026',
            'location'=>'Астана · Yourt Arena Garden · Төле би көшесі, 28/1',
            'days'=>'7 күн', 'hours'=>'42 сағат', 'lessons'=>'12 сабақ', 'price'=>'200 000 ₸',
            'image'=>'assets/uploads/backgrounds/main/nurlan-portrait.JPG',
            'registration_url'=>'https://forms.gle/v8nTeeeWgxtCCENu5',
            'content'=>(string)file_get_contents(__DIR__ . '/training-content.md'),
            'archived'=>false, 'revision'=>0,
        ];
    }
    private function database(): bool {
        if (is_file($this->directory . '/training-state.json')) return false;
        if (!$this->pdo && is_file($this->directory . '/training-postgres.lock')) throw new RuntimeException('Тренинг дерекқоры уақытша қолжетімсіз.');
        if (!$this->pdo) return false;
        $this->pdo->exec('CREATE TABLE IF NOT EXISTS site_training (id INTEGER PRIMARY KEY CHECK (id = 1), payload TEXT NOT NULL)');
        if (!is_dir($this->directory) && !mkdir($this->directory,0775,true)) throw new RuntimeException('Сақтау бумасы қолжетімсіз.');
        if (file_put_contents($this->directory . '/training-postgres.lock','postgres',LOCK_EX) === false) throw new RuntimeException('Сақтау режимі сақталмады.');
        return true;
    }
    public function load(): array {
        if ($this->database()) {
            $raw = $this->pdo->query('SELECT payload FROM site_training WHERE id = 1')->fetchColumn();
        } else {
            $file = $this->directory . '/training-state.json';
            if (!is_file($file)) return self::defaults();
            $handle = fopen($file,'rb');
            if (!$handle || !flock($handle,LOCK_SH)) throw new RuntimeException('Тренинг оқылмады.');
            $raw = stream_get_contents($handle); flock($handle,LOCK_UN); fclose($handle);
        }
        if ($raw === false) return self::defaults();
        $data = json_decode($raw,true,512,JSON_THROW_ON_ERROR);
        if (!is_array($data) || !isset($data['content'],$data['revision'],$data['archived'])) throw new RuntimeException('Тренинг деректері бүлінген.');
        return array_replace(self::defaults(),$data);
    }
    public function save(array $data, int $revision): void {
        $data['revision']=$revision+1;
        $json=json_encode($data,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT|JSON_THROW_ON_ERROR);
        if ($this->database()) {
            $stmt=$this->pdo->prepare('INSERT INTO site_training (id,payload) VALUES (1,?) ON CONFLICT (id) DO UPDATE SET payload=EXCLUDED.payload WHERE (site_training.payload::jsonb->>\'revision\')::integer = ?');
            $stmt->execute([$json,$revision]);
            if (!$stmt->rowCount()) throw new RuntimeException('Деректер өзгерді. Бетті жаңартып, қайта көріңіз.');
            return;
        }
        if (!is_dir($this->directory) && !mkdir($this->directory,0775,true)) throw new RuntimeException('Сақтау бумасы қолжетімсіз.');
        $handle=fopen($this->directory.'/training-state.json','c+');
        if (!$handle || !flock($handle,LOCK_EX)) throw new RuntimeException('Сақтау мүмкін болмады.');
        try {
            $raw=stream_get_contents($handle);
            $current=$raw === '' ? self::defaults() : json_decode($raw,true,512,JSON_THROW_ON_ERROR);
            if ((int)$current['revision'] !== $revision) throw new RuntimeException('Деректер өзгерді. Бетті жаңартып, қайта көріңіз.');
            rewind($handle);
            if (fwrite($handle,$json) !== strlen($json) || !ftruncate($handle,strlen($json)) || !fflush($handle)) throw new RuntimeException('Сақтау мүмкін болмады.');
        } finally {flock($handle,LOCK_UN);fclose($handle);}
    }
}
function trainingEscape(string $value): string {return htmlspecialchars($value,ENT_QUOTES,'UTF-8');}
