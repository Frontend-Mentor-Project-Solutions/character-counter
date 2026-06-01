const [characterCount, wordCount, sentenceCount] =
  document.querySelectorAll("p.h1");
const textArea = document.querySelector("textarea");
const excludeSpacesCheckbox = document.querySelector(
  "input[name=exclude-spaces]",
);
const characterLimitCheckbox = document.querySelector(
  "input[name=character-limit-checkbox]",
);
const characterLimitInput = document.querySelector(
  "input[name=character-limit-input]",
);

const graphemeSegmenter = new Intl.Segmenter(undefined, {
  granularity: "grapheme",
});
const wordSegmenter = new Intl.Segmenter(undefined, { granularity: "word" });
const sentenceSegmenter = new Intl.Segmenter("en", {
  granularity: "sentence",
});

const countFormat = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

textArea.addEventListener("input", () => {
  updateCounters();
  validateTextArea();
  updateLetterDensities();
});
excludeSpacesCheckbox.addEventListener("change", updateCounters);
characterLimitCheckbox.addEventListener("change", () => {
  toggleNumberInput();
  validateTextArea();
});
characterLimitInput.addEventListener("input", () => {
  validateTextArea();
});

function updateCounters() {
  const text = textArea.value;

  const characters = [...graphemeSegmenter.segment(text)].filter((seg) => {
    if (excludeSpacesCheckbox.checked) {
      return seg.segment.trim() !== "";
    }

    return true;
  });

  characterCount.textContent = countFormat.format(characters.length);

  wordCount.textContent = countFormat.format(
    [...wordSegmenter.segment(text)].filter((seg) => seg.isWordLike).length,
  );

  sentenceCount.textContent = countFormat.format(
    [...sentenceSegmenter.segment(text)].filter(
      (seg) => seg.segment.trim() !== "",
    ).length,
  );
}

function validateTextArea() {
  textArea.setCustomValidity("");

  const characterLimit = getCharacterLimit();

  if (!characterLimit) {
    textArea.setCustomValidity("");

    displayErrorMessage();
    return;
  }

  if (textArea.value.length > characterLimit) {
    textArea.setCustomValidity(
      `Limit reached! Your text exceeds ${characterLimit} characters.`,
    );
    displayErrorMessage();
  }
}

function updateLetterDensities() {
  const text = textArea.value;

  const letters = [...graphemeSegmenter.segment(text)]
    .filter(({ segment }) => /^\p{L}\p{M}*$/u.test(segment))
    .map(({ segment }) => segment.toLocaleUpperCase());

  const totalLetters = letters.length;

  const letterCounts = letters.reduce((counts, letter) => {
    counts[letter] = (counts[letter] || 0) + 1;
    return counts;
  }, {});

  const letterStats = Object.entries(letterCounts)
    .map(([letter, count]) => ({
      letter,
      count,
      percentage: ((count / totalLetters) * 100).toFixed(2),
    }))
    .sort((a, b) => b.count - a.count);

  displayDensityTable(letterStats);
}

function toggleNumberInput() {
  if (characterLimitCheckbox.checked) {
    characterLimitInput.hidden = false;
    characterLimitInput.value = "";
  } else {
    characterLimitInput.hidden = true;
  }
}

function getCharacterLimit() {
  if (!characterLimitCheckbox.checked) {
    return;
  }

  if (characterLimitInput.validity.valid) {
    return characterLimitInput.value;
  }
}

function displayErrorMessage() {
  const errorMessage = document.querySelector(".error-message");
  const infoIcon = "./assets/images/info-icon.svg";

  errorMessage.textContent = textArea.validationMessage;
}

function displayDensityTable(lettersArray) {
  const wrapper = document.querySelector(".letter-density-wrapper");

  if (!lettersArray.length) {
    wrapper.innerHTML = `
    <p class="empty">
        No characters found. Start typing to see letter density.
    </p>
    `;
    return;
  }

  const listItems = lettersArray.map(({ letter, count, percentage }) => {
    return `
      <li>
        <span class="letter">${letter}</span>
        <div class="bar" style="--pct: ${percentage}%"></div>
        <span class="percentage">${count} (${percentage}%)</span>
      </li>
    `;
  });

  wrapper.innerHTML = `<ul class="bars" role="list">${listItems.join("")}</ul>`;
}

// On page load
// firefox only, use domcontentloaded
// or maybe reset all fields on pageload
toggleNumberInput();
updateCounters();
updateLetterDensities();
