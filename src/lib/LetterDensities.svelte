<script>
  import ChevronIcon from "./Icons/ChevronIcon.svelte"
  import { analysis } from "./modules/text-analysis.svelte"

  let collapsed = $state(false)
</script>

<div class="letter-density-wrapper">
  {#if !analysis.letterStats().length}
    <p class="empty">No characters found. Start typing to see letter density.</p>
  {:else}
    <ul class="bars" role="list">
      {#each analysis.letterStats() as { letter, count, percentage }, index}
        <li data-collapsed={index > 4 && collapsed ? "true" : "false"}>
          <span class="letter">{letter}</span>
          <div class="bar" style="--pct: {percentage}%"></div>
          <span class="percentage">{count} ({percentage}%)</span>
        </li>
      {/each}
    </ul>

    {#if analysis.letterStats().length > 4}
      <button
        class="collapse-toggle h3"
        aria-expanded={!collapsed}
        onclick={() => (collapsed = !collapsed)}
      >
        {collapsed ? "See more" : "See less"}
        <ChevronIcon {collapsed} />
      </button>
    {/if}
  {/if}
</div>

<style>
  li[data-collapsed="true"] {
    display: none;
  }

  li[data-collapsed="false"] {
    display: grid;
  }
</style>
