// Enriched result content: archetype names, moodboard, similar books, microcopy, share/CTA copy
// Keyed by result.id from quizzes.ts

export interface MoodTile {
  word: string
  sub: string
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
  purple: (word: string, sub: string): MoodTile => ({
    word, sub,
    from: '#1E1638', to: '#120F22',
    textColor: '#C8B0FF', subColor: '#7A6A9A', borderColor: 'rgba(200,176,255,0.22)',
  }),
  rose: (word: string, sub: string): MoodTile => ({
    word, sub,
    from: '#221228', to: '#130A18',
    textColor: '#F0A0C8', subColor: '#8A6080', borderColor: 'rgba(240,160,200,0.22)',
  }),
  amber: (word: string, sub: string): MoodTile => ({
    word, sub,
    from: '#201A10', to: '#130F08',
    textColor: '#FFD090', subColor: '#8A7050', borderColor: 'rgba(255,208,144,0.22)',
  }),
  teal: (word: string, sub: string): MoodTile => ({
    word, sub,
    from: '#0E1E22', to: '#081418',
    textColor: '#80D8D0', subColor: '#407878', borderColor: 'rgba(128,216,208,0.22)',
  }),
  crimson: (word: string, sub: string): MoodTile => ({
    word, sub,
    from: '#221010', to: '#140808',
    textColor: '#FF9090', subColor: '#7A4040', borderColor: 'rgba(255,144,144,0.22)',
  }),
  slate: (word: string, sub: string): MoodTile => ({
    word, sub,
    from: '#141824', to: '#0C1018',
    textColor: '#9090C8', subColor: '#505070', borderColor: 'rgba(144,144,200,0.22)',
  }),
  gold: (word: string, sub: string): MoodTile => ({
    word, sub,
    from: '#1E1808', to: '#130F04',
    textColor: '#F0C060', subColor: '#806830', borderColor: 'rgba(240,192,96,0.22)',
  }),
  green: (word: string, sub: string): MoodTile => ({
    word, sub,
    from: '#0E1E14', to: '#08140C',
    textColor: '#80D890', subColor: '#407848', borderColor: 'rgba(128,216,144,0.22)',
  }),
}

const RESULT_CONTENT: Record<string, ResultContent> = {
  emotional: {
    archetypeName: 'The Heartbreak Collector',
    archetypeSubtitle: 'You read to feel things you couldn\'t feel otherwise.',
    microcopy: 'You don\'t read for plot alone. You read to feel transformed.',
    shareText: 'I got "The Heartbreak Collector" on My Next Book 📚 Apparently I only want books that emotionally devastate me. Find yours:',
    ctaCopy: 'Build My Reading Feed',
    moodTiles: [
      T.rose('FELT', 'deeply'),
      T.purple('STAYED', 'with me'),
      T.rose('ACHED', 'beautifully'),
      T.purple('TRUE', 'and hard'),
    ],
    similarBooks: [
      { title: 'A Little Life', author: 'Hanya Yanagihara', note: 'Your kind of devastating.' },
      { title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', note: 'Hits differently.' },
      { title: 'Lessons in Chemistry', author: 'Bonnie Garmus', note: 'Emotionally precise.' },
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
      T.amber('WARM', 'and still'),
      T.green('SOFT', 'landing'),
      T.amber('SAFE', 'worlds'),
      T.green('LINGER', 'here'),
    ],
    similarBooks: [
      { title: 'The Thursday Murder Club', author: 'Richard Osman', note: 'Clever and warm.' },
      { title: 'Remarkably Bright Creatures', author: 'Shelby Van Pelt', note: 'Exactly this vibe.' },
      { title: '84, Charing Cross Road', author: 'Helene Hanff', note: 'The coziest book written.' },
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
      T.slate('HAUNTED', 'perfectly'),
      T.purple('COMPLEX', 'morality'),
      T.slate('SHADOW', 'beautiful'),
      T.purple('GOTHIC', 'depth'),
    ],
    similarBooks: [
      { title: 'The Secret History', author: 'Donna Tartt', note: 'The original.' },
      { title: 'Piranesi', author: 'Susanna Clarke', note: 'Beautifully strange.' },
      { title: 'My Year of Rest and Relaxation', author: 'Ottessa Moshfegh', note: 'Unapologetically dark.' },
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
      T.teal('HOOKED', 'instantly'),
      T.crimson('RACING', 'pulse'),
      T.teal('CAN\'T', 'stop'),
      T.crimson('TWIST', 'coming'),
    ],
    similarBooks: [
      { title: 'Gone Girl', author: 'Gillian Flynn', note: 'Set the standard.' },
      { title: 'Verity', author: 'Colleen Hoover', note: 'Couldn\'t look away.' },
      { title: 'The Silent Patient', author: 'Alex Michaelides', note: 'Finished in a day.' },
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
      T.rose('LONGING', 'slow burn'),
      T.purple('ELECTRIC', 'tension'),
      T.rose('EARNED', 'feeling'),
      T.purple('FINALLY', 'yes'),
    ],
    similarBooks: [
      { title: 'Beach Read', author: 'Emily Henry', note: 'Sharp, witty, warm.' },
      { title: 'The Hating Game', author: 'Sally Thorne', note: 'Slow burn perfection.' },
      { title: 'People We Meet on Vacation', author: 'Emily Henry', note: 'Earned every page.' },
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
      T.purple('LOST', 'in it'),
      T.rose('LIVED', 'fully'),
      T.purple('MISSED', 'like home'),
      T.rose('PORTAL', 'open'),
    ],
    similarBooks: [
      { title: 'The God of Small Things', author: 'Arundhati Roy', note: 'Never leaves you.' },
      { title: 'Normal People', author: 'Sally Rooney', note: 'Completely transported.' },
      { title: 'Intermezzo', author: 'Sally Rooney', note: 'Fully lived in.' },
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
      T.gold('PRECISE', 'language'),
      T.slate('LAYERED', 'meaning'),
      T.gold('REREAD', 'this line'),
      T.slate('CHANGED', 'something'),
    ],
    similarBooks: [
      { title: 'The Remains of the Day', author: 'Kazuo Ishiguro', note: 'Perfect restraint.' },
      { title: 'Dept. of Speculation', author: 'Jenny Offill', note: 'Precise and devastating.' },
      { title: 'Stoner', author: 'John Williams', note: 'Quietly shattering.' },
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
      T.crimson('SUSPECT', 'everyone'),
      T.slate('SHADOWS', 'everywhere'),
      T.crimson('MIDNIGHT', 'reading'),
      T.slate('TWIST', 'earned'),
    ],
    similarBooks: [
      { title: 'Behind Closed Doors', author: 'B.A. Paris', note: 'Can\'t breathe reading it.' },
      { title: 'In the Woods', author: 'Tana French', note: 'Atmospheric and clever.' },
      { title: 'Big Little Lies', author: 'Liane Moriarty', note: 'Puzzle perfection.' },
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
      T.purple('WORLDS', 'complete'),
      T.teal('MAGIC', 'systems'),
      T.purple('LORE', 'deep'),
      T.teal('MAPS', 'studied'),
    ],
    similarBooks: [
      { title: 'The Name of the Wind', author: 'Patrick Rothfuss', note: 'Lives rent-free in your head.' },
      { title: 'Ninth House', author: 'Leigh Bardugo', note: 'Dark academia meets fantasy.' },
      { title: 'Piranesi', author: 'Susanna Clarke', note: 'A world unlike any other.' },
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
      T.teal('SHORT', 'and whole'),
      T.green('DONE', 'in one sit'),
      T.teal('EASY', 'entry'),
      T.green('BACK', 'in it'),
    ],
    similarBooks: [
      { title: 'Giovanni\'s Room', author: 'James Baldwin', note: '88 pages. Unforgettable.' },
      { title: 'The Vegetarian', author: 'Han Kang', note: 'Short, strange, stays with you.' },
      { title: 'Of Mice and Men', author: 'John Steinbeck', note: 'Read it in one sitting.' },
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
      T.amber('SAFE', 'here'),
      T.green('WARM', 'always'),
      T.amber('GENTLE', 'pacing'),
      T.green('REST', 'now'),
    ],
    similarBooks: [
      { title: 'Eleanor Oliphant is Completely Fine', author: 'Gail Honeyman', note: 'Cozy emotional reset.' },
      { title: 'The Rosie Project', author: 'Graeme Simsion', note: 'Zero stress, full heart.' },
      { title: '84, Charing Cross Road', author: 'Helene Hanff', note: 'The coziest book written.' },
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
      T.gold('PRECISE', 'and true'),
      T.slate('QUIET', 'depth'),
      T.gold('OBSERVES', 'clearly'),
      T.slate('LINGERS', 'after'),
    ],
    similarBooks: [
      { title: 'Olive Kitteridge', author: 'Elizabeth Strout', note: 'Quietly extraordinary.' },
      { title: 'Demon Copperhead', author: 'Barbara Kingsolver', note: 'Demands full attention.' },
      { title: 'Lincoln in the Bardo', author: 'George Saunders', note: 'Like nothing else.' },
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
      T.slate('CLUES', 'scattered'),
      T.teal('PATTERN', 'found'),
      T.slate('SUSPECT', 'noted'),
      T.teal('SOLVED', 'almost'),
    ],
    similarBooks: [
      { title: 'And Then There Were None', author: 'Agatha Christie', note: 'Still the best.' },
      { title: 'In the Woods', author: 'Tana French', note: 'Atmospheric and clever.' },
      { title: 'Big Little Lies', author: 'Liane Moriarty', note: 'Puzzle perfection.' },
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
      T.gold('REAL', 'and earned'),
      T.amber('LIVED', 'fully'),
      T.gold('HONEST', 'always'),
      T.amber('EXPANDED', 'me'),
    ],
    similarBooks: [
      { title: 'Educated', author: 'Tara Westover', note: 'Jaw-dropping real life.' },
      { title: 'The Anthropocene Reviewed', author: 'John Green', note: 'Essays that expand you.' },
      { title: 'Know My Name', author: 'Chanel Miller', note: 'Important. Beautiful.' },
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
