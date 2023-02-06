import { MongoServerError } from "mongodb";
const handleErrors = (error: unknown, erroMessage: string) => {
  if (error instanceof MongoServerError) {
    console.error(error.message)
    if (error.errInfo?.details.schemaRulesNotSatisfied) {
      const message = parseErrorMessage(error.errInfo?.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied)
      console.log(message)
    }
    throw new Error(erroMessage)}
}

const parseErrorMessage = (errArray:  any) => {
  let result = `Operation failed withthe following errors: \n`
  errArray.forEach((err: any) => {
    result += `${err.propertyName}: ${err.details[0].reason} \n`
  })
  return result
}

export default handleErrors