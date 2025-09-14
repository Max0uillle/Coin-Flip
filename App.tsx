

import React, { useState, useCallback, useEffect } from 'react';
import { GameMode } from './types';
import Scoreboard from './components/Scoreboard';
import ThemeModal from './components/ThemeModal';
import CoinFlipGame from './components/CoinFlipGame';
import DiceRollGame from './components/DiceRollGame';
import { winSound, loseSound, playSound, recordSound } from './sounds';

const translations = {
  en: {
    title: 'COIN FLIP',
    diceRoll: 'DICE ROLL',
    wins: 'Wins',
    losses: 'Losses',
    winStreak: 'Streak',
    bestStreak: 'Best',
    heads: 'HEADS',
    tails: 'TAILS',
    odd: 'ODD',
    even: 'EVEN',
    flipCoin: 'FLIP COIN',
    rollDice: 'ROLL DICE',
    chooseSide: 'CHOOSE A SIDE TO BEGIN!',
    chooseOption: 'CHOOSE AN OPTION!',
    flipping: 'FLIPPING...',
    rolling: 'ROLLING...',
    winMessage: "IT'S {result}! YOU WIN!",
    loseMessage: "IT'S {result}. YOU LOSE.",
    chosen: "YOU'VE CHOSEN. FLIP THE COIN!",
    chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!",
    youRolled: "YOU ROLLED A {result}!",
    pressToRoll: "PRESS THE BUTTON TO ROLL!",
    switchToDice: 'Switch to Dice Roll',
    switchToCoin: 'Switch to Coin Flip',
    themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' },
    youRolledTotal: 'TOTAL: {total}',
    diceLabel: '# of Dice:',
  },
  fr: {
    title: 'PILE OU FACE',
    diceRoll: 'LANCER DE DÉ',
    wins: 'Victoires',
    losses: 'Défaites',
    winStreak: 'Série',
    bestStreak: 'Meilleure',
    heads: 'PILE',
    tails: 'FACE',
    odd: 'IMPAIR',
    even: 'PAIR',
    flipCoin: 'LANCER',
    rollDice: 'LANCER LE DÉ',
    chooseSide: 'CHOISISSEZ UN CÔTÉ !',
    chooseOption: 'CHOISISSEZ UNE OPTION !',
    flipping: 'LANCEMENT...',
    rolling: 'LANCEMENT...',
    winMessage: "C'EST {result} ! GAGNÉ !",
    loseMessage: "C'EST {result}. PERDU.",
    chosen: 'CHOISI. LANCEZ LA PIÈCE !',
    chosenDice: 'CHOISI. LANCEZ LE DÉ !',
    youRolled: "VOUS AVEZ FAIT UN {result} !",
    pressToRoll: "APPUYEZ POUR LANCER !",
    switchToDice: 'Passer au Lancer de Dé',
    switchToCoin: 'Passer à Pile ou Face',
    themeModal: { title: 'Personnaliser le fond', placeholder: "Collez l'URL de l'image/GIF ici...", save: 'Sauvegarder', cancel: 'Annuler', reset: 'Réinitialiser' },
    youRolledTotal: 'TOTAL : {total}',
    diceLabel: 'Nb de dés:',
  },
  ar: {
    title: 'ملك وكتابة',
    diceRoll: 'رمي النرد',
    wins: 'فوز',
    losses: 'خسارة',
    winStreak: 'سلسلة',
    bestStreak: 'أفضل سلسلة',
    heads: 'ملك',
    tails: 'كتابة',
    odd: 'فردي',
    even: 'زوجي',
    flipCoin: 'ارمِ العملة',
    rollDice: 'ارمِ النرد',
    chooseSide: 'اختر جانبًا للبدء!',
    chooseOption: 'اختر خيارًا!',
    flipping: '...يتم الرمي',
    rolling: '...يتم الرمي',
    winMessage: '!لقد فزت! النتيجة هي {result}',
    loseMessage: '.لقد خسرت. النتيجة هي {result}',
    chosen: '!اخترت. الآن، ارمِ العملة',
    chosenDice: '!اخترت. الآن، اrmِ النرد',
    youRolled: "!لقد حصلت على {result}",
    pressToRoll: "!اضغط على الزر للرمي",
    switchToDice: 'التبديل إلى رمي النرد',
    switchToCoin: 'التبديل إلى ملك وكتابة',
    themeModal: { title: 'تخصيص الخلفية', placeholder: '...الصق رابط الصورة/GIF هنا', save: 'حفظ', cancel: 'إلغاء', reset: 'إعادة تعيين' },
    youRolledTotal: 'المجموع: {total}',
    diceLabel: 'عدد النرد:',
  },
  ja: {
    title: 'コイントス',
    diceRoll: 'サイコロを振る',
    wins: '勝利',
    losses: '敗北',
    winStreak: '連勝',
    bestStreak: '最高連勝',
    heads: 'オモテ',
    tails: 'ウラ',
    odd: '奇数',
    even: '偶数',
    flipCoin: 'コインを投げる',
    rollDice: 'サイコロを振る',
    chooseSide: 'サイドを選んでください！',
    chooseOption: 'オプションを選んでください！',
    flipping: '反転中...',
    rolling: '回転中...',
    winMessage: "{result}です！あなたの勝ち！",
    loseMessage: "{result}です。あなたの負け。",
    chosen: '選択しました。コインを投げてください！',
    chosenDice: '選択しました。サイコロを振ってください！',
    youRolled: "{result}が出ました！",
    pressToRoll: "ボタンを押して振ってください！",
    switchToDice: 'サイコロ振りに切り替え',
    switchToCoin: 'コイントスに切り替え',
    themeModal: { title: '背景をカスタマイズ', placeholder: '画像/GIFのURLを貼り付け...', save: '保存', cancel: 'キャンセル', reset: 'リセット' },
    youRolledTotal: '合計: {total}',
    diceLabel: 'サイコロの数:',
  },
  de: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: 'Anzahl Würfel:' },
  es: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# de Dados:' },
  it: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  pt: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  ru: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  hi: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  zh: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  ko: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  nl: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  sv: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  tr: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  pl: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  id: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  vi: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  th: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  el: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  he: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  cs: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  hu: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU've CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
  da: { title: 'COIN FLIP', diceRoll: 'DICE ROLL', wins: 'Wins', losses: 'Losses', winStreak: 'Streak', bestStreak: 'Best', heads: 'HEADS', tails: 'TAILS', odd: 'ODD', even: 'EVEN', flipCoin: 'FLIP COIN', rollDice: 'ROLL DICE', chooseSide: 'CHOOSE A SIDE TO BEGIN!', chooseOption: 'CHOOSE AN OPTION!', flipping: 'FLIPPING...', rolling: 'ROLLING...', winMessage: "IT'S {result}! YOU WIN!", loseMessage: "IT'S {result}. YOU LOSE.", chosen: "YOU'VE CHOSEN. FLIP THE COIN!", chosenDice: "YOU'VE CHOSEN. ROLL THE DICE!", youRolled: "YOU ROLLED A {result}!", pressToRoll: "PRESS THE BUTTON TO ROLL!", switchToDice: 'Switch to Dice Roll', switchToCoin: 'Switch to Coin Flip', themeModal: { title: 'Customize Background', placeholder: 'Paste image/GIF URL here...', save: 'Save', cancel: 'Cancel', reset: 'Reset to Default' }, youRolledTotal: 'TOTAL: {total}', diceLabel: '# of Dice:' },
};


type Language = keyof typeof translations;

const languageFlags: { [key in Language]: string } = {
    en: '🇺🇸', fr: '🇫🇷', ar: '🇸🇦', ja: '🇯🇵', de: '🇩🇪', es: '🇪🇸', it: '🇮🇹', pt: '🇧🇷', ru: '🇷🇺', hi: '🇮🇳', zh: '🇨🇳', ko: '🇰🇷', nl: '🇳🇱', sv: '🇸🇪', tr: '🇹🇷', pl: '🇵🇱', id: '🇮🇩', vi: '🇻🇳', th: '🇹🇭', el: '🇬🇷', he: '🇮🇱', cs: '🇨🇿', hu: '🇭🇺', da: '🇩🇰',
};

const nativeLanguageNames: { [key in Language]: string } = {
    en: 'English', fr: 'Français', ar: 'العربية', ja: '日本語', de: 'Deutsch', es: 'Español', it: 'Italiano', pt: 'Português', ru: 'Русский', hi: 'हिन्दी', zh: '中文', ko: '한국어', nl: 'Nederlands', sv: 'Svenska', tr: 'Türkçe', pl: 'Polski', id: 'Bahasa Indonesia', vi: 'Tiếng Việt', th: 'ภาษาไทย', el: 'Ελληνικά', he: 'עברית', cs: 'Čeština', hu: 'Magyar', da: 'Dansk',
};

const GameTitle: React.FC<{ title: string }> = ({ title }) => (
    <h1 
        className="text-4xl sm:text-5xl md:text-6xl font-black tracking-widest text-yellow-300 font-['Cinzel'] drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]"
        style={{textShadow: '0 0 10px #fcd34d'}}
    >
      {title}
    </h1>
);

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('fr');
    const [wins, setWins] = useState<number>(0);
    const [losses, setLosses] = useState<number>(0);
    const [winStreak, setWinStreak] = useState<number>(0);
    const [bestStreak, setBestStreak] = useState<number>(0);
    const [isNewRecord, setIsNewRecord] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(() => JSON.parse(localStorage.getItem('isMuted') || 'false'));
    const [customBg, setCustomBg] = useState<string | null>(() => localStorage.getItem('customBackground'));
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const [gameMode, setGameMode] = useState<GameMode>(GameMode.Coin);

    useEffect(() => {
      const savedBest = localStorage.getItem('bestWinStreak');
      if (savedBest) setBestStreak(parseInt(savedBest, 10));
    }, []);

    const t = translations[language] || translations.en;

    const handleToggleMute = () => {
        setIsMuted(prev => {
            const newMutedState = !prev;
            localStorage.setItem('isMuted', JSON.stringify(newMutedState));
            return newMutedState;
        });
    };
    
    const playSoundIfEnabled = useCallback((sound: HTMLAudioElement) => {
        if (!isMuted) playSound(sound);
    }, [isMuted]);
    
    const handleSaveTheme = (newBgUrl: string) => {
        if (newBgUrl.trim() === '') {
            setCustomBg(null);
            localStorage.removeItem('customBackground');
        } else {
            setCustomBg(newBgUrl);
            localStorage.setItem('customBackground', newBgUrl);
        }
    };

    const handleGameResult = useCallback((won: boolean) => {
        if (won) {
            setWins(prev => prev + 1);
            setWinStreak(prev => {
                const newStreak = prev + 1;
                if (newStreak > bestStreak) {
                    setBestStreak(newStreak);
                    localStorage.setItem('bestWinStreak', newStreak.toString());
                    setIsNewRecord(true);
                    playSoundIfEnabled(recordSound);
                    setTimeout(() => setIsNewRecord(false), 1000);
                }
                return newStreak;
            });
            playSoundIfEnabled(winSound);
        } else {
            setLosses(prev => prev + 1);
            setWinStreak(0);
            playSoundIfEnabled(loseSound);
        }
    }, [bestStreak, playSoundIfEnabled]);

    const toggleGameMode = () => {
        setGameMode(prev => prev === GameMode.Coin ? GameMode.Dice : GameMode.Coin);
    };

    const isRtl = ['ar', 'he'].includes(language);
    const nonSerifLanguages = ['ja', 'hi', 'zh', 'ko', 'ru', 'th', 'el', 'he'];
    const fontClass = language === 'ar' ? 'font-serif' : nonSerifLanguages.includes(language) ? 'font-sans' : "font-['EB_Garamond']";
    
    return (
        <div 
            dir={isRtl ? 'rtl' : 'ltr'} 
            className={`min-h-screen flex flex-col items-center justify-center p-4 text-center ${fontClass} text-white overflow-hidden ${!customBg ? 'gringotts-bg' : ''}`}
            style={customBg ? { backgroundImage: `url(${customBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' } : {}}
        >
            <header className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button onClick={() => setIsThemeModalOpen(true)} className="bg-black bg-opacity-50 border-2 border-amber-800 rounded-md p-2 text-amber-200 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" aria-label="Change background theme">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                </button>
                <button onClick={toggleGameMode} className="bg-black bg-opacity-50 border-2 border-amber-800 rounded-md p-2 text-amber-200 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" aria-label={gameMode === GameMode.Coin ? t.switchToDice : t.switchToCoin}>
                    {gameMode === GameMode.Coin ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.38-1.02.38-1.41 0z" opacity=".3"/><path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm-3.12-8.12L10 15.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.38-1.02.38-1.41 0L5.7 14.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L9.29 13.88zM12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8z"/></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
                    )}
                </button>
                 <button onClick={handleToggleMute} className="bg-black bg-opacity-50 border-2 border-amber-800 rounded-md p-2 text-amber-200 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors" aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}>
                    {isMuted ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.108 12 5v14c0 .892-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l-4-4m0 4l4-4" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.108 12 5v14c0 .892-1.077 1.337-1.707.707L5.586 15z" /></svg>}
                </button>
                <select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="bg-black bg-opacity-50 border-2 border-amber-800 rounded-md py-1 px-2 text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-['Cinzel'] tracking-wider cursor-pointer appearance-none" aria-label="Select language" style={{ backgroundSize: '1.5rem', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='%23fcd34d'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E")`}}>
                    {(Object.keys(translations) as Language[]).map((lang) => (<option key={lang} value={lang} className="bg-stone-900 text-white font-sans">{languageFlags[lang]} {nativeLanguageNames[lang]}</option>))}
                </select>
            </header>

            <main className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-4 sm:space-y-6">
                <GameTitle title={gameMode === GameMode.Coin ? t.title : t.diceRoll} />
                
                {gameMode === GameMode.Coin && (
                    <Scoreboard wins={wins} losses={losses} winStreak={winStreak} bestStreak={bestStreak} isNewRecord={isNewRecord} winsLabel={t.wins} lossesLabel={t.losses} winStreakLabel={t.winStreak} bestStreakLabel={t.bestStreak} />
                )}
                
                {gameMode === GameMode.Coin ? (
                    <CoinFlipGame t={t} playSoundIfEnabled={playSoundIfEnabled} onGameEnd={handleGameResult} />
                ) : (
                    <DiceRollGame t={t} playSoundIfEnabled={playSoundIfEnabled} />
                )}

            </main>
            
            <ThemeModal isOpen={isThemeModalOpen} onClose={() => setIsThemeModalOpen(false)} onSave={handleSaveTheme} currentUrl={customBg || ''} texts={t.themeModal} />
        </div>
    );
};

export default App;