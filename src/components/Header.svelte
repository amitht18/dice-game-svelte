<script>
  import { update } from "../state/state";
    export let store;
    function resetGame() {
        update(store).resetGame();
    }
</script>

<div class="header">
  <h3 class="logo">Dice It!</h3>
  <button on:click={resetGame}>Reset Game</button>
</div>

<style>
</style>
