import { message } from 'antd'

//第一个参数为控制唯一的key值互不冲突，第二个为控制时间
export const loading = (key, time) => {
  message.loading({ content: '计算中，请稍后', key });
  setTimeout(() => {
    message.success({ content: '计算完成', key, duration: 1 });
  }, time);
};
