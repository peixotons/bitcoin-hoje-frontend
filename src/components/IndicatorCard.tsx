
import React from 'react';
import { ArrowUp, ArrowDown, HelpCircle } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IndicatorCardProps {
  title: string;
  currentValue: number;
  lowestValue?: number;
  highestValue?: number;
  goodDirection: 'up' | 'down';
  description: string;
  color: string;
}

const IndicatorCard: React.FC<IndicatorCardProps> = ({
  title,
  currentValue,
  lowestValue,
  highestValue,
  goodDirection,
  description,
  color
}) => {
  const isPositive = (goodDirection === 'up' && currentValue > 1.0) || 
                     (goodDirection === 'down' && currentValue < 40);

  return (
    <Card className={`border-l-4 overflow-hidden`} style={{ borderLeftColor: color }}>
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium flex items-center">
            {title}
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="ml-1">
                  <HelpCircle className="h-3 w-3 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {description}
              </TooltipContent>
            </Tooltip>
          </CardTitle>
          {goodDirection === 'up' ? 
            <ArrowUp className={`h-4 w-4 ${isPositive ? 'text-green-500' : 'text-red-500'}`} /> : 
            <ArrowDown className={`h-4 w-4 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
          }
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-3 px-4">
        <div className="text-2xl font-bold mb-1">
          {currentValue.toFixed(2)}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          {lowestValue !== undefined && (
            <span>Mínimo: {lowestValue.toFixed(2)}</span>
          )}
          {highestValue !== undefined && (
            <span>Máximo: {highestValue.toFixed(2)}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IndicatorCard;
