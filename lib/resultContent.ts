// Enriched result content: archetype names, moodboard, similar books, microcopy, share/CTA copy
// Keyed by result.id from quizzes.ts

export interface MoodTile {
  word: string
  sub: string
  icon?: string
  from: string
  to: string
  textColor: string
  subColor: string
  borderColor: string
}

export interface SimilarBook {
  title: string
  author: string
  note: string
  isbn?: string
}

export interface ResultContent {
  archetypeName: string
  archetypeSubtitle: string
  microcopy: string
  shareText: string
  ctaCopy: string
  moodTiles: MoodTile[]
  similarBooks: SimilarBook[]
  continuationFeatures: string[]
}

const T = {
  // reusable tile factories
  purple: (word: string, sub: string, icon?: string): MoodTile => ({
    word, sub, icon,
    from: '#1E1638', to: '#120F22',
    textColor: '#C8B0FF', subColor: '#7A6A9A', borderColor: 'rgba(200,176,255,0.22)',
  }),
  rose: (word: string, sub: string, icon?: string): MoodTile => ({
    word, sub, icon,
    from: '#221228', to: '#130A18',
    textColor: '#F0A0C8', subColor: '#8A6080', borderColor: 'rgba(240,160,200,0.22)',
  }),
  amber: (word: string, sub: string, icon?: string): MoodTile => ({
    word, sub, icon,
    from: '#201A10', to: '#130F08',
    textColor: '#FFD090', subColor: '#8A7050', borderColor: 'rgba(255,208,144,0.22)',
  }),
  teal: (word: string, sub: string, icon?: string): MoodTile => ({
    word, sub, icon,
    from: '#0E1E22', to: '#081418',
    textColor: '#80D8D0', subColor: '#407878', borderColor: 'rgba(128,216,208,0.22)',
  }),
  crimson: (word: string, sub: string, icon?: string): MoodTile => ({
    word, sub, icon,
    from: '#221010', to: '#140808',
    textColor: '#FF9090', subColor: '#7A4040', borderColor: 'rgba(255,144,144,0.22)',
  }),
  slate: (word: string, sub: string, icon?: string): MoodTile => ({
    word, sub, icon,
    from: '#141824', to: '#0C1018',
    textColor: '#9090C8', subColor: '#505070', borderColor: 'rgba(144,144,200,0.22)',
  }),
  gold: (word: string, sub: string, icon?: string): MoodTile => ({
    word, sub, icon,
    from: '#1E1808', to: '#130F04',
    textColor: '#F0C060', subColor: '#806830', borderColor: 'rgba(240,192,96,0.22)',
  }),
  green: (word: string, sub: string, icon?: string): MoodTile => ({
    word, sub, icon,
    from: '#0E1E14', to: '#08140C',
    textColor: '#80D890', subColor: '#407848', borderColor: 'rgba(128,216,144,0.22)',
  }),
}

const RESULT_CONTENT: Record<string, ResultContent> = {
  dark_cerebral: {
    archetypeName: 'The Dark Cerebral Reader',
    archetypeSubtitle: 'You read to feel intellectually alive — dark enough to stay with you, precise enough to trust.',
    microcopy: 'You don\'t read for comfort. You read for books that disturb you in productive ways.',
    shareText: 'I got "The Dark Cerebral Reader" on My Next Book 📚 Apparently I only want books that disturb me in intellectually precise ways. What does your reading taste reveal?',
    ctaCopy: 'Find books that disturb me correctly',
    moodTiles: [
      T.slate('DARK', 'and precise', '🖤'),
      T.purple('CEREBRAL', 'intensity', '◆'),
      T.slate('HAUNTED', 'perfectly', '◆'),
      T.purple('TRUSTED', 'disturbing', '✦'),
    ],
    similarBooks: [
      { title: 'My Year of Rest and Relaxation', author: 'Ottessa Moshfegh', note: 'Dark and cerebral — exactly your speed', isbn: '9780525522119' },
      { title: 'Gone Girl', author: 'Gillian Flynn', note: 'Psychologically sharp, morally uncomfortable', isbn: '9780307588364' },
      { title: 'The Secret History', author: 'Donna Tartt', note: 'Cerebral, dark, and impossible to shake', isbn: '9781400031702' },
    ],
    continuationFeatures: [
      'My Next Book tracks the emotional intensity patterns behind what you save — learning your exact cerebral-dark threshold.',
      'Every book you respond to sharpens the map of your reading taste across 14 emotional dimensions.',
      'Your reading identity deepens as you use it — the app observes, interprets, and reflects back who you\'re becoming as a reader.',
      'The more you interact, the more precisely it reads you.',
    ],
  },

  momentum: {
    archetypeName: 'The Momentum Reader',
    archetypeSubtitle: 'You read to be pulled forward. The best books make you miss your stop.',
    microcopy: 'You have no patience for slow burns. You want to be inside the story immediately and unable to leave.',
    shareText: 'I got "The Momentum Reader" on My Next Book 📚 Apparently I only want books that make me miss my stop. What does your reading taste reveal?',
    ctaCopy: 'Find books I can\'t put down',
    moodTiles: [
      T.teal('HOOKED', 'instantly', '⚡'),
      T.crimson('RACING', 'forward', '◈'),
      T.teal('CAN\'T', 'stop', '⚡'),
      T.crimson('NEXT', 'page now', '◈'),
    ],
    similarBooks: [
      { title: 'Gone Girl', author: 'Gillian Flynn', note: 'Propulsive from page one', isbn: '9780307588364' },
      { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', note: 'Can\'t-stop-reading energy', isbn: '9780307949486' },
      { title: 'Big Little Lies', author: 'Liane Moriarty', note: 'Fast, sharp, addictive', isbn: '9780399167065' },
    ],
    continuationFeatures: [
      'My Next Book tracks your pacing instincts — and filters out books that lose momentum before they find it.',
      'Every time you dismiss a slow opener, the app notes it and adjusts.',
      'Your reading taste deepens as you use it — the app builds a map of how fast you need things to move.',
      'The more you interact, the more precisely it reads you.',
    ],
  },

  literary_escapist: {
    archetypeName: 'The Literary Escapist',
    archetypeSubtitle: 'You read to disappear into worlds so fully realized they feel more real than your own.',
    microcopy: 'Atmosphere is everything. The right sentence can transport you somewhere you\'ve never been.',
    shareText: 'I got "The Literary Escapist" on My Next Book 📚 Apparently I just want to disappear into beautifully realized worlds. What does your reading taste reveal?',
    ctaCopy: 'Find my next world to vanish into',
    moodTiles: [
      T.purple('LOST', 'in it', '🌙'),
      T.rose('VIVID', 'elsewhere', '◆'),
      T.purple('MISSED', 'like home', '✦'),
      T.rose('PORTAL', 'open', '◆'),
    ],
    similarBooks: [
      { title: 'The Shadow of the Wind', author: 'Carlos Ruiz Zafón', note: 'A world you never want to leave', isbn: '9780143034902' },
      { title: 'Pachinko', author: 'Min Jin Lee', note: 'Immersive across decades and generations', isbn: '9781455563906' },
      { title: 'A Gentleman in Moscow', author: 'Amor Towles', note: 'Atmospheric and deeply realized', isbn: '9780670026190' },
    ],
    continuationFeatures: [
      'My Next Book tracks the atmospheric and immersive qualities you respond to — building a map of what makes a world feel real to you.',
      'Every book you save or skip reveals more about the kind of place you want to disappear into.',
      'Your reading identity deepens as you use it — the app learns what kind of world you\'re searching for.',
      'The more you interact, the more precisely it reads you.',
    ],
  },

  emotional_realist: {
    archetypeName: 'The Emotional Realist',
    archetypeSubtitle: 'You read to feel understood. The books that stay with you get human experience exactly right.',
    microcopy: 'You read for the quietly devastating moments. The books that earn your feelings.',
    shareText: 'I got "The Emotional Realist" on My Next Book 📚 Apparently I only love books that get human experience exactly right. What does your reading taste reveal?',
    ctaCopy: 'Find books that earn my tears',
    moodTiles: [
      T.rose('FELT', 'deeply', '💧'),
      T.amber('TRUE', 'and hard', '○'),
      T.rose('ACHED', 'beautifully', '♥'),
      T.amber('STAYED', 'with me', '○'),
    ],
    similarBooks: [
      { title: 'Normal People', author: 'Sally Rooney', note: 'Painfully, precisely human', isbn: '9781984822185' },
      { title: 'A Little Life', author: 'Hanya Yanagihara', note: 'Emotionally devastating and true', isbn: '9780804172448' },
      { title: 'Shuggie Bain', author: 'Douglas Stuart', note: 'Love and grief rendered exactly right', isbn: '9780802148506' },
    ],
    continuationFeatures: [
      'My Next Book tracks your sensitivity to emotional truth — learning what kinds of human experience you respond to most.',
      'Every book you save or skip reveals more about the emotional register you\'re looking for.',
      'Your reading identity deepens as you use it — the app observes the patterns in what moves you.',
      'The more you interact, the more precisely it reads you.',
    ],
  },

  speculative_thinker: {
    archetypeName: 'The Speculative Thinker',
    archetypeSubtitle: 'You read to have your assumptions challenged. Fiction that extrapolates, questions, and builds new systems of meaning.',
    microcopy: 'You prefer books that use invented worlds to say true things. The best ones make you see everything differently.',
    shareText: 'I got "The Speculative Thinker" on My Next Book 📚 Apparently I only want books that challenge my assumptions. What does your reading taste reveal?',
    ctaCopy: 'Find books that reframe everything',
    moodTiles: [
      T.teal('SYSTEM', 'rebuilt', '🔭'),
      T.green('ASSUMED', 'wrong', '◎'),
      T.teal('REAL', 'reframed', '◎'),
      T.green('FUTURE', 'now', '✦'),
    ],
    similarBooks: [
      { title: 'Klara and the Sun', author: 'Kazuo Ishiguro', note: 'Quietly devastating speculative fiction', isbn: '9780593311295' },
      { title: 'Station Eleven', author: 'Emily St. John Mandel', note: 'Speculative and deeply human', isbn: '9780385353304' },
      { title: 'Never Let Me Go', author: 'Kazuo Ishiguro', note: 'Assumptions dismantled slowly and precisely', isbn: '9781400078776' },
    ],
    continuationFeatures: [
      'My Next Book tracks your appetite for idea-driven fiction — learning what kinds of premises change how you think.',
      'Every book you respond to sharpens the map of your intellectual instincts.',
      'Your reading identity deepens as you use it — the app learns which speculative ideas genuinely move you.',
      'The more you interact, the more precisely it reads you.',
    ],
  },

  quiet_intellectual: {
    archetypeName: 'The Quiet Intellectual',
    archetypeSubtitle: 'You read slowly and deliberately. Dense prose, layered meaning, ideas that unfold over time.',
    microcopy: 'You return to sentences. You notice construction. You prefer books that reward full attention.',
    shareText: 'I got "The Quiet Intellectual" on My Next Book 📚 Apparently I only want books that reward the attention I give them. What does your reading taste reveal?',
    ctaCopy: 'Find books that reward slow reading',
    moodTiles: [
      T.gold('PRECISE', 'language', '📐'),
      T.slate('LAYERED', 'meaning', '◆'),
      T.gold('REREAD', 'this line', '◎'),
      T.slate('SLOW', 'and earned', '◆'),
    ],
    similarBooks: [
      { title: 'Demon Copperhead', author: 'Barbara Kingsolver', note: 'Dense, rewarding, worth every page', isbn: '9780063251984' },
      { title: 'Lincoln in the Bardo', author: 'George Saunders', note: 'Layered and intellectually precise', isbn: '9780812995343' },
      { title: 'The Remains of the Day', author: 'Kazuo Ishiguro', note: 'Slow, deliberate, devastating', isbn: '9780679731726' },
    ],
    continuationFeatures: [
      'My Next Book tracks your preference for depth and deliberate prose — learning what level of density you find rewarding vs. exhausting.',
      'Every book you save or skip reveals more about where your intellectual attention naturally settles.',
      'Your reading identity deepens as you use it — the app builds a map of the kind of precision you look for.',
      'The more you interact, the more precisely it reads you.',
    ],
  },

  chaos: {
    archetypeName: 'The Chaos Reader',
    archetypeSubtitle: 'You read to be surprised. Predictability is the only thing that can lose you.',
    microcopy: 'You want books that break their own rules. Stories that shift beneath you and end somewhere true.',
    shareText: 'I got "The Chaos Reader" on My Next Book 📚 Apparently I only want books that break their own rules. What does your reading taste reveal?',
    ctaCopy: 'Find books that break the rules',
    moodTiles: [
      T.purple('STRANGE', 'and true', '🌀'),
      T.crimson('RULES', 'broken', '◈'),
      T.purple('SHIFTED', 'under me', '✦'),
      T.crimson('NEVER', 'saw it', '◈'),
    ],
    similarBooks: [
      { title: 'House of Leaves', author: 'Mark Z. Danielewski', note: 'Structurally mind-bending', isbn: '9780375703768' },
      { title: 'Piranesi', author: 'Susanna Clarke', note: 'Strange, surprising, unforgettable', isbn: '9781635575637' },
      { title: 'If on a winter\'s night a traveler', author: 'Italo Calvino', note: 'Rules broken from page one', isbn: '9780156439619' },
    ],
    continuationFeatures: [
      'My Next Book tracks your response to the unexpected — learning what kinds of structural surprises feel thrilling vs. cheap.',
      'Every book you dismiss for being predictable refines the map of your appetite for chaos.',
      'Your reading identity deepens as you use it — the app learns what "surprising" actually means to you.',
      'The more you interact, the more precisely it reads you.',
    ],
  },

  atmospheric_explorer: {
    archetypeName: 'The Atmospheric Explorer',
    archetypeSubtitle: 'You read for feeling more than plot. The best books leave you with a mood that lingers for days.',
    microcopy: 'A specific texture of light. A tone you can\'t fully name. You read for emotional residue, not resolution.',
    shareText: 'I got "The Atmospheric Explorer" on My Next Book 📚 Apparently I only want books that leave a mood that lingers. What does your reading taste reveal?',
    ctaCopy: 'Find books that leave a feeling',
    moodTiles: [
      T.slate('MOOD', 'lingers', '🌫️'),
      T.teal('LIGHT', 'specific', '◎'),
      T.slate('PLACE', 'texture', '◆'),
      T.teal('TONE', 'unnamed', '◎'),
    ],
    similarBooks: [
      { title: 'Rebecca', author: 'Daphne du Maurier', note: 'Atmospheric and unforgettable', isbn: '9780380730407' },
      { title: 'The Haunting of Hill House', author: 'Shirley Jackson', note: 'Mood as architecture', isbn: '9780143039983' },
      { title: 'Mexican Gothic', author: 'Silvia Moreno-Garcia', note: 'Gothic atmosphere, lingers for days', isbn: '9780525620785' },
    ],
    continuationFeatures: [
      'My Next Book tracks the atmospheric qualities you respond to — building a map of what kind of feeling you\'re chasing.',
      'Every book you save or skip reveals more about the specific emotional texture you\'re searching for.',
      'Your reading identity deepens as you use it — the app learns to distinguish mood from plot for you.',
      'The more you interact, the more precisely it reads you.',
    ],
  },

  emotional: {
    archetypeName: 'The Heartbreak Collector',
    archetypeSubtitle: 'You read to feel things you couldn\'t feel otherwise.',
    microcopy: 'You don\'t read for plot alone. You read to feel transformed.',
    shareText: 'I got "The Heartbreak Collector" on My Next Book 📚 Apparently I only want books that emotionally devastate me. Find yours:',
    ctaCopy: 'Build My Reading Feed',
    moodTiles: [
      T.rose('FELT', 'deeply', '♥'),
      T.purple('STAYED', 'with me', '◆'),
      T.rose('ACHED', 'beautifully', '♥'),
      T.purple('TRUE', 'and hard', '◆'),
    ],
    similarBooks: [
      { title: 'A Little Life', author: 'Hanya Yanagihara', note: 'Your kind of devastating.', isbn: '9780804172707' },
      { title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', note: 'Hits differently.', isbn: '9780593321201' },
      { title: 'Lessons in Chemistry', author: 'Bonnie Garmus', note: 'Emotionally precise.', isbn: '9780385547353' },
    ],
    continuationFeatures: [
      'Emotional intensity tracked across every swipe',
      'Books matched to how you want to feel right now',
      'Your heartbreak tolerance, calibrated automatically',
      'Recommendations that hit the exact note you need',
    ],
  },

  cozy: {
    archetypeName: 'The Atmospheric Dreamer',
    archetypeSubtitle: 'You want books that feel like a place you never want to leave.',
    microcopy: 'You like stories that linger. Safe but alive. Warm but real.',
    shareText: 'I got "The Atmospheric Dreamer" on My Next Book 📚 I read to escape into worlds that feel like home. Find yours:',
    ctaCopy: 'Open My Reading Profile',
    moodTiles: [
      T.amber('WARM', 'and still', '○'),
      T.green('SOFT', 'landing', '✦'),
      T.amber('SAFE', 'worlds', '○'),
      T.green('LINGER', 'here', '✦'),
    ],
    similarBooks: [
      { title: 'The Thursday Murder Club', author: 'Richard Osman', note: 'Clever and warm.', isbn: '9781984880963' },
      { title: 'Remarkably Bright Creatures', author: 'Shelby Van Pelt', note: 'Exactly this vibe.', isbn: '9780778386261' },
      { title: '84, Charing Cross Road', author: 'Helene Hanff', note: 'The coziest book written.', isbn: '9780143122906' },
    ],
    continuationFeatures: [
      'Comfort level tracked — so no dark surprises',
      'Cozy sub-genre precision (mystery, romance, literary)',
      'Stress level filtered before books reach your feed',
      'Warmth and atmosphere weighted in your matches',
    ],
  },

  dark: {
    archetypeName: 'The Beautifully Damaged Intellectual',
    archetypeSubtitle: 'You want books that disturb you in a specific, beautiful way.',
    microcopy: 'You crave books that haunt you beautifully. You want the shadows.',
    shareText: 'I got "The Beautifully Damaged Intellectual" on My Next Book 📚 Apparently I only want beautifully haunted books. Find yours:',
    ctaCopy: 'Unlock My Next Obsession',
    moodTiles: [
      T.slate('HAUNTED', 'perfectly', '◆'),
      T.purple('COMPLEX', 'morality', '✦'),
      T.slate('SHADOW', 'beautiful', '◆'),
      T.purple('GOTHIC', 'depth', '✦'),
    ],
    similarBooks: [
      { title: 'The Secret History', author: 'Donna Tartt', note: 'The original.', isbn: '9781400031702' },
      { title: 'Piranesi', author: 'Susanna Clarke', note: 'Beautifully strange.', isbn: '9781635575637' },
      { title: 'My Year of Rest and Relaxation', author: 'Ottessa Moshfegh', note: 'Unapologetically dark.', isbn: '9780525522133' },
    ],
    continuationFeatures: [
      'Darkness level tracked separately from violence',
      'Moral ambiguity and psychological depth weighted',
      'Dark academia aesthetic recognized as a dimension',
      'Gothic and literary overlap surfaced in your feed',
    ],
  },

  fast: {
    archetypeName: 'The Obsessive Completionist',
    archetypeSubtitle: 'You start books at 10pm and finish them at 3am.',
    microcopy: 'You want books that erase time. The kind you finish and blink, confused.',
    shareText: 'I got "The Obsessive Completionist" on My Next Book 📚 I literally cannot put books down. Find your reading type:',
    ctaCopy: 'Get My Personalized Library',
    moodTiles: [
      T.teal('HOOKED', 'instantly', '⚡'),
      T.crimson('RACING', 'pulse', '◈'),
      T.teal('CAN\'T', 'stop', '⚡'),
      T.crimson('TWIST', 'coming', '◈'),
    ],
    similarBooks: [
      { title: 'Gone Girl', author: 'Gillian Flynn', note: 'Set the standard.', isbn: '9780307588371' },
      { title: 'Verity', author: 'Colleen Hoover', note: 'Couldn\'t look away.', isbn: '9781538724736' },
      { title: 'The Silent Patient', author: 'Alex Michaelides', note: 'Finished in a day.', isbn: '9781250301697' },
    ],
    continuationFeatures: [
      'Pacing tracked as its own taste dimension',
      'Propulsiveness scored before books reach your feed',
      'Only the fastest reads surface at the top',
      'Twist frequency matched to your threshold',
    ],
  },

  romance: {
    archetypeName: 'The Morally Grey Romantic',
    archetypeSubtitle: 'You want all the tension, all the warmth, all the earned feelings.',
    microcopy: 'You read for the slow burn. You want books that make you audibly react.',
    shareText: 'I got "The Morally Grey Romantic" on My Next Book 📚 I need enemies-to-lovers and I\'m not embarrassed. Find yours:',
    ctaCopy: 'Continue My Reading Journey',
    moodTiles: [
      T.rose('LONGING', 'slow burn', '♥'),
      T.purple('ELECTRIC', 'tension', '✦'),
      T.rose('EARNED', 'feeling', '♥'),
      T.purple('FINALLY', 'yes', '✦'),
    ],
    similarBooks: [
      { title: 'Beach Read', author: 'Emily Henry', note: 'Sharp, witty, warm.', isbn: '9781250790750' },
      { title: 'The Hating Game', author: 'Sally Thorne', note: 'Slow burn perfection.', isbn: '9780062439598' },
      { title: 'People We Meet on Vacation', author: 'Emily Henry', note: 'Earned every page.', isbn: '9781250776181' },
    ],
    continuationFeatures: [
      'Tropes tracked: slow burn, enemies-to-lovers, forced proximity',
      'Steam level matched to your preference',
      'Romance intensity calibrated as you swipe',
      'Only the payoffs that actually satisfy',
    ],
  },

  escapist: {
    archetypeName: 'The Obsessive Escapist',
    archetypeSubtitle: 'You disappear into books completely. The world can wait.',
    microcopy: 'You crave books that leave emotional residue. The kind you miss like a place.',
    shareText: 'I got "The Obsessive Escapist" on My Next Book 📚 I read to completely vanish. Find your reader type:',
    ctaCopy: 'Build My Reading Feed',
    moodTiles: [
      T.purple('LOST', 'in it', '✦'),
      T.rose('LIVED', 'fully', '◆'),
      T.purple('MISSED', 'like home', '✦'),
      T.rose('PORTAL', 'open', '◆'),
    ],
    similarBooks: [
      { title: 'The God of Small Things', author: 'Arundhati Roy', note: 'Never leaves you.', isbn: '9780812979657' },
      { title: 'Normal People', author: 'Sally Rooney', note: 'Completely transported.', isbn: '9780571334650' },
      { title: 'Intermezzo', author: 'Sally Rooney', note: 'Fully lived in.', isbn: '9780374614997' },
    ],
    continuationFeatures: [
      'Immersion depth tracked as a real signal',
      'World-completeness weighted in your matches',
      'Books that make you forget time surface first',
      'Emotional residue scored across all recommendations',
    ],
  },

  thinker: {
    archetypeName: 'The Literary Overthinker',
    archetypeSubtitle: 'You annotate. You reread sentences. You want prose that earns your attention.',
    microcopy: 'You read to think more clearly. Books are where you go to understand things.',
    shareText: 'I got "The Literary Overthinker" on My Next Book 📚 I genuinely annotate fiction and I stand by it. Find yours:',
    ctaCopy: 'Open My Reading Profile',
    moodTiles: [
      T.gold('PRECISE', 'language', '◎'),
      T.slate('LAYERED', 'meaning', '◆'),
      T.gold('REREAD', 'this line', '◎'),
      T.slate('CHANGED', 'something', '◆'),
    ],
    similarBooks: [
      { title: 'The Remains of the Day', author: 'Kazuo Ishiguro', note: 'Perfect restraint.', isbn: '9780679731726' },
      { title: 'Dept. of Speculation', author: 'Jenny Offill', note: 'Precise and devastating.', isbn: '9780385350570' },
      { title: 'Stoner', author: 'John Williams', note: 'Quietly shattering.', isbn: '9781590171714' },
    ],
    continuationFeatures: [
      'Prose complexity tracked as a taste dimension',
      'Intellectual depth weighted in your recommendations',
      'Literary fiction sub-genre precision built in',
      'Writing quality scored separately from story quality',
    ],
  },

  thriller: {
    archetypeName: 'The Tension Addict',
    archetypeSubtitle: 'You read thrillers at midnight and pay for it the next day.',
    microcopy: 'You want books that make your heart move. The kind that grip and don\'t apologize.',
    shareText: 'I got "The Tension Addict" on My Next Book 📚 I have read entire books just to find out who did it. Find yours:',
    ctaCopy: 'Unlock My Next Obsession',
    moodTiles: [
      T.crimson('SUSPECT', 'everyone', '◈'),
      T.slate('SHADOWS', 'everywhere', '◆'),
      T.crimson('MIDNIGHT', 'reading', '◈'),
      T.slate('TWIST', 'earned', '◆'),
    ],
    similarBooks: [
      { title: 'Behind Closed Doors', author: 'B.A. Paris', note: 'Can\'t breathe reading it.', isbn: '9781250122940' },
      { title: 'In the Woods', author: 'Tana French', note: 'Atmospheric and clever.', isbn: '9780143113492' },
      { title: 'Big Little Lies', author: 'Liane Moriarty', note: 'Puzzle perfection.', isbn: '9780399184734' },
    ],
    continuationFeatures: [
      'Tension curve tracked across your reading history',
      'Cozy vs. dark thriller split recognized',
      'Unreliable narrator preference detected automatically',
      'Twist quality (not just frequency) in your scoring',
    ],
  },

  fantasy: {
    archetypeName: 'The World-Lost Wanderer',
    archetypeSubtitle: 'You fall in love with worlds the way other people fall in love with people.',
    microcopy: 'You want books that leave you mourning a place that never existed.',
    shareText: 'I got "The World-Lost Wanderer" on My Next Book 📚 I miss fictional worlds like real places. Find yours:',
    ctaCopy: 'Get My Personalized Library',
    moodTiles: [
      T.purple('WORLDS', 'complete', '✦'),
      T.teal('MAGIC', 'systems', '◎'),
      T.purple('LORE', 'deep', '✦'),
      T.teal('MAPS', 'studied', '◎'),
    ],
    similarBooks: [
      { title: 'The Name of the Wind', author: 'Patrick Rothfuss', note: 'Lives rent-free in your head.', isbn: '9780756404741' },
      { title: 'Ninth House', author: 'Leigh Bardugo', note: 'Dark academia meets fantasy.', isbn: '9781250313072' },
      { title: 'Piranesi', author: 'Susanna Clarke', note: 'A world unlike any other.', isbn: '9781635575637' },
    ],
    continuationFeatures: [
      'World-building depth tracked as its own dimension',
      'Fantasy sub-genre split (epic, romantasy, dark, cozy)',
      'Magic system complexity preference calibrated',
      'Series commitment threshold recognized',
    ],
  },

  slump_short: {
    archetypeName: 'The Reluctant Returner',
    archetypeSubtitle: 'You haven\'t stopped loving books — you just need an easy way back in.',
    microcopy: 'You just need a quick win. The kind that reminds you why you started.',
    shareText: 'I got "The Reluctant Returner" on My Next Book 📚 I\'m in a reading slump and this is my slump-breaker type. Find yours:',
    ctaCopy: 'Find My Way Back',
    moodTiles: [
      T.teal('SHORT', 'and whole', '⚡'),
      T.green('DONE', 'in one sit', '○'),
      T.teal('EASY', 'entry', '⚡'),
      T.green('BACK', 'in it', '○'),
    ],
    similarBooks: [
      { title: 'Giovanni\'s Room', author: 'James Baldwin', note: '88 pages. Unforgettable.', isbn: '9780385333573' },
      { title: 'The Vegetarian', author: 'Han Kang', note: 'Short, strange, stays with you.', isbn: '9781101906118' },
      { title: 'Of Mice and Men', author: 'John Steinbeck', note: 'Read it in one sitting.', isbn: '9780140177398' },
    ],
    continuationFeatures: [
      'Length preference tracked and respected',
      'Slump-mode: short books surfaced automatically',
      'Easy-entry books prioritized when engagement dips',
      'Quick wins calibrated to rebuild your reading momentum',
    ],
  },

  slump_comfort: {
    archetypeName: 'The Cozy Emotionalist',
    archetypeSubtitle: 'You need a book that\'s on your side right now.',
    microcopy: 'You need zero pressure and full warmth. This is a valid reading mode.',
    shareText: 'I got "The Cozy Emotionalist" on My Next Book 📚 I\'m in a reading slump and I need safe warm books. Find yours:',
    ctaCopy: 'Build My Reading Feed',
    moodTiles: [
      T.amber('SAFE', 'here', '○'),
      T.green('WARM', 'always', '✦'),
      T.amber('GENTLE', 'pacing', '○'),
      T.green('REST', 'now', '✦'),
    ],
    similarBooks: [
      { title: 'Eleanor Oliphant is Completely Fine', author: 'Gail Honeyman', note: 'Cozy emotional reset.', isbn: '9780735220683' },
      { title: 'The Rosie Project', author: 'Graeme Simsion', note: 'Zero stress, full heart.', isbn: '9781476729084' },
      { title: '84, Charing Cross Road', author: 'Helene Hanff', note: 'The coziest book written.', isbn: '9780143122906' },
    ],
    continuationFeatures: [
      'Stress level tracked — dark twists filtered out',
      'Comfort mode activated when you need it',
      'Guaranteed happy endings surfaced first',
      'Low-stakes, high-warmth books always available',
    ],
  },

  literary: {
    archetypeName: 'The Quiet Depth Seeker',
    archetypeSubtitle: 'You want books that see the world more clearly than you do.',
    microcopy: 'You read to understand something. Books change your mind slowly, permanently.',
    shareText: 'I got "The Quiet Depth Seeker" on My Next Book 📚 I want literary fiction that genuinely moves me. Find yours:',
    ctaCopy: 'Open My Reading Profile',
    moodTiles: [
      T.gold('PRECISE', 'and true', '◎'),
      T.slate('QUIET', 'depth', '◆'),
      T.gold('OBSERVES', 'clearly', '◎'),
      T.slate('LINGERS', 'after', '◆'),
    ],
    similarBooks: [
      { title: 'Olive Kitteridge', author: 'Elizabeth Strout', note: 'Quietly extraordinary.', isbn: '9780812971835' },
      { title: 'Demon Copperhead', author: 'Barbara Kingsolver', note: 'Demands full attention.', isbn: '9780063251311' },
      { title: 'Lincoln in the Bardo', author: 'George Saunders', note: 'Like nothing else.', isbn: '9780812985405' },
    ],
    continuationFeatures: [
      'Literary sub-genre precision tracked over time',
      'Prose quality scored as a match dimension',
      'Emotional payoff weighted separately from plot',
      'Voice distinctiveness recognized in your profile',
    ],
  },

  mystery: {
    archetypeName: 'The Pattern Hunter',
    archetypeSubtitle: 'You notice things other readers miss. That\'s exactly the point.',
    microcopy: 'You want books that respect your intelligence and reward your attention.',
    shareText: 'I got "The Pattern Hunter" on My Next Book 📚 I\'m a mystery reader who actually figures it out early. Find yours:',
    ctaCopy: 'Unlock My Next Obsession',
    moodTiles: [
      T.slate('CLUES', 'scattered', '◈'),
      T.teal('PATTERN', 'found', '✦'),
      T.slate('SUSPECT', 'noted', '◈'),
      T.teal('SOLVED', 'almost', '✦'),
    ],
    similarBooks: [
      { title: 'And Then There Were None', author: 'Agatha Christie', note: 'Still the best.', isbn: '9780062073488' },
      { title: 'In the Woods', author: 'Tana French', note: 'Atmospheric and clever.', isbn: '9780143113492' },
      { title: 'Big Little Lies', author: 'Liane Moriarty', note: 'Puzzle perfection.', isbn: '9780399184734' },
    ],
    continuationFeatures: [
      'Cozy vs. dark mystery split calibrated',
      'Puzzle complexity preference tracked',
      'Amateur vs. procedural detective preference learned',
      'Fair-play mysteries surfaced when you want them',
    ],
  },

  memoir: {
    archetypeName: 'The Lived-Life Collector',
    archetypeSubtitle: 'You read other people\'s lives to understand your own.',
    microcopy: 'You want books that prove extraordinary things happen to ordinary people paying attention.',
    shareText: 'I got "The Lived-Life Collector" on My Next Book 📚 I\'m a memoir reader who wants real lives that expand mine. Find yours:',
    ctaCopy: 'Continue My Reading Journey',
    moodTiles: [
      T.gold('REAL', 'and earned', '◎'),
      T.amber('LIVED', 'fully', '○'),
      T.gold('HONEST', 'always', '◎'),
      T.amber('EXPANDED', 'me', '○'),
    ],
    similarBooks: [
      { title: 'Educated', author: 'Tara Westover', note: 'Jaw-dropping real life.', isbn: '9780399590504' },
      { title: 'The Anthropocene Reviewed', author: 'John Green', note: 'Essays that expand you.', isbn: '9780525555216' },
      { title: 'Know My Name', author: 'Chanel Miller', note: 'Important. Beautiful.', isbn: '9780735223707' },
    ],
    continuationFeatures: [
      'Memoir sub-type tracked (trauma, nature, essays, humor)',
      'Narrative vs. lyric non-fiction distinguished',
      'Voice preference (intimate, journalistic, poetic) learned',
      'Life-expanding potential scored in your recommendations',
    ],
  },
}

export function getResultContent(resultId: string): ResultContent | null {
  return RESULT_CONTENT[resultId] ?? null
}
