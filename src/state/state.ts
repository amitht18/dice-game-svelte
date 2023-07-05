import { writable } from "svelte/store";
import { GameState, initialState } from "./types";

export const state = writable<GameState>(initialState);

export const update = (prevState: GameState) => {
    function increaseBet(by: number, at: number) {
        let newState = {
            ...prevState,
            balance: prevState.balance - 1,
            dices: prevState.dices.map((dice, index) => {
                if (at === index) {
                    return { ...dice, value: dice.value + by };
                }
                return dice;
            })
        };
        updateAndLog(prevState, newState);
    }

    function decreaseBalance(by: number) {
        let newState = {
            ...prevState,
            balance: prevState.balance - by
        };
        updateAndLog(prevState, newState);
    }

    function increaseBalance(by: number) {
        let newState = {
            ...prevState,
            balance: prevState.balance + by
        };
        updateAndLog(prevState, newState);
    }

    function resetGame() {
        let newState = {
            ...prevState,
            numberOfDices: 6,
            dices: new Array(6).fill({}).map((item, index) => {
                return { label: `Dice ${index + 1}`, value: 0 };
            }),
            balance: 100
        };
        updateAndLog(prevState, newState);
    }

    function resetDices() {
        let newState = {
            ...prevState,
            dices: new Array(6).fill({}).map((item, index) => {
                return { label: `Dice ${index + 1}`, value: 0 };
            })
        };
        updateAndLog(prevState, newState);
    }

    function updateAndLog(prevState: GameState, newState: GameState) {
        console.log({ prev: prevState, next: newState })
        state.update(() => newState);
    }

    return {
        increaseBet,
        decreaseBalance,
        increaseBalance,
        resetGame,
        resetDices
    }
}
