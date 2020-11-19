import fetch from "@/utils/request";

// 登录
export const userlogin = (params) => {
    return fetch.post("api/v1/guyuAdmin/platformLogin", params);
};