/*
 * @Author: YourName
 * @Date: 2024-05-28 15:10:50
 * @LastEditTime: 2024-05-28 23:00:29
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_admin\src\api\video.ts
 * 版权声明
 */

import request from '@/utils/request';
import type { responseData } from '@/types/api';

enum API {
  VIDEOPAGE_URL = '/audit/video/getpage',
  VIDEO_URL = '/audit/video/getvideo',
  VIDEOSTATUS_URL = '/audit/video/status'
}


//根据状态获取审核视频
export const getVideoListByPage = (params: any) =>
  request<any, responseData>({
    url: API.VIDEOPAGE_URL,
    method: 'get',
    params,
  });


export const getVideoById = (params:any) =>
request<any, responseData>({
  url: API.VIDEO_URL,
  method: 'get',
  params,
});


export const changeVideoStatus = (data:any) =>
request<any, responseData>({
  url: API.VIDEOSTATUS_URL,
  method: 'post',
  data,
});