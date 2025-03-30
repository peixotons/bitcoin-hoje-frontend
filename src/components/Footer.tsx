
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Bitcoin Timing Helper
            </p>
          </div>
          <div className="text-sm text-gray-500">
            <p className="mb-1">
              Os dados apresentados são apenas para fins informativos.
            </p>
            <p>
              Não constitui aconselhamento financeiro profissional.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
