<?php
return [
    'dsn' => getenv('DB_DSN') ?: 'pgsql:host=localhost;port=5432;dbname=stagespeak',
    'user' => getenv('DB_USER') ?: 'postgres',
    'password' => getenv('DB_PASSWORD') ?: 'postgres',
    'admin_login' => getenv('ADMIN_LOGIN') ?: 'admin',
    'admin_password' => getenv('ADMIN_PASSWORD') ?: 'change-me-now',
];
