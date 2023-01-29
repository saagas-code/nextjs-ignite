import axios, {AxiosError} from 'axios'
import {parseCookies} from 'nookies'
// let isRefreshing = false
// let failedRequestsQueue: any = [];

export function setupAPIClient(ctx: any = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: `http://localhost:8819`,
    headers: {
      Authorization: `Bearer ${cookies['token']}`
    }
  });
  
  // const router = useRouter()
  
  
  //refresh token
  // primeiro parametro caso de certo, segundo o que 
  //fazer caso falhar
  // api.interceptors.response.use(response => {
  //   return response;
  // }, (error: any) => {
  //   if (error?.response?.status === 401) {
  //     if(error.response.data.message === 'Unauthorized') {
  //       cookies = parseCookies(ctx);
  //       const { token } = cookies
  //       const originalConfig = error.config
  
  //       if(!isRefreshing) {
  //         isRefreshing = true
  
  //         api.post("/refresh", {
  //           //refreshToken
  //         }).then(response => {
  //           const token = response.data.token
      
  //           setCookie(ctx, 'token', token, {
  //             maxAge: 60 * 60 * 24 * 30, // one month
  //             path: '/'
  //           })
      
  //           api.defaults.headers['Authorization'] = `Bearer ${token}`
          
  //           failedRequestsQueue.forEach((request: any) => request.onSuccess(token))
  //           failedRequestsQueue = []
  //         }).catch((err) => {
  //           failedRequestsQueue.forEach((request: any) => request.onSuccess(err))
  //           failedRequestsQueue = []
  //         })  .finally(() => {
  //           isRefreshing = false
  //         })
  //       }
  
  //       return new Promise((resolve, reject) => {
  //         failedRequestsQueue.push({
  //           onSuccess: (token: string) => {
  //             originalConfig!.headers['Authorization'] = `Bearer ${token}`
              
  //             resolve(api(originalConfig!))
  //           },
  //           onFailure: (err: AxiosError) => {
  //             reject(err)
  //           }
  //         })
  //       })
  //     } else {
  //       if(process.browser) {
  //          const {signOut} = useContext(AuthContext)
  //          signOut()   
  //       } else {
  //          return Promise.reject(new AuthTokenError())
  //       }
  //     }
  //   }
  
  //   return Promise.reject(error);
  // })

  return api
}