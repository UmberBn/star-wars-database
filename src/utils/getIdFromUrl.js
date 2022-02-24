export default  (url) => {
  const splitedUrl = url.split('/')
  return splitedUrl[5];
}