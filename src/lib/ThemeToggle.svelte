<script>
  import ThemeIcon from "./Icons/ThemeIcon.svelte"

  const saved = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  let isDarkMode = $state(saved ? saved === "dark" : prefersDark)

  $effect(() => {
    const theme = isDarkMode ? "dark" : "light"
    localStorage.setItem("theme", theme)

    if (!document.startViewTransition) {
      document.documentElement.setAttribute("data-theme", theme)
      return
    }

    document.startViewTransition(() => {
      document.documentElement.setAttribute("data-theme", theme)
    })
  })
</script>

<label class="theme-toggle">
  <input
    bind:checked={isDarkMode}
    type="checkbox"
    name="dark-mode-toggle"
    aria-label={`set ${isDarkMode ? "light" : "dark"} mode`}
  />
  <ThemeIcon {isDarkMode} />
</label>
