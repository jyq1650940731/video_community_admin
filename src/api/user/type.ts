//登录请求参数类型
export interface loginForm{
    username:string,
    password:string
} 

interface dataType{
    token:string,
    message:string
}

//登录后返回的类型
export interface loginResponseData{
    code:number,
    data:dataType
}


interface userType{
    uid:string
}
//用户信息
export interface userResponseData{
    code:number,
    data:userType
}