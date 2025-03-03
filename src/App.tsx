import React, { useState, useEffect } from 'react';
import { Heart, Flower2, MessageSquareMore, PenTool, Droplets, UserCircle2 } from 'lucide-react';
import DrawingCanvas from './components/DrawingCanvas';
import Notes from './components/Notes';
import Plant from './components/Plant';
import ProfileSelector from './components/ProfileSelector';

export interface Profile {
  id: string;
  name: string;
  color: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('plant');
  const [plantProgress, setPlantProgress] = useState(0);
  const [lastWatered, setLastWatered] = useState<Date | null>(null);
  const [lastWateredBy, setLastWateredBy] = useState<Profile | null>(null);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [profiles] = useState<Profile[]>([
    { id: '1', name: 'Partner 1', color: '#FF69B4' },
    { id: '2', name: 'Partner 2', color: '#4169E1' }
  ]);

  const waterPlant = () => {
    if (!currentProfile) {
      alert('Please select your profile first!');
      return;
    }

    if (lastWatered) {
      const hoursSinceLastWatered = (new Date().getTime() - lastWatered.getTime()) / (1000 * 60 * 60);
      if (hoursSinceLastWatered < 4) {
        alert('Please wait a bit before watering again! Plants need time between watering.');
        return;
      }
    }
    
    setLastWatered(new Date());
    setLastWateredBy(currentProfile);
    setPlantProgress(prev => Math.min(prev + 10, 100));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setPlantProgress(prev => Math.max(prev - 0.1, 0));
    }, 3600000); // Decrease every hour

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <h1 className="text-2xl font-semibold text-gray-900">Together Growth</h1>
            </div>
            <ProfileSelector
              profiles={profiles}
              currentProfile={currentProfile}
              onSelectProfile={setCurrentProfile}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('plant')}
              className={`flex-1 py-4 px-6 text-center ${
                activeTab === 'plant'
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Flower2 className="h-5 w-5 mx-auto mb-1" />
              Our Plant
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-4 px-6 text-center ${
                activeTab === 'notes'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <MessageSquareMore className="h-5 w-5 mx-auto mb-1" />
              Notes
            </button>
            <button
              onClick={() => setActiveTab('drawing')}
              className={`flex-1 py-4 px-6 text-center ${
                activeTab === 'drawing'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <PenTool className="h-5 w-5 mx-auto mb-1" />
              Draw
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'plant' && (
              <div className="text-center">
                <Plant progress={plantProgress} />
                <div className="mt-6">
                  <button
                    onClick={waterPlant}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Droplets className="h-5 w-5 mr-2" />
                    Water Plant Together
                  </button>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${plantProgress}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Plant Growth: {plantProgress.toFixed(1)}%</p>
                  {lastWatered && lastWateredBy && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center space-x-2">
                        <UserCircle2 
                          className="h-5 w-5"
                          style={{ color: lastWateredBy.color }}
                        />
                        <span className="font-medium" style={{ color: lastWateredBy.color }}>
                          {lastWateredBy.name}
                        </span>
                        <span className="text-gray-600">
                          last watered the plant {lastWatered.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'notes' && <Notes currentProfile={currentProfile} />}
            {activeTab === 'drawing' && <DrawingCanvas currentProfile={currentProfile} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;