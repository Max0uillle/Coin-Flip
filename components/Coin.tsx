import React from 'react';
import { CoinSide } from '../types';
import { COIN_IMAGES } from '../constants';

interface CoinProps {
  isFlipping: boolean;
  result: CoinSide;
}

const Coin: React.FC<CoinProps> = ({ isFlipping, result }) => {
  let dynamicClass = '';

  if (isFlipping) {
    // While flipping, apply the correct animation based on the final result
    dynamicClass = result === CoinSide.Heads ? 'animate-flip-heads' : 'animate-flip-tails';
  } else {
    // When not flipping, just show the static side.
    // The animation's 'forwards' fill mode will hold the final state,
    // but this class ensures the correct side is shown on initial load
    // and after the animation class is potentially removed.
    dynamicClass = result === CoinSide.Heads ? 'rotate-y-0' : 'rotate-y-180';
  }

  return (
    <div className="w-48 h-48 sm:w-64 sm:h-64 perspective-1000">
      <style>{`
        @keyframes flip-heads {
          from { transform: rotateY(0); }
          to { transform: rotateY(1800deg); } /* 5 spins, lands on heads */
        }
        @keyframes flip-tails {
          from { transform: rotateY(0); }
          to { transform: rotateY(1980deg); } /* 5.5 spins, lands on tails */
        }
        .animate-flip-heads {
          animation: flip-heads 2s ease-out forwards;
        }
        .animate-flip-tails {
          animation: flip-tails 2s ease-out forwards;
        }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-0 { transform: rotateY(0deg); }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
      <div className={`relative w-full h-full transform-style-3d ${dynamicClass}`}>
        {/* Heads side */}
        <div className="absolute w-full h-full backface-hidden">
          <img src={COIN_IMAGES.heads} alt="Heads" className="w-full h-full object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]" />
        </div>
        {/* Tails side */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <img src={COIN_IMAGES.tails} alt="Tails" className="w-full h-full object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]" />
        </div>
      </div>
    </div>
  );
};

export default Coin;