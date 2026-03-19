export const FEED_SOURCES = {
  world: [
    { name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
    { name: 'NPR World', url: 'https://feeds.npr.org/1004/rss.xml' },
    { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
    { name: 'VOA News', url: 'https://www.voanews.com/api/z-pqpevi_qim' },
    { name: 'Eurasianet', url: 'https://eurasianet.org/main-rss-feed' },
    { name: 'Bellingcat', url: 'https://www.bellingcat.com/feed/' },
    { name: 'Semafor', url: 'https://semafor.com/rss.xml' },
    { name: 'GroundUp', url: 'https://www.groundup.org.za/feeds/articles/rss/' },
    { name: 'SAN', url: 'https://san.com/feed/' },
    { name: 'France 24', url: 'https://www.france24.com/en/rss' },
    { name: 'DW News', url: 'https://rss.dw.com/xml/rss-en-world' },
    { name: 'RFE/RL', url: 'https://www.rferl.org/api/zryporetti' },
    { name: 'RFA English', url: 'https://www.rfa.org/english/feed/rss2.xml' },
  ],
  politics: [
    { name: 'NPR Politics', url: 'https://feeds.npr.org/1014/rss.xml' },
    { name: 'The Hill', url: 'https://thehill.com/news/feed/' },
    { name: 'Politico', url: 'https://rss.politico.com/politics-news.xml' },
    { name: 'Fox News Politics', url: 'https://moxie.foxnews.com/google-publisher/politics.xml' },
    { name: 'RealClearPolitics', url: 'https://www.realclearpolitics.com/index.xml' },
    { name: 'Washington Times', url: 'https://www.washingtontimes.com/rss/headlines/news/politics/' },
    { name: 'The Dispatch', url: 'https://thedispatch.com/feed/' },
    { name: 'RealClearInvestigations', url: 'https://www.realclearinvestigations.com/index.xml' },
  ],
  finance: {
    markets: [
      { name: 'CNBC Top News', url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html' },
      { name: 'MarketWatch', url: 'https://www.marketwatch.com/rss/topstories' },
      { name: 'Yahoo Finance', url: 'https://finance.yahoo.com/news/rssindex' },
      { name: 'WSJ Markets', url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml' },
      { name: 'Investing.com', url: 'https://www.investing.com/rss/news.rss' },
    ],
    economy: [
      { name: 'CNBC Economy', url: 'https://www.cnbc.com/id/19836768/device/rss/rss.html' },
      { name: 'Financial Times', url: 'https://www.ft.com/rss/home' },
      { name: 'WSJ Business', url: 'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml' },
      { name: 'NPR Economy', url: 'https://feeds.npr.org/1017/rss.xml' },
    ],
    crypto: [
      { name: 'CoinDesk', url: 'https://www.coindesk.com/arc/outboundfeeds/rss/' },
      { name: 'CoinTelegraph', url: 'https://cointelegraph.com/rss' },
      { name: 'Decrypt', url: 'https://decrypt.co/feed' },
      { name: 'The Block', url: 'https://www.theblock.co/rss.xml' },
    ],
  },
  sports: {
    collegeBball: [
      { name: 'ESPN NCAAB', url: 'https://www.espn.com/espn/rss/ncb/news' },
      { name: 'CBS College BBall', url: 'https://www.cbssports.com/rss/headlines/college-basketball/' },
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
    ],
  },
  local: [
    { name: 'Seattle Times', url: 'https://www.seattletimes.com/feed/' },
    { name: 'KING5 Seattle', url: 'https://rssfeeds.king5.com/king5/home' },
    { name: 'Tacoma News Tribune', url: 'https://www.thenewstribune.com/news/local/index.rss' },
    { name: 'The Olympian', url: 'https://www.theolympian.com/news/local/index.rss' },
  ],
  science: [
    { name: 'NASA', url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss' },
    { name: 'Science Daily', url: 'https://www.sciencedaily.com/rss/all.xml' },
    { name: 'Phys.org', url: 'https://phys.org/rss-feed/' },
    { name: 'Nature', url: 'https://www.nature.com/nature.rss' },
  ],
  tech: {
    ai: [
      { name: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml' },
      { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
      { name: 'MIT AI News', url: 'https://news.mit.edu/rss/topic/artificial-intelligence2' },
    ],
    vibeCoding: [
      { name: 'Hacker News', url: 'https://hnrss.org/newest?q=vibe+coding' },
      { name: 'Dev.to AI', url: 'https://dev.to/feed/tag/ai' },
      { name: 'Lobsters', url: 'https://lobste.rs/rss' },
    ],
    trending: [
      { name: 'TechCrunch', url: 'https://techcrunch.com/feed' },
      { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index' },
      { name: 'Hacker News Top', url: 'https://hnrss.org/frontpage' },
    ],
  },
};
