import { StockProfileCardProps } from "@/app/types/stockdata";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function StockProfileCard({stockProfile, stockPrice, stockMetrics}: StockProfileCardProps) {
    const isPositive = stockPrice.changePrice > 0;

    const changeColors = isPositive ? "text-green-600" : "text-red-600";
    const trendIcon = isPositive ? <TrendingUp /> : <TrendingDown />;

    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    const currentYear = new Date().getFullYear();
    const formatTime = (currentDate + "-" + currentMonth + "-" + currentYear);

    const formatMarketCap = (num: number) => {
        if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
        if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
        if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
        return `$${num.toFixed(2)}`;
    };

    const currentRatio = stockMetrics?.series?.annual?.currentRatio?.[0]?.v;
    const currentRatioPeriod = stockMetrics?.series?.annual?.currentRatio?.[0]?.period;
    
    const salesPerShare = stockMetrics?.series?.annual?.salesPerShare?.[0]?.v;
    const salesPerSharePeriod = stockMetrics?.series?.annual?.salesPerShare?.[0]?.period;
    
    const netMargin = stockMetrics?.series?.annual?.netMargin?.[0]?.v;
    const netMarginPeriod = stockMetrics?.series?.annual?.netMargin?.[0]?.period;

    const avgTradingVolume = stockMetrics?.metric?.["10DayAverageTradingVolume"];
    const weekHigh52 = stockMetrics?.metric?.["52WeekHigh"];
    const weekLow52 = stockMetrics?.metric?.["52WeekLow"];
    const beta = stockMetrics?.metric?.beta;

    return (
        <div className="flex flex-col items-center gap-2 mt-4 ">
                <div className="w-full">
                    <Card className="bg-black">
                        <CardHeader>
                            <CardDescription className="flex flex-col text-white">
                                <h2 className="text-white text-3xl mt-1">{stockProfile.name}</h2>
                                <div className="flex items-center  gap-4">
                                    <img src={stockProfile.logo} className="rounded-full w-14 h-14 mt-2"></img>
                                    <h3 className="font-bold text-white text-5xl mt-2">{stockProfile.ticker}</h3>
                                </div>
                                <div className="sm:flex flex-col md:flex flex-row gap-10 mt-2 p-4">
                                    <div className="flex gap-1">
                                        <h3 className="text-white text-4xl">{stockPrice.currentPrice}</h3>
                                        <p className="text-lg mt-1">{stockProfile.currency}</p>
                                        <div className="flex items-center gap-2">
                                            <span className={`${changeColors}`}>{trendIcon}</span>
                                            <p className={`${changeColors}`}>{stockPrice.changePrice.toFixed(2)} {stockPrice.percentChange.toFixed(2)}%</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <h2 className="text-white text-2xl">High</h2>
                                        <h3 className="text-white text-4xl">{stockPrice.highPriceDay}</h3>
                                        <p className="text-lg mt-1">{stockProfile.currency}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <h2 className="text-white text-2xl">Low</h2>
                                        <h3 className="text-white text-4xl">{stockPrice.lowPriceDay}</h3>
                                        <p className="text-lg mt-1">{stockProfile.currency}</p>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-gray-300 text-sm">As of today {formatTime}</p>
                                </div>
                                <p className="text-white text-2xl mt-4">{stockProfile.exchange}</p>
                                <div className="flex flex-col mt-4 gap-2">
                                    <div className="sm:flex flex-col md:flex flex-row  justify-between gap-6">
                                        <div className="flex gap-2">
                                            <span className="text-lg font-semibold">Website</span>
                                            <a href={stockProfile.weburl} className="text-lg">{stockProfile.weburl}</a>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-lg font-semibold">Sector</span>
                                            <p className="text-white text-lg">{stockProfile.finnhubIndustry}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-lg font-semibold">IPO</span>
                                            <p className="text-white text-lg">{stockProfile.ipo}</p>
                                        </div>
                                         <div className="flex gap-2">
                                            <span className="text-lg font-semibold">Country</span>
                                            <p className="text-white text-lg">{stockProfile.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                
                <div className="flex items-center justify-center w-full gap-2">
                    <div className="w-full">
                        <Card className="bg-black border-1">
                            <CardHeader>
                                <CardDescription className="text-xl">Metrics</CardDescription>
                            </CardHeader>
                           <CardContent className="text-white">
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">Market Cap</span>
                                        <p className="text-white text-lg font-semibold">
                                            {formatMarketCap(stockProfile.marketCapitalization)}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">10D Avg Volume</span>
                                        <p className="text-white text-lg font-semibold">
                                            {avgTradingVolume ? avgTradingVolume.toFixed(2) + 'M' : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">52W High</span>
                                        <p className="text-white text-lg font-semibold">
                                            {weekHigh52 ? `$${weekHigh52.toFixed(2)}` : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">52W Low</span>
                                        <p className="text-white text-lg font-semibold">
                                            {weekLow52 ? `$${weekLow52.toFixed(2)}` : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">Beta</span>
                                        <p className="text-white text-lg font-semibold">
                                            {beta ? beta.toFixed(2) : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div>

                    
                </div>
                    <div className="w-full">
                        <Card className="bg-black border-1">
                            <CardHeader>
                                <CardDescription className="text-xl">Current Ratio</CardDescription>
                            </CardHeader>
                            <CardContent className="text-white">
                                <div className="flex flex-col gap-1">
                                    <p className="text-white text-3xl font-bold">
                                        {currentRatio ? currentRatio.toFixed(2) : 'N/A'}
                                    </p>
                                    {currentRatioPeriod && (
                                        <p className="text-gray-400 text-xs">
                                            Period: {currentRatioPeriod}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <div className="w-full">
                        <Card className="bg-black border-1">
                            <CardHeader>
                                <CardDescription className="text-xl">Sales per share</CardDescription>
                            </CardHeader>
                            <CardContent className="text-white">
                                <div className="flex flex-col gap-1">
                                    <p className="text-white text-3xl font-bold">
                                        {salesPerShare ? `$${salesPerShare.toFixed(2)}` : 'N/A'}
                                    </p>
                                    {salesPerSharePeriod && (
                                        <p className="text-gray-400 text-xs">
                                            Period: {salesPerSharePeriod}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <div className="w-full">
                        <Card className="bg-black border-1">
                            <CardHeader>
                                <CardDescription className="text-xl">Net margin</CardDescription>
                            </CardHeader>
                            <CardContent className="text-white">
                                <div className="flex flex-col gap-1">
                                    <p className="text-white text-3xl font-bold">
                                        {netMargin ? `${(netMargin * 100).toFixed(2)}%` : 'N/A'}
                                    </p>
                                    {netMarginPeriod && (
                                        <p className="text-gray-400 text-xs">
                                            Period: {netMarginPeriod}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                <div>
            </div>
        </div>
    )
}