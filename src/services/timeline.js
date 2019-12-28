import request from '@/utils/request';

export async function fetchSomeday(date) {
  return request('/admin/FindSomeday', { params: { date: date } });
}

export async function fetchAllUserLastMonth(id) {
  return request('/admin/findSomeBody', { params: { id: id } });
}

export async function fetchMyLastMonth() {
  return request('/all/findIndex')
}

export async function fetchOnOffShow() {
  return request('/all/onOffShow');

}
