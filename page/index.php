<?php
declare(strict_types=1);

$modules = [
    [
        'number' => '01',
        'name' => 'Game showcase',
        'tag' => 'PLAY & DISCOVER',
        'description' => 'Explore the games our team is creating. Each game will have its own story, media, credits and a link to play or download it.',
        'icon' => '✳',
        'href' => '#games',
        'status' => 'Coming to the showcase',
    ],
    [
        'number' => '02',
        'name' => 'Bulletin board',
        'tag' => 'SHARE & CONNECT',
        'description' => 'A shared space for project updates, photos and conversations, with tags for the people, places and games behind them.',
        'icon' => '↗',
        'href' => '#bulletin',
        'status' => 'Community updates',
    ],
    [
        'number' => '03',
        'name' => 'Culture companion',
        'tag' => 'LEARN & EXPLORE',
        'description' => 'Discover a cultural fact connected to the cities in our project, and see how Stockholm and Amsterdam inspire new ideas.',
        'icon' => '◎',
        'href' => '#culture',
        'status' => 'Culture, one tag at a time',
    ],
    [
        'number' => '04',
        'name' => 'Project studio',
        'tag' => 'BEHIND THE SCENES',
        'description' => 'Follow the process: the people, experiments and progress that bring our games and the project together.',
        'icon' => '⌘',
        'href' => '#about',
        'status' => 'Made together',
    ],
];

$team = ['Anna-Maria', 'Rens', 'Daimien', 'Costic', 'Olle', 'Thimothy'];
$e = static fn (string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f6f4ee">
    <meta name="description" content="A shared project from Amsterdam and Stockholm. Explore our games, follow the process and discover the culture behind them.">
    <title>Between Places — Amsterdam × Stockholm</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <script src="main.js" defer></script>
</head>
<body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
        <a class="wordmark" href="index.php" aria-label="Between Places home"><span class="wordmark-mark">B.</span><span>BETWEEN<br>PLACES</span></a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span></button>
        <nav class="site-nav" id="site-nav" aria-label="Main navigation">
            <a href="#games">The games</a>
            <a href="#bulletin">Bulletin</a>
            <a href="#culture">Culture</a>
            <a class="nav-cta" href="#about">Our project <span aria-hidden="true">↗</span></a>
        </nav>
    </header>

    <main id="main">
        <section class="hero" aria-labelledby="hero-title">
            <div class="hero-copy">
                <p class="eyebrow"><span class="live-dot"></span> A creative exchange · 2026—27</p>
                <h1 id="hero-title">Two cities.<br>A world of <em>play.</em></h1>
                <p class="hero-intro">We’re students from Amsterdam and Stockholm, making games and sharing the ideas, culture and moments behind them.</p>
                <div class="hero-actions"><a class="button button-dark" href="#games">Explore the project <span aria-hidden="true">↘</span></a><span class="hero-note">Made across<br>Amsterdam & Stockholm</span></div>
            </div>
            <div class="hero-art" aria-label="Illustration of a playful route connecting Amsterdam and Stockholm" role="img">
                <div class="art-sun"></div><div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div>
                <svg class="route-line" viewBox="0 0 600 470" fill="none" aria-hidden="true"><path d="M73 366C131 299 103 204 211 218C319 232 302 120 401 143C500 166 442 72 529 53" stroke="#193F36" stroke-width="2" stroke-dasharray="5 8"/><circle cx="73" cy="366" r="7" fill="#E16B4B"/><circle cx="529" cy="53" r="7" fill="#E16B4B"/></svg>
                <div class="city city-amsterdam"><span class="city-pin">✳</span><span>AMSTERDAM</span><div class="canals"><i></i><i></i><i></i><i></i></div><div class="canal-houses"><b></b><b></b><b></b><b></b><b></b></div></div>
                <div class="city city-stockholm"><span class="city-pin">✳</span><span>STOCKHOLM</span><div class="island island-a"></div><div class="island island-b"></div><div class="island island-c"></div></div>
                <span class="art-caption">SAME CURIOSITY, DIFFERENT COORDINATES</span>
            </div>
            <div class="hero-bottom"><span>SCROLL TO EXPLORE</span><span class="scroll-line"></span><span>52°22′N — 59°20′N</span></div>
        </section>

        <section class="intro section-pad" id="games">
            <div class="section-heading"><p class="eyebrow">A PROJECT IN FOUR PARTS</p><h2>More than games.<br><em>A shared journey.</em></h2></div>
            <p class="intro-text">A place to play what we make, keep up with what we’re learning and find the cultural connections that bring our cities closer.</p>
        </section>

        <section class="module-grid section-pad" aria-label="Explore the project">
            <?php foreach ($modules as $module): ?>
                <a class="module-card" href="<?= $e($module['href']) ?>">
                    <div class="card-top"><span class="card-number"><?= $e($module['number']) ?> / 04</span><span class="card-icon" aria-hidden="true"><?= $e($module['icon']) ?></span></div>
                    <p class="card-tag"><?= $e($module['tag']) ?></p>
                    <h3><?= $e($module['name']) ?></h3>
                    <p class="card-description"><?= $e($module['description']) ?></p>
                    <div class="card-bottom"><span><?= $e($module['status']) ?></span><span class="card-arrow" aria-hidden="true">↗</span></div>
                </a>
            <?php endforeach; ?>
        </section>

        <section class="culture-band" id="culture">
            <div class="culture-copy"><p class="eyebrow eyebrow-light">A LITTLE CULTURE GOES A LONG WAY</p><h2>Every place<br>has a <em>story.</em></h2><p>From fika breaks to fietsen, our cities are full of little details that make a big impression. We’re collecting the ones that inspire us.</p><a href="#about" class="text-link">Meet the project <span aria-hidden="true">↗</span></a></div>
            <div class="culture-stamp" aria-hidden="true"><span>AMSTERDAM</span><b>×</b><span>STOCKHOLM</span><i>52° N&nbsp; · &nbsp;59° N</i></div>
            <div class="culture-decoration decoration-one" aria-hidden="true">✳</div><div class="culture-decoration decoration-two" aria-hidden="true">✳</div>
        </section>

        <section class="bulletin section-pad" id="bulletin">
            <div><p class="eyebrow">NOTES FROM THE JOURNEY</p><h2>Good things<br>happen <em>in progress.</em></h2></div>
            <div class="bulletin-note"><span class="note-icon" aria-hidden="true">✳</span><p>This is where we’ll share our experiments, updates and favourite discoveries as the project takes shape.</p><span class="note-caption">A WORK IN PROGRESS, BY DESIGN.</span></div>
        </section>

        <section class="about section-pad" id="about">
            <div class="about-top"><p class="eyebrow">THE PEOPLE MAKING IT HAPPEN</p><span class="about-coordinate">AMSTERDAM <span>↔</span> STOCKHOLM</span></div>
            <div class="about-content"><h2>Built by a team<br>that likes to <em>make.</em></h2><div><p>We’re a student team bringing game development, design, storytelling and technology together. This site is our shared window into the work.</p><div class="team-list" aria-label="Project team"><?php foreach ($team as $member): ?><span><?= $e($member) ?></span><?php endforeach; ?></div></div></div>
        </section>
    </main>

    <footer class="site-footer"><a class="wordmark footer-mark" href="index.php"><span class="wordmark-mark">B.</span><span>BETWEEN<br>PLACES</span></a><span>Made with curiosity, between Amsterdam & Stockholm.</span><a class="footer-top" href="#main">BACK TO TOP ↑</a></footer>
</body>
</html>
