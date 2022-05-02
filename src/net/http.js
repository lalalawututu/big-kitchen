import axios from 'axios'
// import router from '../router'

axios.defaults.withCredentials = true;//让ajax携带cookie

//const baseURL = ''
const baseURL = '/loc'
let loadinginstace

//请求拦截器
axios.interceptors.request.use(
  async config => {
        // let token = sessionStorage.getItem('token');
    // if (!token) {
    // 	router.push({path:'/login'})
        // }
    config.headers= {
      // 'Login-Token':token,
      ...config.headers
    }
    return config;
  }
)

// 响应拦截器
// axios.interceptors.response.use(res => {
//     setTimeout(() => {
//         loadinginstace.close()
//     }, 200)
// })

function request(method, url, data, otherURL) {
  return new Promise((resolve, reject) => {
    const options = {
      url: baseURL + url,
      method,
      // baseURL:otherURL?otherURL:baseURL,
    }

    if (method === 'GET') {
      options.params = data
    } else {
      options.data = data
    }
    
    axios(options)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {
    GET:(url, params) => request('GET', url, params),
    POST:(url, params) => request('POST', url, params),
    PUT:(url, params) => request('PUT', url, params),
    DELETE:(url, params) => request('DELETE', url, params),
}
