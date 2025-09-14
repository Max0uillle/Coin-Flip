

import React from 'react';
import { DICE_IMAGES } from '../constants';

interface DiceProps {
  isRolling: boolean;
  result: number;
  size?: number;
}

const Dice: React.FC<DiceProps> = ({ isRolling, result, size = 100 }) => {
  const halfSize = size / 2;

  // Positions for each face of the cube
  const faceStyles: React.CSSProperties[] = [
    { transform: `rotateY(0deg) translateZ(${halfSize}px)` },   // Front: Face 1
    { transform: `rotateY(90deg) translateZ(${halfSize}px)` },  // Right: Face 2
    { transform: `rotateX(-90deg) translateZ(${halfSize}px)` }, // Top: Face 3
    { transform: `rotateX(90deg) translateZ(${halfSize}px)` },  // Bottom: Face 4
    { transform: `rotateY(-90deg) translateZ(${halfSize}px)` }, // Left: Face 5
    { transform: `rotateY(180deg) translateZ(${halfSize}px)` }, // Back: Face 6
  ];

  // Target rotations to show a specific face as the result
  const resultToRotation: { [key: number]: React.CSSProperties } = {
    1: { transform: `translateZ(-${halfSize}px) rotateY(0deg)` },
    2: { transform: `translateZ(-${halfSize}px) rotateY(-90deg)` },
    3: { transform: `translateZ(-${halfSize}px) rotateX(90deg)` },
    4: { transform: `translateZ(-${halfSize}px) rotateX(-90deg)` },
    5: { transform: `translateZ(-${halfSize}px) rotateY(90deg)` },
    6: { transform: `translateZ(-${halfSize}px) rotateY(-180deg)` },
  };

  const faces = [
    DICE_IMAGES[1],
    DICE_IMAGES[2],
    DICE_IMAGES[3],
    DICE_IMAGES[4],
    DICE_IMAGES[5],
    DICE_IMAGES[6],
  ];

  return (
    <div className="flex items-center justify-center perspective-1000" style={{ width: size, height: size }}>
      <style>{`
        @keyframes roll {
          from { transform: translateZ(-${halfSize}px) rotateX(0) rotateY(0); }
          to { transform: translateZ(-${halfSize}px) rotateX(1440deg) rotateY(1080deg); }
        }
        .animate-roll { animation: roll 2s ease-out forwards; }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
      <div 
        className={`relative transform-style-3d ${isRolling ? 'animate-roll' : ''}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          ...(!isRolling ? resultToRotation[result] : {})
        }}
      >
        {faces.map((src, i) => (
          <div
            key={i}
            className="absolute"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                ...faceStyles[i]
            }}
          >
            <img src={src} alt={`Dice face ${i + 1}`} className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dice;