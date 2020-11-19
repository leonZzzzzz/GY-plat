import Taro from "@tarojs/taro";
import { baseUrl } from "@/config";

function request(params, method: Method = "GET", contentType: string) {
  const sessionId = Taro.getStorageSync("sessionId");
  const { url, data } = params;
  const options = {
    url: baseUrl + url,
    data,
    method,
    header: {
      "content-type": contentType,
      "php-cookie": 'SESSION=' + sessionId
    }
  };
  return Taro.request(options);
}


export default {
  get(url: string, data?: any) {
    return request({ url, data }, "GET", "application/json");
  },
  post(url: string, data?: any) {
    return request({ url, data }, "POST", "application/x-www-form-urlencoded");
  },
  json(url: string, data?: any) {
    return request({ url, data }, "POST", "application/json");
  },
};




