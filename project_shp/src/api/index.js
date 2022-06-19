// 当前模块的API 统一管理
import requests from "./request";

// 三级联动

// /api/product/getBaseCategoryList get 无参数
export const reqCateList = () => {
  // 发请求 返回的是promise 对象 默认返回undefined
  return requests({ url: "/product/getBaseCategoryList", method: "get" });
};
