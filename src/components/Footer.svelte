<script lang="ts">
  export let startGame = () => {};
  export let reBet = () => {};
  export let countdown = 0;
  export let balance = 0;
  export let allowBet = false;
</script>

<div class="footer">
  <div class="game-actions">
    <span>Timer: {countdown}</span>
    <button
      class={"primary game"}
      disabled={allowBet}
      on:click={() => startGame()}
    >
      Start
    </button>
    <button class={"game"} disabled={allowBet} on:click={() => reBet()}>
      Re-Bet
    </button>
    <h4>Balance: {balance}</h4>
  </div>
</div>

<style>
</style>
