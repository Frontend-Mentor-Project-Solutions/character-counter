// @ts-nocheck
const graphemeSegmenter = new Intl.Segmenter(undefined, {
  granularity: "grapheme",
})
const wordSegmenter = new Intl.Segmenter(undefined, { granularity: "word" })
const sentenceSegmenter = new Intl.Segmenter("en", {
  granularity: "sentence",
})
const countFormat = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
})

function createTextAnalysis() {
  let text = $state("")
  let excludeSpaces = $state(false)

  let characterCount = $derived(
    [...graphemeSegmenter.segment(text)].filter(
      (seg) => !excludeSpaces || seg.segment.trim() !== ""
    ).length
  )

  let wordCount = $derived([...wordSegmenter.segment(text)].filter((seg) => seg.isWordLike).length)
  let sentenceCount = $derived(
    [...sentenceSegmenter.segment(text)].filter((seg) => seg.segment.trim() !== "").length
  )

  let letterStats = $derived(() => {
    const letters = [...graphemeSegmenter.segment(text)]
      .filter(({ segment }) => /^\p{L}\p{M}*$/u.test(segment))
      .map(({ segment }) => segment.toLocaleUpperCase())

    const total = letters.length

    if (!total) {
      return []
    }

    const counts = letters.reduce((counts, letter) => {
      counts[letter] = (counts[letter] || 0) + 1
      return counts
    }, {})

    return Object.entries(counts)
      .map(([letter, count]) => ({
        letter,
        count,
        percentage: ((count / total) * 100).toFixed(2),
      }))
      .sort((a, b) => b.count - a.count)
  })

  return {
    get text() {
      return text
    },
    set text(v) {
      text = v
    },
    get excludeSpaces() {
      return excludeSpaces
    },
    set excludeSpaces(v) {
      excludeSpaces = v
    },
    get characterCount() {
      return countFormat.format(characterCount)
    },
    get wordCount() {
      return countFormat.format(wordCount)
    },
    get sentenceCount() {
      return countFormat.format(sentenceCount)
    },
    get letterStats() {
      return letterStats
    },
  }
}

export const analysis = createTextAnalysis()
