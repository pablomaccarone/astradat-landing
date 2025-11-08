export const heroMetrics = [
  {
    label: "On-Chain NAV",
    value: "$1.28B",
    detail: "Live at 09:31 ET",
  },
  {
    label: "Verified Strategies",
    value: "32",
    detail: "Audited quarterly",
  },
  {
    label: "Chains Monitored",
    value: "24",
    detail: "Full-spectrum analytics",
  },
];

export type KPIConfig = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  min?: number;
  max?: number;
  variance?: number;
  change: number;
  changePrefix?: string;
  changeSuffix?: string;
  changeDecimals?: number;
  changeVariance?: number;
  changeMin?: number;
  changeMax?: number;
  betterWhenLower?: boolean;
};

export type TokenSnapshot = {
  symbol: string;
  name: string;
  exposure: number;
  exposurePrefix?: string;
  exposureSuffix?: string;
  decimals?: number;
  min?: number;
  max?: number;
  variance?: number;
  change: number;
  changeDecimals?: number;
  changeVariance?: number;
};

export const transparencyKPIs: KPIConfig[] = [
  {
    label: "24h Yield",
    value: 4.8,
    suffix: "%",
    decimals: 1,
    min: 3.6,
    max: 6.4,
    variance: 0.35,
    change: 36,
    changeSuffix: " bps",
    changeDecimals: 0,
    changeVariance: 12,
  },
  {
    label: "Risk Buffer",
    value: 182,
    prefix: "$",
    suffix: "M",
    decimals: 0,
    min: 150,
    max: 240,
    variance: 5.5,
    change: 12,
    changePrefix: "$",
    changeSuffix: "M",
    changeDecimals: 0,
    changeVariance: 8,
    changeMin: -20,
    changeMax: 28,
  },
  {
    label: "Settlement Latency",
    value: 3.2,
    suffix: "s",
    decimals: 1,
    min: 2.2,
    max: 4.2,
    variance: 0.2,
    change: -0.8,
    changeSuffix: "s",
    changeDecimals: 1,
    changeVariance: 0.25,
    changeMin: -1.6,
    changeMax: 0.6,
    betterWhenLower: true,
  },
];

export const tokenSnapshots: TokenSnapshot[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    exposure: 420,
    exposurePrefix: "$",
    exposureSuffix: "M",
    decimals: 0,
    min: 360,
    max: 540,
    variance: 10,
    change: 3.4,
    changeDecimals: 1,
    changeVariance: 1.4,
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    exposure: 168,
    exposurePrefix: "$",
    exposureSuffix: "M",
    decimals: 0,
    min: 120,
    max: 260,
    variance: 8,
    change: 1.1,
    changeDecimals: 1,
    changeVariance: 1.2,
  },
  {
    symbol: "ARB",
    name: "Arbitrum",
    exposure: 96,
    exposurePrefix: "$",
    exposureSuffix: "M",
    decimals: 0,
    min: 80,
    max: 180,
    variance: 6,
    change: 4.6,
    changeDecimals: 1,
    changeVariance: 1.5,
  },
];

export const partnerList = [
  {
    name: "Nasdaq",
    caption: "Public Markets",
  },
  {
    name: "Ethereum",
    caption: "Settlement Layer",
  },
  {
    name: "Polygon",
    caption: "Scaling Partner",
  },
  {
    name: "Chainlink",
    caption: "Data Integrity",
  },
  {
    name: "Institutional Desk",
    caption: "Prime Services",
  },
];
