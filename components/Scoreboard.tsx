import React, { useState, useEffect, useRef } from 'react';

interface ScoreboardProps {
  wins: number;
  losses: number;
  winStreak: number;
  bestStreak: number;
  isNewRecord: boolean;
  winsLabel: string;
  lossesLabel: string;
  winStreakLabel: string;
  bestStreakLabel: string;
}

const ScorePod: React.FC<{ label: string; value: React.ReactNode; icon: React.ReactNode; colorClasses: string; valueClassName?: string, podClassName?: string }> = ({ label, value, icon, colorClasses, valueClassName, podClassName }) => (
  <div className={`flex-1 flex flex-col items-center justify-center bg-black bg-opacity-60 p-2 sm:p-3 rounded-lg border-y-2 backdrop-blur-sm transition-all duration-300 ${colorClasses} ${podClassName || ''}`}>
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
        {icon}
        <span className="text-xs sm:text-base font-bold uppercase tracking-widest">{label}</span>
    </div>
    <span className={`text-2xl sm:text-4xl font-black text-white ${valueClassName || ''}`}>{value}</span>
  </div>
);

const Scoreboard: React.FC<ScoreboardProps> = ({ wins, losses, winStreak, bestStreak, isNewRecord, winsLabel, lossesLabel, winStreakLabel, bestStreakLabel }) => {
  const [animateStreak, setAnimateStreak] = useState(false);
  const prevWinStreakRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (prevWinStreakRef.current !== undefined && winStreak > prevWinStreakRef.current) {
      setAnimateStreak(true);
      const timer = setTimeout(() => setAnimateStreak(false), 500); // Animation duration
      return () => clearTimeout(timer);
    }
    prevWinStreakRef.current = winStreak;
  }, [winStreak]);

  return (
    <div className="flex justify-center items-stretch gap-1.5 sm:gap-2 w-full max-w-3xl">
      <ScorePod 
        label={winsLabel} 
        value={wins} 
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"></path></svg>}
        colorClasses="border-yellow-500 text-yellow-300"
      />
      <ScorePod 
        label={winStreakLabel} 
        value={<>{winStreak} 🔥</>}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>}
        colorClasses="border-amber-500 text-amber-300"
        valueClassName={animateStreak ? 'animate-score-increase' : ''}
      />
       <ScorePod 
        label={bestStreakLabel} 
        value={<>{bestStreak} 🏆</>}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>}
        colorClasses="border-amber-300 text-amber-100"
        podClassName={isNewRecord ? 'animate-new-record' : ''}
      />
      <ScorePod 
        label={lossesLabel} 
        value={losses} 
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
        colorClasses="border-red-800 text-red-500"
      />
    </div>
  );
};

export default Scoreboard;