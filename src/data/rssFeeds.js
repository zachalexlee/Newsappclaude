// RSS feed sources organized by category
// Using rss2json API to convert RSS to JSON (free tier: 10k requests/day)
const RSS2JSON_BASE = 'https://api.rss2json.com/api.json?rss_url=';

export const FEED_SOURCES = {
  world: [
    { name: 'Reuters World', url: 'https://feeds.reuters.com/Reuters/worldNews' },
    { name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
    { name: 'AP News', url: 'https://rsshub.app/apnews/topics/world-news' },
  ],
  politics: [
    { name: 'Reuters Politics', url: 'https://feeds.reuters.com/Reuters/PoliticsNews' },
    { name: 'BBC Politics', url: 'https://feeds.bbci.co.uk/news/politics/rss.xml' },
    { name: 'The Hill', url: 'https://thehill.com/feed/' },
  ],
  sports: {
    collegeBball: [
      { name: 'ESPN NCAAB', url: 'https://www.espn.com/espn/rss/ncb/news' },
      { name: 'CBS College Basketball', url: 'https://www.cbssports.com/rss/headlines/college-basketball/' },
    ],
    nfl: [
      { name: 'ESPN NFL', url: 'https://www.espn.com/espn/rss/nfl/news' },
      { name: 'NFL News', url: 'https://www.cbssports.com/rss/headlines/nfl/' },
    ],
    nba: [
      { name: 'ESPN NBA', url: 'https://www.espn.com/espn/rss/nba/news' },
      { name: 'CBS NBA', url: 'https://www.cbssports.com/rss/headlines/nba/' },
    ],
    golf: [
      { name: 'ESPN Golf', url: 'https://www.espn.com/espn/rss/golf/news' },
      { name: 'Golf Digest', url: 'https://www.golfdigest.com/feed/rss' },
    ],
  },
  local: [
    { name: 'Seattle Times', url: 'https://www.seattletimes.com/feed/' },
    { name: 'The Olympian', url: 'https://www.theolympian.com/news/local/rss' },
    { name: 'Tacoma News Tribune', url: 'https://www.thenewstribune.com/news/local/rss' },
    { name: 'KING5 Seattle', url: 'https://www.king5.com/feeds/syndication/rss/news/local' },
  ],
  science: [
    { name: 'NASA', url: 'https://www.nasa.gov/feed/' },
    { name: 'Science Daily', url: 'https://www.sciencedaily.com/rss/all.xml' },
    { name: 'Nature', url: 'https://www.nature.com/nature.rss' },
  ],
  tech: {
    ai: [
      { name: 'MIT AI News', url: 'https://news.mit.edu/topic/mitartificial-intelligence2-rss.xml' },
      { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
      { name: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml' },
    ],
    vibeCoding: [
      { name: 'Hacker News', url: 'https://hnrss.org/newest?q=vibe+coding' },
      { name: 'Dev.to', url: 'https://dev.to/feed/tag/ai' },
    ],
    trending: [
      { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
      { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index' },
    ],
  },
};

export function buildFeedUrl(rssUrl) {
  return `${RSS2JSON_BASE}${encodeURIComponent(rssUrl)}`;
}
