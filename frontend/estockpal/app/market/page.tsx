"use client";

import { Search, TrendingUp, Newspaper, BarChart3, LineChart } from "lucide-react";
import React, { useState } from "react";
import { StockProfile, StockPrice, StockMetrics } from "../types/stockdata";
import StockProfileCard from "@/components/stock-section-cards";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

export default function Market() {
    const [stockName, setStockName] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [stockProfile, setStockProfile] = useState<StockProfile | null>(null);
    const [stockPrice, setStockPrice] = useState<StockPrice | null>(null);
    const [stockMetrics, setStockMetrics] = useState<StockMetrics | null>(null);

    const apiKey = process.env.NEXT_PUBLIC_API_KEY_FINNHUB;
    const finnhubBaseUrl = "https://finnhub.io/api/v1";

    const handleSubmitStockProfile = async () => {
        if (!stockName.trim()) return;
        
        setIsLoading(true);
        
        try {
            await Promise.all([
                fetchCompanyProfile(),
                fetchCompanyPrice(),
                fetchCompanyMetrics(),
            ]);
        } catch (error) {
            console.error("Failed to fetch api from finnhub api", error);
        } finally {
            setIsLoading(false);
            setShowResult(true);
        }
    }

    const handleKeyPressDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmitStockProfile();
        }
    }

    const fetchCompanyProfile = async () => {
        try {
            const companyProfile = await fetch(`${finnhubBaseUrl}/stock/profile2?symbol=${stockName}&token=${apiKey}`, {
                method: "GET",
            });
            
            if (companyProfile.ok) {
                const companyProfileData = await companyProfile.json();
                
                const newStockProfile: StockProfile = {
                   ticker: companyProfileData.ticker || "",
                   name: companyProfileData.name || "",
                   weburl: companyProfileData.weburl || "",
                   logo: companyProfileData.logo || "",
                   exchange: companyProfileData.exchange || "",
                   finnhubIndustry: companyProfileData.finnhubIndustry || "",
                   ipo: companyProfileData.ipo || "",
                   currency: companyProfileData.currency || "",
                   country: companyProfileData.country || "",
                   marketCapitalization: companyProfileData.marketCapitalization || 0,
                   shareOutstanding: companyProfileData.shareOutstanding || 0,
                };

                console.log("Successfully fetch company profile data", companyProfileData);
                setStockProfile(newStockProfile);
            }
        } catch (error) {
            console.error("Failed to fetch company stock", error);
        }
    }

    const fetchCompanyPrice = async () => {
        try {
            const companyPrice = await fetch(`${finnhubBaseUrl}/quote?symbol=${stockName}&token=${apiKey}`, {
                method: "GET",
            });

            if (companyPrice.ok) {
                const companyPriceData = await companyPrice.json();
                
                const newStockPrice: StockPrice = {
                    currentPrice: companyPriceData.c || 0,
                    changePrice: companyPriceData.d || 0,
                    percentChange: companyPriceData.dp || 0,
                    highPriceDay: companyPriceData.h || 0,
                    lowPriceDay: companyPriceData.l || 0,
                    openPriceDay: companyPriceData.o || 0,
                    previousClosePrice: companyPriceData.pc || 0,
                };

                console.log("Successfully fetch company price data", companyPriceData);
                setStockPrice(newStockPrice);
            } 
        } catch (error) {
            console.error("Failed to fetch company price", error);
        }
    }

    const fetchCompanyMetrics = async () => {
        try {
            const companyMetrics = await fetch(`${finnhubBaseUrl}/stock/metric?symbol=${stockName}&metric=all&token=${apiKey}`, {
                method: "GET",
            });

            if (companyMetrics.ok) {
                const companyMetricsData = await companyMetrics.json();
                
                const newStockMetrics: StockMetrics = {
                    series: {
                        annual: {
                            currentRatio: companyMetricsData.series?.annual?.currentRatio || [],
                            salesPerShare: companyMetricsData.series?.annual?.salesPerShare || [],
                            netMargin: companyMetricsData.series?.annual?.netMargin || [],
                        }
                    },
                    metric: {
                        "10DayAverageTradingVolume": companyMetricsData.metric?.["10DayAverageTradingVolume"] || 0,
                        "52WeekHigh": companyMetricsData.metric?.["52WeekHigh"] || 0,
                        "52WeekLow": companyMetricsData.metric?.["52WeekLow"] || 0,
                        "52WeekLowDate": companyMetricsData.metric?.["52WeekLowDate"] || "",
                        "52WeekPriceReturnDaily": companyMetricsData.metric?.["52WeekPriceReturnDaily"] || 0,
                        beta: companyMetricsData.metric?.beta || 0,
                    },
                    metricType: companyMetricsData.metricType || "all",
                    symbol: companyMetricsData.symbol || stockName,
                };

                console.log("Successfully fetch company metrics data", companyMetricsData);
                setStockMetrics(newStockMetrics);
            }
        } catch (error) {
            console.error("Failed to fetch company metrics", error);
        }
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-5xl mx-auto flex flex-col gap-4 p-6">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-white text-5xl font-semibold text-center">Markets Analytics</h1>
                    <h3 className="text-white text-4xl mt-6">Explore Stocks</h3>
                    <div className="relative gap-2">
                         <input 
                        placeholder="Enter stock symbol (e.g. AAPL)..." 
                        className="text-black mt-4 p-2 rounded-lg bg-gray-200 w-100 focus:outline-none"
                        value={stockName}
                        onChange={(e) => setStockName(e.target.value.toUpperCase())}
                        onKeyDown={handleKeyPressDown}
                        > 
                        </input>
                        <button 
                        className="text-black absolute right-2 top-4 hover:bg-gray-200 rounded-lg p-2 cursor-pointer disabled:opacity-50"
                        onClick={handleSubmitStockProfile}
                        disabled={isLoading || !stockName.trim()}
                        >
                            <Search />
                        </button>
                    </div>
                    {isLoading && (
                        <p className="text-white mt-2">Loading...</p>
                    )}
                </div>

                {!showResult && !isLoading && (
                    <div className="mt-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <Card className="bg-black border-gray-800">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-blue-500/10 rounded-lg">
                                            <LineChart className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <CardDescription className="text-white text-lg font-semibold">
                                            Real-time Data
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-400 text-sm">
                                        Get instant access to live stock prices, market movements, and trading volumes.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-black border-gray-800">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-green-500/10 rounded-lg">
                                            <BarChart3 className="w-6 h-6 text-green-500" />
                                        </div>
                                        <CardDescription className="text-white text-lg font-semibold">
                                            Financial Metrics
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-400 text-sm">
                                        Analyze key financial ratios, market cap, beta, and comprehensive company metrics.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-black border-gray-800">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-purple-500/10 rounded-lg">
                                            <Newspaper className="w-6 h-6 text-purple-500" />
                                        </div>
                                        <CardDescription className="text-white text-lg font-semibold">
                                            Company News
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-400 text-sm">
                                        Stay updated with the latest news and developments affecting your stocks.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="bg-black to-purple-500/10 border-gray-800">
                            <CardContent className="p-8">
                                <div className="text-center">
                                    <TrendingUp className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                                    <h2 className="text-white text-3xl font-bold mb-3">
                                        Start Your Market Analysis
                                    </h2>
                                    <p className="text-gray-300 text-lg mb-6">
                                        Enter a stock symbol above to access comprehensive market data, financial metrics, and the latest news.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META'].map((symbol) => (
                                            <button
                                                key={symbol}
                                                onClick={() => {
                                                    setStockName(symbol);
                                                }}
                                                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                            >
                                                {symbol}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {(showResult && !isLoading && stockProfile && stockPrice) && (
                    <div className="mt-4">
                        <StockProfileCard 
                            stockProfile={stockProfile} 
                            stockPrice={stockPrice}
                            stockMetrics={stockMetrics || undefined}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}