
import React from 'react';
import { Bitcoin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const BitcoinHeader: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="w-full p-4 bg-gradient-to-r from-bitcoin to-bitcoin-dark text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded-full p-1.5">
            <Bitcoin size={isMobile ? 20 : 24} className="text-bitcoin" />
          </div>
          <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold`}>Bitcoin Timing Helper</h1>
        </div>
      </div>
    </header>
  );
};

export default BitcoinHeader;
