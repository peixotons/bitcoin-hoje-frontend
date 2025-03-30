
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

const BitcoinChart: React.FC = () => {
  const { data, isLoading, error } = useBitcoinData();

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
    <div className="space-y-4">
      {error && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
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
    </div>
  );
};

export default BitcoinChart;
