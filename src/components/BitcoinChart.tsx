
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Calendar } from 'lucide-react';

interface BitcoinPrice {
  date: string;
  price: number;
  ema: number;
  sma: number;
}

// Dados de exemplo - Seriam substituídos por dados da API
const generateMockData = () => {
  const data: BitcoinPrice[] = [];
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

const BitcoinChart: React.FC = () => {
  const [data, setData] = useState<BitcoinPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula o carregamento de dados da API
    const loadData = async () => {
      setIsLoading(true);
      // Em uma implementação real, aqui você faria a chamada para a API
      // const response = await fetch('sua-api-endpoint');
      // const data = await response.json();
      
      // Usando dados simulados por enquanto
      setTimeout(() => {
        setData(generateMockData());
        setIsLoading(false);
      }, 1000);
    };
    
    loadData();
  }, []);

  if (isLoading) {
    return (
      <Card className="w-full h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bitcoin mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando dados do Bitcoin...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Evolução do Preço do Bitcoin</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          Últimos 30 dias
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, 'Preço']}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#F7931A" 
                activeDot={{ r: 8 }} 
                strokeWidth={2} 
                name="Preço (USD)"
              />
              <Line 
                type="monotone" 
                dataKey="ema" 
                stroke="#2563EB" 
                strokeWidth={1.5} 
                dot={false} 
                name="EMA"
              />
              <Line 
                type="monotone" 
                dataKey="sma" 
                stroke="#10B981" 
                strokeWidth={1.5} 
                dot={false} 
                name="SMA"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BitcoinChart;
