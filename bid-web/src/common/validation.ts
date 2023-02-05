import { ItemFormValues } from "./types"

const validateForm = (values: ItemFormValues) => {
  for( let v of Object.values(values)) {
    if (!v) return false
  }

  return true
}

export { validateForm }