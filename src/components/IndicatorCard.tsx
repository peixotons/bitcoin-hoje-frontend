
import React from 'react';
import { HelpCircle } from 'lucide-react';
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
  description: string;
  color: string;
  valueLabels?: {
    lowest?: string;
    highest?: string;
  };
}

const IndicatorCard: React.FC<IndicatorCardProps> = ({
  title,
  currentValue,
  lowestValue,
  highestValue,
  description,
  color,
  valueLabels = { lowest: "Mínimo", highest: "Máximo" }
}) => {
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
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-3 px-4">
        <div className="text-2xl font-bold mb-1">
          {currentValue.toFixed(2)}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          {lowestValue !== undefined && (
            <span>{valueLabels.lowest}: {lowestValue.toFixed(2)}</span>
          )}
          {highestValue !== undefined && (
            <span>{valueLabels.highest}: {highestValue.toFixed(2)}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IndicatorCard;
