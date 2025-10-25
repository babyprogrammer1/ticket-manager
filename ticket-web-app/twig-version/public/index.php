<?php
// Helpful check: ensure Composer autoload exists and show actionable error if not.
// Try common locations: the project's vendor/ (when composer run at repo root) or twig-version/vendor/ (when composer run inside twig-version)
$candidates = [
    __DIR__ . '/../vendor/autoload.php',    // twig-version/vendor/autoload.php
    __DIR__ . '/../../vendor/autoload.php', // project-root/vendor/autoload.php
];
$autoload = null;
foreach ($candidates as $c) {
    if (file_exists($c)) { $autoload = $c; break; }
}

if (!$autoload) {
    http_response_code(500);
    echo "<h1>Dependencies not installed</h1>";
    echo "<p>The Composer autoloader was not found. Expected one of:</p>";
    echo "<ul>";
    foreach ($candidates as $c) { echo "<li><code>" . htmlspecialchars($c) . "</code></li>"; }
    echo "</ul>";
    echo "<p>Run the following in PowerShell from the `twig-version` folder to install Twig:</p>";
    echo "<pre>cd \"" . realpath(__DIR__ . '/..') . "\"\ncomposer require twig/twig</pre>";
    echo "<p>If you don't have Composer installed, download it from <a href=\"https://getcomposer.org\">getcomposer.org</a> or install via Chocolatey: <code>choco install composer</code>.</p>";
    exit;
}

require $autoload;

session_start();

$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/../templates');
$twig = new \Twig\Environment($loader, [
    'cache' => false,
]);

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Simple router
if ($path === '/' || $path === '/landing') {
    echo $twig->render('landing.twig', ['session' => $_SESSION['ticketapp_session'] ?? null]);
    exit;
}

if ($path === '/auth/login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    // Very simple mock auth: accept any email/password and set session
    $_SESSION['ticketapp_session'] = ['email' => $_POST['email'] ?? 'demo@ticketapp.local'];
    header('Location: /dashboard');
    exit;
}

if ($path === '/auth/login') {
    $flash = $_SESSION['flash'] ?? null;
    if (isset($_SESSION['flash'])) { unset($_SESSION['flash']); }
    echo $twig->render('auth/login.twig', ['session' => $_SESSION['ticketapp_session'] ?? null, 'flash' => $flash]);
    exit;
}

if ($path === '/auth/signup' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $_SESSION['ticketapp_session'] = ['email' => $_POST['email'] ?? 'demo@ticketapp.local'];
    header('Location: /dashboard');
    exit;
}

if ($path === '/auth/signup') {
    echo $twig->render('auth/signup.twig', ['session' => $_SESSION['ticketapp_session'] ?? null]);
    exit;
}

if ($path === '/logout') {
    unset($_SESSION['ticketapp_session']);
    header('Location: /');
    exit;
}

if ($path === '/dashboard') {
    if (!isset($_SESSION['ticketapp_session'])) {
        $_SESSION['flash'] = 'Your session has expired — please log in again.';
        header('Location: /auth/login');
        exit;
    }
    echo $twig->render('dashboard.twig', ['session' => $_SESSION['ticketapp_session']]);
    exit;
}

if ($path === '/tickets') {
    if (!isset($_SESSION['ticketapp_session'])) {
        $_SESSION['flash'] = 'Your session has expired — please log in again.';
        header('Location: /auth/login');
        exit;
    }
    echo $twig->render('tickets.twig', ['session' => $_SESSION['ticketapp_session']]);
    exit;
}

http_response_code(404);
echo "Not found";
