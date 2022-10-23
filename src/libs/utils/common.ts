export const filterEmptySrting = (arr: string[]) => {
  return arr.filter((item) => item !== '')
}

export const removeHttp = (url: string) => {
  return url.replace(/^(https?:)\/\//, '')
}

export const removeSlash = (url: string) => {
  return url.replace(/\/$/, '')
}

export const removeHttpAndSlash = (url: string) => {
  return removeSlash(removeHttp(url))
}

export const removeDash = (str: string) => {
  return str.replace(/-/g, ' ')
}
