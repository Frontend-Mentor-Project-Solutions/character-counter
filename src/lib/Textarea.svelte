<script>
  import ErrorIcon from "./Icons/ErrorIcon.svelte"
  import { analysis } from "./modules/text-analysis.svelte"
  import { validation } from "./modules/validation.svelte"
</script>

<div class="textarea-wrapper">
  <textarea
    bind:value={analysis.text}
    class:invalid={validation.isInvalid}
    aria-label="Enter text to count characters, words, and sentences"
    placeholder="Start typing here... (or past your text)"
  ></textarea>

  {#if validation.isInvalid}
    <span class="error-message">
      <ErrorIcon />
      {validation.errorMessage}
    </span>
  {/if}
</div>

<style>
  .invalid {
    border-color: var(--error);
    box-shadow: 0 0 8px var(--error);
  }
</style>
