import type { QuizConfig, QuizResult } from '@/types/quiz'

// Score keys: emotional, cozy, dark, fast, romance, escapist, thinker, fantasy, thriller, slump_short, slump_comfort, literary, mystery, memoir

const WHAT_NEXT: QuizConfig = {
  id: 'what-should-i-read-next',
  slug: 'what-should-i-read-next',
  title: 'What Should I Read Next?',
  hook: 'Find your next perfect book.',
  description: 'Answer 6 quick questions and we\'ll match you to your perfect read.',
  questions: [
    {
      id: 'q1',
      text: 'How do you want to feel while reading?',
      options: [
        { id: 'a', text: 'Deeply moved, maybe cry a little', scores: { emotional: 3, cozy: 1 } },
        { id: 'b', text: 'Cozy and safe, like a warm blanket', scores: { cozy: 3, romance: 1 } },
        { id: 'c', text: 'Disturbed and intellectually challenged', scores: { dark: 3, thinker: 1 } },
        { id: 'd', text: 'Heart pounding, can\'t stop reading', scores: { fast: 3, thriller: 1 } },
      ],
    },
    {
      id: 'q2',
      text: 'Pick a vibe for your next read:',
      options: [
        { id: 'a', text: 'Character-driven emotional journey', scores: { emotional: 2, cozy: 1 } },
        { id: 'b', text: 'Atmospheric and beautiful settings', scores: { cozy: 2, dark: 1 } },
        { id: 'c', text: 'Dark secrets and complex morality', scores: { dark: 3 } },
        { id: 'd', text: 'Plot twists every chapter', scores: { fast: 2, thriller: 2 } },
      ],
    },
    {
      id: 'q3',
      text: 'How fast do you like the pace?',
      options: [
        { id: 'a', text: 'Slow and immersive — I want to live in the world', scores: { cozy: 2, dark: 1 } },
        { id: 'b', text: 'Medium — balanced story and action', scores: { emotional: 1, romance: 1 } },
        { id: 'c', text: 'Fast — get me to the next scene', scores: { fast: 3 } },
        { id: 'd', text: 'Whatever serves the story', scores: { emotional: 1, cozy: 1 } },
      ],
    },
    {
      id: 'q4',
      text: 'Romance in your book?',
      options: [
        { id: 'a', text: 'Yes please, give me all of it', scores: { romance: 3 } },
        { id: 'b', text: 'A little is nice', scores: { cozy: 1, emotional: 1 } },
        { id: 'c', text: 'Not important to me', scores: { dark: 1, fast: 1 } },
        { id: 'd', text: 'Only if it serves the plot', scores: { thinker: 1, thriller: 1 } },
      ],
    },
    {
      id: 'q5',
      text: 'Ending preference?',
      options: [
        { id: 'a', text: 'Happy ending — I earned it', scores: { cozy: 2, romance: 1 } },
        { id: 'b', text: 'Bittersweet and real', scores: { emotional: 2 } },
        { id: 'c', text: 'Ambiguous — I want to keep thinking', scores: { dark: 1, thinker: 2 } },
        { id: 'd', text: 'Shocking twist I didn\'t see coming', scores: { fast: 1, thriller: 2 } },
      ],
    },
    {
      id: 'q6',
      text: 'Setting you\'re drawn to:',
      options: [
        { id: 'a', text: 'Modern everyday life', scores: { emotional: 1, romance: 1 } },
        { id: 'b', text: 'Small towns and cozy spaces', scores: { cozy: 2 } },
        { id: 'c', text: 'Prestigious academic or elite institutions', scores: { dark: 2 } },
        { id: 'd', text: 'Urban thrill or crime underworld', scores: { fast: 1, thriller: 2 } },
      ],
    },
  ],
  results: [
    {
      id: 'emotional',
      title: 'Emotional Page-Turner',
      emoji: '💔',
      tagline: 'Books that make you feel everything at once.',
      description: 'You crave stories that hit hard emotionally — the kind that stay with you for days. You want complex characters making impossible choices, prose that makes you pause and reread, and endings that feel earned even when they hurt.',
      readingDirections: ['Character-driven literary fiction with raw emotional honesty', 'Contemporary fiction dealing with love, loss, and identity', 'Debut novels from diverse voices exploring universal human truths'],
      whyAppHelps: 'My Next Book tracks your emotional intensity preference across 14 dimensions — so every book in your feed has been pre-matched to hit you exactly the way you want.',
    },
    {
      id: 'cozy',
      title: 'Cozy Escape',
      emoji: '☕',
      tagline: 'Safe, warm, completely transportive.',
      description: 'You read to escape into worlds that feel safe and inviting. Cozy atmospheres, likeable characters, and a sense of comfort — that\'s your sweet spot. You want to forget the outside world and live fully inside a book.',
      readingDirections: ['Cozy mysteries with charming settings and witty protagonists', 'Feel-good contemporary fiction with satisfying resolutions', 'Romantic comedies and small-town love stories'],
      whyAppHelps: 'My Next Book learns your exact comfort level — so you\'ll never get blindsided by a dark twist when you wanted cozy. Your feed auto-adjusts to your current mood.',
    },
    {
      id: 'dark',
      title: 'Dark Academia Pick',
      emoji: '🕯️',
      tagline: 'Beautiful, haunted, morally complex.',
      description: 'You\'re drawn to the shadows. Obsession, ambition, dark academia aesthetics, morally grey characters — you want books that disturb you in a beautiful way and make you question everything you thought you knew.',
      readingDirections: ['Dark academia with Gothic atmosphere and complex moral questions', 'Literary thrillers with unreliable narrators and psychological depth', 'Classic-influenced modern fiction with rich, layered prose'],
      whyAppHelps: 'My Next Book tracks tone, darkness level, and moral ambiguity separately — so your feed stays beautifully dark without tipping into gratuitous.',
    },
    {
      id: 'fast',
      title: 'Fast-Paced Thriller',
      emoji: '⚡',
      tagline: 'Can\'t put it down. Read it in a day.',
      description: 'You need a book that grabs you by chapter one and doesn\'t let go. Plot twists, high stakes, relentless pacing — you want to be so hooked you\'re reading during meals, on your commute, well past midnight.',
      readingDirections: ['Commercial thrillers with propulsive plotting and shocking reveals', 'Psychological suspense where you can\'t trust any character', 'Crime fiction with clever investigators and satisfying payoffs'],
      whyAppHelps: 'My Next Book specifically tracks pace as one of your taste dimensions — so only the fastest, most gripping books surface at the top of your feed.',
    },
    {
      id: 'romance',
      title: 'Romantic Comfort Read',
      emoji: '🌸',
      tagline: 'Warmth, longing, and a satisfying HEA.',
      description: 'You\'re here for the slow burn, the electric tension, the moment two people finally admit what we\'ve known all along. Romance is your comfort food — and you deserve a feed that serves it perfectly.',
      readingDirections: ['Contemporary romance with witty banter and slow-burn tension', 'Historical romance with immersive period settings', 'Second-chance romances and forced proximity tropes'],
      whyAppHelps: 'My Next Book tracks romance level, steam preference, and trope affinity — so you get exactly the romantic intensity you\'re in the mood for.',
    },
  ],
  resultLogic: (scores) => {
    const order = ['emotional', 'cozy', 'dark', 'fast', 'romance']
    return order.reduce((a, b) => (scores[a] ?? 0) >= (scores[b] ?? 0) ? a : b)
  },
}

const BOOK_PERSONALITY: QuizConfig = {
  id: 'book-personality',
  slug: 'book-personality',
  title: 'Book Personality Quiz',
  hook: 'Find your reader personality.',
  description: 'Discover the reader you really are — and the books that match.',
  questions: [
    {
      id: 'q1',
      text: 'Your ideal Saturday afternoon:',
      options: [
        { id: 'a', text: 'Disappeared into a fantasy world for 6 hours', scores: { fantasy: 3 } },
        { id: 'b', text: 'Finishing a thriller I started at midnight', scores: { thriller: 3 } },
        { id: 'c', text: 'Sobbing over a character I loved too much', scores: { escapist: 2, emotional: 2 } },
        { id: 'd', text: 'Annotating a novel that challenged my worldview', scores: { thinker: 3 } },
      ],
    },
    {
      id: 'q2',
      text: 'Your Goodreads shelf is mostly:',
      options: [
        { id: 'a', text: 'Fantasy, sci-fi, and speculative fiction', scores: { fantasy: 3 } },
        { id: 'b', text: 'Thrillers, mysteries, and crime', scores: { thriller: 3 } },
        { id: 'c', text: 'Romance, women\'s fiction, and emotional reads', scores: { romance: 2, escapist: 2 } },
        { id: 'd', text: 'Literary fiction, classics, and essays', scores: { thinker: 3 } },
      ],
    },
    {
      id: 'q3',
      text: 'You DNF (did not finish) a book when:',
      options: [
        { id: 'a', text: 'The world isn\'t interesting enough to live in', scores: { fantasy: 2 } },
        { id: 'b', text: 'The plot slows down after a strong opening', scores: { thriller: 2 } },
        { id: 'c', text: 'I don\'t care about the relationship between characters', scores: { romance: 2, escapist: 1 } },
        { id: 'd', text: 'The writing feels shallow or unambitious', scores: { thinker: 2 } },
      ],
    },
    {
      id: 'q4',
      text: 'A book is unforgettable when:',
      options: [
        { id: 'a', text: 'The world-building is so detailed I miss it like a real place', scores: { fantasy: 3 } },
        { id: 'b', text: 'There\'s a twist I never saw coming', scores: { thriller: 3 } },
        { id: 'c', text: 'I cried at least once and felt something real', scores: { escapist: 2, romance: 1 } },
        { id: 'd', text: 'It changed how I see the world or myself', scores: { thinker: 3 } },
      ],
    },
    {
      id: 'q5',
      text: 'Your friends describe your reading taste as:',
      options: [
        { id: 'a', text: '"Always in a different world"', scores: { fantasy: 2, escapist: 1 } },
        { id: 'b', text: '"Can\'t believe you read that fast"', scores: { thriller: 2 } },
        { id: 'c', text: '"Cries at every book"', scores: { romance: 1, escapist: 2 } },
        { id: 'd', text: '"Has opinions about everything they read"', scores: { thinker: 2 } },
      ],
    },
    {
      id: 'q6',
      text: 'The book series you wish never ended:',
      options: [
        { id: 'a', text: 'An epic fantasy with a massive cast', scores: { fantasy: 3 } },
        { id: 'b', text: 'A detective series with a brilliant investigator', scores: { thriller: 2 } },
        { id: 'c', text: 'A romance trilogy with a couple I rooted for', scores: { romance: 3 } },
        { id: 'd', text: 'A literary saga following one family across generations', scores: { thinker: 2 } },
      ],
    },
  ],
  results: [
    {
      id: 'escapist',
      title: 'The Escapist',
      emoji: '🌌',
      tagline: 'You read to live in worlds beyond your own.',
      description: 'Books are your portal. You disappear completely — into the characters, the emotions, the places. The best books leave you disoriented when you resurface, like waking from a vivid dream. You need stories that transport you fully.',
      readingDirections: ['Immersive character-driven fiction that makes you forget time', 'Emotional contemporary novels with complex inner lives', 'Stories about transformation, love, and the things worth feeling'],
      whyAppHelps: 'My Next Book tracks immersion depth and emotional intensity — serving you books calibrated to the exact level of escape you\'re craving.',
    },
    {
      id: 'thinker',
      title: 'The Deep Thinker',
      emoji: '🧠',
      tagline: 'Books that challenge, unsettle, and expand you.',
      description: 'You don\'t read for comfort — you read to be challenged. You want prose that makes you stop and think, characters with genuine philosophical complexity, and endings that reward your investment of attention.',
      readingDirections: ['Contemporary literary fiction with moral and philosophical depth', 'Translated literature from voices you haven\'t encountered yet', 'Non-fiction narrative that reads like the best fiction'],
      whyAppHelps: 'My Next Book tracks intellectual depth and prose complexity as distinct taste dimensions — so your feed reflects your love of genuinely challenging writing.',
    },
    {
      id: 'romance',
      title: 'The Romance Devourer',
      emoji: '💕',
      tagline: 'All the tension, all the warmth, all the feels.',
      description: 'You know what you love and you own it. Romance done right — with real chemistry, earned vulnerability, and payoffs that make you audibly react — is the best reading experience there is.',
      readingDirections: ['Contemporary romance with sharp wit and slow-burn tension', 'Romantasy that blends magical worlds with emotional depth', 'Dual-POV romances that make you fall for both characters equally'],
      whyAppHelps: 'My Next Book tracks romance intensity, trope preference, and heat level separately — so you always get exactly the kind of love story you\'re in the mood for.',
    },
    {
      id: 'thriller',
      title: 'The Thriller Hunter',
      emoji: '🔦',
      tagline: 'Hooked from page one. Sleep is optional.',
      description: 'You live for the adrenaline. A book that grabs you, refuses to let go, and delivers a payoff that justifies the obsession — that\'s your perfect reading experience. You\'ve read books in a single sitting.',
      readingDirections: ['Psychological thrillers with unreliable narrators', 'Fast-paced crime fiction with brilliant, flawed investigators', 'Domestic suspense that makes ordinary life feel dangerous'],
      whyAppHelps: 'My Next Book tracks pace, tension, and plot density as separate signals — so your feed stays relentlessly gripping and never wastes your time with slow books.',
    },
    {
      id: 'fantasy',
      title: 'The Fantasy World-Builder',
      emoji: '🗺️',
      tagline: 'Give me a world worth getting lost in.',
      description: 'You want depth. Magic systems, fully realized cultures, maps you study before chapter one, lore that exists beyond the page. You fall in love with the world as much as the characters who live in it.',
      readingDirections: ['Epic secondary-world fantasy with rich lore and complex politics', 'Romantasy series that blend world-building with emotional arcs', 'Dark fantasy with morally complex heroes and genuine stakes'],
      whyAppHelps: 'My Next Book tracks world-building intensity and fantasy sub-genre preference — so your feed always has something vast and fully realized to disappear into.',
    },
  ],
  resultLogic: (scores) => {
    const order = ['fantasy', 'thriller', 'romance', 'thinker', 'escapist']
    return order.reduce((a, b) => (scores[a] ?? 0) >= (scores[b] ?? 0) ? a : b)
  },
}

const BOOKTOK: QuizConfig = {
  id: 'booktok-recommendations',
  slug: 'booktok-recommendations',
  title: 'BookTok Recommendation Quiz',
  hook: 'Find the BookTok book you\'ll actually love.',
  description: 'Cut through the hype. Find the viral book that matches YOUR taste.',
  questions: [
    {
      id: 'q1',
      text: 'What makes you pick up a BookTok recommendation?',
      options: [
        { id: 'a', text: '"I cried for 3 hours" reviews', scores: { emotional: 3 } },
        { id: 'b', text: '"Obsessed with this world for weeks" reviews', scores: { fantasy: 3 } },
        { id: 'c', text: '"This was so unhinged I loved it" reviews', scores: { dark: 2, thriller: 1 } },
        { id: 'd', text: '"I stayed up until 3am finishing it" reviews', scores: { thriller: 3 } },
      ],
    },
    {
      id: 'q2',
      text: 'Your BookTok FYP is full of:',
      options: [
        { id: 'a', text: 'Romantasy aesthetics and couple edits', scores: { romance: 2, fantasy: 1 } },
        { id: 'b', text: 'Aesthetic dark academia vibes', scores: { dark: 3 } },
        { id: 'c', text: 'Readers crying over their favorite characters', scores: { emotional: 2, romance: 1 } },
        { id: 'd', text: 'Thriller reveals and book callouts', scores: { thriller: 3 } },
      ],
    },
    {
      id: 'q3',
      text: 'Tropes you actually enjoy (be honest):',
      options: [
        { id: 'a', text: 'Enemies to lovers, slow burn', scores: { romance: 3 } },
        { id: 'b', text: 'Chosen one, magical world discovery', scores: { fantasy: 3 } },
        { id: 'c', text: 'Morally grey antiheroes, dark romance', scores: { dark: 3 } },
        { id: 'd', text: 'Unreliable narrator, everyone is a suspect', scores: { thriller: 3 } },
      ],
    },
    {
      id: 'q4',
      text: 'A viral book disappoints you when:',
      options: [
        { id: 'a', text: 'The romance doesn\'t live up to the hype', scores: { romance: 2 } },
        { id: 'b', text: 'The world is underdeveloped after a great premise', scores: { fantasy: 2 } },
        { id: 'c', text: 'It\'s too sanitized and safe', scores: { dark: 2 } },
        { id: 'd', text: 'The "twist" was obvious from chapter two', scores: { thriller: 2 } },
      ],
    },
    {
      id: 'q5',
      text: 'You\'re most likely to post about a book when:',
      options: [
        { id: 'a', text: 'A scene broke my heart and I need to process', scores: { emotional: 2, romance: 1 } },
        { id: 'b', text: 'I need everyone to know this world exists', scores: { fantasy: 2 } },
        { id: 'c', text: 'I\'m disturbed in the best possible way', scores: { dark: 2 } },
        { id: 'd', text: 'I can\'t believe what just happened in chapter 30', scores: { thriller: 2 } },
      ],
    },
  ],
  results: [
    {
      id: 'romance',
      title: 'Viral Romance',
      emoji: '🌹',
      tagline: 'The romance BookTok keeps pushing — for good reason.',
      description: 'You need the books people are making 5-minute edits for. Slow burns that pay off, enemies who finally admit everything, couples worth shipping with your whole personality. The best BookTok romance isn\'t just sweet — it\'s electric.',
      readingDirections: ['Slow-burn contemporary romance with sharp, witty banter', 'Romantasy series blending magic and genuine love stories', 'Second-chance and forced proximity tropes with real emotional stakes'],
      whyAppHelps: 'My Next Book tracks romance tropes, steam level, and tension style — so your feed shows you the romance books that match YOUR exact flavor, not just whatever\'s viral this week.',
    },
    {
      id: 'fantasy',
      title: 'Fantasy Obsession',
      emoji: '⚔️',
      tagline: 'The fantasy that makes you miss your own world.',
      description: 'You need a world so complete you\'d move there. The BookTok fantasy that earns its hype isn\'t just surface level — it has lore, magic, politics, and characters you\'d actually follow into battle.',
      readingDirections: ['Epic romantasy series with fully realized magic systems', 'Dark fantasy with morally complex protagonists and genuine stakes', 'Fantasy with strong female characters and world-spanning plots'],
      whyAppHelps: 'My Next Book tracks fantasy sub-genre, world-building depth, and darkness level — so you find the fantasy that actually lives up to the hype.',
    },
    {
      id: 'emotional',
      title: 'Tearjerker Pick',
      emoji: '😭',
      tagline: 'The book that earns every single tear.',
      description: 'You\'re here for the books that wreck you beautifully. The ones you finish at 2am completely emotional and immediately text someone to read. Not manipulative crying — earned, cathartic, meaningful.',
      readingDirections: ['Literary fiction about love, loss, and what it means to stay', 'Contemporary stories about grief, hope, and unexpected connection', 'Character-driven novels with endings that feel both devastating and right'],
      whyAppHelps: 'My Next Book tracks emotional intensity separately from sadness level — so you always get the books that hit hard in exactly the way you want.',
    },
    {
      id: 'dark',
      title: 'Dark Academia Favorite',
      emoji: '📖',
      tagline: 'Morally complex, hauntingly beautiful, unforgettable.',
      description: 'You want the books that disturb you in a specific way. Dark academia aesthetics, obsessive characters, Gothic atmosphere, elite institutions hiding terrible things. The beautiful and the unsettling intertwined.',
      readingDirections: ['Dark academia with literary ambition and genuine psychological depth', 'Gothic fiction with haunted settings and morally corrupt protagonists', 'Psychological literary fiction that keeps you up at night thinking'],
      whyAppHelps: 'My Next Book tracks dark atmosphere, moral ambiguity, and prose style as separate dimensions — so your feed stays in the aesthetic without going too extreme.',
    },
    {
      id: 'thriller',
      title: 'Addictive Thriller',
      emoji: '🔪',
      tagline: 'Propulsive, twisty, unputdownable.',
      description: 'You need the BookTok thriller that actually delivers on its 5-star promise. The ones where every chapter reveals something that changes everything. You\'ve read a whole book to find out who did it.',
      readingDirections: ['Psychological thrillers with twists that genuinely surprise', 'Domestic suspense where the ordinary becomes menacing', 'Fast-paced crime fiction that respects your intelligence'],
      whyAppHelps: 'My Next Book tracks pace, twist frequency, and tension curve — so your thriller feed is filled with books that actually stay gripping start to finish.',
    },
  ],
  resultLogic: (scores) => {
    const order = ['romance', 'fantasy', 'emotional', 'dark', 'thriller']
    return order.reduce((a, b) => (scores[a] ?? 0) >= (scores[b] ?? 0) ? a : b)
  },
}

const SLUMP: QuizConfig = {
  id: 'reading-slump',
  slug: 'reading-slump',
  title: 'Reading Slump Fixer',
  hook: 'Find the book that will get you out of a reading slump.',
  description: 'Let\'s diagnose your slump and fix it with the right book.',
  questions: [
    {
      id: 'q1',
      text: 'Why are you in a reading slump?',
      options: [
        { id: 'a', text: 'The last few books felt too long and slow', scores: { slump_short: 3 } },
        { id: 'b', text: 'I\'ve been too emotionally drained for heavy reads', scores: { slump_comfort: 3 } },
        { id: 'c', text: 'Nothing has excited me or surprised me lately', scores: { thriller: 2, fast: 1 } },
        { id: 'd', text: 'I keep starting things and not finishing them', scores: { slump_short: 2, fast: 1 } },
      ],
    },
    {
      id: 'q2',
      text: 'Right now, your mental bandwidth is:',
      options: [
        { id: 'a', text: 'Low — I want something easy to sink into', scores: { slump_comfort: 2, cozy: 1 } },
        { id: 'b', text: 'Medium — I can engage but don\'t want a heavy lift', scores: { fast: 1, romance: 1 } },
        { id: 'c', text: 'I just need something short enough to actually finish', scores: { slump_short: 3 } },
        { id: 'd', text: 'I\'m craving something that jolts me awake', scores: { thriller: 2, fast: 1 } },
      ],
    },
    {
      id: 'q3',
      text: 'The last book you actually loved was:',
      options: [
        { id: 'a', text: 'Under 300 pages and perfect', scores: { slump_short: 2 } },
        { id: 'b', text: 'Emotionally comforting and warm', scores: { slump_comfort: 2 } },
        { id: 'c', text: 'Something I read in one sitting', scores: { fast: 2, thriller: 1 } },
        { id: 'd', text: 'A romance that made me feel things', scores: { romance: 3 } },
      ],
    },
    {
      id: 'q4',
      text: 'What do you need from your next read?',
      options: [
        { id: 'a', text: 'A quick win — something I can finish this weekend', scores: { slump_short: 3 } },
        { id: 'b', text: 'Permission to feel something safe and good', scores: { slump_comfort: 2, romance: 1 } },
        { id: 'c', text: 'Pure adrenaline and plot', scores: { fast: 2, thriller: 1 } },
        { id: 'd', text: 'To be emotionally reset and reminded why I love reading', scores: { emotional: 2, slump_comfort: 1 } },
      ],
    },
    {
      id: 'q5',
      text: 'How long can you commit per reading session right now?',
      options: [
        { id: 'a', text: '10–20 minutes max', scores: { slump_short: 3 } },
        { id: 'b', text: 'About an hour if it hooks me', scores: { fast: 1, slump_comfort: 1 } },
        { id: 'c', text: 'However long it takes once I\'m in', scores: { thriller: 1, romance: 1 } },
        { id: 'd', text: 'I want something that makes me WANT to read longer', scores: { fast: 2 } },
      ],
    },
  ],
  results: [
    {
      id: 'slump_short',
      title: 'Short Addictive Read',
      emoji: '⚡',
      tagline: 'A quick win that reminds you why you love reading.',
      description: 'Your slump cure is a short book you can actually finish. Under 250 pages, fast-moving, satisfying. The goal isn\'t ambition right now — it\'s remembering what it feels like to close a book with that warmth in your chest.',
      readingDirections: ['Novellas and short novels under 200 pages', 'Short story collections where you can read one story at a time', 'Fast single-POV books with a clear beginning, middle, and end'],
      whyAppHelps: 'My Next Book lets you filter by length, pacing, and ease of entry — so you can find the exact short read that will get you back in the game.',
    },
    {
      id: 'emotional',
      title: 'Emotional Reset',
      emoji: '🌊',
      tagline: 'A book that reminds you why stories matter.',
      description: 'You need a book that cracks you open in the best way. Not demanding — emotionally generous. The kind where you finish it feeling like something shifted. Sometimes a good cry is the cure for a reading slump.',
      readingDirections: ['Quiet literary fiction about love, grief, or starting over', 'Character studies that make you feel genuinely seen', 'Debut novels with fresh perspectives and emotional clarity'],
      whyAppHelps: 'My Next Book tracks emotional resonance separately from intensity — finding books that move you without overwhelming you.',
    },
    {
      id: 'slump_comfort',
      title: 'Cozy Low-Stress Pick',
      emoji: '🌿',
      tagline: 'Safe. Warm. Zero pressure.',
      description: 'Your slump is telling you something: you need rest, not ambition. A cozy read with low stakes, likeable characters, and a world you want to live in for a few hours. No trauma, no twists, just warmth.',
      readingDirections: ['Cozy mystery with charming setting and zero jump scares', 'Contemporary romance with guaranteed happy ending', 'Feel-good fiction where good things happen to good people'],
      whyAppHelps: 'My Next Book tracks stress level and darkness specifically — so you get books that feel like a vacation, not a workout.',
    },
    {
      id: 'fast',
      title: 'Fast Thriller',
      emoji: '🏃',
      tagline: 'Grips you so hard you forget you were in a slump.',
      description: 'Sometimes the only way out of a slump is a book so gripping you don\'t have time to be bored. A plot-driven thriller that starts at chapter one and never lets up. You\'ll forget you were in a slump by page 30.',
      readingDirections: ['Propulsive commercial thrillers that work as page-turners', 'Fast mysteries with a clear hook and satisfying payoff', 'Suspense novels under 350 pages with tight plotting'],
      whyAppHelps: 'My Next Book specifically tracks pace and propulsiveness — so your feed surfaces the books that move fastest and hook hardest.',
    },
    {
      id: 'romance',
      title: 'Comfort Romance',
      emoji: '💌',
      tagline: 'Low stakes, high feelings. You deserve this.',
      description: 'When life is hard, sometimes you just need to believe in love for a few hundred pages. A comfort romance with a guaranteed happy ending and characters worth rooting for — uncomplicated and completely satisfying.',
      readingDirections: ['Light contemporary romance with witty dialogue and zero angst', 'Short romantic comedies that make you laugh out loud', 'Friends-to-lovers or second-chance romance with heartwarming resolution'],
      whyAppHelps: 'My Next Book tracks angst level and guarantee of happy ending as real data points — so your comfort reads actually comfort you.',
    },
  ],
  resultLogic: (scores) => {
    const order = ['slump_short', 'emotional', 'slump_comfort', 'fast', 'romance']
    return order.reduce((a, b) => (scores[a] ?? 0) >= (scores[b] ?? 0) ? a : b)
  },
}

const GENRE_MATCH: QuizConfig = {
  id: 'genre-match',
  slug: 'genre-match',
  title: 'Genre Match Quiz',
  hook: 'Find the genre that matches your current mood.',
  description: 'Your mood right now points to a specific genre. Let\'s find it.',
  questions: [
    {
      id: 'q1',
      text: 'How are you feeling right now?',
      options: [
        { id: 'a', text: 'Restless — I want to go somewhere completely different', scores: { fantasy: 3 } },
        { id: 'b', text: 'Thoughtful — I want to sit with something meaningful', scores: { literary: 3 } },
        { id: 'c', text: 'Tender — I want warmth and connection', scores: { romance: 3 } },
        { id: 'd', text: 'Alert — I want to figure something out', scores: { mystery: 3 } },
      ],
    },
    {
      id: 'q2',
      text: 'What kind of world do you want to live in for the next few days?',
      options: [
        { id: 'a', text: 'A world with magic, different rules, and new possibilities', scores: { fantasy: 3 } },
        { id: 'b', text: 'The real world, seen more clearly and beautifully', scores: { literary: 2, memoir: 1 } },
        { id: 'c', text: 'A world where love is the central force of everything', scores: { romance: 3 } },
        { id: 'd', text: 'A world with a secret that needs solving', scores: { mystery: 3 } },
      ],
    },
    {
      id: 'q3',
      text: 'What do you want to feel at the end?',
      options: [
        { id: 'a', text: 'Like I\'ve returned from somewhere real', scores: { fantasy: 2 } },
        { id: 'b', text: 'Changed in a small but real way', scores: { literary: 2, memoir: 1 } },
        { id: 'c', text: 'Warm, hopeful, loved', scores: { romance: 3 } },
        { id: 'd', text: 'Satisfied — like I solved something', scores: { mystery: 3 } },
      ],
    },
    {
      id: 'q4',
      text: 'Whose story do you want to follow?',
      options: [
        { id: 'a', text: 'A hero (or villain) in an epic world', scores: { fantasy: 2 } },
        { id: 'b', text: 'A real or realistic person navigating a complex life', scores: { literary: 1, memoir: 2 } },
        { id: 'c', text: 'Two people falling in love against the odds', scores: { romance: 3 } },
        { id: 'd', text: 'A detective, amateur sleuth, or someone piecing together the truth', scores: { mystery: 3 } },
      ],
    },
    {
      id: 'q5',
      text: 'If you could be inside any book right now, it would be:',
      options: [
        { id: 'a', text: 'A world with dragons, magic, or impossible things', scores: { fantasy: 3 } },
        { id: 'b', text: 'A quiet, beautifully observed story about real people', scores: { literary: 2 } },
        { id: 'c', text: 'A love story I can root for completely', scores: { romance: 3 } },
        { id: 'd', text: 'A gripping true story or memoir about a life well-lived', scores: { memoir: 3 } },
      ],
    },
    {
      id: 'q6',
      text: 'Your current life energy:',
      options: [
        { id: 'a', text: 'I need to escape completely', scores: { fantasy: 2, romance: 1 } },
        { id: 'b', text: 'I want to understand something', scores: { literary: 2, memoir: 1 } },
        { id: 'c', text: 'I want to feel less alone', scores: { romance: 2, literary: 1 } },
        { id: 'd', text: 'I want to be curious about something', scores: { mystery: 2, memoir: 1 } },
      ],
    },
  ],
  results: [
    {
      id: 'fantasy',
      title: 'Fantasy Escape',
      emoji: '🌙',
      tagline: 'Your mood is calling for another world entirely.',
      description: 'Right now you need more than just a good story — you need a portal. Fantasy gives you that complete transportation: a world with different rules, real stakes, magic, and characters whose problems feel distant enough to be freeing.',
      readingDirections: ['Epic fantasy with immersive world-building and a sweeping cast', 'Romantasy that layers magic onto genuine emotional arcs', 'Standalone fantasy for when you don\'t want a 5-book commitment'],
      whyAppHelps: 'My Next Book tracks fantasy sub-genre, world complexity, and magic system depth — so you find the exact kind of other world you\'re in the mood for.',
    },
    {
      id: 'literary',
      title: 'Literary Reflection',
      emoji: '✍️',
      tagline: 'Your mood wants depth, beauty, and real truth.',
      description: 'You\'re in a mode where you want to think and feel at the same time. Literary fiction at its best gives you that — sentences worth rereading, characters who feel like people you\'ve met, and a perspective that changes yours.',
      readingDirections: ['Contemporary literary fiction from debut and mid-career authors', 'Character-driven novels about ordinary lives made extraordinary', 'Quiet, precise books that reward slow reading'],
      whyAppHelps: 'My Next Book tracks prose quality, intellectual depth, and emotional payoff as distinct signals — so your literary feed is genuinely good writing, not just "serious" books.',
    },
    {
      id: 'romance',
      title: 'Romance Comfort',
      emoji: '💛',
      tagline: 'Your heart needs something tender and true.',
      description: 'You\'re in a romance mood — and that\'s not just okay, it\'s perfect. Romance at its best is emotionally intelligent, deeply human storytelling. You deserve books that make you believe in people and connection.',
      readingDirections: ['Contemporary romance with warmth, humor, and genuine feeling', 'Historical romance with rich atmosphere and emotional tension', 'Romance anthologies for when you want variety'],
      whyAppHelps: 'My Next Book tracks romance tropes, emotional temperature, and ending guarantee — so you only get the romance books that deliver exactly what you\'re hoping for.',
    },
    {
      id: 'mystery',
      title: 'Mystery Puzzle',
      emoji: '🔍',
      tagline: 'Your brain wants to figure something out.',
      description: 'You\'re in an active, curious mood — you want to engage, theorize, and solve. Mystery fiction gives your mind something to work with: clues to track, characters to suspect, and the deeply satisfying payoff of the reveal.',
      readingDirections: ['Classic-style mysteries with a fair puzzle and satisfying resolution', 'Contemporary crime fiction with sharp social observation', 'Cozy mysteries for when you want puzzle without tension'],
      whyAppHelps: 'My Next Book tracks mystery sub-type (cozy vs. dark vs. procedural) and puzzle complexity — matching your mood to the right kind of mystery.',
    },
    {
      id: 'memoir',
      title: 'Memoir Inspiration',
      emoji: '🌱',
      tagline: 'A real life that expands your sense of what\'s possible.',
      description: 'You want truth right now — specifically the truth of someone else\'s real, fully lived life. Great memoir gives you perspective, company, and the reminder that extraordinary experiences are available to anyone paying attention.',
      readingDirections: ['Memoirs about transformation and starting over', 'Essay collections from writers whose minds you want to spend time in', 'Nature writing and place-based memoir that opens up the world'],
      whyAppHelps: 'My Next Book tracks non-fiction sub-type and narrative style — so memoir recommendations feel as gripping and personal as the best fiction.',
    },
  ],
  resultLogic: (scores) => {
    const order = ['fantasy', 'literary', 'romance', 'mystery', 'memoir']
    return order.reduce((a, b) => (scores[a] ?? 0) >= (scores[b] ?? 0) ? a : b)
  },
}

const READING_PERSONALITY: QuizConfig = {
  id: 'reading-personality',
  slug: 'reading-personality',
  title: 'Reading Personality Quiz',
  hook: 'What does the way you read say about you?',
  description: 'Not what genre you like — who you actually are as a reader.',
  questions: [
    {
      id: 'rp-q1',
      text: 'It\'s 11pm. You\'re tired but you open a book anyway. Why?',
      options: [
        { id: 'a', text: 'I need to escape whatever today was', scores: { escapist: 3, dreamer: 1 } },
        { id: 'b', text: 'I\'m chasing a feeling I can\'t get anywhere else', scores: { feeler: 3, escapist: 1 } },
        { id: 'c', text: 'My brain won\'t turn off and reading is the only thing that works', scores: { thinker: 3 } },
        { id: 'd', text: 'I just need to find out what happens', scores: { addict: 3, feeler: 1 } },
      ],
    },
    {
      id: 'rp-q2',
      text: 'A book wrecked you emotionally. Your first instinct is:',
      options: [
        { id: 'a', text: 'Sit quietly with it — I need to process alone', scores: { dreamer: 3, feeler: 1 } },
        { id: 'b', text: 'Text someone immediately — they need to read this', scores: { feeler: 3, addict: 1 } },
        { id: 'c', text: 'Write something — a note, a review, anything', scores: { thinker: 3 } },
        { id: 'd', text: 'Start the next book — I need the feeling to continue', scores: { addict: 3, escapist: 1 } },
      ],
    },
    {
      id: 'rp-q3',
      text: 'The last book you couldn\'t put down — what made it that way?',
      options: [
        { id: 'a', text: 'I had to know how it ended — the plot had me hostage', scores: { addict: 3 } },
        { id: 'b', text: 'I was so deep in the world I forgot I was reading', scores: { escapist: 3, dreamer: 1 } },
        { id: 'c', text: 'The characters felt more real than most people I know', scores: { feeler: 3, thinker: 1 } },
        { id: 'd', text: 'The writing itself — every sentence was doing something', scores: { thinker: 3 } },
      ],
    },
    {
      id: 'rp-q4',
      text: 'Be honest: how do you feel about a slow-burn book?',
      options: [
        { id: 'a', text: 'Love it — atmosphere and depth are the whole point', scores: { dreamer: 3, thinker: 1 } },
        { id: 'b', text: 'Fine, as long as the emotional payoff eventually arrives', scores: { feeler: 3 } },
        { id: 'c', text: 'Depends — I need to be in the right mood', scores: { escapist: 2, dreamer: 1 } },
        { id: 'd', text: 'I lose patience — I need things to keep happening', scores: { addict: 3 } },
      ],
    },
    {
      id: 'rp-q5',
      text: 'What does reading actually give you that nothing else does?',
      options: [
        { id: 'a', text: 'A way to feel things safely — big emotions without consequences', scores: { feeler: 3, dreamer: 1 } },
        { id: 'b', text: 'A way out — another world when this one is too much', scores: { escapist: 3 } },
        { id: 'c', text: 'A way to understand — myself, other people, everything', scores: { thinker: 3, feeler: 1 } },
        { id: 'd', text: 'A way to feel alive — the narrative rush is like nothing else', scores: { addict: 3, escapist: 1 } },
      ],
    },
    {
      id: 'rp-q6',
      text: 'Someone asks what kind of books you read. You say:',
      options: [
        { id: 'a', text: '"Whatever makes me feel something"', scores: { feeler: 3 } },
        { id: 'b', text: '"Anything that pulls me completely out of my head"', scores: { escapist: 3, addict: 1 } },
        { id: 'c', text: '"Good writing — I care more about prose than plot"', scores: { thinker: 3, dreamer: 1 } },
        { id: 'd', text: '"I don\'t really have a type — I just always have a book"', scores: { addict: 2, escapist: 1, dreamer: 1 } },
      ],
    },
  ],
  results: [
    {
      id: 'feeler',
      title: 'The Feeler',
      emoji: '🫀',
      tagline: 'You don\'t just read books. You live inside them.',
      description: 'You read for emotional truth. The books that stay with you aren\'t the ones with the cleverest plots — they\'re the ones that cracked something open. You cry at fiction because you\'re paying attention. You finish a book and feel genuinely changed. That\'s not ordinary. Most people never let stories get that close.',
      readingDirections: ['Character-driven literary fiction with devastating emotional honesty', 'Contemporary stories about love, grief, and the things we can\'t say out loud', 'Quiet, precise books that reward being fully present'],
      whyAppHelps: 'My Next Book maps emotional resonance as its own dimension — your feed will be full of books that actually get to you, not just books that are technically good.',
    },
    {
      id: 'escapist',
      title: 'The Escape Artist',
      emoji: '🌌',
      tagline: 'You read to disappear completely. And you\'re good at it.',
      description: 'You have a rare ability — you can fully enter a book and leave everything else behind. You\'re not using fiction to avoid your life. You\'re using it to remember there are other ones. The best books you\'ve ever read left you genuinely disoriented when you resurfaced, like waking from a vivid, better dream.',
      readingDirections: ['Immersive fantasy and speculative fiction with worlds that feel lived-in', 'Atmospheric literary fiction where place becomes character', 'Epic stories with a cast large enough to disappear into'],
      whyAppHelps: 'My Next Book tracks immersion depth and world-building richness separately — so your feed is always stocked with books capable of the real disappearing act.',
    },
    {
      id: 'thinker',
      title: 'The Slow Reader',
      emoji: '🧠',
      tagline: 'You read to understand things. Most people just read to finish.',
      description: 'You underline sentences. You reread paragraphs. You close the book and stare at the ceiling because something just rearranged itself in your head. You\'re not a slow reader because you\'re slow — you\'re slow because you\'re extracting everything. The books that matter most to you are the ones that changed how you think about something real.',
      readingDirections: ['Literary fiction and essays where the prose itself is the point', 'Ambitious non-fiction narrative that reads like the best novels', 'Translated literature from voices and worlds you haven\'t encountered yet'],
      whyAppHelps: 'My Next Book tracks intellectual complexity, prose ambition, and idea density as real taste signals — your feed will challenge you the way you actually want to be challenged.',
    },
    {
      id: 'addict',
      title: 'The Book Addict',
      emoji: '📚',
      tagline: 'You\'re not reading a book. You\'re always reading a book.',
      description: 'You have a book in every room. You read in lines, between meetings, while the pasta boils. You\'ve read a whole novel in a day when a plot had you completely. For you, reading isn\'t a hobby — it\'s just part of how you function. The question is never whether you\'re reading something, it\'s whether what you\'re reading is good enough.',
      readingDirections: ['Propulsive fiction that respects your time and doesn\'t let you down', 'Series with satisfying installments so the feeling never has to end', 'Short story collections for when you have twenty minutes and need a full experience'],
      whyAppHelps: 'My Next Book learns your reading pace and how you respond to different structures — so there\'s always something worthy waiting when you inevitably finish the current one.',
    },
    {
      id: 'dreamer',
      title: 'The Slow Burn Reader',
      emoji: '🕯️',
      tagline: 'You don\'t rush books. You let them arrive.',
      description: 'You carry a book for weeks sometimes. You\'re not distracted — you\'re savoring. You read three pages, set it down, think about it for two days, then come back. The books you love most aren\'t the ones you raced through — they\'re the ones that existed alongside your actual life for a while. You have a more intimate relationship with stories than most readers ever will.',
      readingDirections: ['Atmospheric, lyrical fiction where mood matters as much as plot', 'Books with beautiful sentences worth returning to', 'Short novels and novellas where length matches the intimacy you prefer'],
      whyAppHelps: 'My Next Book tracks reading pace preference and atmospheric density as separate signals — your feed will always have something worth savoring, never something that demands to be rushed.',
    },
  ],
  resultLogic: (scores) => {
    const order = ['feeler', 'escapist', 'thinker', 'addict', 'dreamer']
    return order.reduce((a, b) => (scores[a] ?? 0) >= (scores[b] ?? 0) ? a : b)
  },
}

export const QUIZZES: Record<string, QuizConfig> = {
  'what-should-i-read-next': WHAT_NEXT,
  'book-personality': BOOK_PERSONALITY,
  'booktok-recommendations': BOOKTOK,
  'reading-slump': SLUMP,
  'genre-match': GENRE_MATCH,
  'reading-personality': READING_PERSONALITY,
}

export function getQuiz(slug: string): QuizConfig | null {
  return QUIZZES[slug] ?? null
}

export function computeResult(config: QuizConfig, answers: Record<string, string>): QuizResult | null {
  const scores: Record<string, number> = {}
  for (const question of config.questions) {
    const selectedId = answers[question.id]
    if (!selectedId) continue
    const option = question.options.find((o) => o.id === selectedId)
    if (!option) continue
    for (const [key, val] of Object.entries(option.scores)) {
      scores[key] = (scores[key] ?? 0) + val
    }
  }
  const resultId = config.resultLogic(scores)
  return config.results.find((r) => r.id === resultId) ?? config.results[0]
}

