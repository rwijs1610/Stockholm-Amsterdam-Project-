<!doctype html>
<html lang="en">

<head>
    <title>Bridging Cultures Project</title>
    <meta name="claude:viewport-fit-sides" content="cover">
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=DM+Sans:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap">
    <link rel="stylesheet" href="style.css">

</head>

<body>
    <header class="nav">
        <div class="nav-in">
            <a class="brand" href="#top"><i></i>Bridging Cultures</a>
            <a class="l" href="#games">Games</a>
            <a class="l" href="#board">Bulletin Board</a>
            <a class="l" href="#companion">Culture Companion</a>
            <a class="l" href="#cms">CMS</a>
            <button class="theme-btn" id="themeBtn" type="button" aria-label="Switch colour theme">Theme</button>
        </div>
    </header>

    <main class="wrap" id="top">
        <div class="hero">
            <p class="eyebrow">Mediacollege Amsterdam × LBS Kreativa Gymnasiet · Erasmus+</p>
            <h1><span class="a">Amsterdam</span> meets <span class="s">Stockholm</span> in play</h1>
            <p class="lead">Games, photos and small cultural discoveries from about 23 students in two cities, collected on
                one platform.</p>
            <div class="bridge" aria-hidden="true">
                <div class="city a"><b>Amsterdam</b>52.37°N 4.90°E</div>
                <svg viewBox="0 0 400 64" preserveAspectRatio="none">
                    <path class="arc" d="M2 62 Q200 -30 398 62" vector-effect="non-scaling-stroke" />
                </svg>
                <div class="city s"><b>Stockholm</b>59.33°N 18.07°E</div>
            </div>
            <p class="note"><b>Test site.</b> Games, posts and facts are made-up samples. The AI suggestions are canned,
                because the real Claude API call runs on the Node.js server and its key never reaches the browser. Hide a
                post in the CMS and it disappears from the board.</p>
        </div>

        <section class="mod" id="games">
            <div class="mod-head">
                <div>
                    <p class="eyebrow">Module 1 · Public</p>
                    <h2>Game Showcase</h2>
                </div>
                <p>One landing page per game, managed in the CMS. Edit a game there and the card below updates.</p>
            </div>
            <div class="games" id="gameGrid"></div>
        </section>

        <section class="mod" id="board">
            <div class="mod-head">
                <div>
                    <p class="eyebrow">Module 2 · Students + public</p>
                    <h2>Bulletin Board</h2>
                </div>
                <p>The living archive of the project. Filter by city or game and react to posts.</p>
            </div>
            <div class="filters" id="filters" role="group" aria-label="Filter posts"></div>
            <div class="board" id="boardGrid"></div>
        </section>

        <section class="mod" id="companion">
            <div class="mod-head">
                <div>
                    <p class="eyebrow">Module 3 · Students + public</p>
                    <h2>AI Culture Companion</h2>
                </div>
                <p>Tag a photo with a city. The backend asks the AI for three facts and three captions, and the student
                    picks one before publishing.</p>
            </div>
            <div class="two">
                <form class="panel" id="postForm" novalidate>
                    <h3>New post</h3>
                    <div class="photo ams" id="photoBox">sample photo · Amsterdam</div>
                    <fieldset class="field">
                        <legend>City tag</legend>
                        <div class="seg">
                            <label><input type="radio" name="city" value="Amsterdam" checked>Amsterdam</label>
                            <label><input type="radio" name="city" value="Stockholm">Stockholm</label>
                        </div>
                    </fieldset>
                    <div class="field">
                        <label for="authorIn">Your name</label>
                        <input type="text" id="authorIn" value="Test student">
                    </div>
                    <button class="btn primary" type="submit" id="genBtn">Get facts and captions</button>
                    <p class="status" id="genStatus" role="status"></p>
                </form>
                <div class="panel" id="resultPanel">
                    <h3>Suggestions</h3>
                    <p class="empty" id="resultEmpty">Choose a city and press the button. The suggestions appear here.</p>
                    <div class="result" id="result" hidden>
                        <div>
                            <p class="eyebrow" style="margin-bottom:8px">Three cultural facts</p>
                            <ul class="facts" id="factList"></ul>
                        </div>
                        <div>
                            <p class="eyebrow" style="margin-bottom:8px">Pick a caption</p>
                            <div class="caps" id="capList"></div>
                        </div>
                        <div class="field">
                            <label for="capEdit">Edit before publishing</label>
                            <textarea id="capEdit"></textarea>
                        </div>
                        <button class="btn" type="button" id="pubBtn">Publish to the Bulletin Board</button>
                    </div>
                </div>
            </div>

            <div class="wall-head">
                <h3>Culture Wall</h3>
                <p class="eyebrow">Tap a card to see its source and status</p>
            </div>
            <div class="wall">
                <div class="col" id="wallAms"></div>
                <div class="col sto" id="wallSto"></div>
            </div>
            <div class="link-card" aria-label="Connection between the two cities">
                <p class="l1"><b>Amsterdam:</b> koffietijd, a coffee break with something sweet.</p>
                <span class="x">↔</span>
                <p class="l2"><b>Stockholm:</b> fika, the same idea with a cinnamon bun.</p>
            </div>
        </section>

        <section class="mod" id="cms">
            <div class="mod-head">
                <div>
                    <p class="eyebrow">Module 4 · Teachers + students</p>
                    <h2>CMS</h2>
                </div>
                <p>A preview of the admin side. In the real build this is PHP with session login.</p>
            </div>
            <div class="cms">
                <div class="cms-bar">
                    <span class="who">Signed in as <b>teacher.demo</b> · role: teacher</span>
                    <span class="chip">Preview, no login</span>
                </div>
                <div class="stats" id="stats"></div>
                <div class="tabs" role="tablist" aria-label="CMS sections">
                    <button role="tab" id="tab-mod" aria-selected="true" aria-controls="panel-mod"
                        type="button">Moderation</button>
                    <button role="tab" id="tab-game" aria-selected="false" aria-controls="panel-game" type="button">Game
                        pages</button>
                </div>
                <div class="tabpanel" id="panel-mod" role="tabpanel" aria-labelledby="tab-mod">
                    <div class="tbl">
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Content</th>
                                    <th>City</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="modRows"></tbody>
                        </table>
                    </div>
                </div>
                <div class="tabpanel" id="panel-game" role="tabpanel" aria-labelledby="tab-game" hidden>
                    <div class="editor">
                        <div class="form">
                            <div class="field"><label for="gSel">Game</label><select id="gSel"></select></div>
                            <div class="field"><label for="gTitle">Title</label><input type="text" id="gTitle"></div>
                            <div class="field"><label for="gDesc">Description</label><textarea id="gDesc"></textarea></div>
                            <div class="field"><label for="gCred">Credits</label><input type="text" id="gCred"></div>
                            <div class="field"><label for="gLink">Play or download label</label><input type="text"
                                    id="gLink"></div>
                            <div><button class="btn primary" type="button" id="gSave">Save game page</button></div>
                        </div>
                        <div>
                            <p class="eyebrow" style="margin-bottom:8px">Live preview</p>
                            <div class="games" style="grid-template-columns:minmax(0,1fr)" id="gPrev"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <span>Bridging Cultures · full stack team test build · sample data only</span>
            <span class="mono">Stack target: Node.js · PHP · MySQL · HTML · CSS</span>
        </footer>
    </main>
    <div class="toast" id="toast" role="status" hidden></div>

    <script src="script.js" defer></script>
</body>

</html>