import qs from 'qs'

interface Config extends RequestInit {
  token?: string
  data?: object
}

export const http = async (
  endpoint: string,
  { data, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window.fetch(`/api/${endpoint}`, config).then(async (response) => {
    //   if (response.status === 401) {
    //     await auth.logout();
    //     window.location.reload();
    //     return Promise.reject({ message: "请重新登录" });
    //   }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}
