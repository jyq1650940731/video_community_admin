//返回格式
export interface responseData {
  code: number;
  result: any;
  success: boolean;
  message?: string;
}

export interface resTableData{
total:number,
list:Array<any>
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

//视频
export interface videoAuditFormType {
  status:Number,
  page: Number,
  size: Number,
}



//视频
export interface videoType {
coverUrl:string,
descr:string,
duration:number,
mcId:string,
scId:string,
status:number,
tags:Array<string>,
title:string,
type:number,
uid:number,
uploadDate:string,
vid:number
videoUrl:string
}

export interface categoryType {
  mcName?:string,
  scName?:string
}