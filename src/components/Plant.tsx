import React from 'react';
import { Flower2 } from 'lucide-react';

interface PlantProps {
  progress: number;
}

const Plant: React.FC<PlantProps> = ({ progress }) => {
  const getPlantSize = () => {
    if (progress < 25) return 'h-16 w-16';
    if (progress < 50) return 'h-24 w-24';
    if (progress < 75) return 'h-32 w-32';
    return 'h-40 w-40';
  };

  const getPlantColor = () => {
    if (progress < 25) return 'text-green-300';
    if (progress < 50) return 'text-green-400';
    if (progress < 75) return 'text-green-500';
    return 'text-green-600';
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`transition-all duration-1000 ${getPlantSize()}`}>
        <Flower2 className={`w-full h-full ${getPlantColor()}`} />
      </div>
      <p className="mt-4 text-gray-600">
        {progress < 25 && 'Just a tiny sprout! Keep watering!'}
        {progress >= 25 && progress < 50 && 'Growing steadily with your love!'}
        {progress >= 50 && progress < 75 && "Look how much we've grown together!"}
        {progress >= 75 && 'Our love is in full bloom! ❤️'}
      </p>
    </div>
  );
};

export default Plant;