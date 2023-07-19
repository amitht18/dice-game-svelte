<script lang="ts">
  import { state, update } from "./state/state";
  import Dice from "./components/Dice.svelte";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";

  $: allowBet = countdown > 0 && countdown < 10 ? true : false;
  $: countdown = 10;
  $: won = 0;
  $: lost = 0;
  $: showResult = false;
  $: showCalculating = false;
  $: diceWon = 1;

  $: {
    if (countdown === 0) {
      allowBet = false;
      showCalculating = true;
      setTimeout(() => {
        countdown = 10
        calculateBalanceAfterBet();
        displayResult();
      }, 2000);
    }
  }


  function calculateBalanceAfterBet() {
    let randomDicePick = Math.floor(Math.random() * 6);
    diceWon =  randomDicePick;
    let winVal = 0;
    let loseVal = 0;
    $state.dices.forEach((dice, index) => {
      if (randomDicePick === index) {
        winVal = 2 * dice.value;
        update($state).increaseBalance(winVal);
      } else {
        loseVal += dice.value;
      }
    });
    won = winVal;
    lost = loseVal;
  }

  function displayResult() {
    showCalculating = false;
    showResult = true;
    setTimeout(() => {
      showResult = false;
    }, 5000);
  }

  function startGame(): void {
    update($state).resetDices();
    allowBet = true;
    let timer: any;
    let count: number = 10;
    timer = setInterval(() => {
      if (count < 1) {
        clearInterval(timer);
      }
      if (count > 0) {
        count -= 1;
        countdown = count;
      }
    }, 1000);
  }

  function reBet(): void {
    allowBet = true;
    let timer: any;
    let count: number = 10;
    timer = setInterval(() => {
      if (count < 1) {
        clearInterval(timer);
      }
      if (count > 0) {
        count -= 1;
        countdown = count;
      }
    }, 1000);
  }

  function handleBet(diceNumber: number): void {
    if ($state.balance > 0) {
      update($state).increaseBet(1, diceNumber);
    }
  }
</script>

<main class="App">
  <Header store={$state} />
  <div class={`dice-container ${allowBet ? "allowed" : "not-allowed"}`}>
    {#each $state.dices as dice, index}
      <Dice {dice} {index} {handleBet} />
    {/each}
  </div>
  <div class="scores-container">
    <p>Click on start to place bet.</p>
    {#if showCalculating}
    <h6>Calculating...</h6>
    {/if}
    {#if showResult}
    <h3>
      {`Dice ${diceWon + 1} wins`}
      <span class="result-won">{`Result: Won ${won}`}</span>
      <span class="result-lost">{`Lost ${lost}`}</span>
    </h3>
    {/if}
  </div>
  <Footer {startGame} {reBet} balance={$state.balance} {allowBet} {countdown} />
</main>

<style lang="scss" global>
  @import "./styles.scss";
</style>
