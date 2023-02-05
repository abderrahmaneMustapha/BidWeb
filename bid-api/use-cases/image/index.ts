import cdn from "../../app/cdn"
import makeCreateImage from "./create-image"
import makeRemoveImage from "./remove.image"

const createImage = makeCreateImage({cdn})
const removeImage = makeRemoveImage({cdn})

const imageService =  Object.freeze({
  createImage,
  removeImage,
})

export default imageService

export {
  createImage,
  removeImage,
}