interface ItemFormValues {
  name: string,
  close_at: string,
  image: string,
  description: string
}
interface ItemFormProps {
    onSubmit: (event: ItemFormValues) => void
}
interface AlertProps {
  type: string,
  message: string,
}

export type { ItemFormProps, ItemFormValues, AlertProps }