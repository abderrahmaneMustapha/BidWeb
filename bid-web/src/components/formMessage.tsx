import { FormMessageProps } from "../common/types"

const FormMessage = ({type, message}: FormMessageProps) => {
  return (
    <div className={`${type}-feedback`}>
      {message}
    </div>
  )
}

export default FormMessage