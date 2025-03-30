
import React from 'react';
import { Bitcoin } from 'lucide-react';

const BitcoinHeader: React.FC = () => {
  return (
    <header className="w-full p-4 bg-bitcoin text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bitcoin size={24} className="text-white" />
          <h1 className="text-xl font-bold">Bitcoin Timing Helper</h1>
        </div>
        <div className="text-sm flex items-center">
          <span>Powered by Alpha Vantage API</span>
        </div>
      </div>
    </header>
  );
};

export default BitcoinHeader;
