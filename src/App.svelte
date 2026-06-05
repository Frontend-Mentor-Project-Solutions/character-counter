



 <main class="page-layout stack">
      <header>
        <img
          class="logo"
          src="assets/images/logo-dark-theme.svg"
          alt="Character Counter Logo"
        />

        <button class="theme-toggle">
          <img src="assets/images/icon-sun.svg" alt="" />
        </button>
      </header>

      <h1 class="narrow">Analyze your text in real-time.</h1>

      <section class="input-area">
        <div class="textarea-wrapper">
          <textarea
            aria-label="Enter text to count characters, words, and sentences"
            placeholder="Start typing here... (or past your text)"
          ></textarea>
          <span class="error-message"></span>
        </div>

        <label class="exclude-spaces">
          <input type="checkbox" name="exclude-spaces" />
          Exclude Spaces
        </label>

        <label class="character-limit">
          <input type="checkbox" name="character-limit-checkbox" />
          Set Character Limit
        </label>

        <input
          type="number"
          name="character-limit-input"
          aria-label="Enter a character limit"
          inputmode="numeric"
          autocomplete="off"
          min="0"
        />

        <output for="text-input" class="reading-time">
          Approx. reading time: &lt;1 minute
        </output>
      </section>

      <section class="switcher">
        <h2 class="visually-hidden">Text Statistics</h2>

        <article>
          <h3>Total Characters</h3>
          <p class="h1">0</p>
        </article>

        <article>
          <h3>Word Count</h3>
          <p class="h1">0</p>
        </article>

        <article>
          <h3>Sentence Count</h3>
          <p class="h1">0</p>
        </article>
      </section>

      <section>
        <h2>Letter Density</h2>

        <div class="letter-density-wrapper">
          <!-- <ul class="bars" role="list">
            <li>
              <span class="letter">E</span>
              <div class="bar" style="--pct: 40%"></div>
              <span class="percentage">40 (16.06%)</span>
            </li>
            <li>
              <span class="letter">I</span>
              <div class="bar" style="--pct: 70%"></div>
              <span class="percentage">29 (11.65%)</span>
            </li>
            <li>
              <span class="letter">T</span>
              <div class="bar" style="--pct: 20%"></div>
              <span class="percentage">28 (11.24%)</span>
            </li>
          </ul> -->
        </div>
      </section>
    </main>
