export const FEED_SOURCES = {
  world: [
    { name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
    { name: 'NPR World', url: 'https://feeds.npr.org/1004/rss.xml' },
    { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
    { name: 'AFP', url: 'https://www.afp.com/en/feed' },
    { name: 'VOA News', url: 'https://www.voanews.com/api/z-oqrekqoi' },
    { name: 'RFE/RL', url: 'https://www.rferl.org/api/z-pqpevimi' },
    { name: 'RFA', url: 'https://www.rfa.org/english/rss2.xml' },
    { name: 'Eurasianet', url: 'https://eurasianet.org/feed' },
    { name: 'Bellingcat', url: 'https://www.bellingcat.com/feed/' },
    { name: 'RealClearInvestigations', url: 'https://www.realclearinvestigations.com/index.xml' },
    { name: 'Washington Times', url: 'https://www.washingtontimes.com/rss/headlines/news/' },
    { name: 'Semafor', url: 'https://www.semafor.com/feed' },
    { name: 'GroundUp', url: 'https://www.groundup.org.za/feeds/rss/' },
    { name: 'SAN', url: 'https://san.com/feed/' },
  ],
  politics: [
    { name: 'NPR Politics', url: 'https://feeds.npr.org/1014/rss.xml' },
    { name: 'The Hill', url: 'https://thehill.com/feed/' },
    { name: 'Politico', url: 'https://www.politico.com/rss/politicopicks.xml' },
    { name: 'Fox News Politics', url: 'https://moxie.foxnews.com/google-publisher/politics.xml' },
    { name: 'RealClearPolitics', url: 'https://www.realclearpolitics.com/index.xml' },
    { name: 'Washington Times', url: 'https://www.washingtontimes.com/rss/headlines/news/politics/' },
    { name: 'The Dispatch', url: 'https://thedispatch.com/feed/' },
  ],
  finance: {
    markets: [
      { name: 'CNBC Top News', url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100003114' },
      { name: 'Bloomberg', url: 'https://feeds.bloomberg.com/markets/news.rss' },
      { name: 'MarketWatch', url: 'https://feeds.marketwatch.com/marketwatch/topstories/' },
      { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/rssindex' },
      { name: 'WSJ Markets', url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml' },
    ],
    economy: [
      { name: 'CNBC Economy', url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=20910258' },
      { name: 'Reuters Business', url: 'https://feeds.reuters.com/reuters/businessNews' },
      { name: 'Financial Times', url: 'https://www.ft.com/rss/home/us' },
      { name: 'WSJ Economy', url: 'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml' },
    ],
    crypto: [
      { name: 'CoinDesk', url: 'https://www.coindesk.com/arc/outboundfeeds/rss/' },
      { name: 'CoinTelegraph', url: 'https://cointelegraph.com/rss' },
      { name: 'Decrypt', url: 'https://decrypt.co/feed' },
    ],
  },
  sports: {
    collegeBball: [
      { name: 'ESPN NCAAB', url: 'https://www.espn.com/espn/rss/ncb/news' },
      { name: 'CBS College Basketball', url: 'https://www.cbssports.com/rss/headlines/college-basketball/' },
    ],
    nfl: [
      { name: 'ESPN NFL', url: 'https://www.espn.com/espn/rss/nfl/news' },
      { name: 'CBS NFL', url: 'https://www.cbssports.com/rss/headlines/nfl/' },
      { name: 'Fox Sports NFL', url: 'https://api.foxsports.com/v2/content/optimized-rss?partnerKey=MB0Wehpmuj2lUhuRhQaYQw&size=30&tags=fs/nfl' },
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
      { name: 'The Rundown AI', url: 'https://www.therundown.ai/feed' },
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
