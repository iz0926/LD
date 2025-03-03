import React, { useRef, useState, useEffect } from 'react';
import type { Profile } from '../App';

interface Drawing {
  id: number;
  imageData: string;
  timestamp: Date;
  sender: Profile;
}

interface DrawingCanvasProps {
  currentProfile: Profile | null;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ currentProfile }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [drawings, setDrawings] = useState<Drawing[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set initial styles
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    setIsDrawing(true);
    context.beginPath();
    context.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    if (!currentProfile) {
      alert('Please select your profile first!');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Save the drawing
    const imageData = canvas.toDataURL('image/png');
    const newDrawing: Drawing = {
      id: Date.now(),
      imageData,
      timestamp: new Date(),
      sender: currentProfile,
    };

    setDrawings([newDrawing, ...drawings]);
    clearCanvas();
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 items-center">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-8 w-8"
        />
        <input
          type="range"
          min="1"
          max="20"
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          className="w-32"
        />
        <button
          onClick={clearCanvas}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Clear
        </button>
        <button
          onClick={saveDrawing}
          disabled={!currentProfile}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Save Drawing
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        className="border rounded-lg w-full h-[400px] bg-white touch-none"
      />
      <div className="space-y-4">
        {drawings.map((drawing) => (
          <div key={drawing.id} className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-medium" style={{ color: drawing.sender.color }}>
                {drawing.sender.name}
              </span>
            </div>
            <img 
              src={drawing.imageData} 
              alt={`Drawing by ${drawing.sender.name}`}
              className="w-full rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2">
              {drawing.timestamp.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrawingCanvas;