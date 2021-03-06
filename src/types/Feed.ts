export type Feed = {
  compareOffchain: string;
  contractAddress: string;
  contractType: string;
  contractVersion: number;
  decimalPlaces: number;
  formatDecimalPlaces: number;
  healthPrice: string;
  heartbeat: number;
  history: boolean;
  listing: boolean;
  multiply: string;
  name: string;
  pair: string[];
  path: string;
  proxyAddress: string;
  sponsored: string[];
  threshold: number;
  valuePrefix: string;
  price?: string;
  lastUpdated?: string;
};
