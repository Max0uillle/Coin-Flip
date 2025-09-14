
import React from 'react';

interface ChoiceButtonProps<T> {
    value: T;
    onSelect: (value: T) => void;
    isSelected: boolean;
    disabled: boolean;
    label: string;
    widthClass?: string;
}

const ChoiceButton = <T,>({ value, onSelect, isSelected, disabled, label, widthClass = "w-36 sm:w-40" }: ChoiceButtonProps<T>) => {
    const baseClasses = `relative h-24 sm:h-28 flex items-center justify-center text-xl sm:text-2xl font-bold rounded-lg border-4 transition-all duration-300 transform focus:outline-none font-['Cinzel'] tracking-widest ${widthClass}`;
    const selectedClasses = isSelected 
        ? "border-amber-400 bg-black bg-opacity-50 text-amber-300 scale-110 shadow-[inset_0_0_15px_rgba(251,191,36,0.5)]" 
        : "border-stone-700 bg-black bg-opacity-30 text-stone-400 hover:border-amber-600 hover:text-amber-200";
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105";

    return (
        <button
            onClick={() => onSelect(value)}
            disabled={disabled}
            className={`${baseClasses} ${selectedClasses} ${disabledClasses}`}
        >
            <span className="z-10">{label}</span>
        </button>
    );
};

export default ChoiceButton;
