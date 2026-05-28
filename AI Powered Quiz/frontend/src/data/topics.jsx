export const TOPICS = [
  {
    name: "History",
    blurb: "Empires, revolutions and turning points",
    hue: 55,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12" />
        <path d="M6 21h12" />
        <path d="M7 3c0 5 10 5 10 9s-10 4-10 9" />
        <path d="M17 3c0 5-10 5-10 9s10 4 10 9" />
      </svg>
    ),
    subs: ["Ancient Rome", "World War II", "Ancient Egypt", "The Cold War", "Medieval Europe", "The Renaissance", "The American Revolution", "Industrial Age"]
  },
  {
    name: "Science & Nature",
    blurb: "From quarks to whales",
    hue: 165,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      </svg>
    ),
    subs: ["Astronomy", "The Human Body", "Chemistry", "Animal Kingdom", "Physics", "Earth & Climate", "Plants & Ecology", "Famous Scientists"]
  },
  {
    name: "Geography",
    blurb: "Places, peaks and borders",
    hue: 230,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c3 3.5 3 14.5 0 18" />
        <path d="M12 3c-3 3.5-3 14.5 0 18" />
      </svg>
    ),
    subs: ["World Capitals", "Mountains & Rivers", "Flags", "Deserts & Oceans", "European Geography", "Asian Geography", "African Geography", "Islands"]
  },
  {
    name: "Arts & Literature",
    blurb: "Books, paintings and stagecraft",
    hue: 15,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z" />
        <path d="M20 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z" />
      </svg>
    ),
    subs: ["Shakespeare", "Classic Novels", "Modern Fiction", "Renaissance Art", "Modern Art", "Poetry", "Greek Mythology", "Classical Music"]
  },
  {
    name: "Sport",
    blurb: "Games, leagues and legends",
    hue: 290,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 4l5 3.5-2 6h-6l-2-6z" />
      </svg>
    ),
    subs: ["Football (Soccer)", "Olympics", "Tennis", "Basketball", "Cricket", "Rugby", "Motorsport", "Boxing & MMA"]
  },
  {
    name: "Pop Culture",
    blurb: "Screen, sound and zeitgeist",
    hue: 340,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
      </svg>
    ),
    subs: ["Film", "TV Shows", "Pop Music", "Video Games", "Streaming Era", "Celebrities", "Memes & Internet", "Awards & Trophies"]
  }
];
