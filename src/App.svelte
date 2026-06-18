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

    <!-- <button class="theme-toggle">
      <img src="assets/images/icon-sun.svg" alt="" />
    </button> -->

    <ThemeToggle />
  </header>

  <h1 class="narrow">Analyze your text in real-time.</h1>

  <section class="input-area">
    <Textarea />

    <OptionsPanel />

    <output for="text-input" class="reading-time"> Approx. reading time: &lt;1 minute </output>
  </section>

  <StatCards />

  <section>
    <h2>Letter Density</h2>

    <LetterDensities />
  </section>
</main>
