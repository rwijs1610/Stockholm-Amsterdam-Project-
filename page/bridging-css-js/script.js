(function() {
        var $ = function(id) {
            return document.getElementById(id);
        };

        function esc(s) {
            var d = document.createElement("div");
            d.textContent = s;
            return d.innerHTML;
        }

        var root = document.documentElement;
        $("themeBtn").addEventListener("click", function() {
            var dark = root.getAttribute("data-theme") === "dark" ||
                (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
            root.setAttribute("data-theme", dark ? "light" : "dark");
        });

        var tt;

        function toast(msg) {
            var t = $("toast");
            t.textContent = msg;
            t.hidden = false;
            clearTimeout(tt);
            tt = setTimeout(function() {
                t.hidden = true;
            }, 2600);
        }

        var games = [{
                id: "g1",
                cover: "c1",
                origin: "ams",
                title: "Canal Runner",
                desc: "A fast side-scroller over rooftops, bridges and bike lanes. Collect stroopwafels, dodge tourists.",
                credits: "Code: Mediacollege Amsterdam · Art: LBS Stockholm",
                link: "Play in browser"
            },
            {
                id: "g2",
                cover: "c2",
                origin: "sto",
                title: "Midnight Fika",
                desc: "A cosy puzzle game about running a late-night coffee kiosk on the island of Södermalm.",
                credits: "Code + art: LBS Kreativa Gymnasiet",
                link: "Download for Windows"
            },
            {
                id: "g3",
                cover: "c3",
                origin: "both",
                title: "Bridge Builders",
                desc: "Two players on two screens build one bridge, one plank at a time. Needs talking to win.",
                credits: "Joint team, Amsterdam + Stockholm",
                link: "Play in browser"
            }
        ];
        var originLabel = {
            ams: "Made in Amsterdam",
            sto: "Made in Stockholm",
            both: "Made together"
        };
        var originCls = {
            ams: "ams",
            sto: "sto",
            both: "both"
        };

        var posts = [{
                id: 1,
                author: "Noor",
                city: "Amsterdam",
                game: "Canal Runner",
                text: "Day one in Amsterdam. Database schema is on the whiteboard and the coffee is already gone.",
                ph: "linear-gradient(150deg,#F2764A,#A53208)",
                r: {
                    "❤️": 4,
                    "🔥": 2,
                    "👏": 1
                },
                status: "published"
            },
            {
                id: 2,
                author: "Elin",
                city: "Stockholm",
                game: "Midnight Fika",
                text: "Testing the kiosk puzzle on the tram. Cinnamon bun physics are still wrong.",
                ph: "linear-gradient(150deg,#4B8AD0,#153F72)",
                r: {
                    "❤️": 6,
                    "🔥": 1,
                    "👏": 3
                },
                status: "published"
            },
            {
                id: 3,
                author: "Daan",
                city: "Amsterdam",
                game: "Bridge Builders",
                text: "First call with the Stockholm team. Their planks, our bridge, one very confused screen share.",
                ph: "linear-gradient(150deg,#F0B400,#D5420B)",
                r: {
                    "❤️": 2,
                    "🔥": 5,
                    "👏": 0
                },
                status: "published"
            },
            {
                id: 4,
                author: "Astrid",
                city: "Stockholm",
                game: "Bridge Builders",
                text: "Found the matching colours: our blue, their orange. Looks like a flag swap.",
                ph: "linear-gradient(150deg,#2E6DB5,#F0B400)",
                r: {
                    "❤️": 7,
                    "🔥": 2,
                    "👏": 2
                },
                status: "published"
            },
            {
                id: 5,
                author: "Mees",
                city: "Amsterdam",
                game: "Canal Runner",
                text: "Posting a draft of the CMS login. Nothing to see yet, but the session works.",
                ph: "linear-gradient(150deg,#6b7280,#1f2937)",
                r: {
                    "❤️": 1,
                    "🔥": 0,
                    "👏": 4
                },
                status: "published"
            }
        ];
        var mine = {};

        var factBank = {
            Amsterdam: [
                "Amsterdam has about 100 km of canals and roughly 1,500 bridges.",
                "There are about as many bikes in the city as there are people.",
                "Many canal houses lean forward on purpose, so furniture can be hoisted up without hitting the front."
            ],
            Stockholm: [
                "Stockholm is spread over 14 islands, joined by more than 50 bridges.",
                "Fika is a daily coffee break with something sweet, and a real social ritual.",
                "Many metro stations are decorated with art, so the metro is called a long underground gallery."
            ]
        };
        var capBank = {
            Amsterdam: ["Bikes: 1, my balance: 0. Amsterdam, day one.", "Mind the canal. Mind the bike. Mind the planning.", "Built in Amsterdam, finished somewhere over the North Sea."],
            Stockholm: ["Fika first, bugs later. Greetings from Stockholm.", "Fourteen islands and one stubborn merge conflict.", "Dear Amsterdam: we brought buns. Where is the bridge?"]
        };
        var facts = [{
                id: "f1",
                city: "Amsterdam",
                text: "Amsterdam has about 100 km of canals and roughly 1,500 bridges.",
                status: "approved",
                src: "Sample, approved by teacher"
            },
            {
                id: "f2",
                city: "Stockholm",
                text: "Stockholm is spread over 14 islands, joined by more than 50 bridges.",
                status: "approved",
                src: "Sample, approved by teacher"
            },
            {
                id: "f3",
                city: "Stockholm",
                text: "Fika is a daily coffee break with something sweet, and a real social ritual.",
                status: "ai_generated",
                src: "Sample, from post by Elin"
            }
        ];
        var nextId = 100;

        function gameCard(g, preview) {
            return '<article class="game">' +
                '<div class="cover ' + g.cover + '" role="img" aria-label="Cover art placeholder"><span>cover art placeholder</span></div>' +
                '<div class="game-body"><span class="chip ' + originCls[g.origin] + '" style="justify-self:start">' + originLabel[g.origin] + '</span>' +
                '<h3>' + esc(g.title) + '</h3><p>' + esc(g.desc) + '</p><p class="credits">' + esc(g.credits) + '</p></div>' +
                '<div class="game-foot"><button class="btn ' + (g.origin === "sto" ? "sto" : "ams") + '" type="button" data-play="' + g.id + '">' + esc(g.link) + '</button></div></article>';
        }

        function renderGames() {
            $("gameGrid").innerHTML = games.map(function(g) {
                return gameCard(g);
            }).join("");
        }
        $("gameGrid").addEventListener("click", function(e) {
            if (e.target.getAttribute("data-play")) toast("Test site: the real button opens the game URL.");
        });

        var filter = "All";

        function renderFilters() {
            var opts = ["All", "Amsterdam", "Stockholm"].concat(games.map(function(g) {
                return g.title;
            }));
            $("filters").innerHTML = opts.map(function(o) {
                return '<button type="button" data-f="' + esc(o) + '" aria-pressed="' + (o === filter) + '">' + esc(o) + '</button>';
            }).join("");
        }
        $("filters").addEventListener("click", function(e) {
            var f = e.target.getAttribute("data-f");
            if (!f) return;
            filter = f;
            renderFilters();
            renderBoard();
        });

        function renderBoard() {
            var list = posts.filter(function(p) {
                if (p.status === "hidden") return false;
                return filter === "All" || p.city === filter || p.game === filter;
            });
            if (!list.length) {
                $("boardGrid").innerHTML = '<p class="empty">No posts match this filter yet.</p>';
                return;
            }
            $("boardGrid").innerHTML = list.map(function(p) {
                var rx = Object.keys(p.r).map(function(k) {
                    var on = !!mine[p.id + "|" + k];
                    return '<button type="button" data-rx="' + p.id + '|' + k + '" aria-pressed="' + on + '">' + k + ' ' + (p.r[k] + (on ? 1 : 0)) + '</button>';
                }).join("");
                return '<article class="post"><div class="ph" style="background:' + p.ph + '" role="img" aria-label="Photo placeholder"></div>' +
                    '<div class="pb"><div class="tags"><span class="chip ' + (p.city === "Amsterdam" ? "ams" : "sto") + '">' + p.city + '</span>' +
                    (p.game ? '<span class="chip">' + esc(p.game) + '</span>' : '') + '</div>' +
                    '<p>' + esc(p.text) + '</p><div class="meta"><span>' + esc(p.author) + '</span></div>' +
                    '<div class="react">' + rx + '</div></div></article>';
            }).join("");
        }
        $("boardGrid").addEventListener("click", function(e) {
            var k = e.target.getAttribute("data-rx");
            if (!k) return;
            mine[k] = !mine[k];
            renderBoard();
        });

        var current = null;
        var cityInputs = document.querySelectorAll('input[name="city"]');

        function cityVal() {
            return document.querySelector('input[name="city"]:checked').value;
        }

        function syncPhoto() {
            var c = cityVal(),
                b = $("photoBox");
            b.className = "photo " + (c === "Amsterdam" ? "ams" : "sto");
            b.textContent = "sample photo · " + c;
        }
        Array.prototype.forEach.call(cityInputs, function(i) {
            i.addEventListener("change", syncPhoto);
        });

        $("postForm").addEventListener("submit", function(e) {
            e.preventDefault();
            var c = cityVal();
            $("genBtn").disabled = true;
            $("genStatus").textContent = "Asking the server for suggestions…";
            setTimeout(function() {
                current = {
                    city: c,
                    facts: factBank[c],
                    caps: capBank[c]
                };
                $("factList").className = "facts " + (c === "Amsterdam" ? "ams" : "sto");
                $("factList").innerHTML = current.facts.map(function(f) {
                    return "<li>" + esc(f) + "</li>";
                }).join("");
                $("capList").innerHTML = current.caps.map(function(cap, i) {
                    return '<label><input type="radio" name="cap" value="' + i + '"' + (i === 0 ? " checked" : "") + '><span>' + esc(cap) + '</span></label>';
                }).join("");
                $("capEdit").value = current.caps[0];
                $("resultEmpty").hidden = true;
                $("result").hidden = false;
                $("genBtn").disabled = false;
                $("genStatus").textContent = "Done. JSON with 3 facts and 3 captions received (sample).";
            }, 700);
        });
        $("capList").addEventListener("change", function(e) {
            if (e.target.name === "cap") $("capEdit").value = current.caps[+e.target.value];
        });
        $("pubBtn").addEventListener("click", function() {
            if (!current) return;
            var txt = $("capEdit").value.trim();
            if (!txt) {
                toast("Write a caption first.");
                $("capEdit").focus();
                return;
            }
            var name = $("authorIn").value.trim() || "Test student";
            posts.unshift({
                id: ++nextId,
                author: name,
                city: current.city,
                game: "",
                text: txt,
                ph: current.city === "Amsterdam" ? "linear-gradient(150deg,#F2764A,#A53208)" : "linear-gradient(150deg,#4B8AD0,#153F72)",
                r: {
                    "❤️": 0,
                    "🔥": 0,
                    "👏": 0
                },
                status: "published"
            });
            current.facts.forEach(function(f) {
                var exists = facts.some(function(x) {
                    return x.text === f;
                });
                if (!exists) facts.push({
                    id: "f" + (++nextId),
                    city: current.city,
                    text: f,
                    status: "ai_generated",
                    src: "Sample, from post by " + name
                });
            });
            $("result").hidden = true;
            $("resultEmpty").hidden = false;
            current = null;
            $("genStatus").textContent = "";
            filter = "All";
            renderFilters();
            renderBoard();
            renderWall();
            renderCMS();
            toast("Published. New facts are on the Culture Wall.");
        });

        function wallCard(f) {
            return '<div class="flip"><button type="button" data-flip="' + f.id + '" aria-pressed="false" aria-label="Fact card, tap to flip">' +
                '<span class="face"><span>' + esc(f.text) + '</span><span class="eyebrow">' + f.city + '</span></span>' +
                '<span class="face back"><span>status: ' + f.status + '</span><span>source: ' + esc(f.src) + '</span></span></button></div>';
        }

        function renderWall() {
            ["Amsterdam", "Stockholm"].forEach(function(c) {
                var items = facts.filter(function(f) {
                    return f.city === c && f.status !== "hidden";
                });
                $(c === "Amsterdam" ? "wallAms" : "wallSto").innerHTML = '<h4>' + c + '</h4>' +
                    (items.length ? items.map(wallCard).join("") : '<p class="empty">No facts yet.</p>');
            });
        }
        document.querySelector(".wall").addEventListener("click", function(e) {
            var b = e.target.closest("[data-flip]");
            if (!b) return;
            b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
        });

        function statusChip(s) {
            var cls = s === "published" || s === "approved" ? "ok" : s === "hidden" ? "bad" : "warn";
            return '<span class="chip ' + cls + '">' + s + '</span>';
        }

        function renderCMS() {
            var rows = [];
            posts.forEach(function(p) {
                rows.push({
                    kind: "post",
                    id: p.id,
                    text: p.text,
                    city: p.city,
                    status: p.status
                });
            });
            facts.forEach(function(f) {
                rows.push({
                    kind: "fact",
                    id: f.id,
                    text: f.text,
                    city: f.city,
                    status: f.status
                });
            });
            $("modRows").innerHTML = rows.map(function(r) {
                var okLabel = r.kind === "fact" ? "Approve" : "Publish";
                var okVal = r.kind === "fact" ? "approved" : "published";
                return '<tr class="' + (r.status === "hidden" ? "hidden-row" : "") + '"><td><span class="chip">' + r.kind + '</span></td><td>' + esc(r.text) + '</td>' +
                    '<td><span class="chip ' + (r.city === "Amsterdam" ? "ams" : "sto") + '">' + r.city + '</span></td><td>' + statusChip(r.status) + '</td>' +
                    '<td><div class="act"><button class="btn sm" type="button" data-set="' + r.kind + '|' + r.id + '|' + okVal + '">' + okLabel + '</button>' +
                    '<button class="btn sm" type="button" data-set="' + r.kind + '|' + r.id + '|hidden">Hide</button></div></td></tr>';
            }).join("");
            var visPosts = posts.filter(function(p) {
                return p.status !== "hidden";
            }).length;
            var pending = facts.filter(function(f) {
                return f.status === "ai_generated";
            }).length;
            $("stats").innerHTML =
                '<div><b>' + visPosts + '</b><span>posts live</span></div>' +
                '<div><b>' + posts.filter(function(p) {
                    return p.city === "Amsterdam";
                }).length + ' / ' + posts.filter(function(p) {
                    return p.city === "Stockholm";
                }).length + '</b><span>Amsterdam / Stockholm posts</span></div>' +
                '<div><b>' + facts.length + '</b><span>facts generated</span></div>' +
                '<div><b>' + pending + '</b><span>facts awaiting review</span></div>';
        }
        $("modRows").addEventListener("click", function(e) {
            var v = e.target.getAttribute("data-set");
            if (!v) return;
            var p = v.split("|"),
                list = p[0] === "post" ? posts : facts;
            var item = list.filter(function(x) {
                return String(x.id) === p[1];
            })[0];
            if (!item) return;
            item.status = p[2];
            renderBoard();
            renderWall();
            renderCMS();
            toast((p[0] === "post" ? "Post " : "Fact ") + p[2] + ".");
        });

        var tabs = [
            ["tab-mod", "panel-mod"],
            ["tab-game", "panel-game"]
        ];
        tabs.forEach(function(t) {
            $(t[0]).addEventListener("click", function() {
                tabs.forEach(function(u) {
                    $(u[0]).setAttribute("aria-selected", u[0] === t[0] ? "true" : "false");
                    $(u[1]).hidden = u[0] !== t[0];
                });
            });
        });

        function fillEditor() {
            var g = games.filter(function(x) {
                return x.id === $("gSel").value;
            })[0];
            $("gTitle").value = g.title;
            $("gDesc").value = g.desc;
            $("gCred").value = g.credits;
            $("gLink").value = g.link;
            $("gPrev").innerHTML = gameCard(g, true);
        }
        $("gSel").innerHTML = games.map(function(g) {
            return '<option value="' + g.id + '">' + esc(g.title) + '</option>';
        }).join("");
        $("gSel").addEventListener("change", fillEditor);
        ["gTitle", "gDesc", "gCred", "gLink"].forEach(function(id) {
            $(id).addEventListener("input", function() {
                var g = games.filter(function(x) {
                    return x.id === $("gSel").value;
                })[0];
                $("gPrev").innerHTML = gameCard({
                    id: g.id,
                    cover: g.cover,
                    origin: g.origin,
                    title: $("gTitle").value,
                    desc: $("gDesc").value,
                    credits: $("gCred").value,
                    link: $("gLink").value
                });
            });
        });
        $("gSave").addEventListener("click", function() {
            var g = games.filter(function(x) {
                return x.id === $("gSel").value;
            })[0];
            g.title = $("gTitle").value.trim() || g.title;
            g.desc = $("gDesc").value;
            g.credits = $("gCred").value;
            g.link = $("gLink").value || g.link;
            var sel = $("gSel").value;
            $("gSel").innerHTML = games.map(function(x) {
                return '<option value="' + x.id + '">' + esc(x.title) + '</option>';
            }).join("");
            $("gSel").value = sel;
            renderGames();
            renderFilters();
            fillEditor();
            toast("Game page saved.");
        });

        renderGames();
        renderFilters();
        renderBoard();
        renderWall();
        renderCMS();
        fillEditor();
        syncPhoto();
    })();
