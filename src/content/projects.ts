import type { Project, ProjectLink } from './types.ts';

// The projects on the page, in the order they appear within their group (see GROUPS in types.ts).
// Every text is in English and German. The screenshots are paths in each repository: `pnpm shots`
// fetches them into static/shots/ (see tools/shots.ts and README, "Screenshots of the projects").
//
// The motivations are drafts written from the READMEs: change them freely.

const GITHUB = 'https://github.com/FionaPreroll';

function repo(slug: string): string {
	return `${GITHUB}/${slug}`;
}

/** The README, the changelog and other files of a repository's main branch. */
function readme(slug: string): ProjectLink {
	return { kind: 'readme', href: `${repo(slug)}#readme` };
}

function changelog(slug: string): ProjectLink {
	return { kind: 'changelog', href: `${repo(slug)}/blob/main/CHANGELOG.md` };
}

function doc(slug: string, file: string, en: string, de: string): ProjectLink {
	return { kind: 'docs', href: `${repo(slug)}/blob/main/${file}`, label: { en, de } };
}

function releases(slug: string): ProjectLink {
	return { kind: 'releases', href: `${repo(slug)}/releases` };
}

function apk(slug: string, file: string): ProjectLink {
	return { kind: 'apk', href: `${repo(slug)}/releases/latest/download/${file}` };
}

export const projects: Project[] = [
	// ── Games ────────────────────────────────────────────────────────────────────────────────
	{
		slug: 'vibe-wormholesurfing',
		name: 'Wormhole Surfing',
		group: 'games',
		started: '2026-11',
		ci: { workflow: 'ci.yml', coverage: true },
		tagline: {
			en: 'A 3D browser game: surf a wormhole on a cute spaceship and warp into strange worlds full of treasure.',
			de: 'Ein 3D-Browserspiel: mit einem niedlichen Raumschiff durch ein Wurmloch surfen und in seltsame Welten voller Schätze springen.'
		},
		motivation: {
			en: 'How far does code alone go? Not a single image, model or sound file: the ship, the chibi pilot, eight worlds, the music and every sound are generated in code, and the whole game still has to hold its frame rate on a phone.',
			de: 'Wie weit kommt man nur mit Code? Keine einzige Bild-, Modell- oder Tondatei: Schiff, Chibi-Pilotin, acht Welten, Musik und jedes Geräusch entstehen im Code, und das ganze Spiel muss trotzdem auf dem Handy flüssig laufen.'
		},
		summary: {
			en: 'Steer through a swirling tunnel, collect orbs for speed, dodge sparks and pick a warp hole before one picks you. Behind it, the pilot explores a world on foot and opens the treasure waiting there; rarer holes and longer rides bring rarer finds for the collection.',
			de: 'Man steuert durch einen wirbelnden Tunnel, sammelt Orbs für Tempo, weicht Funken aus und wählt ein Warp-Loch, bevor eines einen selbst wählt. Dahinter erkundet die Pilotin zu Fuß eine Welt und öffnet den Schatz, der dort wartet; seltenere Löcher und längere Flüge bringen seltenere Funde für die Sammlung.'
		},
		features: [
			{
				en: 'Eight worlds, from the Lagoon to the Aurora Void, each with its own sky, terrain, water, plants and music.',
				de: 'Acht Welten, von der Lagune bis zur Polarlicht-Leere, jede mit eigenem Himmel, Gelände, Wasser, Pflanzen und eigener Musik.'
			},
			{
				en: 'Forty treasures in five rarities, shiny variants, and a collection that can be shared as a picture.',
				de: 'Vierzig Schätze in fünf Seltenheitsstufen, schillernde Varianten und eine Sammlung, die sich als Bild teilen lässt.'
			},
			{
				en: 'Plays with keyboard, mouse, game controller, touch sticks or by tilting the phone.',
				de: 'Spielbar mit Tastatur, Maus, Controller, Touch-Sticks oder durch Neigen des Handys.'
			},
			{
				en: 'A cockpit HUD with a speed gauge and seven-segment displays drawn in SVG.',
				de: 'Ein Cockpit-HUD mit Tachonadel und Siebensegmentanzeigen, gezeichnet in SVG.'
			},
			{
				en: 'Installs as an app and plays offline; the Android app updates itself from GitHub releases.',
				de: 'Als App installierbar und offline spielbar; die Android-App aktualisiert sich aus den GitHub-Releases.'
			}
		],
		engineering: [
			{
				en: 'Game rules as pure, deterministic TypeScript at 120 steps a second, kept apart from three.js and the interface.',
				de: 'Spielregeln als reines, deterministisches TypeScript mit 120 Schritten pro Sekunde, getrennt von three.js und der Oberfläche.'
			},
			{
				en: 'A render pipeline with bloom, guards against broken HDR pixels and adaptive resolution; worlds are built in steps during the warp and their shaders compiled ahead, so arriving never stalls.',
				de: 'Eine Render-Pipeline mit Bloom, Schutz vor kaputten HDR-Pixeln und adaptiver Auflösung; Welten werden während des Warps schrittweise gebaut und ihre Shader vorab kompiliert, damit die Ankunft nie ruckelt.'
			},
			{
				en: 'Music generated bar by bar from a mood, every effect synthesized with Web Audio.',
				de: 'Musik, Takt für Takt aus einer Stimmung erzeugt, jeder Effekt mit Web Audio synthetisiert.'
			},
			{
				en: 'Playwright tests play whole rides with WebGL in software, a weekly soak test hunts memory and GPU leaks, and unit and browser coverage go to Codecov.',
				de: 'Playwright-Tests spielen ganze Flüge mit WebGL in Software, ein wöchentlicher Soak-Test sucht Speicher- und GPU-Lecks, und Unit- und Browser-Coverage gehen zu Codecov.'
			}
		],
		stack: [
			'TypeScript',
			'three.js',
			'Preact',
			'Web Audio',
			'Zod',
			'Capacitor',
			'Vite',
			'Vitest',
			'Playwright'
		],
		platforms: ['web', 'pwa', 'android'],
		links: [
			{ kind: 'live', href: 'https://fionapreroll.github.io/vibe-wormholesurfing/' },
			apk('vibe-wormholesurfing', 'wormhole-surfing.apk'),
			releases('vibe-wormholesurfing'),
			readme('vibe-wormholesurfing'),
			changelog('vibe-wormholesurfing')
		],
		hero: [
			{
				file: 'docs/screenshots/title.png',
				caption: {
					en: 'The title screen: the ship and its pilot ride the wormhole',
					de: 'Der Titelbildschirm: Schiff und Pilotin reiten durchs Wurmloch'
				}
			}
		],
		gallery: [
			{
				file: 'docs/screenshots/ride.png',
				caption: {
					en: 'The ride: light-years flown, speed, orbs, sparks and warp holes',
					de: 'Der Flug: Lichtjahre, Tempo, Orbs, Funken und Warp-Löcher'
				}
			},
			{
				file: 'docs/screenshots/world.png',
				caption: {
					en: 'Arrived in the Lagoon, with the compass pointing to the treasure',
					de: 'Angekommen in der Lagune, der Kompass zeigt zum Schatz'
				}
			},
			{
				file: 'docs/screenshots/opening.png',
				caption: {
					en: 'The star capsule opens in the light of the treasure’s rarity',
					de: 'Die Sternkapsel öffnet sich im Licht der Seltenheit ihres Schatzes'
				}
			},
			{
				file: 'docs/screenshots/reward.png',
				caption: {
					en: 'What it held, how rare it is and whether it is new',
					de: 'Was drin war, wie selten es ist und ob es neu ist'
				}
			}
		]
	},
	{
		slug: 'vibe-puzzles',
		name: 'Vibe Puzzles',
		group: 'games',
		started: '2026-10',
		ci: { workflow: 'ci.yml', coverage: true },
		tagline: {
			en: 'Six logic puzzles with unique solutions, generated on the device, with hints that explain the next step.',
			de: 'Sechs Logikrätsel mit eindeutiger Lösung, erzeugt auf dem Gerät, mit Tipps, die den nächsten Schritt erklären.'
		},
		motivation: {
			en: 'Puzzle apps like to hide their best puzzles behind ads and subscriptions. Here, deterministic algorithms make every puzzle with a guaranteed unique solution, and when you are stuck, a hint shows not just what to do next but why.',
			de: 'Rätsel-Apps verstecken ihre besten Rätsel gern hinter Werbung und Abos. Hier erzeugen deterministische Algorithmen jedes Rätsel mit garantiert eindeutiger Lösung, und wer feststeckt, bekommt einen Tipp, der nicht nur zeigt, was als Nächstes kommt, sondern warum.'
		},
		summary: {
			en: 'Tetroid, Pinwheel, Sudoku, Calcudoku, Loop and Pipes in several sizes and levels, plus daily, weekly and monthly specials. A puzzle ID gives the same puzzle on every device, and an optional server syncs progress and ranks solves.',
			de: 'Tetroid, Pinwheel, Sudoku, Calcudoku, Loop und Pipes in mehreren Größen und Stufen, dazu Tages-, Wochen- und Monatsrätsel. Eine Rätsel-ID ergibt auf jedem Gerät dasselbe Rätsel, und ein optionaler Server synchronisiert den Fortschritt und führt Bestenlisten.'
		},
		features: [
			{
				en: 'Hints in two stages: first where to look and which rule applies, then the step that follows from your own marks.',
				de: 'Tipps in zwei Stufen: erst, wohin man schauen sollte und welche Regel greift, dann der Schritt, der aus den eigenen Markierungen folgt.'
			},
			{
				en: 'Trials: try an idea in teal, then keep or discard it as a whole.',
				de: 'Versuche: eine Idee in Türkis ausprobieren und dann als Ganzes behalten oder verwerfen.'
			},
			{
				en: 'Undo, checkpoints, notes, error highlighting, timers, zoom, keyboard and touch controls.',
				de: 'Rückgängig, Zwischenstände, Notizen, Fehlermarkierung, Timer, Zoom, Tastatur- und Touchsteuerung.'
			},
			{
				en: 'A guided tutorial for every game, and an Inside page that shows as a film how a puzzle is made.',
				de: 'Ein geführtes Tutorial für jedes Spiel und eine Inside-Seite, die als Film zeigt, wie ein Rätsel entsteht.'
			},
			{
				en: 'Seasonal looks for Halloween, winter and Christmas, each by day and by night.',
				de: 'Jahreszeitliche Looks für Halloween, Winter und Weihnachten, jeweils bei Tag und bei Nacht.'
			}
		],
		engineering: [
			{
				en: 'Deterministic generators and solvers that prove every puzzle has exactly one solution, plus a pre-generated puzzle bank.',
				de: 'Deterministische Generatoren und Löser, die beweisen, dass jedes Rätsel genau eine Lösung hat, dazu eine vorab erzeugte Rätselbank.'
			},
			{
				en: 'SvelteKit as a static PWA on GitHub Pages, or with an optional server on Cloudflare Workers and D1 for sync and scores.',
				de: 'SvelteKit als statische PWA auf GitHub Pages oder mit optionalem Server auf Cloudflare Workers und D1 für Sync und Bestenlisten.'
			},
			{
				en: 'Nothing deploys before lint, type checks, unit, browser and server tests pass; accessibility is checked with axe, and load and soak tests run on a schedule.',
				de: 'Nichts geht live, bevor Lint, Typprüfung, Unit-, Browser- und Servertests bestanden sind; die Barrierefreiheit prüft axe, und Last- und Soak-Tests laufen regelmäßig.'
			}
		],
		stack: [
			'TypeScript',
			'SvelteKit',
			'Svelte',
			'Tailwind CSS',
			'Cloudflare Workers',
			'D1',
			'Vitest',
			'fast-check',
			'Playwright'
		],
		platforms: ['web', 'pwa'],
		links: [
			{ kind: 'live', href: 'https://fionapreroll.github.io/vibe-puzzles/' },
			releases('vibe-puzzles'),
			readme('vibe-puzzles'),
			doc(
				'vibe-puzzles',
				'docs/generators.md',
				'How the generators work',
				'Wie die Generatoren arbeiten'
			),
			changelog('vibe-puzzles')
		],
		hero: [
			{
				file: 'docs/screenshots/home.png',
				caption: {
					en: 'The home page: every game with its tutorial and its daily puzzle',
					de: 'Die Startseite: jedes Spiel mit Tutorial und Tagesrätsel'
				},
				focus: 'top'
			}
		],
		gallery: [
			{
				file: 'docs/screenshots/tetroid.png',
				caption: { en: 'Tetroid, half solved', de: 'Tetroid, halb gelöst' }
			},
			{
				file: 'docs/screenshots/pinwheel.png',
				caption: {
					en: 'Pinwheel: regions symmetric around their circle',
					de: 'Pinwheel: Regionen, symmetrisch um ihren Kreis'
				}
			},
			{
				file: 'docs/screenshots/loop.png',
				caption: {
					en: 'Loop, with crosses around the zeros',
					de: 'Loop, mit Kreuzen um die Nullen'
				}
			},
			{
				file: 'docs/screenshots/pipes.png',
				caption: {
					en: 'Pipes: water fills every joined pipe',
					de: 'Pipes: Wasser füllt jedes verbundene Rohr'
				}
			},
			{
				file: 'docs/screenshots/calcudoku.png',
				caption: { en: 'A 7×7 Calcudoku', de: 'Ein Calcudoku, 7×7' }
			},
			{
				file: 'docs/screenshots/hint.png',
				caption: {
					en: 'A hint: where to look, the step, and why',
					de: 'Ein Tipp: wohin schauen, der Schritt und warum'
				}
			},
			{
				file: 'docs/screenshots/trial.png',
				caption: {
					en: 'A trial in teal, with Keep and Discard',
					de: 'Ein Versuch in Türkis, mit Behalten und Verwerfen'
				}
			},
			{
				file: 'docs/screenshots/look-halloween-night.png',
				caption: { en: 'The Halloween look by night', de: 'Der Halloween-Look bei Nacht' },
				focus: 'top'
			},
			{
				file: 'docs/screenshots/widescreen.png',
				caption: {
					en: 'Widescreen on a tablet in landscape',
					de: 'Breitbild auf dem Tablet im Querformat'
				}
			},
			{
				file: 'docs/screenshots/phone-de-night.png',
				caption: {
					en: 'On a phone, in German, by night',
					de: 'Auf dem Handy, auf Deutsch, bei Nacht'
				}
			}
		]
	},
	{
		slug: 'vibe-laser',
		name: 'Vibe Laser',
		group: 'games',
		started: '2026-10',
		ci: { workflow: 'ci.yml', coverage: true },
		tagline: {
			en: 'A laser logic puzzle: place mirrors, prisms and filters until every coin is lit in exactly its color.',
			de: 'Ein Laser-Logikrätsel: Spiegel, Prismen und Filter setzen, bis jede Münze in genau ihrer Farbe leuchtet.'
		},
		motivation: {
			en: 'A love letter to the puzzle classic Aargon Deluxe (2001): its rules rebuilt from a written specification, with an original name, art and levels, so that it plays like the original without copying it.',
			de: 'Eine Liebeserklärung an den Rätselklassiker Aargon Deluxe (2001): die Regeln aus einer schriftlichen Spezifikation neu gebaut, mit eigenem Namen, eigener Grafik und eigenen Levels, sodass es sich wie das Original spielt, ohne es zu kopieren.'
		},
		summary: {
			en: 'Nineteen optical parts, from mirrors and prisms to color converters and polarizers, and six hazards and actors: explosives, fuel cells, black holes, slimes, robot mines and spaceships. Seven level packs, a level editor, and levels that travel as links.',
			de: 'Neunzehn optische Bauteile, von Spiegeln und Prismen bis zu Farbwandlern und Polarisatoren, und sechs Gefahren und Akteure: Sprengstoff, Brennstoffzellen, Schwarze Löcher, Schleime, Robotminen und Raumschiffe. Sieben Levelpakete, ein Level-Editor und Levels, die sich als Link verschicken lassen.'
		},
		features: [
			{
				en: 'A live preview: while a piece is carried, faint beams show where its light would go.',
				de: 'Eine Live-Vorschau: Während man ein Teil trägt, zeigen blasse Strahlen, wohin sein Licht gehen würde.'
			},
			{
				en: 'Hints & Solutions shows where the next piece goes, or plays the whole solution.',
				de: '„Hinweise & Lösungen“ zeigt, wohin das nächste Teil gehört, oder spielt die ganze Lösung vor.'
			},
			{
				en: 'A color-blind mode that writes colors as letters and draws each color in a beam as its own line.',
				de: 'Ein Farbenblind-Modus, der Farben als Buchstaben schreibt und jede Farbe im Strahl als eigene Linie zeichnet.'
			},
			{
				en: 'Mouse, touch with pinch zoom, keyboard and game controller, with every binding changeable.',
				de: 'Maus, Touch mit Pinch-Zoom, Tastatur und Controller, jede Belegung änderbar.'
			},
			{
				en: 'Profiles with their own progress and settings, moves and par per level, export and import.',
				de: 'Profile mit eigenem Fortschritt und eigenen Einstellungen, Züge und Par pro Level, Export und Import.'
			}
		],
		engineering: [
			{
				en: 'The beam model as pure TypeScript with property-based tests (fast-check); PixiJS 8 only draws it.',
				de: 'Das Strahlenmodell als reines TypeScript mit eigenschaftsbasierten Tests (fast-check); PixiJS 8 zeichnet es nur.'
			},
			{
				en: 'Level packs checked by Zod schemas, with JSON Schemas generated from them for editors.',
				de: 'Levelpakete, geprüft durch Zod-Schemas, mit daraus erzeugten JSON-Schemas für Editoren.'
			},
			{
				en: 'Offline through a service worker plugin of its own for Vite; the README screenshots are taken by Playwright in CI.',
				de: 'Offline dank eines eigenen Service-Worker-Plugins für Vite; die Screenshots der README nimmt Playwright in der CI auf.'
			}
		],
		stack: ['TypeScript', 'PixiJS', 'Preact', 'Zod', 'Vite', 'Vitest', 'fast-check', 'Playwright'],
		platforms: ['web', 'pwa'],
		links: [
			{ kind: 'live', href: 'https://fionapreroll.github.io/vibe-laser/' },
			readme('vibe-laser'),
			changelog('vibe-laser')
		],
		hero: [
			{
				file: 'docs/screenshots/solved.png',
				caption: {
					en: 'A solved level: a prism splits white light into red, green and blue, and every coin spins',
					de: 'Ein gelöstes Level: Ein Prisma teilt weißes Licht in Rot, Grün und Blau, und jede Münze dreht sich'
				}
			}
		],
		gallery: [
			{
				file: 'docs/screenshots/packs.png',
				caption: {
					en: 'Seven level packs, from the Tutorial to Powder Keg',
					de: 'Sieben Levelpakete, vom Tutorial bis zum Pulverfass'
				}
			},
			{
				file: 'docs/screenshots/skills.png',
				caption: {
					en: 'Each pack chooses its skill on a screen of its own',
					de: 'Jedes Paket wählt seine Stufe auf einem eigenen Bildschirm'
				}
			},
			{
				file: 'docs/screenshots/preview.png',
				caption: {
					en: 'While a piece is carried, faint beams show where its light would go',
					de: 'Beim Tragen zeigen blasse Strahlen, wohin das Licht ginge'
				}
			},
			{
				file: 'docs/screenshots/neon.png',
				caption: {
					en: 'Explosives, fuel cells and black holes in the Neon look',
					de: 'Sprengstoff, Brennstoffzellen und Schwarze Löcher im Neon-Look'
				}
			},
			{
				file: 'docs/screenshots/hint.png',
				caption: {
					en: 'A hint outlines where the next piece goes',
					de: 'Ein Hinweis umrandet, wohin das nächste Teil gehört'
				}
			},
			{
				file: 'docs/screenshots/color-blind.png',
				caption: {
					en: 'Color-blind mode: colors as letters, each color its own line',
					de: 'Farbenblind-Modus: Farben als Buchstaben, jede Farbe eine eigene Linie'
				}
			},
			{
				file: 'docs/screenshots/editor.png',
				caption: { en: 'The level editor', de: 'Der Level-Editor' }
			},
			{
				file: 'docs/screenshots/phone.png',
				caption: {
					en: 'On a phone held sideways, the buttons sit beside the board',
					de: 'Auf dem Handy im Querformat sitzen die Knöpfe neben dem Brett'
				}
			}
		]
	},

	// ── Networking & peer to peer ───────────────────────────────────────────────────────────
	{
		slug: 'vibe-mugames',
		name: 'Spielekiste',
		group: 'networking',
		started: '2026-11',
		ci: { workflow: 'ci.yml', coverage: true },
		tagline: {
			en: 'Board, card, dice and party games for phones side by side, connected directly by QR code, without internet or a server.',
			de: 'Brett-, Karten-, Würfel- und Partyspiele für Handys nebeneinander, direkt per QR-Code verbunden, ohne Internet und ohne Server.'
		},
		motivation: {
			en: 'A game night shouldn’t need accounts, ads or the Wi-Fi password. A box of classics where the phones on the table talk directly to each other, over a hotspot or by Bluetooth, and nothing leaves the table.',
			de: 'Ein Spieleabend sollte keine Accounts, keine Werbung und kein WLAN-Passwort brauchen. Eine Kiste voller Klassiker, in der die Handys auf dem Tisch direkt miteinander sprechen, über einen Hotspot oder per Bluetooth, und nichts verlässt den Tisch.'
		},
		summary: {
			en: 'Twenty-two games of four kinds: tactics such as Nine Men’s Morris, Draughts and Chinese Checkers; luck and bluff such as Ludo, Mäxchen and Werewolf; party games such as City, Country, River; and real-time games such as Light Racers and an air hockey rink that runs across two phones. Up to eight phones sit at a table, or two to six players share one laptop.',
			de: 'Zweiundzwanzig Spiele in vier Sorten: Taktik wie Mühle, Dame und Halma; Glück und Bluff wie Ludo, Mäxchen und Werwolf; Partyspiele wie Stadt, Land, Fluss; und Echtzeitspiele wie Lichtrenner und ein Airhockey-Feld, das über zwei Handys läuft. Bis zu acht Handys sitzen an einem Tisch, oder zwei bis sechs Leute teilen sich einen Laptop.'
		},
		features: [
			{
				en: 'Pairing by QR code over any Wi-Fi or a phone’s hotspot, or by Bluetooth in the Android app.',
				de: 'Koppeln per QR-Code über jedes WLAN oder den Hotspot eines Handys, oder per Bluetooth in der Android-App.'
			},
			{
				en: 'Hidden cards stay hidden: the host decides everything and sends each phone only what it may see.',
				de: 'Verdeckte Karten bleiben verdeckt: Der Host entscheidet alles und schickt jedem Handy nur, was es sehen darf.'
			},
			{
				en: 'The rules of every game step by step with drawings, in English and German.',
				de: 'Die Regeln jedes Spiels Schritt für Schritt mit Zeichnungen, auf Deutsch und Englisch.'
			},
			{
				en: 'Themes from wood and green felt to neon that follow the seasons, and stickers on queer and trans days of visibility.',
				de: 'Themes von Holz und grünem Filz bis Neon, die den Jahreszeiten folgen, und Sticker an queeren und trans Aktionstagen.'
			},
			{
				en: 'No accounts, no tracking, no ads; installable and playable offline.',
				de: 'Keine Accounts, kein Tracking, keine Werbung; installierbar und offline spielbar.'
			}
		],
		engineering: [
			{
				en: 'Built on @fionapreroll/p2p and @fionapreroll/p2p-nearby, the networking libraries that grew out of Spark Hunt.',
				de: 'Gebaut auf @fionapreroll/p2p und @fionapreroll/p2p-nearby, den Netzwerk-Bibliotheken, die aus Spark Hunt entstanden sind.'
			},
			{
				en: 'Real-time games over the same peer-to-peer connection; the air hockey puck is smoothed with a Kalman filter.',
				de: 'Echtzeitspiele über dieselbe Peer-to-Peer-Verbindung; den Airhockey-Puck glättet ein Kalman-Filter.'
			},
			{
				en: 'Browser tests in Chromium over real WebRTC connections, unit and browser coverage on Codecov, and an Android APK built by CI on every push.',
				de: 'Browsertests in Chromium über echte WebRTC-Verbindungen, Unit- und Browser-Coverage auf Codecov und ein Android-APK, das die CI bei jedem Push baut.'
			}
		],
		stack: ['TypeScript', 'WebRTC', 'Capacitor', 'Vite', 'Vitest', 'fast-check', 'Playwright'],
		platforms: ['web', 'pwa', 'android'],
		links: [
			{ kind: 'live', href: 'https://fionapreroll.github.io/vibe-mugames/' },
			apk('vibe-mugames', 'spielekiste.apk'),
			releases('vibe-mugames'),
			readme('vibe-mugames'),
			doc('vibe-mugames', 'docs/GAMES.md', 'The games', 'Die Spiele'),
			doc('vibe-mugames', 'docs/PLAYING.md', 'How to play', 'So wird gespielt'),
			doc('vibe-mugames', 'docs/ARCHITECTURE.md', 'Architecture', 'Architektur'),
			doc('vibe-mugames', 'docs/NETWORKING.md', 'Networking', 'Netzwerk'),
			{ kind: 'privacy', href: `${repo('vibe-mugames')}/blob/main/PRIVACY.md` },
			changelog('vibe-mugames')
		],
		hero: [
			{
				file: 'docs/screenshots/home.png',
				caption: { en: 'The start screen', de: 'Der Startbildschirm' }
			},
			{
				file: 'docs/screenshots/muehle.png',
				caption: { en: 'Nine Men’s Morris', de: 'Mühle' }
			},
			{
				file: 'docs/screenshots/werwolf.png',
				caption: {
					en: 'Werewolf, handed round one phone',
					de: 'Werwolf, herumgereicht an einem Handy'
				}
			}
		],
		gallery: [
			{
				file: 'docs/screenshots/chooser.png',
				caption: { en: 'The game chooser on a laptop', de: 'Die Spielauswahl am Laptop' }
			},
			{
				file: 'docs/screenshots/ludo.png',
				caption: { en: 'Ludo for up to four', de: 'Ludo für bis zu vier' }
			},
			{
				file: 'docs/screenshots/maexchen.png',
				caption: {
					en: 'Mäxchen: only the roller sees the dice',
					de: 'Mäxchen: Nur wer würfelt, sieht die Würfel'
				}
			},
			{
				file: 'docs/screenshots/stadtlandfluss.png',
				caption: {
					en: 'City, Country, River: checking the answers',
					de: 'Stadt, Land, Fluss: die Antworten prüfen'
				}
			},
			{
				file: 'docs/screenshots/lichtrenner.png',
				caption: {
					en: 'Light Racers: each phone steers its own rider',
					de: 'Lichtrenner: Jedes Handy steuert seinen eigenen Fahrer'
				}
			},
			{
				file: 'docs/screenshots/airhockey.png',
				caption: { en: 'Air hockey', de: 'Airhockey' }
			},
			{
				file: 'docs/screenshots/miaumiau-split.png',
				caption: {
					en: 'Miau-Miau for four on a split screen',
					de: 'Miau-Miau zu viert auf geteiltem Bildschirm'
				}
			},
			{
				file: 'docs/screenshots/pairing.png',
				caption: { en: 'Pairing by QR code', de: 'Koppeln per QR-Code' }
			},
			{
				file: 'docs/screenshots/themes.png',
				caption: {
					en: 'Themes, here with the seasons: Halloween',
					de: 'Themes, hier passend zur Jahreszeit: Halloween'
				}
			}
		]
	},
	{
		slug: 'vibe-portredirect',
		name: 'PortRedirect',
		group: 'networking',
		started: '2026-10',
		ci: { workflow: 'rust-test.yml', coverage: true },
		tagline: {
			en: 'Glue your frontend to the backend: a lightweight TCP forwarder that tunnels connections over QUIC.',
			de: 'Frontend und Backend verkleben: ein schlanker TCP-Forwarder, der Verbindungen durch einen QUIC-Tunnel leitet.'
		},
		motivation: {
			en: 'A home server behind a router can’t be reached from outside. PortRedirect lets a small, cheap public server take the connections and pass them through an encrypted tunnel that the home server opens itself: no port forwarding, and almost as if the big machine were on the internet.',
			de: 'Ein Heimserver hinter einem Router ist von außen nicht erreichbar. Mit PortRedirect nimmt ein kleiner, günstiger öffentlicher Server die Verbindungen an und reicht sie durch einen verschlüsselten Tunnel weiter, den der Heimserver selbst aufbaut: ohne Portweiterleitung und fast so, als stünde die große Maschine im Netz.'
		},
		summary: {
			en: 'The server listens for TCP connections, on port 443 for example, and tunnels each one as a stream over a persistent QUIC connection; the client hands it to the target service, such as localhost:8443. Both sides authenticate with a pre-shared key, and the client pins the server’s certificate.',
			de: 'Der Server nimmt TCP-Verbindungen an, etwa auf Port 443, und tunnelt jede als Stream über eine dauerhafte QUIC-Verbindung; der Client reicht sie an den Zieldienst weiter, etwa localhost:8443. Beide Seiten authentifizieren sich mit einem Pre-Shared Key, und der Client pinnt das Zertifikat des Servers.'
		},
		features: [
			{
				en: 'Several clients with standby, reconnects, graceful shutdown, and reloading the configuration on SIGHUP.',
				de: 'Mehrere Clients mit Standby, Reconnects, sauberes Herunterfahren und Neuladen der Konfiguration per SIGHUP.'
			},
			{
				en: 'Limits per client address, and Prometheus metrics.',
				de: 'Limits pro Client-Adresse und Prometheus-Metriken.'
			},
			{
				en: 'Configured by a TOML file or environment variables.',
				de: 'Konfiguration per TOML-Datei oder Umgebungsvariablen.'
			},
			{
				en: 'Prebuilt binaries for Linux on amd64, arm64 and armv7, with glibc or static with musl, and Docker images for all three.',
				de: 'Fertige Binaries für Linux auf amd64, arm64 und armv7, mit glibc oder statisch mit musl, und Docker-Images für alle drei.'
			}
		],
		engineering: [
			{
				en: 'Rust with Tokio, quinn for QUIC and rustls; a documented wire protocol and a written security review.',
				de: 'Rust mit Tokio, quinn für QUIC und rustls; ein dokumentiertes Protokoll und ein schriftliches Security-Review.'
			},
			{
				en: 'Fuzzing, cargo-deny, CodeQL and dependency audits in CI, with coverage from cargo-llvm-cov.',
				de: 'Fuzzing, cargo-deny, CodeQL und Abhängigkeits-Audits in der CI, Coverage mit cargo-llvm-cov.'
			},
			{
				en: 'End-to-end tests and benchmarks with iperf3 and netcat, BATS tests, and builds tested on each architecture before every snapshot release.',
				de: 'End-to-End-Tests und Benchmarks mit iperf3 und netcat, BATS-Tests und auf jeder Architektur getestete Builds vor jedem Snapshot-Release.'
			},
			{
				en: 'Release binaries with SHA256 sums and attestations of where they were built.',
				de: 'Release-Binaries mit SHA256-Summen und Attestierung, wo sie gebaut wurden.'
			}
		],
		stack: ['Rust', 'Tokio', 'QUIC', 'rustls', 'Prometheus', 'Docker'],
		platforms: ['linux', 'docker'],
		links: [
			releases('vibe-portredirect'),
			{
				kind: 'docker',
				href: `${repo('vibe-portredirect')}/pkgs/container/portredirect-server`,
				label: { en: 'Docker image: server', de: 'Docker-Image: Server' }
			},
			{
				kind: 'docker',
				href: `${repo('vibe-portredirect')}/pkgs/container/portredirect-client`,
				label: { en: 'Docker image: client', de: 'Docker-Image: Client' }
			},
			readme('vibe-portredirect'),
			doc('vibe-portredirect', 'ARCHITECTURE.md', 'Architecture', 'Architektur'),
			doc('vibe-portredirect', 'docs/PROTOCOL.md', 'Protocol', 'Protokoll'),
			doc('vibe-portredirect', 'docs/PERFORMANCE.md', 'Performance', 'Performance'),
			doc('vibe-portredirect', 'docs/SECURITY-REVIEW.md', 'Security review', 'Security-Review'),
			changelog('vibe-portredirect')
		],
		hero: [
			{
				file: 'docs/portredirect_logo.png',
				caption: {
					en: 'The PortRedirect logo: a green pipe',
					de: 'Das PortRedirect-Logo: ein grünes Rohr'
				}
			}
		],
		gallery: [
			{
				file: 'docs/benchmark_tunneled_test.svg',
				caption: {
					en: 'A browser reaches a home server through the QUIC tunnel',
					de: 'Ein Browser erreicht einen Heimserver durch den QUIC-Tunnel'
				}
			},
			{
				file: 'docs/benchmark_baseline_test.svg',
				caption: {
					en: 'For comparison: a direct TCP connection',
					de: 'Zum Vergleich: eine direkte TCP-Verbindung'
				}
			},
			{
				file: 'docs/cargo-mods-lib.svg',
				caption: {
					en: 'The crate’s modules and how they depend on each other',
					de: 'Die Module der Crate und wie sie voneinander abhängen'
				}
			}
		]
	},
	{
		slug: 'vibe-p2pgame',
		name: 'Spark Hunt',
		group: 'networking',
		started: '2026-10',
		ci: { workflow: 'ci.yml', coverage: true },
		tagline: {
			en: 'A real-time game for phones lying side by side, with no internet and no server, not even to connect.',
			de: 'Ein Echtzeitspiel für Handys, die nebeneinander liegen, ohne Internet und ohne Server, nicht einmal zum Verbinden.'
		},
		motivation: {
			en: 'The project is about the connection: can phones play together in real time with no server at all, not even for signalling? The game is small on purpose, and the networking grew into three libraries that other apps use now.',
			de: 'Im Mittelpunkt steht die Verbindung: Können Handys in Echtzeit zusammen spielen, ganz ohne Server, nicht einmal für den Verbindungsaufbau? Das Spiel ist absichtlich klein, und aus dem Netzwerkteil sind drei Bibliotheken geworden, die inzwischen andere Apps nutzen.'
		},
		summary: {
			en: 'Every player steers a glowing dot, and whoever reaches a spark first scores, while mines cost points. The phones swap their WebRTC offers by scanning each other’s QR codes over a shared Wi-Fi or hotspot, or connect by Bluetooth in the Android app; up to eight play together.',
			de: 'Alle steuern einen leuchtenden Punkt, und wer einen Funken zuerst erreicht, punktet, während Minen Punkte kosten. Die Handys tauschen ihre WebRTC-Angebote, indem sie gegenseitig ihre QR-Codes scannen, über ein gemeinsames WLAN oder einen Hotspot, oder sie verbinden sich in der Android-App per Bluetooth; bis zu acht spielen zusammen.'
		},
		features: [
			{
				en: 'A live connection graph with ping, a connection test under load, and a debug report without names or addresses.',
				de: 'Ein Live-Verbindungsgraph mit Ping, ein Verbindungstest unter Last und ein Debug-Bericht ohne Namen und Adressen.'
			},
			{
				en: 'Players who drop out, even the host, rejoin and get their place and score back.',
				de: 'Wer rausfliegt, sogar der Host, kommt wieder rein und bekommt Platz und Punkte zurück.'
			},
			{
				en: 'QR scanning made for screens: tap to focus, zoom, brightness, switching cameras, or text codes without a camera.',
				de: 'QR-Scannen, gemacht für Bildschirme: Tippen zum Fokussieren, Zoom, Helligkeit, Kamerawechsel oder Text-Codes ohne Kamera.'
			},
			{
				en: 'A color and a shape for every player, so the dots stay apart for color-blind players too.',
				de: 'Eine Farbe und eine Form für alle, damit die Punkte auch für Farbenblinde unterscheidbar bleiben.'
			}
		],
		engineering: [
			{
				en: '@fionapreroll/p2p: codes, WebRTC, connections over any transport, rooms and QR codes.',
				de: '@fionapreroll/p2p: Codes, WebRTC, Verbindungen über beliebige Transportwege, Räume und QR-Codes.'
			},
			{
				en: '@fionapreroll/p2p-nearby: Bluetooth for Capacitor apps through Google’s Nearby Connections, written in Java.',
				de: '@fionapreroll/p2p-nearby: Bluetooth für Capacitor-Apps über Googles Nearby Connections, geschrieben in Java.'
			},
			{
				en: '@fionapreroll/app-updates: updates of Android apps from their own GitHub release, with pause and resume.',
				de: '@fionapreroll/app-updates: Updates von Android-Apps aus ihrem eigenen GitHub-Release, mit Pause und Fortsetzen.'
			},
			{
				en: 'All three published on GitHub Packages; Playwright tests over real WebRTC, and property-based tests with fast-check.',
				de: 'Alle drei veröffentlicht auf GitHub Packages; Playwright-Tests über echtes WebRTC und eigenschaftsbasierte Tests mit fast-check.'
			}
		],
		stack: [
			'TypeScript',
			'WebRTC',
			'Capacitor',
			'Java',
			'Vite',
			'Vitest',
			'fast-check',
			'Playwright'
		],
		platforms: ['web', 'pwa', 'android'],
		links: [
			{ kind: 'live', href: 'https://fionapreroll.github.io/vibe-p2pgame/' },
			apk('vibe-p2pgame', 'spark-hunt.apk'),
			releases('vibe-p2pgame'),
			{
				kind: 'packages',
				href: `${repo('vibe-p2pgame')}/pkgs/npm/p2p`,
				label: { en: 'Package @fionapreroll/p2p', de: 'Paket @fionapreroll/p2p' }
			},
			{
				kind: 'packages',
				href: `${repo('vibe-p2pgame')}/pkgs/npm/p2p-nearby`,
				label: { en: 'Package @fionapreroll/p2p-nearby', de: 'Paket @fionapreroll/p2p-nearby' }
			},
			{
				kind: 'packages',
				href: `${repo('vibe-p2pgame')}/pkgs/npm/app-updates`,
				label: { en: 'Package @fionapreroll/app-updates', de: 'Paket @fionapreroll/app-updates' }
			},
			readme('vibe-p2pgame'),
			{ kind: 'privacy', href: `${repo('vibe-p2pgame')}/blob/main/PRIVACY.md` },
			changelog('vibe-p2pgame')
		],
		hero: [
			{
				file: 'docs/screenshots/home.png',
				caption: { en: 'The start screen', de: 'Der Startbildschirm' }
			},
			{
				file: 'docs/screenshots/round.png',
				caption: {
					en: 'A round: the clock, sparks, mines and scores',
					de: 'Eine Runde: Uhr, Funken, Minen und Punkte'
				}
			},
			{
				file: 'docs/screenshots/lobby.png',
				caption: {
					en: 'Free play before the first round, with the connection graph',
					de: 'Freies Spiel vor der ersten Runde, mit Verbindungsgraph'
				}
			}
		],
		gallery: [
			{
				file: 'docs/screenshots/pairing.png',
				caption: { en: 'Adding a player by QR code', de: 'Eine Spielerin per QR-Code hinzufügen' }
			},
			{
				file: 'docs/screenshots/results.png',
				caption: {
					en: 'After a round: who caught what',
					de: 'Nach der Runde: wer was gefangen hat'
				}
			},
			{
				file: 'docs/screenshots/connection.png',
				caption: {
					en: 'The connection details, after a connection test',
					de: 'Die Verbindungsdetails nach einem Verbindungstest'
				}
			},
			{
				file: 'docs/screenshots/settings.png',
				caption: {
					en: 'Keys and controller buttons, changeable',
					de: 'Tasten und Controller-Knöpfe, änderbar'
				}
			},
			{
				file: 'docs/screenshots/home-de.png',
				caption: { en: 'In German', de: 'Auf Deutsch' }
			}
		]
	},

	// ── Music & audio ───────────────────────────────────────────────────────────────────────
	{
		slug: 'audioref',
		name: 'AudioRef',
		group: 'audio',
		started: '2026-11',
		ci: { workflow: 'release.yml', coverage: true },
		tagline: {
			en: 'A VST3 and CLAP plugin that evens out your headphones, so that budget and consumer models sound closer to neutral studio monitoring.',
			de: 'Ein VST3- und CLAP-Plugin, das Kopfhörer glättet, damit günstige und Consumer-Modelle näher an neutrales Studio-Monitoring kommen.'
		},
		motivation: {
			en: 'Mixing on a Bose QC25 or a Sony WH-1000XM4 means mixing against their bass and treble. Measurements and correction curves for them exist; AudioRef puts them where the mix happens, as the last plugin on the master, with no latency, no clipping and no way for the correction to slip into an export.',
			de: 'Wer auf einem Bose QC25 oder einem Sony WH-1000XM4 mischt, mischt gegen deren Bässe und Höhen. Messungen und Korrekturkurven dafür gibt es; AudioRef bringt sie dorthin, wo gemischt wird, als letztes Plugin auf dem Master, ohne Latenz, ohne Clipping und ohne dass die Korrektur in einen Export rutscht.'
		},
		summary: {
			en: 'Pick your headphones and an EQ preset from OPRA, built in for the Bose QC25, the Sony WH-1000XM4 and the AKG K240 Studio, or loaded from OPRA’s database for thousands of others. Or load a measurement and a target curve in AutoEQ’s format, and AudioRef designs the correction itself, to be adjusted with tilt, bass and a limit for boosts.',
			de: 'Man wählt seine Kopfhörer und ein EQ-Preset aus OPRA, eingebaut für Bose QC25, Sony WH-1000XM4 und AKG K240 Studio oder für Tausende weitere aus OPRAs Datenbank geladen. Oder man lädt eine Messung und eine Zielkurve im Format von AutoEQ, und AudioRef berechnet die Korrektur selbst, einstellbar mit Neigung, Bass und einer Grenze für Anhebungen.'
		},
		features: [
			{
				en: 'Automatic headroom: when a correction boosts some frequencies, AudioRef lowers its level by as much, so nothing gets louder, and a limiter without latency keeps the output below −0.3 dBFS.',
				de: 'Automatischer Headroom: Hebt eine Korrektur Frequenzen an, senkt AudioRef den Pegel um genauso viel, damit nichts lauter wird, und ein Limiter ohne Latenz hält den Ausgang unter −0,3 dBFS.'
			},
			{
				en: 'Bypasses itself when the DAW exports offline, so the correction stays in the monitoring path.',
				de: 'Umgeht sich selbst, wenn die DAW offline exportiert, damit die Korrektur im Abhörweg bleibt.'
			},
			{
				en: 'Crossfeed in three strengths, mono and swapped channels, to hear a mix a little more as from speakers and to check it in mono.',
				de: 'Crossfeed in drei Stärken, Mono und vertauschte Kanäle, um einen Mix etwas mehr wie über Lautsprecher zu hören und ihn in Mono zu prüfen.'
			},
			{
				en: 'The project saves the correction, so it opens the same on a computer without the files; every change fades over 20 ms, so nothing clicks.',
				de: 'Das Projekt speichert die Korrektur, sodass es auch auf einem Rechner ohne die Dateien gleich klingt; jede Änderung blendet über 20 ms, damit nichts knackt.'
			},
			{
				en: 'A window with the curve of the correction, hints on every control, and the author of each preset, in English and German.',
				de: 'Ein Fenster mit der Kurve der Korrektur, Hinweisen an jedem Regler und dem Autor jedes Presets, auf Englisch und Deutsch.'
			}
		],
		engineering: [
			{
				en: 'Rust with nih-plug and egui; the signal processing is a crate of its own without plugin APIs, tested to 100 % of its lines and functions.',
				de: 'Rust mit nih-plug und egui; die Signalverarbeitung ist eine eigene Crate ohne Plugin-APIs, getestet zu 100 % ihrer Zeilen und Funktionen.'
			},
			{
				en: 'The audio thread never allocates, locks or reads files: filters are designed in the background and handed over through lock-free queues, and the old ones go back to be freed.',
				de: 'Der Audio-Thread allokiert nie, sperrt nie und liest keine Dateien: Filter entstehen im Hintergrund und kommen über lock-freie Queues herüber, die alten gehen zum Freigeben zurück.'
			},
			{
				en: 'Matched biquads that hold up to the highest frequencies at every sample rate, and minimum-phase FIR filters from the real cepstrum, convolved in partitions without latency.',
				de: 'Gematchte Biquads, die bei jeder Samplerate bis in die höchsten Frequenzen stimmen, und minimalphasige FIR-Filter aus dem reellen Cepstrum, partitioniert und ohne Latenz gefaltet.'
			},
			{
				en: 'Bundles for Windows, macOS and Linux, checked with clap-validator and pluginval at strictness 10; weekly fuzzing of every file it reads, cargo-deny, CodeQL and zizmor in CI, and screenshots of the window taken on a virtual display.',
				de: 'Bundles für Windows, macOS und Linux, geprüft mit clap-validator und pluginval auf Strenge 10; wöchentliches Fuzzing jeder Datei, die es liest, cargo-deny, CodeQL und zizmor in der CI, und Screenshots des Fensters auf einem virtuellen Display.'
			}
		],
		stack: ['Rust', 'nih-plug', 'egui', 'VST3', 'CLAP', 'realfft'],
		platforms: ['windows', 'macos', 'linux'],
		links: [
			releases('audioref'),
			readme('audioref'),
			doc('audioref', 'docs/ARCHITECTURE.md', 'Architecture', 'Architektur'),
			doc('audioref', 'docs/PLAN.md', 'Plan', 'Plan'),
			doc('audioref', 'docs/DEVELOPMENT.md', 'Development', 'Entwicklung'),
			changelog('audioref')
		],
		hero: [
			{
				file: 'docs/screenshots/en-correction.png',
				caption: {
					en: 'A built-in preset for the AKG K240 Studio, and the curve of its correction',
					de: 'Ein eingebautes Preset für den AKG K240 Studio und die Kurve seiner Korrektur'
				},
				focus: 'top'
			}
		],
		gallery: [
			{
				file: 'docs/screenshots/en-curves.png',
				caption: {
					en: 'A correction designed from a measurement and a target, with tilt, bass and the limit for boosts',
					de: 'Eine Korrektur aus Messung und Zielkurve, mit Neigung, Bass und Grenze für Anhebungen'
				}
			},
			{
				file: 'docs/screenshots/en-file.png',
				caption: {
					en: 'A preset from OPRA’s database, loaded from a file',
					de: 'Ein Preset aus OPRAs Datenbank, aus einer Datei geladen'
				}
			},
			{
				file: 'docs/screenshots/en-hint.png',
				caption: {
					en: 'The hint of the crossfeed, with the pointer resting on it',
					de: 'Der Hinweis zum Crossfeed, wenn der Zeiger darauf ruht'
				}
			},
			{
				file: 'docs/screenshots/en-built-in.png',
				caption: {
					en: 'Opened for the first time: the headphones with built-in presets, and what to do next',
					de: 'Zum ersten Mal geöffnet: die Kopfhörer mit eingebauten Presets und was als Nächstes zu tun ist'
				}
			}
		]
	},
	{
		slug: 'vibe-soundlab',
		name: 'Vibe Soundlab',
		group: 'audio',
		started: '2026-10',
		ci: { workflow: 'ci.yml', coverage: true },
		tagline: {
			en: 'Drum & bass and chiptunes written as code in Strudel, and a browser player with a mixer, live chords and visuals.',
			de: 'Drum & Bass und Chiptunes, als Code in Strudel geschrieben, und ein Browser-Player mit Mischpult, Live-Akkorden und Visuals.'
		},
		motivation: {
			en: 'Music as code: writing tracks in Strudel, then building the player I wanted for them, with a real mixer, the chords to play along on guitar, and visuals that follow each track’s arrangement.',
			de: 'Musik als Code: Tracks in Strudel schreiben und dann den Player bauen, den ich mir dafür gewünscht habe, mit echtem Mischpult, Akkorden zum Mitspielen auf der Gitarre und Visuals, die dem Arrangement jedes Tracks folgen.'
		},
		summary: {
			en: 'Thirteen tracks, from atmospheric rollers and bangers to keygen, C64 and Amiga-style chiptunes, each a plain Strudel file that runs on strudel.cc too. The player shows the parts of every track, outlines the notes that sound in the code, and lets you change the code while it plays.',
			de: 'Dreizehn Tracks, von atmosphärischen Rollern und Bangern bis zu Chiptunes im Stil von Keygens, C64 und Amiga, jeder eine schlichte Strudel-Datei, die auch auf strudel.cc läuft. Der Player zeigt die Teile jedes Tracks, umrandet im Code die Noten, die gerade klingen, und lässt den Code ändern, während er spielt.'
		},
		features: [
			{
				en: 'A mixer with a channel per orbit, mute, solo, live spectra and an 8-band EQ.',
				de: 'Ein Mischpult mit einem Kanal pro Orbit, Mute, Solo, Live-Spektren und 8-Band-EQ.'
			},
			{
				en: 'Guitar chords worked out live from the playing pattern, with a fingering for every chord.',
				de: 'Gitarrenakkorde, live aus dem spielenden Pattern ermittelt, mit einem Griffbild für jeden Akkord.'
			},
			{
				en: 'Live editing as on strudel.cc: Ctrl+Enter swaps in the new code without restarting the track.',
				de: 'Live-Editing wie auf strudel.cc: Strg+Enter übernimmt den neuen Code, ohne den Track neu zu starten.'
			},
			{
				en: 'Hydra visuals for every track, driven by its energy and beat.',
				de: 'Hydra-Visuals für jeden Track, gesteuert von seiner Energie und seinem Beat.'
			},
			{
				en: 'Your own Strudel files, and songs other people share on GitHub, play next to them.',
				de: 'Eigene Strudel-Dateien und Songs, die andere auf GitHub teilen, laufen daneben.'
			}
		],
		engineering: [
			{
				en: 'A guard keeps mistakes from taking the page down: syntax checks before code runs, loop guards, and limits for runaway patterns.',
				de: 'Ein Schutz verhindert, dass Fehler die Seite lahmlegen: Syntaxprüfung vor dem Ausführen, Schleifenwächter und Grenzen für ausufernde Patterns.'
			},
			{
				en: 'Every orbit gets its own output channels, split back up in a Web Audio graph of its own.',
				de: 'Jeder Orbit bekommt eigene Ausgangskanäle, die ein eigener Web-Audio-Graph wieder aufteilt.'
			},
			{
				en: 'No build step: plain JavaScript modules, tested on Node’s test runner with coverage limits, including every track’s header, arrangement and chord shapes.',
				de: 'Kein Build-Schritt: reine JavaScript-Module, getestet mit Nodes Test-Runner samt Coverage-Grenzen, auch Kopfzeilen, Arrangement und Griffbilder jedes Tracks.'
			}
		],
		stack: ['JavaScript', 'Strudel', 'Hydra', 'Web Audio', 'Playwright'],
		platforms: ['web'],
		links: [
			{ kind: 'live', href: 'https://fionapreroll.github.io/vibe-soundlab/' },
			readme('vibe-soundlab'),
			changelog('vibe-soundlab')
		],
		hero: [
			{
				file: 'docs/screenshots/player.png',
				caption: {
					en: 'The player in the first drop of Druckwelle: tracks, parts, chords and mixer over the track’s visuals',
					de: 'Der Player im ersten Drop von Druckwelle: Tracks, Teile, Akkorde und Mischpult über den Visuals des Tracks'
				}
			}
		],
		gallery: [
			{
				file: 'docs/screenshots/now-playing.png',
				caption: {
					en: 'The progress bar with the parts of the track',
					de: 'Der Fortschrittsbalken mit den Teilen des Tracks'
				}
			},
			{
				file: 'docs/screenshots/mixer.png',
				caption: {
					en: 'The mixer, with the EQ curve over the bass’s spectrum',
					de: 'Das Mischpult, mit der EQ-Kurve über dem Spektrum des Basses'
				}
			},
			{
				file: 'docs/screenshots/code.png',
				caption: {
					en: 'The code, with the notes that sound right now outlined',
					de: 'Der Code, die gerade klingenden Noten umrandet'
				}
			},
			{
				file: 'docs/screenshots/live-edit.png',
				caption: {
					en: 'A mistake typed while it plays: the line is marked, the music goes on',
					de: 'Ein Tippfehler beim Spielen: Die Zeile wird markiert, die Musik läuft weiter'
				}
			},
			{
				file: 'docs/screenshots/chords.png',
				caption: {
					en: 'The guitar chords, now and next, with their fingerings',
					de: 'Die Gitarrenakkorde, jetzt und als Nächstes, mit Griffbildern'
				}
			},
			{
				file: 'docs/screenshots/visuals-polarlicht.png',
				caption: { en: 'Visuals of Polarlicht', de: 'Visuals von Polarlicht' }
			},
			{
				file: 'docs/screenshots/visuals-kernschmelze.png',
				caption: { en: 'Visuals of Kernschmelze', de: 'Visuals von Kernschmelze' }
			},
			{
				file: 'docs/screenshots/visuals-nachtschicht.png',
				caption: { en: 'Visuals of Nachtschicht', de: 'Visuals von Nachtschicht' }
			},
			{
				file: 'docs/screenshots/songs-from-github.png',
				caption: {
					en: 'Songs other people share on GitHub',
					de: 'Songs, die andere auf GitHub teilen'
				}
			}
		]
	},
	{
		slug: 'vibe-musicbanana',
		name: 'musicbanana',
		group: 'audio',
		started: '2026-10',
		ci: { workflow: 'ci.yml', coverage: true },
		tagline: {
			en: 'A free, self-hosted home for your listening history: scrobbling, charts, reviews and statistics.',
			de: 'Ein freies, selbst gehostetes Zuhause für die eigene Hörhistorie: Scrobbling, Charts, Rückblicke und Statistiken.'
		},
		motivation: {
			en: 'A project that has been running in one form or another since 2007. A listening history is personal and worth keeping, so musicbanana keeps it on your own server: rebuilt from the 2016 PHP version as a small Rust server with a Svelte interface, and the old database comes along.',
			de: 'Ein Projekt, das seit 2007 in der einen oder anderen Form läuft. Eine Hörhistorie ist persönlich und wert, behalten zu werden, also bleibt sie bei musicbanana auf dem eigenen Server: neu gebaut aus der PHP-Version von 2016 als kleiner Rust-Server mit Svelte-Oberfläche, und die alte Datenbank kommt mit.'
		},
		summary: {
			en: 'It takes the plays of every player that speaks the ListenBrainz API, such as Navidrome, and of Spotify through YourSpotify, and turns them into profile pages, charts for any period with their movement, a year in review, a listening clock and comparisons of two profiles.',
			de: 'Es nimmt die Wiedergaben jedes Players, der die ListenBrainz-API spricht, etwa Navidrome, und die von Spotify über YourSpotify, und macht daraus Profilseiten, Charts für jeden Zeitraum samt Bewegung, einen Jahresrückblick, eine Hör-Uhr und Vergleiche zweier Profile.'
		},
		features: [
			{
				en: 'Charts for any period with arrows for their movement, Lost & found, and top artists over the years.',
				de: 'Charts für jeden Zeitraum mit Pfeilen für ihre Bewegung, „Lost & Found“ und Top-Artists über die Jahre.'
			},
			{
				en: 'Several accounts and profiles, each public, for followers or private, with follows and a trash for wrong listens.',
				de: 'Mehrere Accounts und Profile, jeweils öffentlich, für Follower oder privat, mit Follows und einem Papierkorb für falsche Scrobbles.'
			},
			{
				en: 'A tidy catalog: suggestions for merging spellings of the same artist, album or track, with undo.',
				de: 'Ein aufgeräumter Katalog: Vorschläge, verschiedene Schreibweisen desselben Artists, Albums oder Tracks zusammenzuführen, mit Rückgängig.'
			},
			{
				en: 'Album covers from the Cover Art Archive, English and German, light and dark.',
				de: 'Albumcover aus dem Cover Art Archive, Deutsch und Englisch, hell und dunkel.'
			},
			{
				en: 'A download of all your data, and an importer for the 2016 PHP database with its accounts.',
				de: 'Ein Download aller eigenen Daten und ein Import der PHP-Datenbank von 2016 samt Accounts.'
			}
		],
		engineering: [
			{
				en: 'Rust with axum, sqlx and PostgreSQL, with SQL queries checked at compile time.',
				de: 'Rust mit axum, sqlx und PostgreSQL, die SQL-Abfragen beim Kompilieren geprüft.'
			},
			{
				en: 'A SvelteKit interface with Tailwind CSS, built statically and served by the Rust server.',
				de: 'Eine SvelteKit-Oberfläche mit Tailwind CSS, statisch gebaut und vom Rust-Server ausgeliefert.'
			},
			{
				en: 'Integration tests on fresh databases, property tests with proptest, and component tests with Testing Library; coverage on Codecov.',
				de: 'Integrationstests auf frischen Datenbanken, Property-Tests mit proptest und Komponententests mit Testing Library; Coverage auf Codecov.'
			},
			{
				en: 'A Docker image on GitHub’s container registry, and a Compose setup to run next to Navidrome.',
				de: 'Ein Docker-Image in GitHubs Container-Registry und ein Compose-Setup für den Betrieb neben Navidrome.'
			}
		],
		stack: [
			'Rust',
			'axum',
			'sqlx',
			'PostgreSQL',
			'TypeScript',
			'SvelteKit',
			'Svelte',
			'Tailwind CSS',
			'Vitest',
			'Docker'
		],
		platforms: ['server', 'docker', 'web'],
		links: [
			{
				kind: 'docker',
				href: `${repo('vibe-musicbanana')}/pkgs/container/vibe-musicbanana`,
				label: { en: 'Docker image', de: 'Docker-Image' }
			},
			readme('vibe-musicbanana'),
			doc('vibe-musicbanana', 'docs/installation.md', 'Installation', 'Installation'),
			doc('vibe-musicbanana', 'docs/pages.md', 'The pages', 'Die Seiten'),
			doc('vibe-musicbanana', 'docs/api.md', 'API', 'API'),
			doc('vibe-musicbanana', 'docs/design.md', 'Design notes (German)', 'Designnotizen')
		],
		hero: [
			{
				file: 'docs/screenshots/profile.png',
				caption: {
					en: 'A profile page: now playing, this week, on this day and the top lists',
					de: 'Eine Profilseite: läuft gerade, diese Woche, an diesem Tag und die Bestenlisten'
				},
				focus: 'top'
			}
		],
		gallery: [
			{
				file: 'docs/screenshots/charts.png',
				caption: {
					en: 'Charts for any period, with their movement',
					de: 'Charts für jeden Zeitraum, mit ihrer Bewegung'
				}
			},
			{
				file: 'docs/screenshots/year-in-review.png',
				caption: { en: 'A year in review', de: 'Ein Jahresrückblick' }
			},
			{
				file: 'docs/screenshots/compare.png',
				caption: { en: 'Comparing two profiles', de: 'Zwei Profile im Vergleich' }
			},
			{
				file: 'docs/screenshots/album.png',
				caption: { en: 'A page for every album', de: 'Eine Seite für jedes Album' }
			},
			{
				file: 'docs/screenshots/listening-clock.png',
				caption: {
					en: 'The listening clock: plays by weekday and hour',
					de: 'Die Hör-Uhr: Wiedergaben nach Wochentag und Stunde'
				}
			},
			{
				file: 'docs/screenshots/lost-and-found.png',
				caption: {
					en: 'Lost & found: heard a lot, but not for a year',
					de: 'Lost & Found: oft gehört, aber seit einem Jahr nicht mehr'
				}
			},
			{
				file: 'docs/screenshots/artists-over-the-years.png',
				caption: { en: 'Top artists over the years', de: 'Top-Artists über die Jahre' }
			},
			{
				file: 'docs/screenshots/dark.png',
				caption: { en: 'The dark theme', de: 'Das dunkle Design' }
			},
			{
				file: 'docs/screenshots/phone.png',
				caption: { en: 'On a phone', de: 'Auf dem Handy' }
			},
			{
				file: 'docs/screenshots/merges.png',
				caption: {
					en: 'Suggestions for merging two spellings',
					de: 'Vorschläge, zwei Schreibweisen zusammenzuführen'
				}
			}
		]
	},
	{
		slug: 'vibe-visualizer',
		name: 'FibeStation',
		group: 'audio',
		started: '2026-09',
		ci: { workflow: 'ci.yml', coverage: true },
		tagline: {
			en: 'An audio-reactive music visualizer that renders HD videos for YouTube and TikTok, right in the browser.',
			de: 'Ein audioreaktiver Musik-Visualizer, der HD-Videos für YouTube und TikTok rendert, direkt im Browser.'
		},
		motivation: {
			en: 'Music deserves pictures, but video editors are heavy and online tools want your files. FibeStation makes both live visuals and finished videos on your own machine: no server, no uploads, rendered frame by frame and smooth on any computer.',
			de: 'Musik verdient Bilder, aber Videoschnittprogramme sind schwer und Online-Tools wollen die eigenen Dateien. FibeStation macht Live-Visuals und fertige Videos auf dem eigenen Rechner: kein Server, keine Uploads, Bild für Bild gerendert und auf jedem Computer flüssig.'
		},
		summary: {
			en: 'Two looks follow the beat: a logo in a glowing spectrum ring, and kaleidoscopic feedback tunnels with neon tubes, each with presets that switch with the music. Around them sits a player made for DJs, with a gapless queue, waveforms, hot cues, a beat grid, tempo with key lock and effects.',
			de: 'Zwei Looks folgen dem Beat: ein Logo in einem leuchtenden Spektrum-Ring und kaleidoskopische Feedback-Tunnel mit Neonröhren, jeweils mit Presets, die mit der Musik wechseln. Drumherum ein Player für DJs, mit lückenloser Warteschlange, Wellenformen, Hot Cues, Beatgrid, Tempo mit Key Lock und Effekten.'
		},
		features: [
			{
				en: 'MP4 exports in 1080p60, 4K30 or 1080×1920 of a track, a clip or a whole queue with YouTube chapters, resumable after a crash.',
				de: 'MP4-Exporte in 1080p60, 4K30 oder 1080×1920 von einem Track, einem Ausschnitt oder einer ganzen Warteschlange mit YouTube-Kapiteln, nach einem Absturz fortsetzbar.'
			},
			{
				en: 'Live input from a DJ mixer, an audio interface, another app or a browser tab.',
				de: 'Live-Eingang von einem DJ-Mixer, einem Audio-Interface, einer anderen App oder einem Browser-Tab.'
			},
			{
				en: 'DJ controllers over Web MIDI, with their lights, and MIDI learn for other controllers.',
				de: 'DJ-Controller über Web MIDI, samt ihrer Lichter, und MIDI-Learn für andere Controller.'
			},
			{
				en: 'A mini player that stays on top of other windows, and a second screen for a projector.',
				de: 'Ein Mini-Player, der über anderen Fenstern bleibt, und ein zweiter Bildschirm für einen Beamer.'
			},
			{
				en: 'Visuals in the colors of the cover art, and a backup file for settings, presets, cues and images.',
				de: 'Visuals in den Farben des Covers und eine Sicherungsdatei für Einstellungen, Presets, Cues und Bilder.'
			}
		],
		engineering: [
			{
				en: 'An audio engine on AudioWorklet with SharedArrayBuffer ring buffers, and time stretching by Signalsmith Stretch in WebAssembly.',
				de: 'Eine Audio-Engine auf AudioWorklet mit Ringpuffern in SharedArrayBuffer und Time-Stretching mit Signalsmith Stretch in WebAssembly.'
			},
			{
				en: 'WebGL2 rendering in a worker, hardware video encoding with WebCodecs, and beat tracking evaluated on real recordings.',
				de: 'WebGL2-Rendering in einem Worker, Video-Encoding in Hardware mit WebCodecs und eine Beat-Erkennung, die an echten Aufnahmen gemessen wird.'
			},
			{
				en: 'End-to-end tests in Chromium and Firefox in eight parallel jobs, plus soak and performance tests with traces.',
				de: 'End-to-End-Tests in Chromium und Firefox in acht parallelen Jobs, dazu Soak- und Performance-Tests mit Traces.'
			},
			{
				en: 'A DJ controller library of its own, and the licences of every bundled package collected by the build.',
				de: 'Eine eigene Bibliothek für DJ-Controller, und die Lizenzen aller eingebundenen Pakete sammelt der Build.'
			}
		],
		stack: [
			'TypeScript',
			'Svelte',
			'WebGL2',
			'Web Audio',
			'WebCodecs',
			'WebAssembly',
			'Web MIDI',
			'Cloudflare Workers',
			'Vitest',
			'Playwright'
		],
		platforms: ['web'],
		links: [
			{ kind: 'live', href: 'https://fibestation.fipreroll.workers.dev' },
			readme('vibe-visualizer'),
			doc('vibe-visualizer', 'docs/USER-GUIDE.md', 'User guide', 'Anleitung'),
			doc(
				'vibe-visualizer',
				'docs/FEATURES.md',
				'Feature list and roadmap',
				'Funktionen und Roadmap'
			),
			doc('vibe-visualizer', 'docs/TECH-STACK.md', 'Tech stack', 'Tech-Stack'),
			doc('vibe-visualizer', 'docs/ANALYSIS.md', 'Audio analysis', 'Audioanalyse'),
			{ kind: 'privacy', href: `${repo('vibe-visualizer')}/blob/main/PRIVACY.md` },
			changelog('vibe-visualizer')
		],
		hero: [
			{
				file: 'docs/screenshots/logo-spectrum.jpg',
				caption: {
					en: 'The Logo Spectrum, with the queue, the waveform and the hot cues',
					de: 'Das Logo-Spektrum, mit Warteschlange, Wellenform und Hot Cues'
				}
			}
		],
		gallery: [
			{
				file: 'docs/screenshots/kaleidoscope.jpg',
				caption: { en: 'The Kaleidoscope’s Vortex scene', de: 'Die Vortex-Szene des Kaleidoskops' }
			},
			{
				file: 'docs/screenshots/neon-ribbons.jpg',
				caption: {
					en: 'Neon Ribbons: tubes of light, rings and soft lights',
					de: 'Neon Ribbons: Lichtröhren, Ringe und weiche Lichter'
				}
			},
			{
				file: 'docs/screenshots/night-rain.jpg',
				caption: { en: 'Rain instead of stars, in a wind', de: 'Regen statt Sterne, im Wind' }
			},
			{
				file: 'docs/screenshots/tiktok.jpg',
				caption: {
					en: '9:16 for TikTok, with its safe areas',
					de: '9:16 für TikTok, mit den sicheren Bereichen'
				}
			},
			{
				file: 'docs/screenshots/analysis.jpg',
				caption: {
					en: 'The analysis: what the visuals react to',
					de: 'Die Analyse: worauf die Visuals reagieren'
				}
			},
			{
				file: 'docs/screenshots/sound.jpg',
				caption: {
					en: 'Tempo, filter, delay, reverb and Slowed + Reverb',
					de: 'Tempo, Filter, Delay, Hall und Slowed + Reverb'
				}
			},
			{
				file: 'docs/screenshots/export-tracks.jpg',
				caption: {
					en: 'The queue as one video, with chapters',
					de: 'Die Warteschlange als ein Video, mit Kapiteln'
				}
			},
			{
				file: 'docs/screenshots/controller.jpg',
				caption: { en: 'A DJ controller, connected', de: 'Ein DJ-Controller, verbunden' }
			},
			{
				file: 'docs/screenshots/mini-player.jpg',
				caption: {
					en: 'The mini player, on top of other windows',
					de: 'Der Mini-Player, über anderen Fenstern'
				}
			}
		]
	},

	// ── Everyday ────────────────────────────────────────────────────────────────────────────
	{
		slug: 'vibe-stundenplan',
		name: 'Vibe-Stundenplan',
		group: 'everyday',
		started: '2026-09',
		ci: { workflow: 'ci.yml', coverage: true },
		tagline: {
			en: 'A weekly timetable in the browser: no account, no backend, no build step.',
			de: 'Ein Wochenstundenplan im Browser: kein Konto, kein Backend, kein Build-Schritt.'
		},
		motivation: {
			en: 'A timetable for a university week that simply works: open it, fill it in, done. Everything stays in the browser, and the code stays small enough to read in an afternoon.',
			de: 'Ein Stundenplan für die Uni-Woche, der einfach funktioniert: öffnen, ausfüllen, fertig. Alles bleibt im Browser, und der Code bleibt klein genug, um ihn an einem Nachmittag zu lesen.'
		},
		summary: {
			en: 'A weekly grid with days to rename, add and remove, time grids from presets such as TU Dresden and RWTH Aachen or fully custom, entries by click or by dragging across slots, and several schedules side by side, exported as readable JSON.',
			de: 'Ein Wochenraster mit Tagen zum Umbenennen, Hinzufügen und Entfernen, Zeitraster aus Vorlagen wie TU Dresden und RWTH Aachen oder ganz eigene, Einträge per Klick oder Ziehen über mehrere Slots und mehrere Pläne nebeneinander, exportiert als lesbares JSON.'
		},
		features: [
			{
				en: 'The current time slot and weekday light up as the day goes by.',
				de: 'Der aktuelle Zeitslot und Wochentag leuchten im Lauf des Tages mit.'
			},
			{
				en: 'Entries with their own start and end times, independent of the grid.',
				de: 'Einträge mit eigener Start- und Endzeit, unabhängig vom Raster.'
			},
			{
				en: 'Fully usable by keyboard; light, dark and system theme; a one-tap lock for a clean read-only view.',
				de: 'Komplett per Tastatur bedienbar; helles, dunkles und System-Design; eine Sperre mit einem Tipp für eine aufgeräumte Nur-Lese-Ansicht.'
			},
			{
				en: 'German and English, chosen from the browser’s language.',
				de: 'Deutsch und Englisch, passend zur Sprache des Browsers.'
			}
		],
		engineering: [
			{
				en: 'Plain JavaScript modules without dependencies, tested with Node’s built-in test runner; CI fails below 95 % coverage and reports it to Codecov.',
				de: 'Reine JavaScript-Module ohne Abhängigkeiten, getestet mit dem eingebauten Test-Runner von Node; die CI scheitert unter 95 % Coverage und meldet sie an Codecov.'
			},
			{
				en: 'A small Playwright suite guards the layout, and CI takes the screenshots again on every push.',
				de: 'Eine kleine Playwright-Suite bewacht das Layout, und die CI nimmt die Screenshots bei jedem Push neu auf.'
			},
			{
				en: 'Requirements, the export format and design decisions written down in the repository.',
				de: 'Anforderungen, Exportformat und Designentscheidungen sind im Repository festgehalten.'
			}
		],
		stack: ['JavaScript', 'HTML', 'CSS', 'Node.js', 'Playwright'],
		platforms: ['web'],
		links: [
			{ kind: 'live', href: 'https://fionapreroll.github.io/vibe-stundenplan/' },
			readme('vibe-stundenplan'),
			doc('vibe-stundenplan', 'REQUIREMENTS.md', 'Requirements', 'Anforderungen'),
			doc('vibe-stundenplan', 'EXPORT_FORMAT.md', 'Export format', 'Exportformat')
		],
		hero: [
			{
				file: 'screenshots/app.png',
				caption: {
					en: 'A schedule with example entries',
					de: 'Ein Stundenplan mit Beispieleinträgen'
				},
				focus: 'top'
			}
		],
		gallery: [
			{
				file: 'screenshots/app-dark-locked.png',
				caption: {
					en: 'Dark mode, with editing locked',
					de: 'Dunkles Design, Bearbeiten gesperrt'
				}
			},
			{
				file: 'screenshots/entry-modal.png',
				caption: { en: 'Adding an entry', de: 'Einen Eintrag hinzufügen' }
			},
			{
				file: 'screenshots/time-modal.png',
				caption: { en: 'Setting the time grid', de: 'Das Zeitraster einstellen' }
			}
		]
	}
];
