export interface Dice {
    label: string;
    value: number;
}

export interface GameState {
    numberOfDices: number;
    dices: Dice[];
    balance: number;
    countdown: number;
    allowBet: boolean;
    increaseBalance: (by: number) => void;
    decreaseBalance: (by: number) => void;
}

export type ACTIONS =
    'INCREASE_BET' | 'DECREASE_BALANCE' | 'RESET_GAME' | 'RESET_DICES';

export const initialState: GameState = {
    numberOfDices: 6,
    dices: new Array(6).fill({}).map((item, index) => {
        return { label: `Dice ${index + 1}`, value: 0 };
    }),
    balance: 100,
    countdown: 10,
    allowBet: false,
    increaseBalance: (by: number) => {},
    decreaseBalance: (by: number) => {},
}

