import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/other/getInfo');
}
export async function queryNotices() {
  return request('/api/notices');
}
