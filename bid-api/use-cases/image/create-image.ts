
interface makeCreateImageArgs {
  cdn: any
}

const makeCreateImage = ({cdn}: makeCreateImageArgs) => {
  return async function createImage({body}: any) {
    let image = undefined
    console.log(body.image)
    await cdn.uploader.upload(body.image).then((res: any) => {
      image = { public_id: res.public_id, secure_url: res.secure_url}
    });
    return image
  }
}

export default makeCreateImage