<script>
  import ThemeIcon from "./Icons/ThemeIcon.svelte"

  let isDarkMode = $state(false)
</script>

<label class="theme-toggle">
  <input bind:checked={isDarkMode} type="checkbox" name="dark-mode-toggle" />
  <ThemeIcon {isDarkMode} />
</label>
