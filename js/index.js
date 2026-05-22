const [characterCount, wordCount, sentenceCount] =
  document.querySelectorAll("p.h1");
const textArea = document.querySelector("textarea");

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

textArea.addEventListener("input", updateCounters);

function updateCounters() {
  const text = textArea.value;

  characterCount.textContent = countFormat.format(
    [...graphemeSegmenter.segment(text)].length,
  );

  wordCount.textContent = countFormat.format(
    [...wordSegmenter.segment(text)].filter((seg) => seg.isWordLike).length,
  );

  sentenceCount.textContent = countFormat.format(
    [...sentenceSegmenter.segment(text)].filter(
      (seg) => seg.segment.trim() !== "",
    ).length,
  );
}
