<script lang="ts">
  import type { Dice } from "../state/types";
  export let dice: Dice = null;
  export let handleBet = (index: number) => {};
  export let index: number = null;
</script>

<div class="dice" on:click={() => handleBet(index)} id={dice?.label} on:keydown={() => handleBet(index)}>
  <p class="dice-label">{dice?.label}</p>
  <p class="dice-value">$:{dice?.value}</p>
</div>

<style>
</style>
