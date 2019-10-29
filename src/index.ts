import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  // TODO: 123
  xhr(config)
}

export default axios
