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
});
excludeSpacesCheckbox.addEventListener("change", updateCounters);
characterLimitCheckbox.addEventListener("change", () => {
  toggleNumberInput();
  validateTextArea();
});
characterLimitInput.addEventListener("input", () => {
  validateTextArea();
});

// TODO: should also run after page load in case the textarea is pre-filled
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

// TODO: should also run after page load in case the checkbox is pre-checked
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

// On page load
// firefox only, use domcontentloaded
// or maybe reset all fields on pageload
toggleNumberInput();
updateCounters();
