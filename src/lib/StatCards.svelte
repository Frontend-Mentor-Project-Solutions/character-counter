<script>
  import { analysis } from "./modules/text-analysis.svelte"
</script>

<section class="switcher">
  <h2 class="visually-hidden">Text Statistics</h2>

  <article>
    <h3>Total Characters</h3>
    <p class="h1">{analysis.characterCount}</p>
  </article>

  <article>
    <h3>Word Count</h3>
    <p class="h1">{analysis.wordCount}</p>
  </article>

  <article>
    <h3>Sentence Count</h3>
    <p class="h1">{analysis.sentenceCount}</p>
  </article>
</section>
