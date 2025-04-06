
import React from 'react';
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
import { Calendar, AlertCircle } from 'lucide-react';
import { useBitcoinData } from '@/services/bitcoinService';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useIsMobile } from '@/hooks/use-mobile';

const BitcoinChart: React.FC = () => {
  const { data, isLoading, error } = useBitcoinData();
  const isMobile = useIsMobile();

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

  if (!data?.historicalData) {
    return (
      <Card className="w-full">
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Não foi possível carregar os dados de preço do Bitcoin.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error instanceof Error ? error.message : "Erro ao carregar dados"}
          </AlertDescription>
        </Alert>
      )}
      
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
                data={data.historicalData}
                margin={{ 
                  top: 5, 
                  right: isMobile ? 10 : 30, 
                  left: isMobile ? 0 : 20, 
                  bottom: 5 
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  tickFormatter={(value) => isMobile ? value.split('/')[0] : value}
                />
                <YAxis 
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  width={isMobile ? 30 : 40}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name) => {
                    const formattedNames = {
                      price: 'Preço Bitcoin (USD)',
                      sma50: 'SMA 50 dias',
                      sma100: 'SMA 100 dias',
                      sma200: 'SMA 200 dias'
                    };
                    return [`$${value.toLocaleString()}`, formattedNames[name as keyof typeof formattedNames]];
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: isMobile ? 10 : 12 }}
                  formatter={(value) => {
                    const formattedNames = {
                      price: 'Preço Bitcoin (USD)',
                      sma50: 'SMA 50 dias',
                      sma100: 'SMA 100 dias',
                      sma200: 'SMA 200 dias'
                    };
                    return formattedNames[value as keyof typeof formattedNames];
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#F7931A" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2} 
                  name="price"
                />
                <Line 
                  type="monotone" 
                  dataKey="sma50" 
                  stroke="#10B981" 
                  strokeWidth={1.5} 
                  dot={false} 
                  name="sma50"
                />
                <Line 
                  type="monotone" 
                  dataKey="sma100" 
                  stroke="#2563EB" 
                  strokeWidth={1.5} 
                  dot={false} 
                  name="sma100"
                />
                <Line 
                  type="monotone" 
                  dataKey="sma200" 
                  stroke="#7C3AED" 
                  strokeWidth={1.5} 
                  dot={false} 
                  name="sma200"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BitcoinChart;
