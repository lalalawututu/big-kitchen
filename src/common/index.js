import moment from 'moment'

//获取指定日期，返回YYYY-MM-DD格式。传入格式必须为Number, 0为当前日期，正/负数为距当前日期未来/过去的某一天,最大值999
export const getMyDate = num => {
    if(Object.prototype.toString.call(num) !== '[object Number]') return
    if(num === 0) return moment().format('YYYY-MM-DD')
    if(num < 0) return moment().subtract(Math.abs(num), 'days').format('YYYY-MM-DD')
    if(num > 0) return moment().add(Math.abs(num), 'days').format('YYYY-MM-DD')
}

export const Sync_Server = "http://123.57.137.181:8070"
export const APS_Server = "http://123.57.137.181:8020"
export const WMS_Server = "http://123.57.137.181:8060"
export const Cost_Server = "http://123.57.137.181:8050"
export const Tracker_Server = "http://123.57.137.181:8040"
export const SCADA_Server = "http://123.57.137.181:8030"

// export const Sync_Server = "http://localhost:8070"
// export const APS_Server = "http://localhost:8020"
// export const WMS_Server = "http://localhost:8060"
// export const Cost_Server = "http://localhost:8050"
// export const Tracker_Server = "http://localhost:8040"
// export const SCADA_Server = "http://localhost:8030"
