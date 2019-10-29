import { isDate, isPlainObject } from './util'

// 转码函数，把特殊字符转换成对应的
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    let val = params[key]
    // 删除null和undefined
    if (val === 'null' || typeof val === 'undefined') {
      return
    }
    let values: string[]
    // 返回成一个数组
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    // 遍历数组，对date类型改造，对对象序列化
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  // 数组转化成字符串
  let serializedParams = parts.join('&')

  // 删除hash
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 判断一下是否已经有了query语句
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
