/**
 * @fileOverview admin api
 * @name api.js
 */
import { sendRequest } from './index';
import { publicPath } from '../constants';

export const ApiGoodsCreate = '/admin/goods/create';
export const ApiGoodsUpdate = '/admin/goods/update';
export const ApiGoodsdelete = '/admin/goods/delete';

export const ApiLogin = `${publicPath}/api/login`;

export const reqCheckLogin = param => sendRequest({
  url: `${publicPath}/api/login/check`,
  body: param,
}).then(res => res.body);

export const ApiGetConfig = '/admin/cfg/get';
export const APiSetConfig = '/admin/cfg/set';
export const ApiAccountSearch = '/admin/search';
export const ApiGoodsList = '/admin/goods/list';
export const ApiAdminStat = '/admin/stat';
