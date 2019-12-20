import request from '@/utils/request';
export async function fakeAccountLogin(code) {
  return request(`/other/getWebUser?code=${code}`);
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
