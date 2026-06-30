<script>
  import { analysis } from "./modules/text-analysis.svelte"
  import { validation } from "./modules/validation.svelte"
</script>

<label class="form-control">
  <input
    class="checkbox"
    type="checkbox"
    name="exclude-spaces"
    bind:checked={analysis.excludeSpaces}
  />
  Exclude Spaces
</label>

<label class="form-control">
  <input
    class="checkbox"
    type="checkbox"
    name="character-limit-checkbox"
    bind:checked={validation.characterLimitEnabled}
  />
  Set Character Limit
</label>

{#if validation.characterLimitEnabled}
  <input
    type="number"
    name="character-limit-input"
    aria-label="Enter a character limit"
    inputmode="numeric"
    autocomplete="off"
    min="0"
    bind:value={validation.characterLimitValue}
  />
{/if}

<span class="reading-time"> Approx. reading time: {analysis.readingTime()}</span>
