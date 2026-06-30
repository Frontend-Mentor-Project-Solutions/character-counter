<script>
  import LetterDensities from "./lib/LetterDensities.svelte"
  import OptionsPanel from "./lib/OptionsPanel.svelte"
  import StatCards from "./lib/StatCards.svelte"
  import Textarea from "./lib/Textarea.svelte"
  import ThemeToggle from "./lib/ThemeToggle.svelte"
</script>

<main class="page-layout stack">
  <header>
    <img class="logo" src="assets/images/logo-dark-theme.svg" alt="Character Counter Logo" />

    <ThemeToggle />
  </header>

  <h1 class="narrow">Analyze your text in real-time.</h1>

  <section class="input-area">
    <Textarea />

    <OptionsPanel />
  </section>

  <StatCards />

  <section>
    <h2>Letter Density</h2>

    <LetterDensities />
  </section>
</main>
