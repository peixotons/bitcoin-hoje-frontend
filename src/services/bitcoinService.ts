
import { useQuery } from '@tanstack/react-query';

// Types for our data structure
export interface BitcoinData {
  date: string;
  price: number;
  sma50: number;
  sma100: number;
  sma200: number;
}

export interface BitcoinIndicators {
  mayerMultiple: number;
  lowestMayer: number;
  highestMayer: number;
  fearGreedIndex: number;
  lowestFearGreed: number;
  highestFearGreed: number;
  priceData: BitcoinData[];
}

// Main hook to fetch all Bitcoin data from our API
export const useBitcoinData = () => {
  return useQuery({
    queryKey: ['bitcoinData'],
    queryFn: async (): Promise<BitcoinIndicators> => {
      try {
        const response = await fetch('http://localhost:3000/bitcoin');
        
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do Bitcoin');
        }
        
        const data = await response.json();
        return data;
      } catch (err) {
        console.error('Erro ao carregar dados do Bitcoin:', err);
        return generateMockData();
      }
    },
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
    staleTime: 2 * 60 * 1000,       // Consider data stale after 2 minutes
  });
};

// Generate mock data for development and fallback purposes
const generateMockData = (): BitcoinIndicators => {
  const priceData: BitcoinData[] = [];
  const today = new Date();
  const basePrice = 60000;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    const randomFactor = 0.05;
    const randomChange = basePrice * randomFactor * (Math.random() - 0.5);
    const price = basePrice + randomChange * (i + 1);
    
    const sma50 = price * (1 - 0.01 * Math.random());
    const sma100 = price * (1 - 0.02 * Math.random());
    const sma200 = price * (1 - 0.04 * Math.random());
    
    priceData.push({
      date: `${date.getDate()}/${date.getMonth() + 1}`,
      price: Math.round(price),
      sma50: Math.round(sma50),
      sma100: Math.round(sma100),
      sma200: Math.round(sma200)
    });
  }
  
  return {
    mayerMultiple: 1.2,
    lowestMayer: 0.5,
    highestMayer: 2.4,
    fearGreedIndex: 25,
    lowestFearGreed: 10,
    highestFearGreed: 90,
    priceData
  };
};
