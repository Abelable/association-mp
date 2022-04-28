const env = 'pro' // 环境配置：'pro' - 正式环境, 'dev' - 开发环境
const appName = 'wx_mp_youbo'
const version = '2.1.1'
const tmplId = 'OQdvAs17x8DEEGOdfNghGiWtXM4U5fCm3bWWIjhJnD0'
const qiyuAppId = 'HJ2N94ScgvF'
const qiyuAppkey = 'e4f3fd8f6b2b5afeed114d46ed85ac0b'

let webviewBaseUrl = ''
switch (env) {
  case 'pro':
    webviewBaseUrl = 'https://h5.youboi.com'
    break
  case 'beta':
    webviewBaseUrl = 'https://beta.h5.youboi.com'
    break
  case 'dev':
    webviewBaseUrl = 'https://h5.youboe.com'
    break
}

export {
  appName,
  version,
  tmplId,
  qiyuAppId,
  qiyuAppkey,
  env,
  webviewBaseUrl
}
