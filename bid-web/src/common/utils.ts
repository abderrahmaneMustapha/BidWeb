const resizeImage = (image:string, width: number = 400, height: number = 270) => {
  let imgArr =  image.split('/')
  const last = imgArr.pop()
  imgArr.pop()
  imgArr.push(`w_${width},h_${height},c_scale`)
  imgArr.push(last as string)

  return imgArr.join('/')
}

export { resizeImage }