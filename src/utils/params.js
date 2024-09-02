import md5 from 'md5'

export const randomStr = (randomFlag, min, max) => {
  var str = '',
    range = min,
    arr = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ]
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (var i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}
export const getNonce = () => {
  return randomStr(true, 3, 16)
}
export const getTimeStamp = () => {
  return new Date().getTime()
}

export const getSignature = (app_id, auth_nonce, auth_timestamp, paramObj, secret) => {
  const keysObj = {
    app_id,
    auth_nonce,
    auth_timestamp,
    ...paramObj,
  }
  const keys = Object.keys(keysObj)
  let textArray = keys.sort().map((key) => {
    return `${key}=${keysObj[key]}&`
  })
  const text = textArray.join('').replace(/(\&*$)/g, '')
  return md5(secret + text, 32)
}
export const generateFakeOpenId = () => {
  return (
    randomStr(true, 4, 12) + getTimeStamp() + randomStr(true, 6, 16) + '_guest'
  )
}
export default {
  getNonce,
  getTimeStamp,
  getSignature,
  generateFakeOpenId,
}
