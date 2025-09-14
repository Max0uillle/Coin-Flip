import { CoinSide } from './types';

export const COIN_IMAGES: { [key in CoinSide]: string } = {
  [CoinSide.Heads]: 'https://i.imgur.com/rncYeTy.png', // Classic Emperor coin for Heads ("Pile")
  [CoinSide.Tails]: 'https://i.imgur.com/f9SFSQI.png', // Imperial Eagle for Tails ("Face")
};

export const DICE_IMAGES: { [key: number]: string } = {
  1: 'https://i.imgur.com/hZBujEv.png',
  2: 'https://i.imgur.com/TTre8mB.png',
  3: 'https://i.imgur.com/HPTGYsA.png',
  4: 'https://i.imgur.com/oBHymkg.png',
  5: 'https://i.imgur.com/mCYbqRg.png',
  6: 'https://i.imgur.com/oCz9NZ1.png',
};
