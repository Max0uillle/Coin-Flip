
import React, { useState, useCallback } from 'react';
import { CoinSide } from '../types';
import Coin from './Coin';
import ChoiceButton from './ChoiceButton';
import { flipSound } from '../sounds';

type GameStatus = 'idle' | 'chosen' | 'flipping' | 'win' | 'loss';

interface CoinFlipGameProps {
  t: any; // translation object
  playSoundIfEnabled: (sound: HTMLAudioElement) => void;
  onGameEnd: (won: boolean) => void;
}

const CoinFlipGame: React.FC<CoinFlipGameProps> = ({ t, playSoundIfEnabled, onGameEnd }) => {
    const [playerChoice, setPlayerChoice] = useState<CoinSide | null>(null);
    const [result, setResult] = useState<CoinSide>(CoinSide.Heads);
    const [isFlipping, setIsFlipping] = useState<boolean>(false);
    const [status, setStatus] = useState<GameStatus>('idle');

    const handleFlip = useCallback(() => {
        if (!playerChoice || isFlipping) return;

        setStatus('flipping');
        playSoundIfEnabled(flipSound);
        const flipResult = Math.random() < 0.5 ? CoinSide.Heads : CoinSide.Tails;
        
        setResult(flipResult);
        setIsFlipping(true);

        setTimeout(() => {
            const won = playerChoice === flipResult;
            onGameEnd(won);
            setStatus(won ? 'win' : 'loss');
            
            setIsFlipping(false);
            setPlayerChoice(null);
            setTimeout(() => setStatus('idle'), 2000);
        }, 2000);
    }, [playerChoice, isFlipping, onGameEnd, playSoundIfEnabled]);

    const handleSelect = (side: CoinSide) => {
        if (!isFlipping && status !== 'win' && status !== 'loss') {
            setPlayerChoice(side);
            setStatus('chosen');
        }
    };
    
    const getMessage = () => {
        const resultSideName = result === CoinSide.Heads ? t.heads : t.tails;
        switch (status) {
            case 'flipping': return t.flipping;
            case 'win': return t.winMessage.replace('{result}', resultSideName);
            case 'loss': return t.loseMessage.replace('{result}', resultSideName);
            case 'chosen': return t.chosen;
            case 'idle': default: return t.chooseSide;
        }
    };
    
    const getMessageColor = () => {
        switch (status) {
            case 'win': return 'text-yellow-300';
            case 'loss': return 'text-red-500';
            case 'flipping': return 'text-amber-300';
            default: return 'text-stone-300';
        }
    };

    return (
        <>
            <div className="my-4 h-48 sm:h-64 flex justify-center items-center">
                <Coin result={result} isFlipping={isFlipping} />
            </div>
            
            <div className="h-12 flex items-center justify-center">
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-wider transition-all duration-500 drop-shadow-lg ${getMessageColor()}`}>
                    {getMessage()}
                </p>
            </div>

            <div className="flex justify-center items-center space-x-4 sm:space-x-6 my-4 rtl:space-x-reverse">
                <ChoiceButton 
                    value={CoinSide.Heads} 
                    onSelect={handleSelect}
                    isSelected={playerChoice === CoinSide.Heads}
                    disabled={isFlipping || status === 'win' || status === 'loss'}
                    label={t.heads}
                />
                <ChoiceButton 
                    value={CoinSide.Tails} 
                    onSelect={handleSelect}
                    isSelected={playerChoice === CoinSide.Tails}
                    disabled={isFlipping || status === 'win' || status === 'loss'}
                    label={t.tails}
                />
            </div>

            <button
                onClick={handleFlip}
                disabled={!playerChoice || isFlipping}
                className={`w-full max-w-md mx-auto px-8 py-4 text-2xl sm:px-10 sm:py-5 sm:text-3xl font-['Cinzel'] font-black tracking-widest rounded-lg shadow-xl transition-all duration-300 transform focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border-4 
                ${!playerChoice || isFlipping 
                    ? 'bg-stone-800 border-stone-700 text-stone-500' 
                    : "bg-gradient-to-t from-yellow-600 via-amber-700 to-yellow-800 border-yellow-950 text-black hover:brightness-110 animate-pulse-gold"
                }`}
            >
                {isFlipping ? '...' : t.flipCoin}
            </button>
        </>
    );
};

export default CoinFlipGame;
