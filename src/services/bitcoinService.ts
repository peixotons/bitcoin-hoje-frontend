import { useState, useEffect } from 'react';

// TODO: Idealmente, esta chave estaria em uma variável de ambiente no servidor
// Para fins de demonstração, vamos mantê-la aqui
const ALPHA_VANTAGE_API_KEY = "demo"; // Substitua por sua chave API real

interface BitcoinData {
  date: string;
  price: number;
  sma50: number;
  sma100: number;
  sma200: number;
}

interface BitcoinIndicators {
  mayerMultiple: number;
  lowestMayer: number;
  highestMayer: number;
}

export const useBitcoinData = () => {
  const [data, setData] = useState<BitcoinData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBitcoinData = async () => {
      setIsLoading(true);
      try {
        // Buscar dados de preço do Bitcoin
        const priceResponse = await fetch(
          `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        
        if (!priceResponse.ok) {
          throw new Error('Erro ao buscar dados de preço do Bitcoin');
        }
        
        const priceData = await priceResponse.json();
        
        if (priceData['Error Message']) {
          throw new Error(priceData['Error Message']);
        }
        
        // Buscar dados de SMA (Simple Moving Average) para diferentes períodos
        const sma50Response = await fetch(
          `https://www.alphavantage.co/query?function=SMA&symbol=BTC&interval=daily&time_period=50&series_type=close&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        
        const sma100Response = await fetch(
          `https://www.alphavantage.co/query?function=SMA&symbol=BTC&interval=daily&time_period=100&series_type=close&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        
        const sma200Response = await fetch(
          `https://www.alphavantage.co/query?function=SMA&symbol=BTC&interval=daily&time_period=200&series_type=close&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        
        if (!sma50Response.ok || !sma100Response.ok || !sma200Response.ok) {
          throw new Error('Erro ao buscar dados de SMA');
        }
        
        const sma50Data = await sma50Response.json();
        const sma100Data = await sma100Response.json();
        const sma200Data = await sma200Response.json();
        
        // Processar os dados
        const processedData: BitcoinData[] = [];
        
        if (priceData['Time Series (Digital Currency Daily)']) {
          const timeSeriesData = priceData['Time Series (Digital Currency Daily)'];
          
          // Pegar apenas os últimos 30 dias
          const dates = Object.keys(timeSeriesData).slice(0, 30).reverse();
          
          dates.forEach((date) => {
            const formattedDate = new Date(date);
            const day = formattedDate.getDate();
            const month = formattedDate.getMonth() + 1;
            
            const price = parseFloat(timeSeriesData[date]['4a. close (USD)']);
            
            // Encontrar valores SMA correspondentes
            let sma50 = 0;
            if (sma50Data['Technical Analysis: SMA'] && sma50Data['Technical Analysis: SMA'][date]) {
              sma50 = parseFloat(sma50Data['Technical Analysis: SMA'][date]['SMA']);
            }
            
            let sma100 = 0;
            if (sma100Data['Technical Analysis: SMA'] && sma100Data['Technical Analysis: SMA'][date]) {
              sma100 = parseFloat(sma100Data['Technical Analysis: SMA'][date]['SMA']);
            }
            
            let sma200 = 0;
            if (sma200Data['Technical Analysis: SMA'] && sma200Data['Technical Analysis: SMA'][date]) {
              sma200 = parseFloat(sma200Data['Technical Analysis: SMA'][date]['SMA']);
            }
            
            processedData.push({
              date: `${day}/${month}`,
              price,
              sma50,
              sma100,
              sma200
            });
          });
        }
        
        setData(processedData.length > 0 ? processedData : generateMockData());
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar dados do Bitcoin:', err);
        setError('Não foi possível carregar os dados do Bitcoin. Usando dados simulados.');
        
        // Fallback para dados simulados
        setData(generateMockData());
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBitcoinData();
  }, []);
  
  return { data, isLoading, error };
};

// Função para calcular os indicadores
export const useBitcoinIndicators = (): { data: BitcoinIndicators, isLoading: boolean } => {
  const [indicators, setIndicators] = useState<BitcoinIndicators>({
    mayerMultiple: 0,
    lowestMayer: 0,
    highestMayer: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { data: priceData, isLoading: priceLoading } = useBitcoinData();
  
  useEffect(() => {
    if (!priceLoading && priceData.length > 0) {
      // Em um ambiente real, esses valores seriam calculados com base em dados históricos
      // Por enquanto, estamos usando valores simulados
      
      // Simulando o Multiplicador de Mayer
      const mayerMultiple = priceData[priceData.length - 1].price / priceData[priceData.length - 1].sma200;
      
      setIndicators({
        mayerMultiple: mayerMultiple,
        lowestMayer: 0.5,
        highestMayer: 2.4,
      });
      
      setIsLoading(false);
    }
  }, [priceData, priceLoading]);
  
  return { data: indicators, isLoading };
};

// Função para gerar dados simulados (mantida como fallback)
export const generateMockData = (): BitcoinData[] => {
  const data: BitcoinData[] = [];
  const today = new Date();
  const basePrice = 60000;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Criar alguma variação nos preços para o gráfico parecer realista
    const randomFactor = 0.05; // 5% de variação máxima
    const randomChange = basePrice * randomFactor * (Math.random() - 0.5);
    const price = basePrice + randomChange * (i + 1);
    
    // Simulando médias móveis diferentes
    const sma50 = price * (1 - 0.01 * Math.random());
    const sma100 = price * (1 - 0.02 * Math.random());
    const sma200 = price * (1 - 0.04 * Math.random());
    
    data.push({
      date: `${date.getDate()}/${date.getMonth() + 1}`,
      price: Math.round(price),
      sma50: Math.round(sma50),
      sma100: Math.round(sma100),
      sma200: Math.round(sma200)
    });
  }
  
  return data;
};
