/**
 * @description 导出网络配置
 **/
export default {
  // 默认的接口地址，
  baseURL: import.meta.env.MODE === 'development' ? '' : '',
  // 配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  // 最长请求时间
  requestTimeout: 10000,
  // 操作正常code，支持String、Array、int多种类型
  successCode: [200, 0, '200', '0'],
  // 数据状态的字段名称
  statusName: 'code',
  // 状态信息的字段名称
  messageName: 'message',
  successMsg: 'success',
  dataName: 'result',
  stateFail: 0,
  statusSuccess: 1,
  tokenFail: 1001,
};