import fetch from "@/utils/request";

/*首页数据*/
export const getIndex = () => {
    return fetch.get("api/admin/v1/Statistics/index");
};
// 成交订单
export const salesorder = (params) => {
    return fetch.get("api/admin/v1/Statistics/listOrderStatistics", params);
};
// 账期订单
export const creditOrder = (type) => {
    return fetch.get("api/admin/v1/Statistics/listOrderStatistics", { type: 'period' });
};
// 服务费
export const serviceFee = () => {
    return fetch.get("api/admin/v1/Statistics/listOrderStatistics");
};
// 店铺杂项
export const cidentals = () => {
    return fetch.get("api/admin/v1/Statistics/storeIncidentals");
};
// 店铺列表
export const orderlist = (params) => {
    return fetch.get("api/admin/v1/Statistics/pageAllStore", params);
};
// 店铺详情
export const orderDetail = (storeId) => {
    return fetch.get("api/admin/v1/Statistics/storeDetail", { storeId });
};
// 业务员列表
export const salesmanlist = (params) => {
    return fetch.get("api/admin/v1/salesman/salesmanPage", params);
};
// 认证客户
export const authent = (params) => {
    return fetch.get("api/admin/v1/Statistics/memberList", params);
};
// 订单列表
export const orderBoxList = (params) => {
    return fetch.get("api/admin/mall/v1/guyuOrder/page", params);
};