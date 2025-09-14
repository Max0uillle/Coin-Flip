

import React, { useState, useCallback, useEffect } from 'react';
import Dice from './Dice';
import { diceSound } from '../sounds';

type GameStatus = 'idle' | 'rolling' | 'result';

interface DiceRollGameProps {
  t: any; // translation object
  playSoundIfEnabled: (sound: HTMLAudioElement) => void;
}

const DiceRollGame: React.FC<DiceRollGameProps> = ({ t, playSoundIfEnabled }) => {
    const [results, setResults] = useState<number[]>([1]);
    const [numberOfDice, setNumberOfDice] = useState<number>(1);
    const [diceInput, setDiceInput] = useState<string>('1');
    const [isRolling, setIsRolling] = useState<boolean>(false);
    const [status, setStatus] = useState<GameStatus>('idle');
    const [total, setTotal] = useState<number | null>(null);

    useEffect(() => {
        setDiceInput(String(numberOfDice));
    }, [numberOfDice]);

    const handleRoll = useCallback(() => {
        if (isRolling) return;

        let num = parseInt(diceInput, 10);
        if (isNaN(num) || num < 1) num = 1;
        if (num > 36) num = 36;
        
        setNumberOfDice(num);

        setStatus('rolling');
        playSoundIfEnabled(diceSound);
        
        const newResults = Array.from({ length: num }, () => Math.floor(Math.random() * 6) + 1);
        const newTotal = newResults.reduce((sum, val) => sum + val, 0);

        setResults(newResults);
        setTotal(newTotal);
        setIsRolling(true);

        setTimeout(() => {
            setStatus('result');
            setIsRolling(false);
            setTimeout(() => setStatus('idle'), 3000);
        }, 2000); 
    }, [isRolling, playSoundIfEnabled, diceInput]);

    const getMessage = () => {
        switch (status) {
            case 'rolling': return t.rolling;
            case 'result': return t.youRolledTotal.replace('{total}', total);
            case 'idle': default: return t.pressToRoll;
        }
    };
    
    const getMessageColor = () => {
        switch (status) {
            case 'rolling': return 'text-amber-300';
            case 'result': return 'text-yellow-300';
            default: return 'text-stone-300';
        }
    };

    const handleDiceInputChange = (value: string) => {
        if (!isRolling) {
            setDiceInput(value);
        }
    };

    const handleDiceInputBlur = () => {
        let num = parseInt(diceInput, 10);
        
        if (isNaN(num) || num < 1) {
            num = 1;
        } else if (num > 36) {
            num = 36;
        }
        
        setNumberOfDice(num);
        setResults(Array(num).fill(1));
        setStatus('idle');
        setTotal(null);
    };

    const getDiceSize = (count: number): number => {
        if (count <= 1) return 100;
        if (count <= 4) return 80;
        if (count <= 9) return 60;
        if (count <= 16) return 45;
        if (count <= 25) return 35;
        return 30; // for 26-36
    };
    
    const diceSize = getDiceSize(numberOfDice);

    return (
        <>
            <div className="my-4 w-full flex justify-center items-center">
                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 max-w-lg">
                    {results.map((r, i) => (
                        <Dice key={i} result={r} isRolling={isRolling} size={diceSize} />
                    ))}
                </div>
            </div>
            
            <div className="h-12 flex items-center justify-center">
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-wider transition-all duration-500 drop-shadow-lg ${getMessageColor()}`}>
                    {getMessage()}
                </p>
            </div>

            <div className="h-auto min-h-[2rem] flex items-center justify-center text-stone-400 text-lg font-['Cinzel'] font-bold tracking-widest px-4 text-center break-words" aria-live="polite">
                {status === 'result' && `( ${results.join(' + ')} )`}
            </div>

            <div className="flex justify-center items-center gap-2 my-4">
                <label htmlFor="dice-input" className="font-bold text-stone-300 mr-2 rtl:mr-0 rtl:ml-2 font-['Cinzel'] tracking-wider">{t.diceLabel}</label>
                <input
                    id="dice-input"
                    type="number"
                    value={diceInput}
                    onChange={(e) => handleDiceInputChange(e.target.value)}
                    onBlur={handleDiceInputBlur}
                    onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                    disabled={isRolling}
                    className="w-20 h-10 sm:w-24 sm:h-12 rounded-md border-2 bg-black bg-opacity-30 border-stone-600 text-white text-center font-bold text-xl focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
                />
            </div>

            <button
                onClick={handleRoll}
                disabled={isRolling}
                className={`w-full max-w-md mx-auto px-8 py-4 text-2xl sm:px-10 sm:py-5 sm:text-3xl font-['Cinzel'] font-black tracking-widest rounded-lg shadow-xl transition-all duration-300 transform focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border-4 
                ${isRolling 
                    ? 'bg-stone-800 border-stone-700 text-stone-500' 
                    : "bg-gradient-to-t from-yellow-600 via-amber-700 to-yellow-800 border-yellow-950 text-black hover:brightness-110 animate-pulse-gold"
                }`}
            >
                {isRolling ? '...' : t.rollDice}
            </button>
        </>
    );
};

export default DiceRollGame;