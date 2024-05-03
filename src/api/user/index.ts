import request from "@/utils/request";
import type{ responseData } from "../types";
import type{loginForm} from "./type";

enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info'
}

export const login = (data:loginForm) => request<any,responseData>({
    url: API.LOGIN_URL,
    method: 'post',
    data
})

export const getUserInfo = () => request<any,responseData>({
    url: API.USERINFO_URL,
    method: 'get'
})
