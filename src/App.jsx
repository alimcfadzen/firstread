import { useState, useRef, useEffect } from "react";

const TABS = ["Prose", "Characters", "Plot & Pacing"];
const TAB_KEYS = ["prose", "characters", "plot"];
const TAB_COLORS = {
  prose:      { bg: "#dbeafe", border: "#93c5fd", text: "#1e40af" },
  characters: { bg: "#fce7f3", border: "#f9a8d4", text: "#9d174d" },
  plot:       { bg: "#d1fae5", border: "#6ee7b7", text: "#065f46" },
};
const TAB_COLORS_DARK = {
  prose:      { bg: "rgba(59,130,246,0.15)", border: "#60a5fa", text: "#93c5fd" },
  characters: { bg: "rgba(236,72,153,0.15)", border: "#f472b6", text: "#f9a8d4" },
  plot:       { bg: "rgba(34,197,94,0.15)",  border: "#4ade80", text: "#86efac" },
};

const GENRES = {
  fiction: {
    "middle-grade": [
      { key: "Adventure",         desc: "Fast-paced stories where young protagonists embark on quests, solve problems, and face danger with courage and resourcefulness.", subgenres: ["Survival", "Quest", "Animal Adventure", "Travel Adventure"] },
      { key: "Fantasy",           desc: "Imaginative worlds filled with magic, mythical creatures, and heroic journeys that invite young readers to dream beyond the ordinary.", subgenres: ["High Fantasy", "Portal Fantasy", "Fairy Tale Retelling", "Mythic Fantasy", "Animal Fantasy"] },
      { key: "Science Fiction",   desc: "Age-appropriate explorations of technology, space, and the future that spark curiosity and scientific thinking.", subgenres: ["Space Adventure", "Time Travel", "Robotics/AI", "Dystopian"] },
      { key: "Mystery",           desc: "Puzzle-driven stories where young sleuths follow clues, outwit adults, and solve crimes or uncover secrets.", subgenres: ["Amateur Sleuth", "Cozy Mystery", "Supernatural Mystery", "Adventure Mystery"] },
      { key: "Horror/Paranormal", desc: "Spooky, suspenseful stories designed to thrill without traumatise, featuring ghosts, monsters, and things that go bump in the night.", subgenres: ["Ghost Story", "Supernatural", "Creature Feature", "Creepy Comedy"] },
      { key: "Historical Fiction",desc: "Stories set in vivid historical periods that bring the past to life through the eyes of relatable young characters.", subgenres: ["War Stories", "Ancient World", "American History", "Immigration Stories"] },
      { key: "Humor",             desc: "Lighthearted, laugh-out-loud stories driven by comedic situations, eccentric characters, and playful storytelling.", subgenres: ["Satirical", "Slapstick", "School Comedy", "Absurdist"] },
      { key: "Realistic Fiction", desc: "Grounded, contemporary stories that reflect the everyday challenges of friendship, family, school, and growing up.", subgenres: ["School Life", "Family Drama", "Sports Fiction", "Issue-Based"] },
      { key: "Graphic Novel",     desc: "Visual storytelling in sequential art form — one of the fastest-growing and most widely read formats in middle grade today.", subgenres: ["Adventure", "Fantasy", "Humor", "Memoir", "Realistic Fiction", "Superhero"] },
    ],
    ya: [
      { key: "Romance",                      desc: "Stories exploring first love, heartbreak, and the emotional intensity of relationships during the formative teenage years.", subgenres: ["Contemporary", "Paranormal", "Historical", "Fantasy Romance"] },
      { key: "Action & Adventure",           desc: "High-stakes stories where teen protagonists face physical danger, moral dilemmas, and world-altering consequences.", subgenres: ["Survival", "Spy/Espionage", "Quest", "Military"] },
      { key: "Science Fiction",              desc: "Thought-provoking stories set in alternate futures or dimensions that reflect real-world anxieties through a speculative lens.", subgenres: ["Dystopian", "Space Opera", "Cyberpunk", "Time Travel", "Post-Apocalyptic"] },
      { key: "Fantasy",                      desc: "Richly built worlds of magic and myth where teen heroes discover identity, power, and purpose.", subgenres: ["High Fantasy", "Urban Fantasy", "Dark Fantasy", "Fairy Tale Retelling", "Portal Fantasy"] },
      { key: "Speculative Fiction",          desc: "Stories that reimagine reality in ways that challenge social norms, explore power, and ask \"what if\" on a large scale.", subgenres: ["Dystopian", "Utopian", "Alternate History", "Superhero", "Apocalyptic"] },
      { key: "Suspense/Thriller",            desc: "Gripping stories of danger, deception, and psychological tension where teen protagonists must fight to survive or uncover the truth.", subgenres: ["Psychological Thriller", "Mystery Thriller", "Domestic Thriller", "Paranormal Thriller"] },
      { key: "Horror/Paranormal",            desc: "Scary, atmospheric stories that explore fear, the supernatural, and the darker corners of the human experience.", subgenres: ["Ghost Story", "Occult", "Psychological Horror", "Supernatural", "Gothic Horror"] },
      { key: "Mystery/Crime",                desc: "Suspenseful whodunits where teen investigators untangle secrets, crimes, and conspiracies.", subgenres: ["Amateur Sleuth", "Cozy Mystery", "Noir", "Forensic Mystery"] },
      { key: "Historical Fiction",           desc: "Coming-of-age stories set against real historical events that illuminate both the past and universal teen experiences.", subgenres: ["War Stories", "Historical Romance", "Ancient World", "Immigration Stories"] },
      { key: "Contemporary/Realistic Fiction", desc: "Honest, emotionally resonant stories that tackle the real challenges of adolescence — identity, mental health, family, race, and belonging.", subgenres: ["Issue-Based", "Sports Fiction", "LGBTQ+", "Family Drama", "School Life"] },
      { key: "Magical Realism",              desc: "Realistic teen life subtly threaded with magical elements that feel natural rather than fantastical.", subgenres: [] },
      { key: "Graphic Novel",                desc: "A major and rapidly growing format in YA, covering nearly every genre with visual depth and narrative sophistication.", subgenres: ["Fantasy", "Contemporary", "Memoir", "Horror", "Romance", "Superhero"] },
    ],
    adult: [
      { key: "Romance",             desc: "Stories built around the emotional and physical journey of two people falling in love, always delivering a satisfying resolution.", subgenres: ["Contemporary", "Historical", "Paranormal", "Gothic", "Erotic", "Romantic Suspense", "Inspirational", "Fantasy Romance"] },
      { key: "Action & Adventure",  desc: "Fast-paced, adrenaline-driven stories of physical danger, daring missions, and larger-than-life protagonists.", subgenres: ["Military", "Spy/Espionage", "Survival", "Heist", "Swashbuckling"] },
      { key: "Science Fiction",     desc: "Expansive stories rooted in scientific concepts and speculative technology that explore humanity's future, fears, and potential.", subgenres: ["Hard Sci-Fi", "Space Opera", "Cyberpunk", "Biopunk", "Solarpunk", "Military Sci-Fi", "First Contact", "Time Travel"] },
      { key: "Fantasy",             desc: "Immersive, world-built stories of magic, myth, and moral conflict where the stakes are often civilisation-defining.", subgenres: ["Epic/High Fantasy", "Dark Fantasy", "Urban Fantasy", "Sword & Sorcery", "Low Fantasy", "Grimdark", "Mythic Fantasy"] },
      { key: "Speculative Fiction", desc: "An umbrella genre for stories set in worlds that diverge from reality in meaningful and often socially provocative ways.", subgenres: ["Dystopian", "Utopian", "Alternate History", "Apocalyptic", "Post-Apocalyptic", "Superhero", "Cli-Fi"] },
      { key: "Suspense/Thriller",   desc: "Tightly wound stories of danger, pursuit, and psychological pressure where the stakes are life, freedom, or sanity.", subgenres: ["Psychological Thriller", "Legal Thriller", "Medical Thriller", "Techno-Thriller", "Political Thriller", "Domestic Thriller", "Espionage"] },
      { key: "Horror/Paranormal",   desc: "Dark, atmospheric stories designed to disturb, frighten, and unsettle through supernatural or psychological terror.", subgenres: ["Occult", "Gothic Horror", "Psychological Horror", "Supernatural", "Ghost Story", "Splatterpunk", "Cozy Horror"] },
      { key: "Mystery/Crime",       desc: "Plot-driven stories where a central crime or question must be solved through clues, investigation, and rising tension.", subgenres: ["Cozy Mystery", "Hard-Boiled", "Noir", "Police Procedural", "Legal Mystery", "Forensic", "Amateur Sleuth", "Heist"] },
      { key: "Historical Fiction",  desc: "Fictional narratives woven into real historical events and eras, often featuring reimagined versions of actual figures.", subgenres: ["Historical Romance", "Historical Mystery", "Historical Thriller", "Ancient World Fiction", "War Fiction"] },
      { key: "Western",             desc: "Rugged stories of survival, justice, and frontier life set against the backdrop of the American West.", subgenres: ["Classic Western", "Weird West", "Western Romance", "Western Mystery", "Frontier Fiction"] },
      { key: "Family Saga",         desc: "Multigenerational stories tracing the arc of a family across time, exploring legacy, ambition, conflict, and identity.", subgenres: ["Dynasty Saga", "Immigrant Saga", "Southern Gothic", "Historical Family Drama"] },
      { key: "Women's Fiction",     desc: "Character-driven stories centred on female protagonists navigating challenges deeply tied to gender, identity, and society.", subgenres: ["Contemporary Women's Fiction", "Domestic Fiction", "Feminist Fiction", "Chick Lit", "Historical Women's Fiction"] },
      { key: "New Adult",           desc: "Stories following characters in their late teens and early twenties as they navigate independence, identity, and intimacy for the first time.", subgenres: ["Contemporary Romance", "Fantasy", "Thriller", "Science Fiction"] },
      { key: "Magic Realism",       desc: "Grounded, realistic narratives into which magical events are woven naturally and accepted without question by the characters.", subgenres: ["Latin American Magic Realism", "Fabulism", "Mythic Fiction", "Southern Gothic"] },
      { key: "Literary Fiction",    desc: "Thematically rich, character-driven stories more concerned with the human condition and inner life than with plot or genre convention.", subgenres: ["Experimental Fiction", "Autofiction", "Postmodern Fiction", "Metafiction", "Epistolary Fiction"] },
      { key: "Graphic Novel",       desc: "Long-form visual storytelling that spans every genre and is increasingly recognised as a serious and sophisticated literary form.", subgenres: ["Memoir/Autobiographical", "Superhero", "Literary", "Horror", "Historical", "Fantasy", "Sci-Fi", "Mystery", "Manga"] },
    ],
  },
  nonfiction: {
    "middle-grade": [
      { key: "Biography & Memoir",          desc: "Inspiring true stories of remarkable people — scientists, athletes, activists, and artists — told in an engaging, accessible way for young readers.", subgenres: ["Biographical Picture Books", "Sports Biography", "Activist/Leader Profiles", "Scientist Profiles"] },
      { key: "History",                     desc: "Lively, illustrated explorations of historical events, civilisations, and figures that make the past feel exciting and relevant.", subgenres: ["Ancient Civilisations", "American History", "World History", "War History", "Women in History", "Black History"] },
      { key: "Self-Help & Personal Development", desc: "Age-appropriate guidance on navigating friendships, emotions, school stress, and growing up with confidence.", subgenres: ["Social Skills", "Emotional Intelligence", "Study Skills", "Mindfulness", "Body Image"] },
      { key: "True Crime",                  desc: "Kid-friendly explorations of historical mysteries, unsolved cases, and forensic science that satisfy curiosity without graphic content.", subgenres: ["Historical Mysteries", "Forensic Science", "Cold Cases for Kids"] },
      { key: "Science & Technology",        desc: "Engaging, often visually rich books that explore the natural world, human body, space, animals, and emerging technology.", subgenres: ["Nature & Animals", "Space & Astronomy", "Human Body", "Inventions & Technology", "Environment & Climate", "Chemistry & Physics"] },
      { key: "Travel & Adventure",          desc: "Vivid accounts of exploration, discovery, and adventure in far-flung places that spark wanderlust and global curiosity.", subgenres: ["Exploration History", "World Cultures", "Nature Expeditions", "Geographic Discovery"] },
      { key: "Philosophy & Religion",       desc: "Simple, thoughtful introductions to big questions about life, meaning, fairness, and world belief systems.", subgenres: ["World Religions", "Ethics & Fairness", "Philosophy for Kids"] },
      { key: "Politics & Social Sciences",  desc: "Accessible introductions to how governments work, social justice, and the structures that shape communities and countries.", subgenres: ["Civics & Government", "Social Justice", "Diversity & Inclusion", "Economics Basics"] },
      { key: "Creative Non-Fiction",        desc: "True stories told with the narrative flair of fiction, making real events and real people come alive on the page.", subgenres: ["Narrative History", "Personal Essays", "Journalistic Stories", "Nature Writing"] },
      { key: "How-To & DIY",               desc: "Fun, hands-on guides that teach kids practical skills, crafts, experiments, and creative projects.", subgenres: ["Crafts & Art Projects", "Science Experiments", "Cooking for Kids", "Building & Engineering", "Gardening"] },
      { key: "Humor",                       desc: "Funny, fact-filled books that entertain while educating — a favourite format for reluctant readers.", subgenres: ["Funny Facts", "Joke Books", "Humorous Essays", "Gross Science"] },
      { key: "Art & Photography",           desc: "Visually driven books that introduce young readers to artists, art history, photography, and creative expression.", subgenres: ["Art History for Kids", "Photography", "Drawing & Illustration Guides", "Museum Collections"] },
    ],
    ya: [
      { key: "Biography & Memoir",          desc: "First-person and narrative accounts of real lives that resonate with teens navigating identity, purpose, and their place in the world.", subgenres: ["Celebrity Memoir", "Activist Biography", "Sports Biography", "Coming-of-Age Memoir", "Survivor Stories"] },
      { key: "History",                     desc: "In-depth explorations of historical events, movements, and figures told in a voice that connects the past to present-day relevance.", subgenres: ["War History", "Civil Rights History", "Women's History", "World History", "American History", "Revisionist History"] },
      { key: "Self-Help & Personal Development", desc: "Practical and emotional guidance tailored to teens dealing with mental health, identity, relationships, and future planning.", subgenres: ["Mental Health & Anxiety", "Body Image & Wellness", "Relationships & Boundaries", "College & Career Prep", "Mindfulness", "LGBTQ+ Identity"] },
      { key: "True Crime",                  desc: "Investigative explorations of real criminal cases that engage teens' appetite for mystery while building critical thinking skills.", subgenres: ["Cold Cases", "Serial Killers", "Forensic Science", "Historical Crimes", "Investigative Journalism"] },
      { key: "Science & Technology",        desc: "Accessible but substantive explorations of scientific discovery, environmental issues, medicine, and the technology shaping teens' lives.", subgenres: ["Environmental Science & Climate", "Space & Astronomy", "Medicine & Neuroscience", "AI & Technology", "Biology & Evolution"] },
      { key: "Travel & Adventure",          desc: "Personal narratives of exploration and discovery that inspire teens to engage with the wider world and different cultures.", subgenres: ["Adventure Travel", "Cultural Exploration", "Nature Expeditions", "Solo Travel", "Voluntourism"] },
      { key: "Philosophy & Religion",       desc: "Thought-provoking introductions to ethical questions, world faiths, and philosophical frameworks that invite teens to think critically.", subgenres: ["World Religions", "Ethics & Moral Philosophy", "Existentialism", "Comparative Religion", "Secular Humanism"] },
      { key: "Politics & Social Sciences",  desc: "Timely, engaged explorations of political systems, social justice movements, and the forces shaping society — written for a generation ready to act.", subgenres: ["Social Justice", "Activism & Advocacy", "Civics & Government", "Race & Identity", "Gender Studies", "Economics"] },
      { key: "Creative Non-Fiction",        desc: "Narrative-driven true stories told with literary craft, covering everything from personal essays to investigative journalism.", subgenres: ["Personal Essay", "Narrative Journalism", "Literary Memoir", "Cultural Criticism", "Nature Writing"] },
      { key: "How-To & DIY",               desc: "Practical, skill-building guides that empower teens to learn new crafts, hobbies, creative pursuits, and life skills.", subgenres: ["Art & Design", "Coding & Tech", "Cooking & Nutrition", "Financial Literacy", "Fashion & Style", "Activism Toolkits"] },
      { key: "Humor",                       desc: "Sharp, funny, and often satirical non-fiction that entertains teens while offering a comedic lens on real life and culture.", subgenres: ["Essay Collections", "Satirical Guides", "Humorous Memoir", "Pop Culture Comedy"] },
      { key: "Art & Photography",           desc: "Visually compelling books that explore artistic movements, photographers, design, and creative expression across cultures and history.", subgenres: ["Art History", "Photography", "Graphic Design", "Street Art", "Fashion Photography", "Museum Collections"] },
    ],
    adult: [
      { key: "Biography & Memoir",          desc: "Deeply researched or intimately personal accounts of real lives — from sweeping biographies of historical figures to raw, confessional memoirs.", subgenres: ["Autobiography", "Celebrity Memoir", "Political Biography", "Literary Memoir", "Trauma Memoir", "Travel Memoir", "Spiritual Memoir", "Sports Biography"] },
      { key: "History",                     desc: "Scholarly or narrative explorations of past events, eras, civilisations, and the forces that have shaped the human story.", subgenres: ["Military History", "Social History", "Cultural History", "Political History", "Ancient History", "Revisionist History", "Oral History", "Microhistory"] },
      { key: "Self-Help & Personal Development", desc: "Guidance-driven books offering frameworks, strategies, and inspiration for improving every dimension of life.", subgenres: ["Mental Health & Therapy", "Productivity & Habits", "Relationships & Communication", "Nutrition & Wellness", "Financial Self-Help", "Spirituality", "Leadership", "Grief & Loss"] },
      { key: "True Crime",                  desc: "Investigative deep dives into real criminal cases, exploring the psychology of crime, systemic failures, and the pursuit of justice.", subgenres: ["Serial Killer Profiles", "Cold Cases", "Investigative Journalism", "Forensic Science", "Legal & Court Cases", "Cult Investigations", "Organised Crime"] },
      { key: "Science & Technology",        desc: "Authoritative yet accessible explorations of scientific discovery, technological innovation, and the forces reshaping medicine, nature, and society.", subgenres: ["Popular Science", "Medicine & Neuroscience", "Environmental Science", "Physics & Cosmology", "Biology & Evolution", "AI & Technology", "Mathematics"] },
      { key: "Travel & Adventure",          desc: "Rich personal narratives of journeys taken — physically, culturally, and spiritually — across landscapes both familiar and remote.", subgenres: ["Adventure Travel", "Cultural Immersion", "Solo Travel", "Expedition Narrative", "Food & Travel", "Pilgrimage", "Armchair Travel"] },
      { key: "Philosophy & Religion",       desc: "Rigorous and wide-ranging examinations of the deepest questions about existence, morality, consciousness, faith, and belief.", subgenres: ["Academic Philosophy", "Ethics & Moral Philosophy", "World Religions", "Theology", "Existentialism", "Atheism & Secularism", "Eastern Philosophy", "Comparative Religion"] },
      { key: "Politics & Social Sciences",  desc: "Analytical and often urgent examinations of political systems, social movements, power structures, and the forces driving cultural change.", subgenres: ["Political Theory", "Sociology", "Anthropology", "Economics", "Gender Studies", "Race & Identity", "International Relations", "Policy & Law", "Journalism"] },
      { key: "Creative Non-Fiction",        desc: "True stories told with the craft and intentionality of literary fiction — where form, voice, and narrative are as important as the facts.", subgenres: ["Personal Essay", "Literary Journalism", "Narrative Non-Fiction", "Cultural Criticism", "Nature Writing", "Lyric Essay", "Gonzo Journalism"] },
      { key: "How-To & DIY",               desc: "Practical, skill-based guides empowering readers to learn, build, cook, create, invest, and master new domains.", subgenres: ["Cooking & Food", "Home Improvement", "Gardening", "Personal Finance", "Crafts & Maker Culture", "Fitness & Nutrition", "Business & Entrepreneurship"] },
      { key: "Humor",                       desc: "Non-fiction written with comedic intent — from sharp cultural satire to laugh-out-loud personal essays and parody guides.", subgenres: ["Essay Collections", "Satirical Non-Fiction", "Humorous Memoir", "Parody & Pastiche", "Celebrity Humor"] },
      { key: "Art & Photography",           desc: "Visually stunning and intellectually engaging books celebrating the full spectrum of artistic expression across media, movements, and cultures.", subgenres: ["Art History", "Photography Monographs", "Architecture", "Fashion", "Graphic Design", "Museum & Exhibition Catalogs", "Artist Biographies"] },
    ],
  },
};

const SUBGENRE_DESCS = {
  // Adventure / Action
  "Survival": "Characters outlast hostile environments, disaster, or brutal odds.",
  "Quest": "A journey toward a specific object, place, or person.",
  "Animal Adventure": "Animals as protagonists or central companions in the story.",
  "Travel Adventure": "Exploration of unfamiliar places drives the plot.",
  "Military": "Combat, duty, and camaraderie in armed conflict settings.",
  "Spy/Espionage": "Covert operations, double agents, and international danger.",
  "Heist": "A team plans and executes a daring theft or scheme.",
  "Swashbuckling": "High-spirited adventure with duels, ships, and daring heroics.",
  "Espionage": "Spies, double agents, and covert international operations.",
  // Fantasy
  "High Fantasy": "Epic secondary world with complex magic and civilisation-defining stakes.",
  "Portal Fantasy": "A character crosses from our world into a magical one.",
  "Fairy Tale Retelling": "Classic fairy tales reimagined with fresh angles or settings.",
  "Mythic Fantasy": "Mythology and legend form the structural and thematic core.",
  "Animal Fantasy": "Anthropomorphic animals in fantastical, fully imagined settings.",
  "Urban Fantasy": "Magic and supernatural forces exist within a modern city.",
  "Dark Fantasy": "Fantasy blended with horror — bleak worlds and moral greys.",
  "Epic/High Fantasy": "Large-scale world-building with civilisation-defining stakes.",
  "Sword & Sorcery": "Action-driven fantasy with mercenaries, monsters, and moral greys.",
  "Low Fantasy": "Minimal magic in a world close to our own.",
  "Grimdark": "Brutal, morally ambiguous worlds where survival is rare.",
  "Fantasy Romance": "A love story as central as the magical world-building.",
  "Fantasy": "Fantastical worlds and magic in visual or narrative form.",
  // Science Fiction
  "Space Adventure": "Exploration and danger among planets, stars, and alien worlds.",
  "Time Travel": "Characters move through time, creating paradoxes and consequences.",
  "Robotics/AI": "Technology, robots, and artificial intelligence as central themes.",
  "Dystopian": "An oppressive or failed society — often featuring rebellion.",
  "Space Opera": "Epic adventure across galaxies with political intrigue and scale.",
  "Cyberpunk": "High tech, low life — corporate dystopias and neon-lit decay.",
  "Post-Apocalyptic": "Civilisation has collapsed; survivors navigate a broken world.",
  "Hard Sci-Fi": "Rigorous scientific accuracy drives the story's ideas and plot.",
  "Biopunk": "Biotechnology, genetic engineering, and bodily transformation explored.",
  "Solarpunk": "Hopeful futures built on community, nature, and sustainability.",
  "Military Sci-Fi": "Warfare and strategy in a futuristic or interstellar context.",
  "First Contact": "Humanity's first encounter with alien intelligence and its aftermath.",
  "Sci-Fi": "Speculative futures and technology in visual storytelling form.",
  // Horror / Paranormal
  "Ghost Story": "Hauntings and restless spirits as the central source of dread.",
  "Supernatural": "Otherworldly forces invade or threaten the natural world.",
  "Creature Feature": "Monsters and fantastical creatures as the central threat.",
  "Creepy Comedy": "Humor and horror blend for a fun, spooky tone.",
  "Occult": "Dark magic, rituals, and forbidden supernatural forces.",
  "Psychological Horror": "Fear generated from within — guilt, paranoia, mental collapse.",
  "Gothic Horror": "Atmosphere of decay, ancestral dread, and repression.",
  "Splatterpunk": "Extreme visceral horror with graphic and unflinching content.",
  "Cozy Horror": "Spooky atmosphere with warmth and community — not traumatising.",
  "Horror": "Scares and atmosphere through narrative or visual storytelling.",
  "Paranormal Thriller": "Supernatural threat drives the suspense and danger.",
  // Mystery / Crime
  "Amateur Sleuth": "An ordinary person solves the crime through wit and observation.",
  "Cozy Mystery": "Light-hearted community mysteries without graphic violence.",
  "Supernatural Mystery": "Paranormal elements add a twist to the puzzle and stakes.",
  "Adventure Mystery": "Mystery woven into an action-driven, high-stakes plot.",
  "Forensic Mystery": "Science and physical evidence at the heart of the case.",
  "Forensic Science": "Scientific methods and physical evidence used to examine crime.",
  "Noir": "Dark, fatalistic crime fiction with morally compromised characters.",
  "Hard-Boiled": "Gritty, cynical crime fiction in a corrupt, dangerous world.",
  "Police Procedural": "Realistic investigation following law enforcement processes.",
  "Legal Mystery": "A crime untangled through the courts and legal system.",
  "Forensic": "Scientific evidence and analysis drive the investigation.",
  "Mystery": "Crime, investigation, and puzzles in visual storytelling form.",
  // Thriller / Suspense
  "Psychological Thriller": "Tension from mind games, paranoia, and unreliable reality.",
  "Mystery Thriller": "A crime to solve wrapped in escalating danger.",
  "Domestic Thriller": "Danger hidden inside relationships, family, and the home.",
  "Legal Thriller": "Courtroom drama and legal jeopardy as the primary tension.",
  "Medical Thriller": "Danger rooted in medicine, disease, or the healthcare system.",
  "Techno-Thriller": "Technology — hacking, AI, or weapons — drives the peril.",
  "Political Thriller": "Conspiracy and danger in the corridors of political power.",
  "Thriller": "High-stakes suspense in a focused, fast-moving narrative.",
  // Romance
  "Contemporary": "Set in the present day with realistic, relatable settings.",
  "Paranormal": "Romance with vampires, shifters, or supernatural beings.",
  "Historical": "Love constrained and shaped by a specific past era.",
  "Gothic": "Dark atmosphere, brooding settings, and intense romantic passion.",
  "Erotic": "Explicit content where sexual tension drives the narrative.",
  "Romantic Suspense": "A love story interwoven with danger and crime.",
  "Inspirational": "Faith and spirituality woven into the romantic arc.",
  "Historical Romance": "Love stories shaped by the customs of a past era.",
  "Contemporary Romance": "Modern love stories grounded in everyday adult life.",
  // Historical Fiction
  "War Stories": "Characters caught up in armed conflict and its aftermath.",
  "Ancient World": "Set in antiquity — Egypt, Greece, Rome, or early civilisations.",
  "American History": "Set against significant events in American history.",
  "Immigration Stories": "Characters navigating new cultures, languages, and identities.",
  "Historical Mystery": "A crime to solve in a vividly realised past era.",
  "Historical Thriller": "Suspense and danger set against real historical events.",
  "Ancient World Fiction": "Fictional narratives set in the ancient civilised world.",
  "War Fiction": "Stories shaped by armed conflict — front lines and home fronts.",
  // Western
  "Classic Western": "Gunslingers, frontier justice, and the open range.",
  "Weird West": "Western tropes blended with horror, fantasy, or the supernatural.",
  "Western Romance": "Love stories set against the rugged frontier backdrop.",
  "Western Mystery": "A crime to solve in the lawless, wild West.",
  "Frontier Fiction": "The challenges and hardships of building life on the frontier.",
  // Family Saga / Literary
  "Dynasty Saga": "A powerful family's rise, fall, and internal conflict across generations.",
  "Immigrant Saga": "A family's journey across cultures, borders, and generations.",
  "Southern Gothic": "Family secrets, decay, and darkness in the American South.",
  "Historical Family Drama": "A family's story set against sweeping historical change.",
  "Experimental Fiction": "Form, structure, and language pushed beyond convention.",
  "Autofiction": "The author's life reimagined or fictionalised on the page.",
  "Postmodern Fiction": "Self-aware fiction that plays with narrative and meaning.",
  "Metafiction": "Fiction that calls attention to its own construction.",
  "Epistolary Fiction": "Told through letters, diary entries, or found documents.",
  // Women's Fiction / New Adult
  "Contemporary Women's Fiction": "Women navigating identity, ambition, and relationships today.",
  "Domestic Fiction": "Family, home, and intimate relationships under pressure.",
  "Feminist Fiction": "Women's struggle for autonomy, equality, and self-definition.",
  "Chick Lit": "Witty, voice-driven stories of modern women's daily lives.",
  "Historical Women's Fiction": "Women's lives and ambitions constrained by a past era.",
  // Magic Realism
  "Latin American Magic Realism": "The Márquez/Allende tradition — magic woven into everyday life.",
  "Fabulism": "Reality subtly distorted, leaning gently toward the fantastical.",
  "Mythic Fiction": "Myth and legend made flesh in a realistic narrative world.",
  // Speculative Fiction
  "Utopian": "A seemingly perfect society — often with hidden, troubling cracks.",
  "Alternate History": "A pivotal historical moment diverged, with sweeping consequences.",
  "Superhero": "Characters with extraordinary powers face identity and responsibility.",
  "Apocalyptic": "Society on the brink of collapse or total destruction.",
  "Cli-Fi": "Climate catastrophe reshapes politics, society, and human survival.",
  // Graphic Novel
  "Memoir/Autobiographical": "True personal stories told in sequential visual art.",
  "Literary": "Serious, character-driven graphic narrative.",
  "Manga": "Japanese-originated comic art and storytelling conventions.",
  "Memoir": "True stories from the author's own life in visual form.",
  "Realistic Fiction": "Everyday life rendered in graphic novel or comic form.",
  "Romance": "Love stories told through panels and illustration.",
  // NF Biography
  "Biographical Picture Books": "Illustrated true-life stories for the youngest readers.",
  "Sports Biography": "The life and career of a real athlete.",
  "Activist/Leader Profiles": "Inspiring accounts of people who changed the world.",
  "Scientist Profiles": "The lives and discoveries of remarkable scientists.",
  "Celebrity Memoir": "A public figure's account of their career and personal life.",
  "Activist Biography": "The life and work of a changemaker or social activist.",
  "Coming-of-Age Memoir": "A memoir focused on youth, identity, and growing up.",
  "Survivor Stories": "Firsthand accounts of overcoming trauma, disaster, or hardship.",
  "Autobiography": "A life story written by the subject themselves.",
  "Political Biography": "The life and career of a significant political figure.",
  "Literary Memoir": "A memoir told with exceptional literary craft and voice.",
  "Trauma Memoir": "A raw, personal account of surviving and processing trauma.",
  "Travel Memoir": "A memoir shaped by journeys, places, and cultural encounters.",
  "Spiritual Memoir": "A personal account of faith, belief, and spiritual searching.",
  // NF History
  "Ancient Civilisations": "Explorations of Egypt, Greece, Rome, and early human societies.",
  "World History": "Broad surveys of historical events and civilisations globally.",
  "War History": "The causes, events, and human cost of armed conflict.",
  "Women in History": "The overlooked roles and stories of women through time.",
  "Black History": "The history, culture, and contributions of Black people globally.",
  "Civil Rights History": "The struggle for racial equality and justice in America.",
  "Women's History": "The lives, achievements, and struggles of women over time.",
  "Revisionist History": "History re-examined through new evidence or overlooked perspectives.",
  "Military History": "Campaigns, strategy, and the human cost of armed conflict.",
  "Social History": "How ordinary people lived — culture, class, and daily life.",
  "Cultural History": "The ideas, arts, and values that define an era or society.",
  "Political History": "The leaders, movements, and decisions that shaped governance.",
  "Ancient History": "Civilisations and events from antiquity to the early medieval period.",
  "Oral History": "History preserved through personal testimony and recorded voice.",
  "Microhistory": "A single event, person, or place explored in extraordinary depth.",
  // NF Self-Help
  "Social Skills": "Guidance on communication, friendship, and navigating relationships.",
  "Emotional Intelligence": "Understanding and managing emotions in oneself and others.",
  "Study Skills": "Strategies for learning effectively and performing under pressure.",
  "Mindfulness": "Practices for staying present and managing stress or anxiety.",
  "Body Image": "Support for developing a healthy relationship with one's body.",
  "Mental Health & Anxiety": "Practical guidance on managing anxiety, depression, and mental wellbeing.",
  "Body Image & Wellness": "Support for healthy self-perception and physical wellbeing.",
  "Relationships & Boundaries": "Navigating friendships, romance, family, and personal limits.",
  "College & Career Prep": "Planning for education, work, and the transition to adulthood.",
  "LGBTQ+ Identity": "Support and guidance for queer people navigating identity.",
  "Mental Health & Therapy": "Frameworks for understanding and improving psychological health.",
  "Productivity & Habits": "Systems for building better routines and getting more done.",
  "Relationships & Communication": "Improving how we connect, listen, and express ourselves.",
  "Nutrition & Wellness": "Evidence-based guidance on food, exercise, and physical health.",
  "Financial Self-Help": "Strategies for managing money, budgets, and financial planning.",
  "Spirituality": "Exploring meaning, faith, and inner life outside formal religion.",
  "Leadership": "Developing the skills and mindset to lead others effectively.",
  "Grief & Loss": "Support for processing bereavement and significant life losses.",
  // NF True Crime
  "Historical Mysteries": "Unsolved or mysterious events from the past re-examined.",
  "Cold Cases for Kids": "Historical mysteries and unsolved crimes told accessibly for children.",
  "Cold Cases": "Unsolved or re-examined criminal cases investigated with fresh eyes.",
  "Serial Killers": "The psychology and crimes of serial offenders examined in depth.",
  "Historical Crimes": "Criminal cases set in and shaped by historical contexts.",
  "Investigative Journalism": "Reported stories that uncover hidden truths or systemic failures.",
  "Serial Killer Profiles": "Deep-dive psychological and criminal profiles of serial offenders.",
  "Legal & Court Cases": "High-profile trials and the legal processes that shaped outcomes.",
  "Cult Investigations": "The inner workings, leaders, and aftermath of cults examined.",
  "Organised Crime": "Mafia, cartels, and criminal networks investigated in depth.",
  // NF Science
  "Nature & Animals": "The living world — wildlife, ecosystems, and animal behaviour.",
  "Space & Astronomy": "Stars, planets, black holes, and the universe explored.",
  "Human Body": "How the body works — organs, systems, and biology explained.",
  "Inventions & Technology": "The history and impact of human-made tools and machines.",
  "Environment & Climate": "Ecology, climate change, and humanity's relationship with nature.",
  "Chemistry & Physics": "The fundamental laws and substances that govern the physical world.",
  "Environmental Science & Climate": "Science-based exploration of climate, ecology, and environmental challenge.",
  "Medicine & Neuroscience": "How the brain, body, and healthcare system work and evolve.",
  "AI & Technology": "How artificial intelligence and technology are reshaping the world.",
  "Biology & Evolution": "Life sciences — how organisms live, adapt, and change over time.",
  "Popular Science": "Complex scientific ideas made accessible for a general audience.",
  "Environmental Science": "Climate, ecosystems, and the science behind environmental change.",
  "Physics & Cosmology": "The laws governing the universe, from particles to spacetime.",
  "Mathematics": "Numbers, patterns, and the abstract logic underlying everything.",
  // NF Travel
  "Exploration History": "The history of great expeditions, discoveries, and explorers.",
  "World Cultures": "The customs, histories, and daily lives of people around the globe.",
  "Nature Expeditions": "Journeys into wild or remote natural environments.",
  "Geographic Discovery": "How humans mapped and understood the physical world.",
  "Adventure Travel": "Journeys into dangerous, remote, or physically demanding environments.",
  "Cultural Exploration": "Immersing in unfamiliar cultures and ways of life.",
  "Solo Travel": "The experience and challenges of travelling alone.",
  "Voluntourism": "Travel combined with community service and humanitarian work.",
  "Cultural Immersion": "Deep engagement with local cultures, languages, and traditions.",
  "Expedition Narrative": "First-person accounts of ambitious physical or geographical expeditions.",
  "Food & Travel": "Journeys shaped by local cuisine, markets, and culinary culture.",
  "Pilgrimage": "Sacred journeys and the spiritual dimensions of travel.",
  "Armchair Travel": "Vivid writing that transports readers without leaving home.",
  // NF Philosophy & Religion
  "World Religions": "An overview of major religious traditions and their core beliefs.",
  "Ethics & Fairness": "Questions of right, wrong, and how to treat others well.",
  "Philosophy for Kids": "Big philosophical questions made accessible and fun for children.",
  "Ethics & Moral Philosophy": "Systematic exploration of morality, values, and ethical frameworks.",
  "Existentialism": "Questions of meaning, freedom, and what it means to exist.",
  "Comparative Religion": "Examining similarities and differences across world faiths.",
  "Secular Humanism": "A non-religious framework for ethics, meaning, and human flourishing.",
  "Academic Philosophy": "Rigorous philosophical argument across major schools of thought.",
  "Theology": "The scholarly study of religious belief, doctrine, and God.",
  "Atheism & Secularism": "Non-belief, secular ethics, and critiques of organised religion.",
  "Eastern Philosophy": "Traditions from Buddhism, Taoism, Confucianism, and Hindu philosophy.",
  // NF Politics & Social Sciences
  "Civics & Government": "How governments, laws, and democratic systems work.",
  "Social Justice": "Systemic inequality, activism, and the pursuit of a fairer world.",
  "Diversity & Inclusion": "Understanding and celebrating difference in identity and experience.",
  "Economics Basics": "How money, markets, and economies function at a foundational level.",
  "Activism & Advocacy": "How individuals and movements create social and political change.",
  "Race & Identity": "The intersection of race, culture, and personal identity.",
  "Gender Studies": "How gender is constructed, experienced, and contested in society.",
  "Economics": "Markets, money, inequality, and the forces shaping economies.",
  "Political Theory": "The ideas and frameworks that underpin political systems and power.",
  "Sociology": "How societies, groups, and social structures work and change.",
  "Anthropology": "Human cultures, societies, and evolution studied across time.",
  "International Relations": "Diplomacy, geopolitics, and the relationships between nations.",
  "Policy & Law": "How laws are made, challenged, and enforced in society.",
  "Journalism": "The practice and ethics of reporting, investigation, and the press.",
  "LGBTQ+": "Stories and identities centred on queer experience and community.",
  // NF Creative Non-Fiction
  "Narrative History": "History told with the narrative craft and pace of fiction.",
  "Personal Essays": "Reflective, first-person writing exploring ideas through experience.",
  "Journalistic Stories": "Reported, factual stories told with narrative skill.",
  "Nature Writing": "The natural world explored through observation and personal reflection.",
  "Personal Essay": "Reflective, voice-driven writing that explores an idea through experience.",
  "Narrative Journalism": "Reported stories told with the craft of literary fiction.",
  "Cultural Criticism": "Personal and analytical lens applied to media, society, and culture.",
  "Literary Journalism": "Deeply reported stories told with exceptional literary craft.",
  "Narrative Non-Fiction": "True events and real people told with the pace of fiction.",
  "Lyric Essay": "Poetic, fragmented, non-linear — prioritising image and feeling over argument.",
  "Gonzo Journalism": "Immersive, first-person, subjective reporting in the Hunter S. Thompson tradition.",
  // NF How-To
  "Crafts & Art Projects": "Step-by-step guides to making and creating by hand.",
  "Science Experiments": "Hands-on experiments that make scientific principles tangible.",
  "Cooking for Kids": "Recipes and kitchen skills designed for young cooks.",
  "Building & Engineering": "Practical guides to building, engineering, and making things.",
  "Gardening": "How to grow plants, tend soil, and cultivate outdoor spaces.",
  "Art & Design": "Guidance on creative skills, visual design, and artistic practice.",
  "Coding & Tech": "Learning to code, build apps, and understand digital technology.",
  "Cooking & Nutrition": "Recipes, food skills, and the basics of good nutrition.",
  "Financial Literacy": "Understanding money, budgeting, and making smart financial choices.",
  "Fashion & Style": "Developing personal style and understanding the fashion industry.",
  "Activism Toolkits": "Practical guides to organising, campaigning, and creating change.",
  "Cooking & Food": "Recipes, techniques, and the culture of cooking and eating well.",
  "Home Improvement": "Guides to renovating, repairing, and maintaining the home.",
  "Personal Finance": "Budgeting, investing, and building financial security.",
  "Crafts & Maker Culture": "Making, building, and DIY creativity for adults.",
  "Fitness & Nutrition": "Exercise, diet, and the science behind physical performance.",
  "Business & Entrepreneurship": "Starting, running, and growing a business or enterprise.",
  // NF Humor
  "Funny Facts": "True, surprising, or absurd facts delivered with comedic intent.",
  "Joke Books": "Collections of jokes, puns, and comic material.",
  "Humorous Essays": "Personal essays written primarily for comedic effect.",
  "Gross Science": "The icky, surprising, and disgusting side of the natural world.",
  "Essay Collections": "A curated selection of essays on varied or connected themes.",
  "Satirical Guides": "Guides written in a satirical or comedic style.",
  "Humorous Memoir": "A memoir told primarily through comedy and self-deprecating wit.",
  "Pop Culture Comedy": "Witty commentary on movies, music, celebrities, and trends.",
  "Satirical Non-Fiction": "Real-world issues skewered through satire and comic exaggeration.",
  "Parody & Pastiche": "Works that imitate and play with other genres or styles for laughs.",
  "Celebrity Humor": "Comedy from or about public figures and celebrity culture.",
  // NF Art & Photography
  "Art History for Kids": "Great artists and movements introduced accessibly for young readers.",
  "Drawing & Illustration Guides": "Practical instruction in drawing and illustration techniques.",
  "Museum Collections": "Deep dives into great works of art from museum collections.",
  "Art History": "The movements, works, and figures that shaped visual art.",
  "Photography": "The art, craft, and history of the photographic image.",
  "Graphic Design": "Typography, layout, and the visual communication of ideas.",
  "Street Art": "Graffiti, murals, and the urban art movement and its artists.",
  "Fashion Photography": "Photography at the intersection of fashion, identity, and image.",
  "Photography Monographs": "A single photographer's body of work surveyed in depth.",
  "Architecture": "Buildings, design, and the way spaces shape human experience.",
  "Fashion": "Clothing, designers, and the cultural history of dress.",
  "Museum & Exhibition Catalogs": "Art and objects from exhibitions presented in detailed form.",
  "Artist Biographies": "The lives, practices, and legacies of significant artists.",
};

const AUDIENCES = [
  { key: "middle-grade", label: "Middle Grade",     ages: "Ages 8–12",  desc: "Child protagonist, adventure-driven plots, no romance beyond crushes, age-appropriate themes." },
  { key: "ya",           label: "Young Adult (YA)", ages: "Ages 13–17", desc: "Teen protagonist, identity and belonging themes, immediate emotional stakes, tight pacing." },
  { key: "adult",        label: "Adult",            ages: "Ages 18+",   desc: "No age restrictions on protagonist or themes. Full range of structural and narrative complexity." },
  { key: "unsure",       label: "Not sure yet",     ages: null,         desc: "The editor will flag any audience-targeting issues it notices rather than assuming a direction." },
];

const INTENSITIES = [
  { key: "low",    label: "Light",    desc: "Encouraging and high-level. Surfaces the 2-3 most important areas to work on, framed constructively. Best for early drafts or writers who want a gentle read." },
  { key: "medium", label: "Balanced", desc: "Honest and specific. Praise where it's earned, direct critique where it's needed, with clear suggestions. Good for most draft stages." },
  { key: "high",   label: "Rigorous", desc: "Unsparing and thorough. Every significant weakness named and examined — including subtle craft issues others might let pass. Best for near-final drafts or writers who want to be challenged." },
];

function buildSystemPrompt(contentType, genre, subgenre, audience, intensity, feedbackScope = "all") {
  const audienceObj = AUDIENCES.find(a => a.key === audience);
  const subgenreNote = subgenre ? ` The work is specifically ${subgenre} — apply subgenre conventions accordingly.` : "";
  const audienceGuide = !audience
    ? "Audience: not specified. Evaluate for general adult readability and craft."
    : audience === "unsure"
    ? "Audience: not yet decided. Flag any issues you notice with audience targeting rather than assuming a direction."
    : `Audience: ${audienceObj.label} (${audienceObj.ages}). ${
        audience === "middle-grade" ? "Flag if voice, themes, or content skew too old. Expect simple sentence structures, protagonist-driven plots, and age-appropriate stakes." :
        audience === "ya" ? "Flag if the protagonist's voice sounds too adult or too young, if pacing drags in ways a teen reader would abandoned, or if emotional stakes feel detached from teen experience." :
        "Adult writing allows full narrative complexity, moral ambiguity, and slower pacing. No age-based restrictions on voice or theme."
      }`;
  const toneGuide = {
    low:    "Tone: encouraging and constructive. Lead with what works. Surface only the 2-3 most important issues per category. Frame critique gently but honestly. Notes per category: 2-3.",
    medium: "Tone: balanced and direct. Give genuine praise where earned and honest critique where needed. Cover main strengths and main areas for improvement with equal specificity. Notes per category: 3-5.",
    high:   "Tone: rigorous and unsparing. Name every significant weakness and its effect on the reader. Include subtler craft issues — rhythm, thematic inconsistency, genre expectation gaps — that a lighter read would skip. Praise only when genuinely earned. Notes per category: 4-6.",
  }[intensity];

  const scopeNames = { prose: "Prose", characters: "Characters", plot: "Plot & Pacing" };
  const scopeInstruction = feedbackScope === "all" ? ""
    : `\nFocus: Provide detailed feedback ONLY for "${scopeNames[feedbackScope]}". For the other two categories return exactly: { "summary": null, "notes": [] }.`;

  if (contentType === "nonfiction") {
    const prescriptiveGenres = ["Self-Help & Personal Development", "How-To & DIY", "Politics & Social Sciences", "Science & Technology"];
    const prescriptiveNote = prescriptiveGenres.includes(genre)
      ? "\nFor prescriptive non-fiction additionally: Is the central argument clear? Is evidence used effectively? Is advice actionable and specific?"
      : "";
    return `You are a professional non-fiction editor specialising in ${genre}.${subgenreNote}
${audienceGuide}
${toneGuide}${scopeInstruction}

Non-fiction editorial priorities:
- Voice & authority — Does the writer establish credibility and expertise? Is the voice consistent, distinctive, and appropriate for the subgenre?
- Accuracy & honesty — Are claims supported by evidence or clearly flagged as the writer's perspective? Does anything feel embellished or unverifiable?
- Structure — Does the structure serve the content? Memoir needs emotional arc; journalism needs logical progression; essays need a controlling idea.
- Scene vs. exposition — Good narrative non-fiction shows as well as tells — are there specific scenes, dialogue, and sensory detail, or only summary?
- The reader contract — Non-fiction makes an implicit promise of truth. Flag anything that risks breaking that contract.${prescriptiveNote}

Analyse the provided excerpt and return ONLY a valid JSON object:
{
  "prose":      { "summary": "2-3 sentence honest umbrella overview of the prose.", "notes": [ { "quote": "verbatim phrase or null", "positive": "specific genuine praise or null", "issue": "the problem and its effect on the reader — always present", "suggestion": "concrete fix with brief example rewrite where helpful" } ] },
  "characters": { "summary": "2-3 sentence overview of voice, persona, and how people/subjects are rendered on the page.", "notes": [ { "quote": "verbatim phrase or null", "positive": "or null", "issue": "always present", "suggestion": "always present" } ] },
  "plot":       { "summary": "2-3 sentence overview of structure, argument, and pacing.", "notes": [ { "quote": "verbatim phrase or null", "positive": "or null", "issue": "always present", "suggestion": "always present" } ] }
}

Rules:
- quote: exact verbatim substring from the excerpt, or null. Never paraphrase.
- positive: specific genuine praise only, null if nothing stands out.
- issue: always present. Name the problem and its effect on the reader.
- suggestion: always present. Actionable, with example rewrite where helpful.
- Sort notes so quotes appear in the order they occur in the text. Null-quote notes go last.
- Return ONLY the JSON object. No markdown, no backticks, no preamble.`;
  }

  return `You are a professional literary editor specialising in ${genre} fiction.${subgenreNote}
${audienceGuide}
${toneGuide}${scopeInstruction}

Analyse the provided story excerpt and return ONLY a valid JSON object:
{
  "prose":      { "summary": "2-3 sentence honest umbrella overview of the prose.", "notes": [ { "quote": "verbatim phrase or null", "positive": "specific genuine praise or null", "issue": "the problem and its effect on the reader — always present", "suggestion": "concrete fix with brief example rewrite where helpful" } ] },
  "characters": { "summary": "2-3 sentence honest umbrella overview of characterisation.", "notes": [ { "quote": "verbatim phrase or null", "positive": "or null", "issue": "always present", "suggestion": "always present" } ] },
  "plot":       { "summary": "2-3 sentence honest umbrella overview of plot and pacing.", "notes": [ { "quote": "verbatim phrase or null", "positive": "or null", "issue": "always present", "suggestion": "always present" } ] }
}

Rules:
- quote: exact verbatim substring from the excerpt, or null. Never paraphrase.
- positive: specific genuine praise only, null if nothing stands out.
- issue: always present. Name the problem and its effect on the reader.
- suggestion: always present. Actionable, with example rewrite where helpful.
- Sort notes so quotes appear in the order they occur in the text. Null-quote notes go last.
- Return ONLY the JSON object. No markdown, no backticks, no preamble.`;
}

function normalizeQuotes(s) {
  return s
    .replace(/[‘’‚‛]/g, "'")
    .replace(/[“”„‟]/g, '"')
    .replace(/—/g, '—')  // keep em-dash as-is for length safety
    .replace(/–/g, '-');
}

function findQuotePos(text, quote) {
  if (!quote) return Infinity;
  const normText = normalizeQuotes(text);
  const normQuote = normalizeQuotes(quote);
  const exact = normText.indexOf(normQuote);
  if (exact !== -1) return exact;
  const words = normQuote.trim().split(/\s+/);
  for (let len = words.length; len >= Math.max(3, Math.floor(words.length * 0.5)); len--) {
    const sub = words.slice(0, len).join(" ");
    const idx = normText.indexOf(sub);
    if (idx !== -1) return idx;
  }
  return Infinity;
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildHighlightedHTML(text, notes, activeTab, isDark = false) {
  const color = (isDark ? TAB_COLORS_DARK : TAB_COLORS)[activeTab];
  const ranges = [];
  const normText = normalizeQuotes(text);
  (notes || []).forEach((n, i) => {
    if (!n.quote) return;
    const normQuote = normalizeQuotes(n.quote);
    let idx = normText.indexOf(normQuote);
    let matchLen = idx !== -1 ? normQuote.length : 0;
    if (idx === -1) {
      const words = normQuote.trim().split(/\s+/);
      for (let len = words.length; len >= Math.max(3, Math.floor(words.length * 0.5)); len--) {
        const sub = words.slice(0, len).join(" ");
        const subIdx = normText.indexOf(sub);
        if (subIdx !== -1) { idx = subIdx; matchLen = sub.length; break; }
      }
    }
    if (idx === -1 || idx === Infinity || matchLen === 0) return;
    ranges.push({ start: idx, end: idx + matchLen, noteIdx: i });
  });
  ranges.sort((a, b) => a.start - b.start);
  let result = ""; let cursor = 0;
  for (const r of ranges) {
    if (r.start < cursor) continue;
    result += escapeHtml(text.slice(cursor, r.start));
    result += `<mark data-note="${r.noteIdx}" style="background:${color.bg};border-bottom:2px solid ${color.border};cursor:pointer;border-radius:2px;padding:0 1px;">${escapeHtml(text.slice(r.start, r.end))}</mark>`;
    cursor = r.end;
  }
  result += escapeHtml(text.slice(cursor));
  return { __html: result.replace(/\n/g, "<br/>") };
}

function BookLoader() {
  return (
    <>
      <style>{`
        @keyframes bookPageFlip {
          0%   { transform: perspective(400px) rotateY(0deg); }
          38%  { transform: perspective(400px) rotateY(-180deg); }
          65%  { transform: perspective(400px) rotateY(-180deg); }
          66%  { transform: perspective(400px) rotateY(0deg); }
          100% { transform: perspective(400px) rotateY(0deg); }
        }
      `}</style>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
        <div style={{ position: "relative", width: 64, height: 50 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "50%", height: "100%", background: "#e5e7eb", borderRadius: "4px 0 0 4px", border: "0.5px solid #9ca3af" }} />
          <div style={{ position: "absolute", right: 0, top: 0, width: "50%", height: "100%", background: "#e5e7eb", borderRadius: "0 4px 4px 0", border: "0.5px solid #9ca3af" }} />
          {[{ delay: "0s", bg: "#ffffff" }, { delay: "0.55s", bg: "#f9fafb" }, { delay: "1.1s", bg: "#f3f4f6" }].map(({ delay, bg }, i) => (
            <div key={i} style={{
              position: "absolute", left: "50%", top: "2px",
              width: "calc(50% - 3px)", height: "calc(100% - 4px)",
              background: bg, border: "0.5px solid #d1d5db", borderLeft: "none",
              borderRadius: "0 3px 3px 0", transformOrigin: "0% 50%",
              zIndex: 3 - i,
              animation: `bookPageFlip 1.65s ease-in-out ${delay} infinite`,
            }} />
          ))}
          <div style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", width: 3, height: "100%", background: "#6b7280", zIndex: 10, borderRadius: 2 }} />
        </div>
        <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Reading your excerpt...</span>
        <span style={{ fontSize: 12, color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.5, maxWidth: 260 }}>This can take a few minutes depending on the length of your text and level of feedback requested.</span>
      </div>
    </>
  );
}

function buildPDFHighlightHTML(text, feedback) {
  const ranges = [];
  TAB_KEYS.forEach(key => {
    const c = TAB_COLORS[key];
    const normText = normalizeQuotes(text);
    (feedback?.[key]?.notes || []).forEach(n => {
      if (!n.quote) return;
      const normQuote = normalizeQuotes(n.quote);
      let idx = normText.indexOf(normQuote);
      let matchLen = idx !== -1 ? normQuote.length : 0;
      if (idx === -1) {
        const words = normQuote.trim().split(/\s+/);
        for (let len = words.length; len >= Math.max(3, Math.floor(words.length * 0.5)); len--) {
          const sub = words.slice(0, len).join(" ");
          const subIdx = normText.indexOf(sub);
          if (subIdx !== -1) { idx = subIdx; matchLen = sub.length; break; }
        }
      }
      if (idx === -1 || matchLen === 0) return;
      ranges.push({ start: idx, end: idx + matchLen, bg: c.bg, border: c.border });
    });
  });
  ranges.sort((a, b) => a.start - b.start);
  let result = ""; let cursor = 0;
  for (const r of ranges) {
    if (r.start < cursor) continue;
    result += escapeHtml(text.slice(cursor, r.start));
    result += `<mark style="background:${r.bg};border-bottom:2px solid ${r.border};border-radius:2px;padding:0 1px;">${escapeHtml(text.slice(r.start, r.end))}</mark>`;
    cursor = r.end;
  }
  result += escapeHtml(text.slice(cursor));
  return result.replace(/\n/g, "<br/>");
}

function Tip({ text, width = 220, style: wrapStyle = {}, children }) {
  const [show, setShow] = useState(false);
  if (!text) return children;
  return (
    <div
      style={{ position: "relative", ...wrapStyle }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 50, width, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--info-tooltip-border)", background: "var(--info-tooltip-bg)", fontSize: 12, lineHeight: 1.6, color: "var(--info-tooltip-color)", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", pointerEvents: "none" }}>
          {text}
        </div>
      )}
    </div>
  );
}

function InlineTip({ text, width = 220, children }) {
  const [show, setShow] = useState(false);
  if (!text) return children;
  return (
    <span
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, zIndex: 50, width, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--info-tooltip-border)", background: "var(--info-tooltip-bg)", fontSize: 12, lineHeight: 1.6, color: "var(--info-tooltip-color)", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", pointerEvents: "none", display: "block", whiteSpace: "normal" }}>
          {text}
        </span>
      )}
    </span>
  );
}

function SubgenrePills({ subgenres, subgenre, setSubgenre }) {
  if (!subgenres?.length) return null;
  const sorted = [...subgenres].sort((a, b) => a.localeCompare(b));
  return (
    <div style={{ marginTop: 10, marginBottom: 8, padding: "10px 12px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", border: "1px solid #d1d5db" }}>
      <p style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 8px" }}>
        Subgenre <span style={{ fontWeight: 400, fontSize: 12, color: "var(--color-text-secondary)" }}>— not required, but helps the editor give more specific feedback</span>
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {sorted.map(name => {
          const desc = SUBGENRE_DESCS[name];
          return (
            <button key={name}
              onClick={() => setSubgenre(subgenre === name ? null : name)}
              style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", fontSize: 13, borderRadius: "var(--border-radius-md)", border: subgenre === name ? "2px solid var(--setup-selected-border)" : "1px solid var(--setup-unselected-border)", background: subgenre === name ? "var(--setup-selected-bg)" : "transparent", color: subgenre === name ? "var(--setup-selected-text)" : "var(--color-text-primary)", cursor: "pointer", fontWeight: subgenre === name ? 600 : 400 }}>
              {name}
              {desc && (
                <InlineTip text={desc} width={210}>
                  <span onClick={e => e.stopPropagation()} style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 13, height: 13, borderRadius: "50%", border: "1.5px solid currentColor", fontSize: 8, fontStyle: "italic", fontWeight: 700, fontFamily: "serif", cursor: "default", userSelect: "none", lineHeight: 1, opacity: 0.6 }}>i</span>
                </InlineTip>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GenreDiscovery({ onConfirm, apiKey }) {
  const [pitch, setPitch] = useState("");
  const [step, setStep] = useState("idle");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const uniqueGenres = [...new Set(
    Object.values(GENRES).flatMap(byAudience =>
      Object.values(byAudience).flatMap(list => list.map(g => g.key))
    )
  )];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, suggestions]);

  async function callClaude(history) {
    const headers = apiKey === "__claude_ai__"
      ? { "Content-Type": "application/json" }
      : { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" };
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `You help writers identify which genre their work belongs to (fiction or non-fiction). Given a description, do ONE of the following:
A) If you have enough information, return: { "action": "suggest", "suggestions": [ { "genre": "Genre Name", "reason": "1-2 sentence explanation" } ] } — 2-3 genres ordered by best fit. Only use genres from: ${uniqueGenres.join(", ")}.
B) If you need more information, return: { "action": "question", "message": "A single friendly follow-up question." }
Return ONLY valid JSON. No markdown, no backticks, no preamble.`,
          messages: history
        })
      });
      const data = await res.json();
      if (data.error) {
        const msg = data.error.type === "authentication_error"
          ? "A valid API key is required to use genre discovery — add yours above."
          : `API error: ${data.error.message}`;
        setMessages(prev => [...prev, { role: "assistant", content: msg }]);
        setStep("questions"); setLoading(false); return;
      }
      const raw = data.content?.find(b => b.type === "text")?.text || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      if (parsed.action === "suggest") {
        setSuggestions(parsed.suggestions);
        setStep("suggestions");
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: parsed.message }]);
        setStep("questions");
      }
    } catch (e) {
      const msg = e.message === "Failed to fetch"
        ? "Genre discovery requires an API key. Click the 'API key ×' button in the editor to add yours, then return here."
        : `Something went wrong — ${e.message || "please try again."}`;
      setMessages(prev => [...prev, { role: "assistant", content: msg }]);
      setStep("questions");
    }
    setLoading(false);
  }

  async function submitPitch() {
    if (!pitch.trim()) return;
    setStep("thinking"); setLoading(true);
    const history = [{ role: "user", content: pitch }];
    setMessages(history);
    await callClaude(history);
  }

  async function submitFollowUp() {
    if (!input.trim()) return;
    const next = [...messages, { role: "user", content: input }];
    setMessages(next); setInput(""); setLoading(true);
    await callClaude(next);
  }

  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 8px" }}>Briefly describe your work — a sentence or two is enough.</p>

      {step === "idle" && (
        <>
          <textarea value={pitch} onChange={e => setPitch(e.target.value)}
            placeholder="e.g. A teenage girl discovers she can manipulate time, but every change she makes unravels someone else's future..."
            style={{ width: "100%", minHeight: 80, resize: "vertical", fontSize: 13, boxSizing: "border-box", padding: "8px 12px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontFamily: "var(--font-sans)", lineHeight: 1.6 }} />
          <button onClick={submitPitch} disabled={!pitch.trim()}
            style={{ marginTop: 8, padding: "7px 18px", fontSize: 13, borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: !pitch.trim() ? "var(--color-text-tertiary)" : "var(--color-text-primary)", cursor: !pitch.trim() ? "not-allowed" : "pointer" }}>
            Find my genre →
          </button>
        </>
      )}

      {step === "thinking" && (
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>Thinking about your work...</p>
      )}

      {step === "questions" && (
        <div>
          <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "10px 12px", marginBottom: 10, maxHeight: 180, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <p style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-tertiary)", margin: "0 0 2px" }}>{m.role === "user" ? "You" : "Editor"}</p>
                <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0 }}>{m.content}</p>
              </div>
            ))}
            {loading && <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>Thinking...</p>}
            <div ref={bottomRef} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && submitFollowUp()}
              placeholder="Your answer..."
              style={{ flex: 1, fontSize: 13, padding: "7px 10px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontFamily: "var(--font-sans)" }} />
            <button onClick={submitFollowUp} disabled={loading || !input.trim()}
              style={{ padding: "7px 14px", fontSize: 13, borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: loading || !input.trim() ? "var(--color-text-tertiary)" : "var(--color-text-primary)", cursor: loading || !input.trim() ? "not-allowed" : "pointer" }}>
              Send
            </button>
          </div>
        </div>
      )}

      {step === "suggestions" && (
        <div>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 10px" }}>Based on your description — pick the closest fit.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {suggestions.map(({ genre, reason }) => (
              <button key={genre} onClick={() => onConfirm(genre)}
                style={{ textAlign: "left", padding: "10px 14px", fontSize: 13, borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", cursor: "pointer" }}>
                <span style={{ fontWeight: 500, display: "block", marginBottom: 2 }}>{genre}</span>
                <span style={{ color: "var(--color-text-secondary)", fontSize: 12, lineHeight: 1.5 }}>{reason}</span>
              </button>
            ))}
          </div>
          <button onClick={() => { setStep("idle"); setPitch(""); setMessages([]); setSuggestions([]); }}
            style={{ marginTop: 10, fontSize: 12, color: "var(--color-text-tertiary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            ← Describe again
          </button>
        </div>
      )}
    </div>
  );
}

function ApiKeyBanner({ onReady }) {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("");
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    if (!key.trim()) return;
    setTesting(true); setError("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": key.trim(), "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 10, messages: [{ role: "user", content: "hi" }] })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      localStorage.setItem("story_editor_api_key", key.trim());
      onReady(key.trim());
    } catch (e) {
      setError("Invalid key — please check and try again.");
    }
    setTesting(false);
  }

  if (!open) return (
    <div style={{ marginBottom: "1.5rem", padding: "8px 12px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Add an Anthropic API key to enable AI features like genre discovery.</span>
      <button onClick={() => setOpen(true)} style={{ fontSize: 13, color: "var(--color-text-primary)", background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0, marginLeft: 12 }}>Add key →</button>
    </div>
  );

  return (
    <div style={{ marginBottom: "1.5rem", padding: "10px 12px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)" }}>
      <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 6px" }}>Anthropic API key</p>
      <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 8px", lineHeight: 1.5 }}>Get yours at <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" style={{ color: "#1e40af" }}>console.anthropic.com</a>. Stored in your browser only.</p>
      <div style={{ display: "flex", gap: 8 }}>
        <input type="password" value={key} onChange={e => setKey(e.target.value)} onKeyDown={e => e.key === "Enter" && save()}
          placeholder="sk-ant-..."
          style={{ flex: 1, fontSize: 13, padding: "7px 10px", borderRadius: "var(--border-radius-md)", border: "1px solid #d1d5db", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontFamily: "var(--font-mono)" }} />
        <button onClick={save} disabled={testing || !key.trim()}
          style={{ padding: "7px 14px", fontSize: 13, borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: testing || !key.trim() ? "var(--color-text-tertiary)" : "var(--color-text-primary)", cursor: testing || !key.trim() ? "not-allowed" : "pointer" }}>
          {testing ? "Verifying..." : "Save"}
        </button>
        <button onClick={() => setOpen(false)} style={{ fontSize: 13, color: "var(--color-text-tertiary)", background: "none", border: "none", cursor: "pointer", padding: "0 4px" }}>Cancel</button>
      </div>
      {error && <p style={{ fontSize: 12, color: "#dc2626", margin: "6px 0 0" }}>{error}</p>}
    </div>
  );
}

function ApiKeySetup({ onReady }) {
  const [key, setKey] = useState("");
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");

  async function testAndSave() {
    if (!key.trim()) return;
    setTesting(true); setError("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": key.trim(), "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 10, messages: [{ role: "user", content: "hi" }] })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      localStorage.setItem("story_editor_api_key", key.trim());
      onReady(key.trim());
    } catch (e) {
      setError(e.message.includes("401") || e.message.includes("auth") ? "Invalid API key — please check and try again." : `Error: ${e.message}`);
    }
    setTesting(false);
  }

  return (
    <div style={{ fontFamily: "var(--font-sans)", padding: "1.5rem 0", maxWidth: 480, color: "var(--color-text-primary)" }}>
      <h2 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 6px" }}>Welcome to Story Editor</h2>
      <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 1.5rem", lineHeight: 1.6 }}>
        This app uses the Anthropic API to analyse your writing. You'll need your own API key — your key is stored only in your browser and never sent to anyone but Anthropic.
      </p>
      <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-lg)", padding: "14px 16px", marginBottom: "1.5rem", borderLeft: "3px solid #93c5fd" }}>
        <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 8px" }}>How to get your API key</p>
        <ol style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, paddingLeft: 18, lineHeight: 1.9 }}>
          <li>Go to <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" style={{ color: "#1e40af" }}>console.anthropic.com</a></li>
          <li>Sign up or log in to your Anthropic account</li>
          <li>Click <strong>API Keys</strong> in the left sidebar</li>
          <li>Click <strong>Create Key</strong>, give it a name, and copy it</li>
          <li>Paste it below</li>
        </ol>
        <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "10px 0 0", lineHeight: 1.5 }}>
          Usage is pay-as-you-go. A typical session costs a fraction of a cent. You can set spending limits in your Anthropic console.
        </p>
      </div>
      <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 6px" }}>Your API key</p>
      <input type="password" value={key} onChange={e => setKey(e.target.value)} onKeyDown={e => e.key === "Enter" && testAndSave()}
        placeholder="sk-ant-..."
        style={{ width: "100%", boxSizing: "border-box", fontSize: 13, padding: "9px 12px", borderRadius: "var(--border-radius-md)", border: "1px solid #d1d5db", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontFamily: "var(--font-mono)", marginBottom: 8 }} />
      {error && <p style={{ fontSize: 12, color: "#dc2626", margin: "0 0 8px" }}>{error}</p>}
      <button onClick={testAndSave} disabled={testing || !key.trim()}
        style={{ width: "100%", padding: "9px 0", fontSize: 14, fontWeight: 500, borderRadius: "var(--border-radius-md)", border: "1px solid #d1d5db", background: "var(--color-background-primary)", color: testing || !key.trim() ? "#9ca3af" : "var(--color-text-primary)", cursor: testing || !key.trim() ? "not-allowed" : "pointer" }}>
        {testing ? "Verifying..." : "Verify & continue →"}
      </button>
      <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "10px 0 0", lineHeight: 1.5 }}>
        Your key is saved in your browser's local storage and never transmitted to anyone other than Anthropic.
      </p>
    </div>
  );
}

export default function StoryEditor({ theme = "light", setTheme = () => {} }) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("story_editor_api_key") || "__claude_ai__");
  const [contentType, setContentType] = useState(null);
  const [genre, setGenre] = useState(null);
  const [subgenre, setSubgenre] = useState(null);
  const [audience, setAudience] = useState(null);
  const [intensity, setIntensity] = useState(null);
  const [genreMode, setGenreMode] = useState("pick");
  const [feedbackScope, setFeedbackScope] = useState("all");
  const [setupPage, setSetupPage] = useState(1);
  const [ready, setReady] = useState(false);
  const [text, setText] = useState("");
  const [context, setContext] = useState("");
  const [showContext, setShowContext] = useState(false);
  const [tab, setTab] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeNote, setActiveNote] = useState(null);
  const [chat, setChat] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);
  const previewRef = useRef(null);
  const feedbackRef = useRef(null);
  const noteRefs = useRef([]);
  const programmaticScrollRef = useRef(false);
  const [viewMode, setViewMode] = useState("cards");

  // Browser back-button support for internal page navigation
  useEffect(() => {
    history.replaceState({ appPage: 'setup1' }, '');
    const handlePopState = (e) => {
      const appPage = e.state?.appPage;
      if (appPage === 'editor') { setReady(true); }
      else if (appPage === 'setup2') { setReady(false); setSetupPage(2); }
      else if (appPage === 'setup1') { setReady(false); setSetupPage(1); }
      else { window.location.hash = ''; }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const effectiveTab = feedbackScope !== "all" ? TAB_KEYS.indexOf(feedbackScope) : tab;
  const tabKey = TAB_KEYS[effectiveTab];
  const color = (theme === "dark" ? TAB_COLORS_DARK : TAB_COLORS)[tabKey];
  const currentData = feedback?.[tabKey];
  const currentNotes = currentData?.notes || [];
  const selectedIntensity = INTENSITIES.find(i => i.key === intensity);
  const selectedAudience = AUDIENCES.find(a => a.key === audience);

  const allGenres = (() => {
    const seen = new Set();
    const result = [];
    const audienceOrder = ["adult", "ya", "middle-grade"];
    for (const [type, byAudience] of Object.entries(GENRES)) {
      for (const audKey of audienceOrder) {
        for (const g of (byAudience[audKey] || [])) {
          if (!seen.has(g.key)) { seen.add(g.key); result.push({ ...g, _type: type }); }
        }
      }
    }
    return result;
  })();
  const selectedGenreData = allGenres.find(g => g.key === genre);
  const audienceKey = audience === "unsure" ? "adult" : audience;
  const activeGenres = (contentType && audienceKey) ? (GENRES[contentType]?.[audienceKey] || []) : allGenres;

  function switchTab(i) {
    setTab(i); setActiveNote(null); noteRefs.current = [];
    if (feedbackRef.current) feedbackRef.current.scrollTop = 0;
  }

  useEffect(() => {
    if (activeNote === null || !previewRef.current) return;
    const mark = previewRef.current.querySelector(`mark[data-note="${activeNote}"]`);
    if (!mark) return;
    const c = previewRef.current;
    const top = mark.offsetTop;
    if (top < c.scrollTop || top + mark.offsetHeight > c.scrollTop + c.clientHeight) {
      programmaticScrollRef.current = true;
      c.scrollTo({ top: top - c.clientHeight / 2, behavior: "smooth" });
      setTimeout(() => { programmaticScrollRef.current = false; }, 800);
    }
  }, [activeNote, tabKey]);

  function handleFeedbackScroll() {
    if (programmaticScrollRef.current || !feedbackRef.current || !feedback) return;
    const c = feedbackRef.current;
    const mid = c.scrollTop + c.clientHeight / 2;
    let closest = null; let dist = Infinity;
    noteRefs.current.forEach((el, i) => {
      if (!el) return;
      const d = Math.abs(el.offsetTop + el.offsetHeight / 2 - mid);
      if (d < dist) { dist = d; closest = i; }
    });
    if (closest !== null && closest !== activeNote) setActiveNote(closest);
  }

  function handlePreviewScroll() {
    if (programmaticScrollRef.current || !previewRef.current || !feedback) return;
    const c = previewRef.current;
    const mid = c.scrollTop + c.clientHeight / 2;
    const marks = c.querySelectorAll("mark[data-note]");
    let closest = null; let dist = Infinity;
    marks.forEach(mark => {
      const noteIdx = parseInt(mark.getAttribute("data-note"));
      const d = Math.abs(mark.offsetTop + mark.offsetHeight / 2 - mid);
      if (d < dist) { dist = d; closest = noteIdx; }
    });
    if (closest !== null && closest !== activeNote) {
      setActiveNote(closest);
      if (noteRefs.current[closest] && feedbackRef.current) {
        programmaticScrollRef.current = true;
        feedbackRef.current.scrollTo({ top: noteRefs.current[closest].offsetTop - 16, behavior: "smooth" });
        setTimeout(() => { programmaticScrollRef.current = false; }, 800);
      }
    }
  }

  const authHeaders = apiKey === "__claude_ai__"
    ? { "Content-Type": "application/json" }
    : { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" };

  async function analyze() {
    if (!text.trim()) return;
    setLoading(true); setError(""); setFeedback(null); setActiveNote(null);
    try {
      const userMsg = context.trim() ? `Story context:\n${context}\n\nExcerpt:\n${text}` : `Excerpt:\n${text}`;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 4096,
          system: buildSystemPrompt(contentType, genre, subgenre, audience, intensity, feedbackScope),
          messages: [{ role: "user", content: userMsg }]
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const raw = data.content?.find(b => b.type === "text")?.text || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      let parsed;
      try { parsed = JSON.parse(clean); }
      catch { throw new Error(`JSON parse failed. Raw: ${clean.slice(0, 200)}`); }
      for (const key of TAB_KEYS) {
        if (parsed[key]?.notes)
          parsed[key].notes = [...parsed[key].notes].sort((a, b) => findQuotePos(text, a.quote) - findQuotePos(text, b.quote));
      }
      setFeedback(parsed); setChat([]);
      if (feedbackRef.current) feedbackRef.current.scrollTop = 0;
    } catch (e) { setError(`Error: ${e.message}`); }
    setLoading(false);
  }

  function handleHighlightClick(e) {
    const el = e.target.closest("mark[data-note]");
    if (!el) { setActiveNote(null); return; }
    const idx = parseInt(el.getAttribute("data-note"));
    const next = activeNote === idx ? null : idx;
    setActiveNote(next);
    if (next !== null && noteRefs.current[next] && feedbackRef.current)
      feedbackRef.current.scrollTo({ top: noteRefs.current[next].offsetTop - 16, behavior: "smooth" });
  }

  async function sendChat() {
    if (!chatInput.trim() || !feedback) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    const newChat = [...chat, { role: "user", content: userMsg }];
    setChat(newChat); setChatLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 4096,
          system: `You are a ${genre} literary editor. Excerpt:\n${text}\n\nFeedback:\n${JSON.stringify(feedback)}\n\nAnswer follow-up questions helpfully and specifically.`,
          messages: newChat
        })
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type === "text")?.text || "";
      setChat([...newChat, { role: "assistant", content: reply }]);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch { setChat([...newChat, { role: "assistant", content: "Sorry, something went wrong." }]); }
    setChatLoading(false);
  }

  function downloadPDF() {
    const win = window.open("", "_blank");
    const meta = [contentType === "nonfiction" ? "Non-Fiction" : "Fiction", genre, subgenre, selectedAudience?.label, selectedIntensity?.label].filter(Boolean).join(" · ");
    const sectionsHTML = TAB_KEYS.map((key, i) => {
      const data = feedback?.[key];
      if (!data) return "";
      const notesHTML = (data.notes || []).map(n => `
        <div class="note">
          ${n.quote ? `<div class="quote">"${n.quote.length > 120 ? n.quote.slice(0, 120) + "…" : n.quote}"</div>` : ""}
          ${n.positive ? `<div class="label green">What works</div><p>${n.positive}</p>` : ""}
          ${n.issue ? `<div class="label amber">Issue</div><p>${n.issue}</p>` : ""}
          ${n.suggestion ? `<div class="label blue">Try this</div><p>${n.suggestion}</p>` : ""}
        </div>`).join("");
      return `<div class="section"><h2>${TABS[i]}</h2>${data.summary ? `<p class="summary">${data.summary}</p>` : ""}${notesHTML}</div>`;
    }).join("");
    win.document.write(`<!DOCTYPE html><html><head><title>Story Editor Feedback</title><style>
      body{font-family:system-ui,sans-serif;max-width:820px;margin:0 auto;padding:2rem;color:#111827;font-size:14px}
      h1{font-size:20px;font-weight:600;margin:0 0 4px}
      .meta{font-size:12px;color:#6b7280;margin:0 0 1rem}
      .color-key{display:flex;gap:16px;margin-bottom:1.5rem}
      .key{font-size:11px;font-weight:600;letter-spacing:.03em}
      .key.prose{color:#1e40af}.key.chars{color:#9d174d}.key.plot{color:#065f46}
      .excerpt{font-size:13px;line-height:1.75;padding:12px 14px;background:#f9fafb;border-radius:8px;margin-bottom:10px;white-space:pre-wrap;border:1px solid #e5e7eb}
      h2{font-size:15px;font-weight:600;margin:1.5rem 0 8px;padding-bottom:6px;border-bottom:1px solid #e5e7eb}
      .summary{font-size:13px;line-height:1.6;background:#f0fdf4;padding:10px 12px;border-radius:6px;margin-bottom:12px;border:1px solid #bbf7d0}
      .note{margin-bottom:14px;padding:10px 12px;border:1px solid #e5e7eb;border-radius:8px;page-break-inside:avoid}
      .quote{font-style:italic;font-size:12px;color:#6b7280;border-left:2px solid #6ee7b7;padding-left:8px;margin-bottom:8px}
      .label{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;margin:0 0 3px}
      .label.green{color:#059669}.label.amber{color:#b45309}.label.blue{color:#1e40af}
      p{font-size:13px;line-height:1.6;margin:0 0 8px}
      @media print{body{padding:.5rem}}
    </style></head><body>
      <h1>Story Editor Feedback</h1>
      <div class="meta">${meta}</div>
      <div class="excerpt">${buildPDFHighlightHTML(text, feedback)}</div>
      <div class="color-key"><span class="key prose">■ Prose</span><span class="key chars">■ Characters</span><span class="key plot">■ Plot &amp; Pacing</span></div>
      ${sectionsHTML}
    </body></html>`);
    win.document.close();
    setTimeout(() => win.print(), 300);
  }

  const labelStyle = c => ({ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: c, display: "block", marginBottom: 3 });
  const blockStyle = (bg, border) => ({ fontSize: 13, lineHeight: 1.6, margin: 0, padding: "6px 10px", borderRadius: "8px", background: bg, borderLeft: `2px solid ${border}` });

  if (!apiKey) return <ApiKeySetup onReady={k => setApiKey(k)} />;

  if (!ready) return (
    <div style={{ fontFamily: "var(--font-sans)", padding: "1.5rem 0", color: "var(--color-text-primary)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <h2 style={{ fontSize: 18, fontWeight: 500, margin: 0, color: "#b10125" }}>Story Editor</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            style={{ border: "1px solid var(--color-border-secondary)", borderRadius: 7, width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "none", color: "var(--color-text-primary)", fontSize: 14, flexShrink: 0 }}>
            {theme === "dark" ? "☀" : "☽"}
          </button>
          {apiKey !== "__claude_ai__" && (
            <button onClick={() => { localStorage.removeItem("story_editor_api_key"); setApiKey(""); }}
              style={{ fontSize: 12, color: "var(--color-text-tertiary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              API key ×
            </button>
          )}
        </div>
      </div>
      <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 1.5rem" }}>Set your preferences before you begin.</p>

      {setupPage === 1 && (
        <>
          {apiKey === "__claude_ai__" && <ApiKeyBanner onReady={k => setApiKey(k)} />}

          <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 10px", color: "var(--color-text-primary)" }}>What are you working on?</p>
          <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
            {[
              { key: "fiction",    label: "Fiction",     desc: "Imagined characters, worlds, and events. Includes all genres from fantasy to literary fiction." },
              { key: "nonfiction", label: "Non-Fiction",  desc: "True stories, real people, and factual content. Includes memoir, journalism, history, and more." },
            ].map(({ key, label, desc }) => (
              <button key={key}
                onClick={() => setContentType(key)}
                style={{ display: "flex", alignItems: "center", gap: 6, textAlign: "left", padding: "5px 10px", fontSize: 13, borderRadius: "var(--border-radius-md)", border: contentType === key ? "2px solid var(--setup-selected-border)" : "1px solid var(--setup-unselected-border)", background: contentType === key ? "var(--setup-selected-bg)" : "var(--setup-unselected-bg)", cursor: "pointer" }}>
                <span style={{ fontWeight: contentType === key ? 600 : 400, fontSize: contentType === key ? 14 : 13, color: contentType === key ? "var(--setup-selected-text)" : "var(--color-text-primary)" }}>{label}</span>
                <InlineTip text={desc} width={240}>
                  <span onClick={e => e.stopPropagation()} style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 14, height: 14, borderRadius: "50%", border: "1.5px solid var(--color-text-tertiary)", fontSize: 9, fontStyle: "italic", fontWeight: 700, fontFamily: "serif", color: "var(--color-text-tertiary)", cursor: "default", userSelect: "none", lineHeight: 1 }}>i</span>
                </InlineTip>
              </button>
            ))}
          </div>

          <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 10px", color: "var(--color-text-primary)" }}>Who is this for?</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {AUDIENCES.map(({ key, label, ages, desc }) => {
              const disabled = !contentType;
              return (
                <button key={key} onClick={() => !disabled && setAudience(key)}
                  style={{ flex: 1, textAlign: "left", padding: "5px 8px", fontSize: 13, borderRadius: "var(--border-radius-md)", border: audience === key ? "2px solid var(--setup-selected-border)" : "1px solid var(--setup-unselected-border)", background: audience === key ? "var(--setup-selected-bg)" : "var(--setup-unselected-bg)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 4 }}>
                    <div>
                      <span style={{ fontWeight: audience === key ? 600 : 400, fontSize: audience === key ? 14 : 13, color: audience === key ? "var(--setup-selected-text)" : "var(--color-text-primary)", display: "block" }}>{label}</span>
                      {ages && <span style={{ fontSize: 11, color: "var(--setup-secondary-text)", display: "block", marginTop: 1 }}>{ages}</span>}
                    </div>
                    <InlineTip text={disabled ? "Select Fiction or Non-Fiction first" : desc} width={240}>
                      <span onClick={e => e.stopPropagation()} style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 14, height: 14, borderRadius: "50%", border: "1.5px solid var(--color-text-tertiary)", fontSize: 9, fontStyle: "italic", fontWeight: 700, fontFamily: "serif", color: "var(--color-text-tertiary)", cursor: "default", userSelect: "none", lineHeight: 1, marginTop: 1 }}>i</span>
                    </InlineTip>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ marginBottom: 8 }}>
            <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 2px", color: "var(--color-text-primary)" }}>What is your genre?</p>
            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.5 }}>Pick the closest match — even if your work blends genres or doesn't fit perfectly.</p>
          </div>

          {genreMode === "pick" && (() => {
            const genreDisabled = !(contentType && audience);
            const displayGenres = [...(genreDisabled ? allGenres : activeGenres)].sort((a, b) => a.key.localeCompare(b.key));
            return (
              <>
                <button
                  onClick={() => { if (!genreDisabled) { setGenreMode("discover"); setGenre(null); setSubgenre(null); } }}
                  style={{ marginBottom: 10, padding: "8px 14px", fontSize: 13, borderRadius: "var(--border-radius-md)", border: "2px solid var(--setup-selected-border)", background: "var(--setup-unselected-bg)", color: "var(--color-text-primary)", cursor: genreDisabled ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: genreDisabled ? 0.4 : 1 }}>
                  Help me find my genre →
                </button>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5, marginBottom: "1.5rem", opacity: genreDisabled ? 0.4 : 1 }}>
                  {(() => {
                    const items = [];
                    for (let i = 0; i < displayGenres.length; i += 4) {
                      const row = displayGenres.slice(i, i + 4);
                      row.forEach(({ key, desc }) => {
                        items.push(
                          <button key={key} onClick={() => { if (genreDisabled) return; genre === key ? (setGenre(null), setSubgenre(null)) : (setGenre(key), setSubgenre(null)); }}
                            style={{ textAlign: "left", padding: "4px 7px", borderRadius: "var(--border-radius-md)", border: genre === key ? "2px solid var(--setup-selected-border)" : "1px solid var(--setup-unselected-border)", background: genre === key ? "var(--setup-selected-bg)" : "var(--setup-unselected-bg)", cursor: genreDisabled ? "not-allowed" : "pointer", width: "100%" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
                              <span style={{ fontSize: genre === key ? 14 : 13, fontWeight: genre === key ? 600 : 400, color: genre === key ? "var(--setup-selected-text)" : "var(--color-text-primary)", lineHeight: 1.3 }}>{key}</span>
                              <InlineTip text={genreDisabled ? (!contentType ? "Select a type first" : "Select an age range first") : desc} width={220}>
                                <span onClick={e => e.stopPropagation()} style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 14, height: 14, borderRadius: "50%", border: "1.5px solid var(--color-text-tertiary)", fontSize: 9, fontStyle: "italic", fontWeight: 700, fontFamily: "serif", color: "var(--color-text-tertiary)", cursor: "default", userSelect: "none", lineHeight: 1 }}>i</span>
                              </InlineTip>
                            </div>
                          </button>
                        );
                      });
                      if (!genreDisabled && row.some(g => g.key === genre)) {
                        const activeGenreData = displayGenres.find(g => g.key === genre);
                        if (activeGenreData?.subgenres?.length > 0) {
                          items.push(
                            <div key={`sub-${i}`} style={{ gridColumn: "1 / -1" }}>
                              <SubgenrePills subgenres={activeGenreData.subgenres} subgenre={subgenre} setSubgenre={setSubgenre} />
                            </div>
                          );
                        }
                      }
                    }
                    return items;
                  })()}
                </div>
              </>
            );
          })()}

          {contentType && audience && genreMode === "discover" && (
            <div style={{ marginBottom: "1.5rem" }}>
              <GenreDiscovery
                onConfirm={g => {
                  const entry = allGenres.find(x => x.key === g);
                  if (entry) setContentType(entry._type);
                  setGenre(g);
                  setGenreMode("pick");
                }}
                apiKey={apiKey}
              />
              <button onClick={() => { setGenreMode("pick"); setGenre(null); setSubgenre(null); }}
                style={{ marginTop: 12, padding: "8px 14px", fontSize: 13, borderRadius: "var(--border-radius-md)", border: "1px solid var(--setup-unselected-border)", background: "var(--setup-unselected-bg)", color: "var(--color-text-primary)", cursor: "pointer", fontFamily: "inherit" }}>
                ← Back to genre list
              </button>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => { if (genre) { history.pushState({ appPage: 'setup2' }, ''); setSetupPage(2); } }} disabled={!genre}
              style={{ padding: "9px 28px", fontSize: 15, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", borderRadius: "var(--border-radius-md)", border: genre ? "2px solid #b10125" : "1px solid var(--setup-unselected-border)", background: genre ? "#b10125" : "var(--setup-disabled-bg)", color: genre ? "#ffffff" : "var(--setup-disabled-text)", cursor: genre ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
              Continue →
            </button>
          </div>
        </>
      )}

      {setupPage === 2 && (
        <>
          <div style={{ padding: "10px 14px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
              {contentType === "nonfiction" ? "Non-Fiction" : "Fiction"} · {selectedAudience?.label} · <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>{genre}{subgenre ? ` · ${subgenre}` : ""}</span>
            </span>
          </div>

          <p style={{ fontSize: 14, fontWeight: 600, margin: "0 0 10px", color: "var(--color-text-primary)" }}>What would you like feedback on?</p>
          <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
            {[
              { key: "all",        label: "Everything",    desc: "Full feedback across prose, characters, and plot." },
              { key: "prose",      label: "Prose",         desc: "Style, clarity, and word choice." },
              { key: "characters", label: "Characters",    desc: "Voice, motivation, and consistency." },
              { key: "plot",       label: "Plot & Pacing", desc: "Structure, tension, and rhythm." },
            ].map(({ key, label, desc }) => {
              const colors = theme === "dark" ? TAB_COLORS_DARK : TAB_COLORS;
              const isSelected = feedbackScope === key;
              const hasScopeColor = key !== "all" && isSelected;
              return (
                <button key={key} onClick={() => setFeedbackScope(key)}
                  style={{ flex: 1, textAlign: "left", padding: "6px 8px", borderRadius: "var(--border-radius-md)", border: isSelected ? `2px solid ${hasScopeColor ? colors[key].border : "var(--setup-selected-border)"}` : "1px solid var(--setup-unselected-border)", background: isSelected ? (hasScopeColor ? colors[key].bg : "var(--setup-selected-bg)") : "var(--setup-unselected-bg)", cursor: "pointer" }}>
                  <span style={{ display: "block", fontWeight: isSelected ? 600 : 400, fontSize: isSelected ? 14 : 13, color: isSelected ? (hasScopeColor ? colors[key].text : "var(--setup-selected-text)") : "var(--color-text-primary)", marginBottom: 2 }}>{label}</span>
                  <span style={{ display: "block", fontSize: 12, color: "var(--setup-secondary-text)", lineHeight: 1.4 }}>{desc}</span>
                </button>
              );
            })}
          </div>

          <p style={{ fontSize: 14, fontWeight: 600, margin: "0 0 10px", color: "var(--color-text-primary)" }}>How would you like your feedback?</p>
          <div style={{ display: "flex", gap: 8, marginBottom: "2rem" }}>
            {INTENSITIES.map(({ key, label, desc }) => (
              <button key={key} onClick={() => setIntensity(key)}
                style={{ flex: 1, textAlign: "left", padding: "6px 10px", borderRadius: "var(--border-radius-md)", border: intensity === key ? "2px solid var(--setup-selected-border)" : "1px solid var(--setup-unselected-border)", background: intensity === key ? "var(--setup-selected-bg)" : "var(--setup-unselected-bg)", cursor: "pointer" }}>
                <span style={{ fontWeight: intensity === key ? 600 : 400, fontSize: intensity === key ? 14 : 13, color: intensity === key ? "var(--setup-selected-text)" : "var(--color-text-primary)", display: "block", marginBottom: 3 }}>{label}</span>
                <span style={{ fontSize: 12, color: "var(--setup-secondary-text)", lineHeight: 1.4, display: "block" }}>{desc}</span>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => history.back()}
              style={{ padding: "8px 14px", fontSize: 13, borderRadius: "var(--border-radius-md)", border: "1px solid var(--setup-unselected-border)", background: "var(--setup-unselected-bg)", color: "var(--color-text-primary)", cursor: "pointer", fontFamily: "inherit" }}>
              ← Back
            </button>
            {intensity && (
              <button onClick={() => { history.pushState({ appPage: 'editor' }, ''); setReady(true); }}
                style={{ padding: "9px 28px", fontSize: 15, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", borderRadius: "var(--border-radius-md)", border: "2px solid #b10125", background: "#b10125", color: "#ffffff", cursor: "pointer", fontFamily: "inherit" }}>
                Let's get editing →
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );

  const scopeLabel = { all: "Everything", prose: "Prose", characters: "Characters", plot: "Plot & Pacing" }[feedbackScope];

  return (
    <div style={{ fontFamily: "var(--font-sans)", padding: "1rem 0", color: "var(--color-text-primary)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: 18, fontWeight: 500, margin: 0, color: "#b10125" }}>Story Editor</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            style={{ border: "1px solid var(--color-border-secondary)", borderRadius: 7, width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "none", color: "var(--color-text-primary)", fontSize: 14, flexShrink: 0 }}>
            {theme === "dark" ? "☀" : "☽"}
          </button>
          <button onClick={() => { localStorage.removeItem("story_editor_api_key"); setApiKey(""); }}
            style={{ fontSize: 12, color: "var(--color-text-tertiary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            API key ×
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "1rem", padding: "10px 14px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 24px" }}>
          {[
            { label: "Type",      value: contentType === "nonfiction" ? "Non-Fiction" : "Fiction" },
            { label: "Audience",  value: selectedAudience?.label },
            { label: "Genre",     value: genre },
            subgenre ? { label: "Subgenre",  value: subgenre } : null,
            { label: "Intensity", value: selectedIntensity?.label },
            { label: "Focus",     value: scopeLabel },
          ].filter(Boolean).map(({ label, value }) => (
            <div key={label}>
              <span style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-tertiary)", marginRight: 5 }}>{label}</span>
              <span style={{ fontSize: 13, color: "var(--color-text-primary)" }}>{value}</span>
            </div>
          ))}
        </div>
        <button onClick={() => { setReady(false); setFeedback(null); setContentType(null); setGenre(null); setSubgenre(null); setAudience(null); setIntensity(null); setFeedbackScope("all"); setText(""); setGenreMode("pick"); setSetupPage(1); }}
          style={{ fontSize: 12, color: "var(--color-text-secondary)", background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", cursor: "pointer", padding: "6px 12px", marginTop: 8, display: "inline-block" }}>
          ← Change selections
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12, height: 31 }}>
            <button onClick={analyze} disabled={loading || !text.trim()}
              style={{ padding: "7px 18px", fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--border-radius-md)", border: !loading && text.trim() ? "1.5px solid #b10125" : "0.5px solid var(--color-border-secondary)", cursor: loading || !text.trim() ? "not-allowed" : "pointer", background: !loading && text.trim() ? "#b10125" : "var(--setup-disabled-bg)", color: !loading && text.trim() ? "#ffffff" : "var(--setup-disabled-text)", fontFamily: "inherit" }}>
              {loading ? "Analyzing..." : feedback ? "Re-analyze →" : "Analyze →"}
            </button>
          </div>
          {!feedback
            ? <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Write or paste your story excerpt here..."
                style={{ width: "100%", height: 500, resize: "none", fontSize: 14, lineHeight: 1.75, boxSizing: "border-box", padding: "10px 12px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontFamily: "var(--font-sans)" }} />
            : <div ref={previewRef} key={tabKey}
                onScroll={handlePreviewScroll}
                style={{ height: 500, overflowY: "auto", fontSize: 14, lineHeight: 1.75, padding: "10px 12px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", wordBreak: "break-word" }}
                dangerouslySetInnerHTML={buildHighlightedHTML(text, currentNotes, tabKey, theme === "dark")} />
          }
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
            <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>{wordCount} word{wordCount !== 1 ? "s" : ""}</span>
            {feedback && <button onClick={() => { setFeedback(null); setActiveNote(null); }} style={{ fontSize: 12, color: "var(--color-text-secondary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Edit text</button>}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
            <button onClick={analyze} disabled={loading || !text.trim()}
              style={{ padding: "7px 18px", fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--border-radius-md)", border: !loading && text.trim() ? "1.5px solid #b10125" : "0.5px solid var(--color-border-secondary)", cursor: loading || !text.trim() ? "not-allowed" : "pointer", background: !loading && text.trim() ? "#b10125" : "var(--setup-disabled-bg)", color: !loading && text.trim() ? "#ffffff" : "var(--setup-disabled-text)", fontFamily: "inherit" }}>
              {loading ? "Analyzing..." : feedback ? "Re-analyze →" : "Analyze →"}
            </button>
          </div>
          {error && <p style={{ fontSize: 13, color: "var(--color-text-danger)", marginTop: 6 }}>{error}</p>}
        </div>

        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 12, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 4, flex: 1 }}>
              {TABS.map((t, i) => {
                if (feedbackScope !== "all" && TAB_KEYS[i] !== feedbackScope) return null;
                return (
                  <button key={t} onClick={() => switchTab(i)}
                    style={{ flex: 1, padding: "6px 0", fontSize: 13, borderRadius: "var(--border-radius-md)", border: effectiveTab === i ? `0.5px solid ${TAB_COLORS[TAB_KEYS[i]].border}` : "0.5px solid var(--color-border-tertiary)", background: effectiveTab === i ? TAB_COLORS[TAB_KEYS[i]].bg : "transparent", color: effectiveTab === i ? TAB_COLORS[TAB_KEYS[i]].text : "var(--color-text-secondary)", cursor: "pointer", fontWeight: effectiveTab === i ? 500 : 400 }}>
                    {t}
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
              {[["cards", "Cards"], ["list", "List"]].map(([mode, label]) => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  style={{ padding: "4px 10px", fontSize: 11, border: "none", cursor: "pointer", background: viewMode === mode ? (theme === "dark" ? "#3a3a3a" : "#e5e7eb") : "transparent", color: viewMode === mode ? "var(--color-text-primary)" : "var(--color-text-tertiary)", fontWeight: viewMode === mode ? 500 : 400 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ position: "relative" }}>
          <div ref={feedbackRef} onScroll={handleFeedbackScroll}
            style={{ height: 500, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", padding: "10px 12px 48px" }}>
            {!feedback && !loading && <p style={{ color: "var(--color-text-tertiary)", fontSize: 13, margin: 0 }}>Feedback will appear here after analysis.</p>}
            {loading && <BookLoader />}

            {feedback && currentData?.summary && (
              <div style={{ padding: "12px 14px", borderRadius: "var(--border-radius-lg)", border: `0.5px solid ${color.border}`, background: color.bg }}>
                <span style={labelStyle(color.text)}>Overview</span>
                <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>{currentData.summary}</p>
              </div>
            )}

            {feedback && currentNotes.map((n, i) => {
              const isActive = activeNote === i;
              const handleNoteClick = () => {
                const next = isActive ? null : i;
                setActiveNote(next);
                if (next !== null && previewRef.current) {
                  const mark = previewRef.current.querySelector(`mark[data-note="${next}"]`);
                  if (mark) previewRef.current.scrollTo({ top: mark.offsetTop - previewRef.current.clientHeight / 2, behavior: "smooth" });
                }
              };
              const noteBody = (
                <>
                  {n.quote && (
                    <div style={{ marginBottom: 10 }}>
                      <span style={labelStyle("var(--color-text-tertiary)")}>Excerpt</span>
                      <p style={{ ...blockStyle("transparent", color.border), fontStyle: "italic", color: "var(--color-text-secondary)", margin: 0 }}>
                        "{n.quote.length > 100 ? n.quote.slice(0, 100) + "…" : n.quote}"
                      </p>
                    </div>
                  )}
                  {n.positive && (
                    <div style={{ marginBottom: 8 }}>
                      <span style={labelStyle(theme === "dark" ? "#4ade80" : "#059669")}>What works</span>
                      <p style={{ fontSize: 14, lineHeight: 1.65, margin: 0 }}>{n.positive}</p>
                    </div>
                  )}
                  {n.issue && (
                    <div style={{ marginBottom: 8 }}>
                      <span style={labelStyle(theme === "dark" ? "#fbbf24" : "#b45309")}>Issue</span>
                      <p style={{ fontSize: 14, lineHeight: 1.65, margin: 0 }}>{n.issue}</p>
                    </div>
                  )}
                  {n.suggestion && (
                    <div>
                      <span style={labelStyle(color.text)}>Try this</span>
                      <p style={{ ...blockStyle(isActive ? (theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.5)") : "var(--color-background-primary)", color.border), color: "var(--color-text-secondary)", margin: 0 }}>{n.suggestion}</p>
                    </div>
                  )}
                </>
              );
              if (viewMode === "list") {
                const listLabel = n.quote ? `"${n.quote.length > 60 ? n.quote.slice(0, 60) + "…" : n.quote}"` : `Note ${i + 1}`;
                return (
                  <div key={i} ref={el => noteRefs.current[i] = el}
                    style={{ borderRadius: "var(--border-radius-md)", border: `0.5px solid ${isActive ? color.border : "var(--color-border-tertiary)"}`, overflow: "hidden" }}>
                    <div onClick={handleNoteClick} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", cursor: "pointer", background: isActive ? color.bg : "var(--color-background-secondary)" }}>
                      <span style={{ fontSize: 13, color: "var(--color-text-secondary)", fontStyle: n.quote ? "italic" : "normal", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{listLabel}</span>
                      <span style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginLeft: 8, flexShrink: 0 }}>{isActive ? "▲" : "▼"}</span>
                    </div>
                    {isActive && (
                      <div style={{ padding: "10px 12px", background: "var(--color-background-primary)", borderTop: `0.5px solid ${color.border}` }}>
                        {noteBody}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <div key={i} ref={el => noteRefs.current[i] = el}
                  onClick={handleNoteClick}
                  style={{ padding: "12px 14px", borderRadius: "var(--border-radius-lg)", border: `0.5px solid ${isActive ? color.border : "var(--color-border-tertiary)"}`, background: isActive ? color.bg : "var(--color-background-secondary)", cursor: "pointer", transition: "background 0.15s" }}>
                  {noteBody}
                </div>
              );
            })}
          </div>
          {feedback && (
            <button onClick={downloadPDF} style={{ position: "absolute", bottom: 8, right: 8, fontSize: 12, fontWeight: 500, color: "#b10125", background: "var(--color-background-primary)", border: "1.5px solid #b10125", borderRadius: "var(--border-radius-md)", cursor: "pointer", padding: "5px 12px", fontFamily: "inherit" }}>Download PDF</button>
          )}
          </div>
          {feedback && <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "6px 0 0" }}>Scroll either panel to sync highlights</p>}
        </div>
      </div>

      {/* Story context panel */}
      <div style={{ marginTop: 16, borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", overflow: "hidden" }}>
        <button onClick={() => setShowContext(c => !c)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 14px", background: "var(--color-background-secondary)", border: "none", cursor: "pointer", fontFamily: "inherit", gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>Story context</span>
          <span style={{ fontSize: 12, color: "var(--color-text-tertiary)", flex: 1, textAlign: "left" }}>Optional — character names, world notes, story so far</span>
          <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{showContext ? "▲" : "▼"}</span>
        </button>
        {showContext && (
          <textarea value={context} onChange={e => setContext(e.target.value)} placeholder="Add any context that might help the editor — character names, world-building notes, where this excerpt sits in the larger story..."
            style={{ width: "100%", minHeight: 100, resize: "vertical", fontSize: 13, boxSizing: "border-box", padding: "10px 14px", border: "none", borderTop: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontFamily: "var(--font-sans)", display: "block" }} />
        )}
      </div>

      {/* Ask a follow-up panel */}
      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 8px", color: "var(--color-text-secondary)" }}>Ask a question</p>
        <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-lg)", border: "0.5px solid var(--color-border-tertiary)", padding: "12px 14px", maxHeight: 220, overflowY: "auto" }}>
          {!feedback && chat.length === 0 && <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", margin: 0 }}>Run an analysis first, then ask follow-up questions about your writing.</p>}
          {feedback && chat.length === 0 && <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", margin: 0 }}>e.g. "How can I improve the opening line?" or "Is my pacing too slow?"</p>}
          {chat.map((m, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-tertiary)", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{m.role === "user" ? "You" : "Editor"}</p>
              <p style={{ fontSize: 14, lineHeight: 1.65, margin: 0, whiteSpace: "pre-wrap" }}>{m.content}</p>
            </div>
          ))}
          {chatLoading && <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>Thinking...</p>}
          <div ref={chatEndRef} />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendChat()}
            placeholder={feedback ? "Ask about your story..." : "Run an analysis to unlock questions"}
            disabled={!feedback}
            style={{ flex: 1, fontSize: 14, padding: "8px 12px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontFamily: "var(--font-sans)", opacity: feedback ? 1 : 0.5 }} />
          <button onClick={sendChat} disabled={chatLoading || !chatInput.trim() || !feedback}
            style={{ padding: "8px 16px", fontSize: 14, borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: chatLoading || !chatInput.trim() || !feedback ? "var(--color-text-tertiary)" : "var(--color-text-primary)", cursor: chatLoading || !chatInput.trim() || !feedback ? "not-allowed" : "pointer" }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
