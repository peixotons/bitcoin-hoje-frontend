
import React from 'react';
import BitcoinHeader from '@/components/BitcoinHeader';
import BitcoinChart from '@/components/BitcoinChart';
import BitcoinAdvice from '@/components/BitcoinAdvice';
import BitcoinIndicators from '@/components/BitcoinIndicators';
import Footer from '@/components/Footer';
import { useBitcoinIndicators } from '@/services/bitcoinService';

const Index: React.FC = () => {
  const { data: indicators, isLoading: indicatorsLoading } = useBitcoinIndicators();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-bitcoin-background">
      <BitcoinHeader />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 mt-8">
            É uma boa hora para comprar Bitcoin?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubra agora se este é o momento ideal para investir na maior criptomoeda do mundo.
          </p>
        </section>
        
        <section className="mb-8">
          {!indicatorsLoading && (
            <BitcoinIndicators 
              mayerMultiple={indicators.mayerMultiple}
              lowestMayer={indicators.lowestMayer}
              highestMayer={indicators.highestMayer}
            />
          )}
        </section>
        
        <section className="mb-10">
          <BitcoinAdvice />
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Histórico de Preços</h2>
          <BitcoinChart />
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4">Por que você deve confiar neste site?</h2>
          <p className="mb-3">
            Utilizamos algoritmos avançados que analisam diversos indicadores técnicos para determinar 
            o melhor momento para comprar Bitcoin:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Multiplicador de Mayer para identificar momentos históricos de compra</li>
            <li>Índice de Medo e Ganância para entender o sentimento do mercado</li>
            <li>Médias móveis (SMA de 50, 100 e 200 dias) para identificar tendências</li>
          </ul>
          <p>
            Nossa análise é atualizada constantemente para refletir as condições mais recentes do mercado.
          </p>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
