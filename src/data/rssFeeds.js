export const FEED_SOURCES = {
  world: [
    { name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
    { name: 'NPR World', url: 'https://feeds.npr.org/1004/rss.xml' },
    { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
  ],
  politics: [
    { name: 'NPR Politics', url: 'https://feeds.npr.org/1014/rss.xml' },
    { name: 'The Hill', url: 'https://thehill.com/feed/' },
    { name: 'Politico', url: 'https://www.politico.com/rss/politicopicks.xml' },
  ],
  sports: {
    collegeBball: [
      { name: 'ESPN NCAAB', url: 'https://www.espn.com/espn/rss/ncb/news' },
      { name: 'CBS College Basketball', url: 'https://www.cbssports.com/rss/headlines/college-basketball/' },
    ],
    nfl: [
      { name: 'ESPN NFL', url: 'https://www.espn.com/espn/rss/nfl/news' },
      { name: 'CBS NFL', url: 'https://www.cbssports.com/rss/headlines/nfl/' },
    ],
    nba: [
      { name: 'ESPN NBA', url: 'https://www.espn.com/espn/rss/nba/news' },
      { name: 'CBS NBA', url: 'https://www.cbssports.com/rss/headlines/nba/' },
    ],
    golf: [
      { name: 'ESPN Golf', url: 'https://www.espn.com/espn/rss/golf/news' },
      { name: 'PGA Tour', url: 'https://www.pgatour.com/news/rss/' },
    ],
  },
  local: [
    { name: 'Seattle Times', url: 'https://www.seattletimes.com/feed/' },
    { name: 'KING5 Seattle', url: 'https://www.king5.com/feeds/syndication/rss/news/local' },
    { name: 'Tacoma News Tribune', url: 'https://www.thenewstribune.com/news/local/rss' },
    { name: 'The Olympian', url: 'https://www.theolympian.com/news/local/rss' },
  ],
  science: [
    { name: 'NASA', url: 'https://www.nasa.gov/feed/' },
    { name: 'Science Daily', url: 'https://www.sciencedaily.com/rss/all.xml' },
    { name: 'Phys.org', url: 'https://phys.org/rss-feed/' },
  ],
  tech: {
    ai: [
      { name: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml' },
      { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
      { name: 'MIT AI News', url: 'https://news.mit.edu/topic/mitartificial-intelligence2-rss.xml' },
    ],
    vibeCoding: [
      { name: 'Hacker News', url: 'https://hnrss.org/newest?q=vibe+coding' },
      { name: 'Dev.to AI', url: 'https://dev.to/feed/tag/ai' },
      { name: 'Lobsters', url: 'https://lobste.rs/t/ai.rss' },
    ],
    trending: [
      { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
      { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index' },
      { name: 'Hacker News Top', url: 'https://hnrss.org/frontpage' },
    ],
  },
};
