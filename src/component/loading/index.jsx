import { message } from 'antd'

export const loading = () => {
  const hide = message.loading('加载中请稍后', 0)
  setTimeout(hide, 1500)
}

export const success = () => {
  message.success('加载成功')
}