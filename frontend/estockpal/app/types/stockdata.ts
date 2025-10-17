export interface StockProfile {
  ticker: string;
  name: string;
  weburl: string;
  logo: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  currency: string;
  country: string;
  marketCapitalization: number;
  shareOutstanding: number;
}

export interface StockMetrics {
  series: Series;
  metric: Metric;
  metricType: string;
  symbol: string;
}

export interface Series {
  annual: AnnualData;
}

export interface AnnualData {
  currentRatio: FinancialSeries[];
  salesPerShare: FinancialSeries[];
  netMargin: FinancialSeries[];
}

export interface FinancialSeries {
  period: string; 
  v: number;    
}

export interface Metric {
  "10DayAverageTradingVolume": number;
  "52WeekHigh": number;
  "52WeekLow": number;
  "52WeekLowDate": string;
  "52WeekPriceReturnDaily": number;
  beta: number;
}

export interface StockPrice {
  currentPrice: number;
  changePrice: number;
  percentChange: number;
  highPriceDay: number;
  lowPriceDay: number;
  openPriceDay: number;
  previousClosePrice: number;
}

export interface StockProfileCardProps {
    stockProfile: StockProfile;
    stockPrice: StockPrice;
    stockMetrics?: StockMetrics;
}
