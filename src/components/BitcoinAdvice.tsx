
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Bitcoin } from 'lucide-react';
import { useBitcoinData } from '@/services/bitcoinService';

type AdviceStatus = 'buy' | 'wait' | 'sell' | 'loading';

interface BitcoinAdviceProps {
  forceStatus?: AdviceStatus;
}

const BitcoinAdvice: React.FC<BitcoinAdviceProps> = ({ forceStatus }) => {
  const [status, setStatus] = useState<AdviceStatus>('loading');
  const { data, isLoading } = useBitcoinData();
  
  useEffect(() => {
    if (forceStatus) {
      setStatus(forceStatus);
      return;
    }
    
    console.log(data);
    
    if (isLoading || !data?.priceData) {
      setStatus('loading');
      return;
    }
    
    // Analisar os dados para tomar uma decisão
    if (data.priceData.length >= 2) {
      const latestPrice = data.priceData[data.priceData.length - 1].price;
      const previousPrice = data.priceData[data.priceData.length - 2].price;
      const latestSMA200 = data.priceData[data.priceData.length - 1].sma200;
      
      const priceAboveSMA = latestPrice > latestSMA200;
      const priceIncreasing = latestPrice > previousPrice;
      
      if (priceAboveSMA && priceIncreasing) {
        setStatus('buy');
      } else if (!priceAboveSMA && !priceIncreasing) {
        setStatus('sell');
      } else {
        setStatus('wait');
      }
    } else {
      // Fallback para um estado aleatório se não houver dados suficientes
      const statuses: AdviceStatus[] = ['buy', 'wait', 'sell'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setStatus(randomStatus);
    }
  }, [forceStatus, isLoading, data]);

  const renderContent = () => {
    switch (status) {
      case 'buy':
        return (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <ArrowUp className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-2">SIM!</h2>
            <p className="text-xl mb-4">Agora é uma boa hora para comprar Bitcoin!</p>
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 px-3 py-1">
              Tendência de alta
            </Badge>
            <p className="mt-4 text-sm text-gray-600">
              Os indicadores técnicos sugerem uma tendência de alta no curto prazo.
              Considere investir conforme sua estratégia pessoal.
            </p>
          </div>
        );
        
      case 'wait':
        return (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-100 p-4 rounded-full">
                <Bitcoin className="h-12 w-12 text-amber-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-amber-600 mb-2">TALVEZ</h2>
            <p className="text-xl mb-4">O mercado está indeciso no momento</p>
            <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 px-3 py-1">
              Mercado lateral
            </Badge>
            <p className="mt-4 text-sm text-gray-600">
              Os indicadores mostram um mercado sem tendência clara.
              Pode ser melhor esperar por sinais mais fortes.
            </p>
          </div>
        );
        
      case 'sell':
        return (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-4 rounded-full">
                <ArrowDown className="h-12 w-12 text-red-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-red-600 mb-2">NÃO</h2>
            <p className="text-xl mb-4">Não é um bom momento para comprar Bitcoin</p>
            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 px-3 py-1">
              Tendência de baixa
            </Badge>
            <p className="mt-4 text-sm text-gray-600">
              Os indicadores técnicos sugerem uma tendência de queda no curto prazo.
              Considere esperar por uma melhor oportunidade de entrada.
            </p>
          </div>
        );
        
      case 'loading':
      default:
        return (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bitcoin"></div>
            </div>
            <h2 className="text-2xl font-medium text-gray-700 mb-2">Analisando o mercado...</h2>
            <p className="text-gray-500">
              Nosso algoritmo está processando os últimos dados do mercado para fornecer a melhor recomendação.
            </p>
          </div>
        );
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-6">
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default BitcoinAdvice;
