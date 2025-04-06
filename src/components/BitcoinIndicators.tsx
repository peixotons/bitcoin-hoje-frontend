
import React from 'react';
import IndicatorCard from './IndicatorCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface BitcoinIndicatorsProps {
  // Valores para os indicadores
  mayerMultiple: number;
  lowestMayer: number;
  highestMayer: number;
}

const BitcoinIndicators: React.FC<BitcoinIndicatorsProps> = ({
  mayerMultiple,
  lowestMayer,
  highestMayer
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Indicadores Técnicos</h2>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
        <IndicatorCard
          title="Multiplicador de Mayer"
          currentValue={mayerMultiple}
          lowestValue={lowestMayer}
          highestValue={highestMayer}
          description="O Multiplicador de Mayer é a razão entre o preço atual do Bitcoin e sua média móvel de 200 dias. Valores abaixo de 0.8 historicamente indicam boas oportunidades de compra."
          color="#9b87f5"
          valueLabels={{
            lowest: "Mínimo anual",
            highest: "Máximo anual"
          }}
        />
        
        <IndicatorCard
          title="Índice de Medo e Ganância"
          currentValue={25}
          lowestValue={10}
          highestValue={90}
          description="O Índice de Medo e Ganância analisa o sentimento do mercado. Valores mais baixos indicam medo extremo, o que geralmente representa boas oportunidades de compra."
          color="#0EA5E9"
          valueLabels={{
            lowest: "Mínimo anual",
            highest: "Máximo anual"
          }}
        />
      </div>
    </div>
  );
};

export default BitcoinIndicators;
