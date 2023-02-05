
interface makeRemoveImageArgs {
  cdn: any
}

const makeRemoveImage = ({cdn}: makeRemoveImageArgs) => {
  return async function removeImage({body}: any) {
    await cdn.uploader.destroy(body.publicId).then((res: any) => console.log(res));
  }
}

export default makeRemoveImage