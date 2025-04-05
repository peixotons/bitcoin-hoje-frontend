
import { useState, useEffect } from 'react';

// TODO: Idealmente, esta chave estaria em uma variável de ambiente no servidor
// Para fins de demonstração, vamos mantê-la aqui
const ALPHA_VANTAGE_API_KEY = "demo"; // Substitua por sua chave API real

interface BitcoinData {
  date: string;
  price: number;
  ema: number;
  sma: number;
}

interface BitcoinIndicators {
  mayerMultiple: number;
  lowestMayer: number;
  highestMayer: number;
  rsi: number;
  lowestRSI: number;
  highestRSI: number;
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
        
        // Buscar dados de SMA (Simple Moving Average)
        const smaResponse = await fetch(
          `https://www.alphavantage.co/query?function=SMA&symbol=BTC&interval=daily&time_period=10&series_type=close&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        
        if (!smaResponse.ok) {
          throw new Error('Erro ao buscar dados de SMA');
        }
        
        const smaData = await smaResponse.json();
        
        // Buscar dados de EMA (Exponential Moving Average)
        const emaResponse = await fetch(
          `https://www.alphavantage.co/query?function=EMA&symbol=BTC&interval=daily&time_period=10&series_type=close&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        
        if (!emaResponse.ok) {
          throw new Error('Erro ao buscar dados de EMA');
        }
        
        const emaData = await emaResponse.json();
        
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
            
            // Encontrar valor SMA correspondente
            let sma = 0;
            if (smaData['Technical Analysis: SMA'] && smaData['Technical Analysis: SMA'][date]) {
              sma = parseFloat(smaData['Technical Analysis: SMA'][date]['SMA']);
            }
            
            // Encontrar valor EMA correspondente
            let ema = 0;
            if (emaData['Technical Analysis: EMA'] && emaData['Technical Analysis: EMA'][date]) {
              ema = parseFloat(emaData['Technical Analysis: EMA'][date]['EMA']);
            }
            
            processedData.push({
              date: `${day}/${month}`,
              price,
              sma,
              ema
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
    rsi: 0,
    lowestRSI: 0,
    highestRSI: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { data: priceData, isLoading: priceLoading } = useBitcoinData();
  
  useEffect(() => {
    if (!priceLoading && priceData.length > 0) {
      // Em um ambiente real, esses valores seriam calculados com base em dados históricos
      // Por enquanto, estamos usando valores simulados
      
      // Simulando o Multiplicador de Mayer
      const mayerMultiple = priceData[priceData.length - 1].price / priceData[priceData.length - 1].sma;
      
      // Simulando o RSI
      const rsi = 35 + Math.random() * 30; // Valor entre 35 e 65
      
      setIndicators({
        mayerMultiple: mayerMultiple,
        lowestMayer: 0.5,
        highestMayer: 2.4,
        rsi: rsi,
        lowestRSI: 20,
        highestRSI: 80
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
    
    // Simulando médias móveis simples
    const sma = price * (1 - 0.02 * Math.random());
    
    // Simulando médias móveis exponenciais
    const ema = price * (1 + 0.01 * Math.random());
    
    data.push({
      date: `${date.getDate()}/${date.getMonth() + 1}`,
      price: Math.round(price),
      ema: Math.round(ema),
      sma: Math.round(sma)
    });
  }
  
  return data;
};
