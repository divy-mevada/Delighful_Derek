import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number;
  unit?: string;
  trend?: 'up' | 'down';
  color?: 'green' | 'yellow' | 'red' | 'blue';
  icon?: React.ReactNode;
  kpiType?: string;
  onClick?: () => void;
}

const colorClasses = {
  green: 'border-green-200 bg-green-50',
  yellow: 'border-yellow-200 bg-yellow-50',
  red: 'border-red-200 bg-red-50',
  blue: 'border-blue-200 bg-blue-50'
};

const valueColors = {
  green: 'text-green-600',
  yellow: 'text-yellow-600',
  red: 'text-red-600',
  blue: 'text-blue-600'
};

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit = '',
  trend,
  color = 'blue',
  icon,
  kpiType,
  onClick
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (kpiType) {
      navigate(`/kpi-details/${kpiType}`);
    }
  };

  return (
    <div 
      className={`card border-2 ${colorClasses[color]} ${(kpiType || onClick) ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      
      <div className="flex items-center justify-between">
        <div className={`text-2xl font-bold ${valueColors[color]}`}>
          {value}{unit}
        </div>
        
        {trend && (
          <div className={`flex items-center ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
            {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          </div>
        )}
      </div>
    </div>
  );
};