import { createImage, removeImage } from "../use-cases/image";

export default Object.freeze({
  createImage: (req: any) => createImage(req),
  removeImage: (req: any) => removeImage(req),
})