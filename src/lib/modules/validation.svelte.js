import { analysis } from "./text-analysis.svelte"

function createValidation() {
  let characterLimitEnabled = $state(false)
  let characterLimitValue = $state()

  let characterLimit = $derived.by(() => {
    if (characterLimitEnabled && characterLimitValue) {
      return Number(characterLimitValue)
    }
  })

  let errorMessage = $derived.by(() => {
    if (!characterLimit) {
      return
    }

    if (analysis.text.length > characterLimit) {
      return `Limit reached! Your text exceeds ${characterLimit} characters.`
    }
  })

  let isInvalid = $derived(!!errorMessage)

  return {
    get characterLimitEnabled() {
      return characterLimitEnabled
    },
    set characterLimitEnabled(v) {
      characterLimitEnabled = v
    },
    get characterLimitValue() {
      return characterLimitValue
    },
    set characterLimitValue(v) {
      characterLimitValue = v
    },
    get errorMessage() {
      return errorMessage
    },
    get isInvalid() {
      return isInvalid
    },
  }
}

export const validation = createValidation()
