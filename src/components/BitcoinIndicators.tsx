
import React from 'react';
import IndicatorCard from './IndicatorCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface BitcoinIndicatorsProps {
  // Valores para os indicadores
  mayerMultiple: number;
  lowestMayer: number;
  highestMayer: number;
  rsi: number;
  lowestRSI: number;
  highestRSI: number;
}

const BitcoinIndicators: React.FC<BitcoinIndicatorsProps> = ({
  mayerMultiple,
  lowestMayer,
  highestMayer,
  rsi,
  lowestRSI,
  highestRSI
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Indicadores Técnicos</h2>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'} gap-4`}>
        <IndicatorCard
          title="Multiplicador de Mayer"
          currentValue={mayerMultiple}
          lowestValue={lowestMayer}
          highestValue={highestMayer}
          goodDirection="down"
          description="O Multiplicador de Mayer é a razão entre o preço atual do Bitcoin e sua média móvel de 200 dias. Valores abaixo de 0.8 historicamente indicam boas oportunidades de compra."
          color="#9b87f5"
        />
        
        <IndicatorCard
          title="RSI (Índice de Força Relativa)"
          currentValue={rsi}
          lowestValue={lowestRSI}
          highestValue={highestRSI}
          goodDirection="down"
          description="O RSI mede a velocidade e a mudança dos movimentos de preços. Valores abaixo de 30 são considerados 'sobrevendidos' e podem indicar boas oportunidades de compra."
          color="#F97316"
        />

        <IndicatorCard
          title="Índice de Medo e Ganância"
          currentValue={25}
          lowestValue={10}
          highestValue={90}
          goodDirection="down"
          description="O Índice de Medo e Ganância analisa o sentimento do mercado. Valores mais baixos indicam medo extremo, o que geralmente representa boas oportunidades de compra."
          color="#0EA5E9"
        />
      </div>
    </div>
  );
};

export default BitcoinIndicators;
