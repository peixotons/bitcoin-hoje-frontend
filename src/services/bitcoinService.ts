
import { useQuery } from '@tanstack/react-query';

// Types for our data structure based on the provided DTO
export interface BitcoinCurrentData {
  price: number;
  mayerMultiple: number;
  mayerMultipleStats: {
    min: number;
    max: number;
  };
  fearAndGreedIndex: {
    today: number;
    min: number;
    max: number;
  };
}

export interface BitcoinHistoricalData {
  date: string;
  price: number;
  sma50: number;
  sma100: number;
  sma200: number;
}

export interface BitcoinResponseDTO {
  currentData: BitcoinCurrentData;
  historicalData: BitcoinHistoricalData[];
}

// Main hook to fetch all Bitcoin data from our API
export const useBitcoinData = () => {
  return useQuery({
    queryKey: ['bitcoinData'],
    queryFn: async (): Promise<BitcoinResponseDTO> => {
      try {
        const response = await fetch('https://bitcoinhoje.site/api/redis', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer 3MQ4fAAmdCW09pJdit6xEMub0tEkn7',
            'Content-Type': 'application/json',
          },
        });        

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
const generateMockData = (): BitcoinResponseDTO => {
  const historicalData: BitcoinHistoricalData[] = [];
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
    
    historicalData.push({
      date: `${date.getDate()}/${date.getMonth() + 1}`,
      price: Math.round(price),
      sma50: Math.round(sma50),
      sma100: Math.round(sma100),
      sma200: Math.round(sma200)
    });
  }
  
  return {
    currentData: {
      price: historicalData[historicalData.length - 1].price,
      mayerMultiple: 1.2,
      mayerMultipleStats: {
        min: 0.5,
        max: 2.4
      },
      fearAndGreedIndex: {
        today: 25,
        min: 10,
        max: 90
      }
    },
    historicalData
  };
};
