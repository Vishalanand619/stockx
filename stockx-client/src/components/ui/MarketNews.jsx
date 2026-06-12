import { Card, CardContent } from "./Card";

const newsItems = [
  { id: 1, headline: "Fed hints at potential rate cuts later this year", source: "Bloomberg", time: "2h ago", impact: "bullish" },
  { id: 2, headline: "Tech stocks rally as AI sector shows unprecedented growth", source: "Reuters", time: "4h ago", impact: "bullish" },
  { id: 3, headline: "Oil prices surge amid geopolitical tensions in the Middle East", source: "CNBC", time: "5h ago", impact: "bearish" },
  { id: 4, headline: "Electric Vehicle sales hit record high globally", source: "WSJ", time: "8h ago", impact: "bullish" },
];

const MarketNews = () => {
  return (
    <Card className="h-full bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          📰 Latest Market News
        </h3>
        
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {newsItems.map(news => (
            <div key={news.id} className="border-b border-gray-800 pb-4 last:border-0 hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-gray-400 bg-gray-800 px-2 py-1 rounded">{news.source}</span>
                <span className="text-xs text-gray-500">{news.time}</span>
              </div>
              <h4 className="text-sm font-medium text-gray-200 leading-snug">
                {news.headline}
              </h4>
              <div className="mt-2 flex items-center">
                <span className={`text-xs font-bold ${news.impact === 'bullish' ? 'text-green-400' : 'text-red-400'}`}>
                  {news.impact === 'bullish' ? 'Bullish ↑' : 'Bearish ↓'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketNews;
