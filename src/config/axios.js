import axios from 'axios'
import config from './index'
import {Message} from 'element-ui'
import qs from 'qs';
const addErrorLog = errorInfo => {
  const {
    statusText,
    status,
    request: { responseURL }
  } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
}

class HttpRequest {
  // ES6默认参数
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {} // 将请求都放到队列中
  }
  
  // 添加token到请求头
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        return config
      },

      error => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        if(res.status==200){
          const data = res.data;
          console.log(data)
        }
        return res
      },
      error => {
        if (error.response) {
            const {status} = error.response;
            switch(status){
              case 400:
                alert('(bad request) the server does not understand the syntax of the request');
                break;
              case 403:
                alert('Server rejects request');
                break;
              case 404:
                alert('The server could not find the request');
                break;
              case 500:
                alert('The server encountered an error and could not complete the request');
              break;
            }
        } else if (error.request) {
            if(error.request.readyState == 4 && error.request.status == 0){
              axios(error.config)
            }
        }else{
          console.log(error)
        }
        return Promise.reject(error)
      }
    )
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    axios.defaults.timeout = 60000
    return instance(options)
  }
}
const baseUrl =  config.baseUrl;
const http = new HttpRequest(baseUrl)
export const httpNetwork = (URL, info, method = 'post') => {
  return new Promise((resolve, reject) => {
    http.request({
        url:URL,
        data: qs.stringify(info),
        method
      }).then(res => {
        if (res.data.code === 1) {
          resolve(res.data)
        }else{
          if(res.data.text){
            Message({
              message: res.data.text,
              showClose: true,
              type: 'error',
              offset:100,
              duration:1500
            })
          }
          reject(res.data)
        }
      }).catch(err=>{
        reject(err)
      })
  })
}
export default axios
// function toFormData(data){
//   let formData = new FormData()
//   for(let key in data){
//     if(data.hasOwnProperty(key)){
//       formData.append(key,data[key])
//     }
//   }
// }