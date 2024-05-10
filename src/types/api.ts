//返回格式
export interface responseData {
  code: number;
  result: any;
  success: boolean;
  message?: string;
}

//用户信息
export interface addUserData {
  page: Int16Array;
  pageSize: Int16Array;
}

//添加用户信息
export interface addUserData {
  username: string;
  email: string;
  role: string;
}

//修改用户信息
export interface updataUserData {
  id: Int16Array;
  username: string;
  email: string;
  role: string;
}
