import request from "@/utils/request";

enum API {
    MENU_URL = '/router/menu',
}

export const getMenu = () => request<any>({
    url: API.MENU_URL,
    method: 'get',
})
