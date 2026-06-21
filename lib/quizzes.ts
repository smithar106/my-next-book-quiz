import type { QuizConfig, QuizResult, QuizVector } from '@/types/quiz'

// Score keys for what-should-i-read-next, book-personality, reading-personality:
// dark_cerebral, momentum, literary_escapist, emotional_realist, speculative_thinker, quiet_intellectual, chaos, atmospheric_explorer

const WHAT_NEXT: QuizConfig = {
  id: 'what-should-i-read-next',
  slug: 'what-should-i-read-next',
  title: 'What Should I Read Next?',
  hook: 'The books you love aren\'t random.',
  description: 'Answer a few questions and discover the emotional patterns behind your reading taste.',
  questions: [
    {
      id: 'feel',
      text: 'What do you want your next book to feel like?',
      options: [
        { id: 'a', text: 'Impossible to put down', scores: { momentum: 3, dark_cerebral: 1 } },
        { id: 'b', text: 'Emotionally devastating', scores: { emotional_realist: 3, dark_cerebral: 1 } },
        { id: 'c', text: 'Quietly haunting', scores: { atmospheric_explorer: 3, quiet_intellectual: 1 } },
        { id: 'd', text: 'Intellectually sharp', scores: { dark_cerebral: 2, quiet_intellectual: 2 } },
        { id: 'e', text: 'Strange and unforgettable', scores: { chaos: 3, speculative_thinker: 1 } },
        { id: 'f', text: 'Emotionally dangerous', scores: { dark_cerebral: 3, emotional_realist: 1 } },
      ],
    },
    {
      id: 'ruiner',
      text: 'What usually ruins a book for you?',
      options: [
        { id: 'a', text: 'Predictable emotions', scores: { chaos: 2, dark_cerebral: 1 } },
        { id: 'b', text: 'Flat characters', scores: { emotional_realist: 3, quiet_intellectual: 1 } },
        { id: 'c', text: 'Weak prose', scores: { quiet_intellectual: 3, dark_cerebral: 1 } },
        { id: 'd', text: 'Emotional shallowness', scores: { emotional_realist: 2, atmospheric_explorer: 2 } },
        { id: 'e', text: 'Slow pacing', scores: { momentum: 3 } },
        { id: 'f', text: 'No emotional tension', scores: { dark_cerebral: 2, emotional_realist: 1 } },
      ],
    },
    {
      id: 'lingers',
      text: 'What kind of book do you think about days later?',
      options: [
        { id: 'a', text: 'Emotionally painful books', scores: { emotional_realist: 3, dark_cerebral: 1 } },
        { id: 'b', text: 'Big-idea fiction', scores: { speculative_thinker: 3, quiet_intellectual: 1 } },
        { id: 'c', text: 'Psychological character studies', scores: { dark_cerebral: 2, quiet_intellectual: 2 } },
        { id: 'd', text: 'Books with beautiful prose', scores: { quiet_intellectual: 3, atmospheric_explorer: 1 } },
        { id: 'e', text: 'Strange speculative fiction', scores: { chaos: 2, speculative_thinker: 2 } },
        { id: 'f', text: 'Stories that feel emotionally true', scores: { emotional_realist: 2, literary_escapist: 2 } },
      ],
    },
    {
      id: 'satisfaction',
      text: 'What kind of reading experience feels most satisfying?',
      options: [
        { id: 'a', text: 'Feeling emotionally destroyed', scores: { emotional_realist: 2, dark_cerebral: 2 } },
        { id: 'b', text: 'Feeling intellectually expanded', scores: { speculative_thinker: 2, quiet_intellectual: 2 } },
        { id: 'c', text: 'Escaping completely', scores: { literary_escapist: 3, atmospheric_explorer: 1 } },
        { id: 'd', text: 'Becoming obsessed', scores: { momentum: 2, dark_cerebral: 2 } },
        { id: 'e', text: 'Sitting with ambiguity', scores: { quiet_intellectual: 2, chaos: 2 } },
        { id: 'f', text: 'Feeling emotionally seen', scores: { emotional_realist: 3 } },
      ],
    },
    {
      id: 'protagonist',
      text: 'What kind of protagonist do you keep returning to?',
      options: [
        { id: 'a', text: 'Emotionally isolated', scores: { dark_cerebral: 2, atmospheric_explorer: 2 } },
        { id: 'b', text: 'Morally conflicted', scores: { dark_cerebral: 2, chaos: 2 } },
        { id: 'c', text: 'Brilliant but unstable', scores: { dark_cerebral: 3, quiet_intellectual: 1 } },
        { id: 'd', text: 'Quiet observers', scores: { quiet_intellectual: 3, atmospheric_explorer: 1 } },
        { id: 'e', text: 'Outsiders', scores: { emotional_realist: 2, chaos: 2 } },
        { id: 'f', text: 'Emotionally repressed characters', scores: { atmospheric_explorer: 2, emotional_realist: 2 } },
      ],
    },
    {
      id: 'ending',
      text: 'What kind of ending feels most honest to you?',
      options: [
        { id: 'a', text: 'The kind that destroys me emotionally', scores: { emotional_realist: 2, dark_cerebral: 2 } },
        { id: 'b', text: 'A shocking twist I never saw coming', scores: { momentum: 2, chaos: 2 } },
        { id: 'c', text: 'Open-ended — I want to keep thinking about it', scores: { quiet_intellectual: 2, speculative_thinker: 2 } },
        { id: 'd', text: 'Lingering mood — more feeling than resolution', scores: { atmospheric_explorer: 3, literary_escapist: 1 } },
        { id: 'e', text: 'No resolution — life is ambiguous', scores: { chaos: 2, quiet_intellectual: 2 } },
        { id: 'f', text: 'Earned and emotionally true', scores: { emotional_realist: 3 } },
      ],
    },
  ],
  results: [
    {
      id: 'dark_cerebral',
      title: 'Dark Cerebral Reader',
      emoji: '🖤',
      tagline: 'You gravitate toward books that feel emotionally dangerous but intellectually precise.',
      description: 'You don\'t read for comfort. You read for books that disturb you in productive ways — dark enough to stay with you, precise enough to trust.',
      readingDirections: [
        'Literary fiction with psychological depth and a dark undercurrent',
        'Novels where intelligence and emotional intensity are inseparable',
        'Stories that make you uncomfortable in ways you can\'t stop thinking about',
      ],
      whyAppHelps: 'My Next Book observes the emotional patterns behind every book you save or skip — learning exactly where your cerebral-dark threshold lives.',
    },
    {
      id: 'momentum',
      title: 'Momentum Reader',
      emoji: '⚡',
      tagline: 'You read to be pulled forward. The best books make you miss your stop.',
      description: 'You have no patience for slow burns. You want to be inside the story immediately and unable to leave.',
      readingDirections: [
        'Propulsive fiction that earns its pace',
        'Thrillers where the tension never loosens',
        'Stories that make the outside world disappear',
      ],
      whyAppHelps: 'My Next Book learns how fast you need a story to move — and builds your 5-book playlist around that propulsive instinct.',
    },
    {
      id: 'literary_escapist',
      title: 'Literary Escapist',
      emoji: '🌙',
      tagline: 'You read to disappear into worlds so fully realized they feel more real than your own.',
      description: 'Atmosphere is everything. The right sentence can pull you somewhere else entirely — and the best books never fully let you return.',
      readingDirections: [
        'Immersive fiction where place becomes a character',
        'Atmospheric literary novels with a world you can vanish into',
        'Historical fiction where the past feels more vivid than the present',
      ],
      whyAppHelps: 'My Next Book tracks the atmospheric and immersive qualities you respond to — and builds a playlist of worlds worth disappearing into.',
    },
    {
      id: 'emotional_realist',
      title: 'Emotional Realist',
      emoji: '💧',
      tagline: 'You read to feel understood. The books that stay with you get human experience exactly right.',
      description: 'You read for the quietly devastating moments. The grief that isn\'t dramatic. The love that doesn\'t resolve. Books that get the texture of life right.',
      readingDirections: [
        'Contemporary fiction with raw emotional honesty',
        'Character studies that find the extraordinary in ordinary pain',
        'Family drama that doesn\'t look away from what\'s difficult',
      ],
      whyAppHelps: 'My Next Book observes your preference for emotional truth — and builds a playlist of fiction that earns that kind of feeling.',
    },
    {
      id: 'speculative_thinker',
      title: 'Speculative Thinker',
      emoji: '🔭',
      tagline: 'You read to have your assumptions challenged. Fiction that extrapolates, questions, and builds new systems of meaning.',
      description: 'You prefer books that use invented worlds to say true things. The best speculative fiction makes you see the real world differently — and you can\'t unsee it.',
      readingDirections: [
        'Speculative fiction that extrapolates ideas to their unsettling conclusions',
        'Sci-fi that uses the future to illuminate what we\'re already doing',
        'Stories that build entire systems of meaning from a single premise',
      ],
      whyAppHelps: 'My Next Book tracks your appetite for idea-driven, assumption-challenging fiction — and sharpens every playlist around it.',
    },
    {
      id: 'quiet_intellectual',
      title: 'Quiet Intellectual',
      emoji: '📐',
      tagline: 'You read slowly and deliberately. Dense prose, layered meaning, ideas that unfold over time.',
      description: 'You return to sentences. You notice construction. You prefer books that reward full attention — ones that reveal more the second time you read them.',
      readingDirections: [
        'Dense literary fiction that assumes an attentive reader',
        'Prose-driven novels where every sentence is doing work',
        'Essays that demand and return the effort you give them',
      ],
      whyAppHelps: 'My Next Book notes every signal that you prefer depth over pace — and builds playlists that never shortchange your attention.',
    },
    {
      id: 'chaos',
      title: 'Chaos Reader',
      emoji: '🌀',
      tagline: 'You read to be surprised. Predictability is the only thing that can lose you.',
      description: 'You want books that break their own rules. Stories that shift beneath your feet. Endings that arrive somewhere you couldn\'t have predicted — and that feel truer for it.',
      readingDirections: [
        'Experimental fiction that dismantles expectations as it goes',
        'Surreal narratives that resist easy interpretation',
        'Genre-bending novels that are impossible to categorize',
      ],
      whyAppHelps: 'My Next Book learns your appetite for the unexpected — and builds playlists that never settle into predictability.',
    },
    {
      id: 'atmospheric_explorer',
      title: 'Atmospheric Explorer',
      emoji: '🌫️',
      tagline: 'You read for feeling more than plot. The best books leave you with a mood that lingers for days.',
      description: 'A specific texture of light. A sense of cold. A tone you can\'t fully name. The books that stay with you longest aren\'t the ones with the best plots — they\'re the ones with the most distinctive feeling.',
      readingDirections: [
        'Atmospheric fiction where mood accumulates slowly and stays',
        'Gothic novels where setting and dread are inseparable',
        'Slow literary fiction where feeling is the primary event',
      ],
      whyAppHelps: 'My Next Book observes the atmospheric qualities you respond to — and builds a playlist around how books make you feel, not just what they\'re about.',
    },
  ],
  resultLogic: (scores) => {
    const keys = ['dark_cerebral', 'momentum', 'literary_escapist', 'emotional_realist', 'speculative_thinker', 'quiet_intellectual', 'chaos', 'atmospheric_explorer'] as const
    return keys.reduce((a, b) => (scores[a] ?? 0) >= (scores[b] ?? 0) ? a : b)
  },
}

const BOOK_PERSONALITY: QuizConfig = {
  id: 'book-personality',
  slug: 'book-personality',
  title: 'Book Personality Quiz',
  hook: 'Your taste says more about you than you think.',
  description: 'Discover the emotional and intellectual instincts shaping what you read.',
  questions: [
    {
      id: 'bp-q1',
      text: 'What kind of emotional experience are you secretly searching for?',
      options: [
        { id: 'a', text: 'To be completely transported', scores: { literary_escapist: 3, atmospheric_explorer: 1 } },
        { id: 'b', text: 'To feel something I can\'t feel elsewhere', scores: { emotional_realist: 3, dark_cerebral: 1 } },
        { id: 'c', text: 'To have my assumptions taken apart', scores: { speculative_thinker: 3, quiet_intellectual: 1 } },
        { id: 'd', text: 'To be unable to stop reading', scores: { momentum: 3, chaos: 1 } },
      ],
    },
    {
      id: 'bp-q2',
      text: 'What kind of book lingers in your head afterward?',
      options: [
        { id: 'a', text: 'One that left emotional residue I couldn\'t shake', scores: { atmospheric_explorer: 3, emotional_realist: 1 } },
        { id: 'b', text: 'One that made me see the world differently', scores: { speculative_thinker: 3, quiet_intellectual: 1 } },
        { id: 'c', text: 'One that made me feel deeply understood', scores: { emotional_realist: 3 } },
        { id: 'd', text: 'One that disturbed me in a specific, precise way', scores: { dark_cerebral: 3, quiet_intellectual: 1 } },
      ],
    },
    {
      id: 'bp-q3',
      text: 'You put a book down and never go back when:',
      options: [
        { id: 'a', text: 'The atmosphere never materializes', scores: { atmospheric_explorer: 3, literary_escapist: 1 } },
        { id: 'b', text: 'Nothing about it surprises me', scores: { chaos: 3, momentum: 1 } },
        { id: 'c', text: 'I don\'t feel anything for the characters', scores: { emotional_realist: 3 } },
        { id: 'd', text: 'The prose feels unambitious', scores: { quiet_intellectual: 3, dark_cerebral: 1 } },
      ],
    },
    {
      id: 'bp-q4',
      text: 'A book becomes unforgettable when:',
      options: [
        { id: 'a', text: 'It altered something in how I see the world', scores: { speculative_thinker: 3, dark_cerebral: 1 } },
        { id: 'b', text: 'A mood from it stayed with me for days', scores: { atmospheric_explorer: 3, literary_escapist: 1 } },
        { id: 'c', text: 'I recognized myself somewhere I didn\'t expect to', scores: { emotional_realist: 3 } },
        { id: 'd', text: 'It ended somewhere I never could have predicted', scores: { chaos: 3, momentum: 1 } },
      ],
    },
    {
      id: 'bp-q5',
      text: 'What do you want your next book to leave you with?',
      options: [
        { id: 'a', text: 'A specific emotional texture I can\'t name', scores: { atmospheric_explorer: 3, dark_cerebral: 1 } },
        { id: 'b', text: 'The satisfaction of a story that couldn\'t stop', scores: { momentum: 3 } },
        { id: 'c', text: 'Something I\'m still thinking about a week later', scores: { quiet_intellectual: 2, speculative_thinker: 2 } },
        { id: 'd', text: 'The feeling of being emotionally wrecked', scores: { emotional_realist: 2, dark_cerebral: 2 } },
      ],
    },
    {
      id: 'bp-q6',
      text: 'What kind of ending feels most honest to you?',
      options: [
        { id: 'a', text: 'Emotionally devastating — I want to feel wrecked', scores: { emotional_realist: 2, dark_cerebral: 2 } },
        { id: 'b', text: 'Ambiguous — life doesn\'t resolve neatly', scores: { chaos: 2, quiet_intellectual: 2 } },
        { id: 'c', text: 'Lingering — a mood rather than a conclusion', scores: { atmospheric_explorer: 3, literary_escapist: 1 } },
        { id: 'd', text: 'Something I never saw coming', scores: { chaos: 2, momentum: 2 } },
      ],
    },
  ],
  results: [
    {
      id: 'dark_cerebral',
      title: 'Dark Cerebral Reader',
      emoji: '🖤',
      tagline: 'You gravitate toward books that feel emotionally dangerous but intellectually precise.',
      description: 'You don\'t read for comfort. You read for books that disturb you in productive ways — dark enough to stay with you, precise enough to trust.',
      readingDirections: [
        'Literary fiction with psychological depth and a dark undercurrent',
        'Novels where intelligence and emotional intensity are inseparable',
        'Stories that make you uncomfortable in ways you can\'t stop thinking about',
      ],
      whyAppHelps: 'My Next Book observes the emotional patterns behind every book you save or skip — learning exactly where your cerebral-dark threshold lives.',
    },
    {
      id: 'momentum',
      title: 'Momentum Reader',
      emoji: '⚡',
      tagline: 'You read to be pulled forward. The best books make you miss your stop.',
      description: 'You have no patience for slow burns. You want to be inside the story immediately and unable to leave.',
      readingDirections: [
        'Propulsive fiction that earns its pace',
        'Thrillers where the tension never loosens',
        'Stories that make the outside world disappear',
      ],
      whyAppHelps: 'My Next Book learns how fast you need a story to move — and builds your 5-book playlist around that propulsive instinct.',
    },
    {
      id: 'literary_escapist',
      title: 'Literary Escapist',
      emoji: '🌙',
      tagline: 'You read to disappear into worlds so fully realized they feel more real than your own.',
      description: 'Atmosphere is everything. The right sentence can pull you somewhere else entirely — and the best books never fully let you return.',
      readingDirections: [
        'Immersive fiction where place becomes a character',
        'Atmospheric literary novels with a world you can vanish into',
        'Historical fiction where the past feels more vivid than the present',
      ],
      whyAppHelps: 'My Next Book tracks the atmospheric and immersive qualities you respond to — and builds a playlist of worlds worth disappearing into.',
    },
    {
      id: 'emotional_realist',
      title: 'Emotional Realist',
      emoji: '💧',
      tagline: 'You read to feel understood. The books that stay with you get human experience exactly right.',
      description: 'You read for the quietly devastating moments. The grief that isn\'t dramatic. The love that doesn\'t resolve. Books that get the texture of life right.',
      readingDirections: [
        'Contemporary fiction with raw emotional honesty',
        'Character studies that find the extraordinary in ordinary pain',
        'Family drama that doesn\'t look away from what\'s difficult',
      ],
      whyAppHelps: 'My Next Book observes your preference for emotional truth — and surfaces fiction that earns that kind of feeling.',
    },
    {
      id: 'speculative_thinker',
      title: 'Speculative Thinker',
      emoji: '🔭',
      tagline: 'You read to have your assumptions challenged. Fiction that extrapolates, questions, and builds new systems of meaning.',
      description: 'You prefer books that use invented worlds to say true things. The best speculative fiction makes you see the real world differently — and you can\'t unsee it.',
      readingDirections: [
        'Speculative fiction that extrapolates ideas to their unsettling conclusions',
        'Sci-fi that uses the future to illuminate what we\'re already doing',
        'Stories that build entire systems of meaning from a single premise',
      ],
      whyAppHelps: 'My Next Book tracks your appetite for idea-driven, assumption-challenging fiction — and sharpens it with every book you respond to.',
    },
    {
      id: 'quiet_intellectual',
      title: 'Quiet Intellectual',
      emoji: '📐',
      tagline: 'You read slowly and deliberately. Dense prose, layered meaning, ideas that unfold over time.',
      description: 'You return to sentences. You notice construction. You prefer books that reward full attention — ones that reveal more the second time you read them.',
      readingDirections: [
        'Dense literary fiction that assumes an attentive reader',
        'Prose-driven novels where every sentence is doing work',
        'Essays that demand and return the effort you give them',
      ],
      whyAppHelps: 'My Next Book notes every signal that you prefer depth over pace — and builds playlists that never shortchange your attention.',
    },
    {
      id: 'chaos',
      title: 'Chaos Reader',
      emoji: '🌀',
      tagline: 'You read to be surprised. Predictability is the only thing that can lose you.',
      description: 'You want books that break their own rules. Stories that shift beneath your feet. Endings that arrive somewhere you couldn\'t have predicted — and that feel truer for it.',
      readingDirections: [
        'Experimental fiction that dismantles expectations as it goes',
        'Surreal narratives that resist easy interpretation',
        'Genre-bending novels that are impossible to categorize',
      ],
      whyAppHelps: 'My Next Book learns your appetite for the unexpected — and builds playlists that never settle into predictability.',
    },
    {
      id: 'atmospheric_explorer',
      title: 'Atmospheric Explorer',
      emoji: '🌫️',
      tagline: 'You read for feeling more than plot. The best books leave you with a mood that lingers for days.',
      description: 'A specific texture of light. A sense of cold. A tone you can\'t fully name. The books that stay with you longest aren\'t the ones with the best plots — they\'re the ones with the most distinctive feeling.',
      readingDirections: [
        'Atmospheric fiction where mood accumulates slowly and stays',
        'Gothic novels where setting and dread are inseparable',
        'Slow literary fiction where feeling is the primary event',
      ],
      whyAppHelps: 'My Next Book observes the atmospheric qualities you respond to — and builds a playlist around how books make you feel, not just what they\'re about.',
    },
  ],
  resultLogic: (scores) => {
    const keys = ['dark_cerebral', 'momentum', 'literary_escapist', 'emotional_realist', 'speculative_thinker', 'quiet_intellectual', 'chaos', 'atmospheric_explorer'] as const
    return keys.reduce((a, b) => (scores[a] ?? 0) >= (scores[b] ?? 0) ? a : b)
  },
}

const BOOKTOK: QuizConfig = {
  id: 'booktok-recommendations',
  slug: 'booktok-recommendations',
  title: 'BookTok Recommendation Quiz',
  hook: 'You don\'t just want viral books. You want the ones that will actually stay with you.',
  description: 'Cut through the noise. Find the BookTok book that matches how you actually read.',
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
      whyAppHelps: 'My Next Book reads the romantic tension and emotional payoff you respond to — and builds your playlist around the romance that\'s actually yours, not whatever\'s trending.',
    },
    {
      id: 'fantasy',
      title: 'Fantasy Obsession',
      emoji: '⚔️',
      tagline: 'The fantasy that makes you miss your own world.',
      description: 'You need a world so complete you\'d move there. The BookTok fantasy that earns its hype isn\'t just surface level — it has lore, magic, politics, and characters you\'d actually follow into battle.',
      readingDirections: ['Epic romantasy series with fully realized magic systems', 'Dark fantasy with morally complex protagonists and genuine stakes', 'Fantasy with strong female characters and world-spanning plots'],
      whyAppHelps: 'My Next Book reads how deep, dark, and complete you need a world to be — so you find the fantasy that genuinely lives up to the hype rather than just looking good on social media.',
    },
    {
      id: 'emotional',
      title: 'Tearjerker Pick',
      emoji: '😭',
      tagline: 'The book that earns every single tear.',
      description: 'You\'re here for the books that wreck you beautifully. The ones you finish at 2am completely emotional and immediately text someone to read. Not manipulative crying — earned, cathartic, meaningful.',
      readingDirections: ['Literary fiction about love, loss, and what it means to stay', 'Contemporary stories about grief, hope, and unexpected connection', 'Character-driven novels with endings that feel both devastating and right'],
      whyAppHelps: 'My Next Book reads the emotional frequency you need — finding books that earn their devastating moments rather than manufacturing them.',
    },
    {
      id: 'dark',
      title: 'Dark Academia Favorite',
      emoji: '📖',
      tagline: 'Morally complex, hauntingly beautiful, unforgettable.',
      description: 'You want the books that disturb you in a specific way. Dark academia aesthetics, obsessive characters, Gothic atmosphere, elite institutions hiding terrible things. The beautiful and the unsettling intertwined.',
      readingDirections: ['Dark academia with literary ambition and genuine psychological depth', 'Gothic fiction with haunted settings and morally corrupt protagonists', 'Psychological literary fiction that keeps you up at night thinking'],
      whyAppHelps: 'My Next Book reads the specific dark aesthetic you\'re drawn to — finding books that haunt beautifully without slipping past your threshold.',
    },
    {
      id: 'thriller',
      title: 'Addictive Thriller',
      emoji: '🔪',
      tagline: 'Propulsive, twisty, unputdownable.',
      description: 'You need the BookTok thriller that actually delivers on its 5-star promise. The ones where every chapter reveals something that changes everything. You\'ve read a whole book to find out who did it.',
      readingDirections: ['Psychological thrillers with twists that genuinely surprise', 'Domestic suspense where the ordinary becomes menacing', 'Fast-paced crime fiction that respects your intelligence'],
      whyAppHelps: 'My Next Book reads the quality of tension you need from a thriller — and finds the books that sustain it from page one to the final reveal.',
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
  hook: 'The right book is the one that remembers what reading feels like.',
  description: 'Answer a few questions. Get out of your slump with a book that matches your exact emotional state right now.',
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
      whyAppHelps: 'My Next Book reads where you are as a reader right now — and knows how to meet you there with the right weight, length, and pace.',
    },
    {
      id: 'emotional',
      title: 'Emotional Reset',
      emoji: '🌊',
      tagline: 'A book that reminds you why stories matter.',
      description: 'You need a book that cracks you open in the best way. Not demanding — emotionally generous. The kind where you finish it feeling like something shifted. Sometimes a good cry is the cure for a reading slump.',
      readingDirections: ['Quiet literary fiction about love, grief, or starting over', 'Character studies that make you feel genuinely seen', 'Debut novels with fresh perspectives and emotional clarity'],
      whyAppHelps: 'My Next Book reads the emotional register you need right now — finding books that move you without asking more than you can give.',
    },
    {
      id: 'slump_comfort',
      title: 'Cozy Low-Stress Pick',
      emoji: '🌿',
      tagline: 'Safe. Warm. Zero pressure.',
      description: 'Your slump is telling you something: you need rest, not ambition. A cozy read with low stakes, likeable characters, and a world you want to live in for a few hours. No trauma, no twists, just warmth.',
      readingDirections: ['Cozy mystery with charming setting and zero jump scares', 'Contemporary romance with guaranteed happy ending', 'Feel-good fiction where good things happen to good people'],
      whyAppHelps: 'My Next Book reads how much weight you can carry right now — and finds the books that feel like genuine rest rather than another demand.',
    },
    {
      id: 'fast',
      title: 'Fast Thriller',
      emoji: '🏃',
      tagline: 'Grips you so hard you forget you were in a slump.',
      description: 'Sometimes the only way out of a slump is a book so gripping you don\'t have time to be bored. A plot-driven thriller that starts at chapter one and never lets up. You\'ll forget you were in a slump by page 30.',
      readingDirections: ['Propulsive commercial thrillers that work as page-turners', 'Fast mysteries with a clear hook and satisfying payoff', 'Suspense novels under 350 pages with tight plotting'],
      whyAppHelps: 'My Next Book reads the propulsive energy you need from a story — and finds the books where something is always at stake from page one.',
    },
    {
      id: 'romance',
      title: 'Comfort Romance',
      emoji: '💌',
      tagline: 'Low stakes, high feelings. You deserve this.',
      description: 'When life is hard, sometimes you just need to believe in love for a few hundred pages. A comfort romance with a guaranteed happy ending and characters worth rooting for — uncomplicated and completely satisfying.',
      readingDirections: ['Light contemporary romance with witty dialogue and zero angst', 'Short romantic comedies that make you laugh out loud', 'Friends-to-lovers or second-chance romance with heartwarming resolution'],
      whyAppHelps: 'My Next Book reads how much tension you want in a love story right now — and finds the romance that delivers warmth without the anxiety.',
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
  hook: 'Genre is just a starting point.',
  description: 'Discover which emotional territory you\'re actually drawn to — and the books that live there.',
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
      text: 'What does reading feel like you need to do right now?',
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
      whyAppHelps: 'My Next Book reads the world-building depth and tone you need right now — finding the fantasy that actually transports rather than just promising to.',
    },
    {
      id: 'literary',
      title: 'Literary Reflection',
      emoji: '✍️',
      tagline: 'Your mood wants depth, beauty, and real truth.',
      description: 'You\'re in a mode where you want to think and feel at the same time. Literary fiction at its best gives you that — sentences worth rereading, characters who feel like people you\'ve met, and a perspective that changes yours.',
      readingDirections: ['Contemporary literary fiction from debut and mid-career authors', 'Character-driven novels about ordinary lives made extraordinary', 'Quiet, precise books that reward slow reading'],
      whyAppHelps: 'My Next Book reads what genuinely good writing means to you specifically — finding literary fiction that thinks and feels, not just literary fiction that looks serious.',
    },
    {
      id: 'romance',
      title: 'Romance Comfort',
      emoji: '💛',
      tagline: 'Your heart needs something tender and true.',
      description: 'You\'re in a romance mood — and that\'s not just okay, it\'s perfect. Romance at its best is emotionally intelligent, deeply human storytelling. You deserve books that make you believe in people and connection.',
      readingDirections: ['Contemporary romance with warmth, humor, and genuine feeling', 'Historical romance with rich atmosphere and emotional tension', 'Romance anthologies for when you want variety'],
      whyAppHelps: 'My Next Book reads the emotional temperature and warmth you need from a love story right now — and finds the romance that genuinely delivers it.',
    },
    {
      id: 'mystery',
      title: 'Mystery Puzzle',
      emoji: '🔍',
      tagline: 'Your brain wants to figure something out.',
      description: 'You\'re in an active, curious mood — you want to engage, theorize, and solve. Mystery fiction gives your mind something to work with: clues to track, characters to suspect, and the deeply satisfying payoff of the reveal.',
      readingDirections: ['Classic-style mysteries with a fair puzzle and satisfying resolution', 'Contemporary crime fiction with sharp social observation', 'Cozy mysteries for when you want puzzle without tension'],
      whyAppHelps: 'My Next Book reads the kind of puzzle your mind is hungry for right now — matching you to the mystery that satisfies that specific kind of attention.',
    },
    {
      id: 'memoir',
      title: 'Memoir Inspiration',
      emoji: '🌱',
      tagline: 'A real life that expands your sense of what\'s possible.',
      description: 'You want truth right now — specifically the truth of someone else\'s real, fully lived life. Great memoir gives you perspective, company, and the reminder that extraordinary experiences are available to anyone paying attention.',
      readingDirections: ['Memoirs about transformation and starting over', 'Essay collections from writers whose minds you want to spend time in', 'Nature writing and place-based memoir that opens up the world'],
      whyAppHelps: 'My Next Book reads the kind of real life that moves you — finding memoir that feels as transporting and personally true as the best fiction.',
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
  hook: 'You don\'t read for plot alone.',
  description: 'Discover the emotional and intellectual patterns behind your reading taste.',
  questions: [
    {
      id: 'rp-q1',
      text: 'It\'s 11pm. You\'re tired but you open a book anyway. Why?',
      options: [
        { id: 'a', text: 'I need to disappear into another world entirely', scores: { literary_escapist: 3, atmospheric_explorer: 1 } },
        { id: 'b', text: 'I\'m chasing a feeling I can\'t get anywhere else', scores: { emotional_realist: 3, dark_cerebral: 1 } },
        { id: 'c', text: 'My brain won\'t turn off and I need something to think about', scores: { quiet_intellectual: 3, speculative_thinker: 1 } },
        { id: 'd', text: 'I just need to find out what happens', scores: { momentum: 3, chaos: 1 } },
      ],
    },
    {
      id: 'rp-q2',
      text: 'A book wrecked you emotionally. Your first instinct is:',
      options: [
        { id: 'a', text: 'Sit quietly with it — I need to process alone', scores: { quiet_intellectual: 2, atmospheric_explorer: 2 } },
        { id: 'b', text: 'Text someone immediately — they need to read this', scores: { emotional_realist: 3, momentum: 1 } },
        { id: 'c', text: 'Write something — a note, a review, anything', scores: { dark_cerebral: 3, speculative_thinker: 1 } },
        { id: 'd', text: 'Start the next book — I need the feeling to continue', scores: { momentum: 2, literary_escapist: 2 } },
      ],
    },
    {
      id: 'rp-q3',
      text: 'The last book you couldn\'t put down — what made it that way?',
      options: [
        { id: 'a', text: 'I had to know how it ended — the plot had me hostage', scores: { momentum: 3 } },
        { id: 'b', text: 'I was so deep in the world I forgot I was reading', scores: { literary_escapist: 3, atmospheric_explorer: 1 } },
        { id: 'c', text: 'The characters felt more real than most people I know', scores: { emotional_realist: 3, quiet_intellectual: 1 } },
        { id: 'd', text: 'The writing itself — every sentence was doing something', scores: { dark_cerebral: 2, quiet_intellectual: 2 } },
      ],
    },
    {
      id: 'rp-q4',
      text: 'Be honest: how do you feel about a slow-burn book?',
      options: [
        { id: 'a', text: 'Love it — atmosphere and mood are the whole point', scores: { atmospheric_explorer: 3, quiet_intellectual: 1 } },
        { id: 'b', text: 'Fine, as long as the emotional payoff eventually arrives', scores: { emotional_realist: 3 } },
        { id: 'c', text: 'Only if the ideas are earning the slowness', scores: { speculative_thinker: 2, dark_cerebral: 2 } },
        { id: 'd', text: 'I lose patience — I need things to keep happening', scores: { momentum: 3, chaos: 1 } },
      ],
    },
    {
      id: 'rp-q5',
      text: 'What does reading actually give you that nothing else does?',
      options: [
        { id: 'a', text: 'A way to feel things I couldn\'t otherwise access', scores: { emotional_realist: 3, dark_cerebral: 1 } },
        { id: 'b', text: 'A way out — another world when this one is too much', scores: { literary_escapist: 3, atmospheric_explorer: 1 } },
        { id: 'c', text: 'A way to understand — myself, other people, everything', scores: { quiet_intellectual: 2, speculative_thinker: 2 } },
        { id: 'd', text: 'Surprise — the possibility that everything could shift', scores: { chaos: 3, speculative_thinker: 1 } },
      ],
    },
    {
      id: 'rp-q6',
      text: 'Someone asks what kind of books you read. You say:',
      options: [
        { id: 'a', text: '"Whatever gets me emotionally"', scores: { emotional_realist: 3 } },
        { id: 'b', text: '"Anything that pulls me completely out of my life"', scores: { literary_escapist: 2, atmospheric_explorer: 2 } },
        { id: 'c', text: '"Good writing — I care more about prose than plot"', scores: { quiet_intellectual: 3, dark_cerebral: 1 } },
        { id: 'd', text: '"Weird stuff. Books that don\'t read like other books."', scores: { chaos: 3, speculative_thinker: 1 } },
      ],
    },
  ],
  results: [
    {
      id: 'dark_cerebral',
      title: 'Dark Cerebral Reader',
      emoji: '🖤',
      tagline: 'You gravitate toward books that feel emotionally dangerous but intellectually precise.',
      description: 'You read to feel intellectually alive. You chase books that disturb you in productive ways — dark enough to stay with you, precise enough to trust.',
      readingDirections: ['Literary fiction with psychological depth and dark atmosphere', 'Dark realism that makes you uncomfortable in precise ways', 'Cerebral thrillers where intellect meets emotional intensity'],
      whyAppHelps: 'My Next Book\'s Reading Identity tracks your preference for emotionally intense, intellectually precise fiction — and builds every playlist around that precision.',
    },
    {
      id: 'momentum',
      title: 'Momentum Reader',
      emoji: '⚡',
      tagline: 'You read to be pulled forward. The best books make you miss your stop.',
      description: 'You have no patience for slow burns — you want to be inside the story immediately and unable to leave.',
      readingDirections: ['Thrillers that start fast and never let up', 'Propulsive fiction with relentless forward momentum', 'Crime novels that keep you guessing until the last page'],
      whyAppHelps: 'My Next Book learns how fast you need books to move — and builds your playlist around that propulsive instinct.',
    },
    {
      id: 'literary_escapist',
      title: 'Literary Escapist',
      emoji: '🌙',
      tagline: 'You read to disappear into worlds so fully realized they feel more real than your own.',
      description: 'You read to disappear. Not into fantasy for its own sake — into worlds so fully realized they feel more real than your own. Atmosphere is everything.',
      readingDirections: ['Immersive fiction with worlds you can vanish into', 'Atmospheric literary fiction where place becomes character', 'Historical fiction that transports completely'],
      whyAppHelps: 'My Next Book\'s Reading Identity tracks your worldbuilding and atmosphere preferences — and builds a playlist of worlds worth disappearing into.',
    },
    {
      id: 'emotional_realist',
      title: 'Emotional Realist',
      emoji: '💧',
      tagline: 'You read to feel understood. The books that stay with you get human experience exactly right.',
      description: 'You read to feel understood. The books that stay with you get human experience exactly right — the mess, the grief, the quietly devastating moments.',
      readingDirections: ['Contemporary fiction with raw emotional honesty', 'Character studies that get human experience exactly right', 'Family drama that finds the extraordinary in ordinary lives'],
      whyAppHelps: 'My Next Book\'s Reading Identity tracks your preference for emotional truth and character depth — and builds every playlist around it.',
    },
    {
      id: 'speculative_thinker',
      title: 'Speculative Thinker',
      emoji: '🔭',
      tagline: 'You read to have your assumptions challenged. Fiction that extrapolates, questions, and builds new systems of meaning.',
      description: 'You read to have your assumptions challenged. You prefer books that make you think about the real world differently.',
      readingDirections: ['Speculative fiction that extrapolates ideas to their logical extreme', 'Sci-fi that uses the future to illuminate the present', 'Dystopian fiction that builds entirely new systems of meaning'],
      whyAppHelps: 'My Next Book\'s Reading Identity tracks your preference for idea-driven, assumption-challenging fiction — and sharpens every playlist around it.',
    },
    {
      id: 'quiet_intellectual',
      title: 'Quiet Intellectual',
      emoji: '📐',
      tagline: 'You read slowly and deliberately. Dense prose, layered meaning, ideas that unfold over time.',
      description: 'You read slowly and deliberately. You prefer books that reward attention — dense prose, layered meaning, ideas that unfold over time.',
      readingDirections: ['Dense literary fiction that rewards slow reading', 'Essays that demand and repay full attention', 'Prose-driven novels where every sentence is doing work'],
      whyAppHelps: 'My Next Book\'s Reading Identity tracks your preference for dense, carefully written literary fiction — and builds playlists that never shortchange your attention.',
    },
    {
      id: 'chaos',
      title: 'Chaos Reader',
      emoji: '🌀',
      tagline: 'You read to be surprised. Predictability is the only thing that can lose you.',
      description: 'You read to be surprised. You want books that break their own rules, shift beneath your feet, and end somewhere you never expected.',
      readingDirections: ['Experimental fiction that breaks its own rules', 'Surreal narratives that resist easy interpretation', 'Genre-bending books that are impossible to categorize'],
      whyAppHelps: 'My Next Book\'s Reading Identity tracks your preference for experimental, genre-bending fiction — and builds playlists that never settle into predictability.',
    },
    {
      id: 'atmospheric_explorer',
      title: 'Atmospheric Explorer',
      emoji: '🌫️',
      tagline: 'You read for feeling more than plot. The best books leave you with a mood that lingers for days.',
      description: 'You read for feeling more than plot. The best books leave you with a mood that lingers for days — a specific texture of light, a sense of place, a tone you can\'t fully name.',
      readingDirections: ['Atmospheric fiction where mood is the primary experience', 'Gothic fiction with haunted settings and slow dread', 'Slow burn literary novels where feeling accumulates gradually'],
      whyAppHelps: 'My Next Book\'s Reading Identity tracks your preference for atmospheric, mood-driven fiction — and builds playlists around how books make you feel.',
    },
  ],
  resultLogic: (scores) => {
    const keys = ['dark_cerebral', 'momentum', 'literary_escapist', 'emotional_realist', 'speculative_thinker', 'quiet_intellectual', 'chaos', 'atmospheric_explorer'] as const
    return keys.reduce((a, b) => (scores[a] ?? 0) >= (scores[b] ?? 0) ? a : b)
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

const ARCHETYPE_DIM_PROFILES: Record<string, Partial<QuizVector>> = {
  dark_cerebral:        { tone: 2, intellectualDepth: 9, emotionalIntensity: 8, optimism: 2, comfortVsChallenge: 8, accessibility: 3 },
  momentum:             { pace: 9, tension: 8, accessibility: 7, plotVsCharacter: 7 },
  literary_escapist:    { prose: 8, worldbuilding: 7, pace: 4, accessibility: 5, emotionalAmbiguity: 6 },
  emotional_realist:    { emotionalIntensity: 8, plotVsCharacter: 2, tone: 6, accessibility: 6, optimism: 5 },
  speculative_thinker:  { intellectualDepth: 8, realismVsSpeculative: 8, worldbuilding: 7, weirdness: 6 },
  quiet_intellectual:   { intellectualDepth: 9, prose: 8, pace: 3, accessibility: 3, comfortVsChallenge: 7 },
  chaos:                { weirdness: 9, emotionalAmbiguity: 8, tension: 6, realismVsSpeculative: 6 },
  atmospheric_explorer: { worldbuilding: 8, prose: 7, pace: 3, tone: 4, emotionalAmbiguity: 7, tension: 5 },
}

const QUIZ_VECTOR_DIMS = [
  'pace', 'tone', 'emotionalIntensity', 'intellectualDepth', 'plotVsCharacter',
  'prose', 'worldbuilding', 'realismVsSpeculative', 'optimism', 'weirdness',
  'romancePresence', 'tension', 'humor', 'accessibility', 'comfortVsChallenge',
  'emotionalAmbiguity',
] as const

export function computeQuizVector(scores: Record<string, number>): QuizVector {
  const totalScore = Object.values(scores).reduce((s, v) => s + v, 0)
  if (totalScore === 0) {
    return Object.fromEntries(QUIZ_VECTOR_DIMS.map(k => [k, 5])) as QuizVector
  }

  const result: Record<string, number> = {}
  const weightSum: Record<string, number> = {}

  for (const [archetype, score] of Object.entries(scores)) {
    if (score <= 0) continue
    const profile = ARCHETYPE_DIM_PROFILES[archetype]
    if (!profile) continue
    const w = score / totalScore
    for (const dim of QUIZ_VECTOR_DIMS) {
      const val = (profile as Record<string, number>)[dim] ?? 5
      result[dim] = (result[dim] ?? 0) + val * w
      weightSum[dim] = (weightSum[dim] ?? 0) + w
    }
  }

  return Object.fromEntries(
    QUIZ_VECTOR_DIMS.map(dim => [dim, weightSum[dim] ? result[dim] / (weightSum[dim] || 1) : 5])
  ) as QuizVector
}

