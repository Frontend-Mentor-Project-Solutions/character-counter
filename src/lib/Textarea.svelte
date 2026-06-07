<script>
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
  <span class="error-message">{validation.errorMessage}</span>
</div>

<style>
  .invalid {
    border-color: var(--error);
  }
</style>
