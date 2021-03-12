import { setUserToken } from "./user";
import { reqLogin, reqLogout } from "@/api/login";
import { setToken, removeToken, getToken } from "@/utils/auth";
export const login = (username, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogin({ username: username, password: password })
      .then((res) => {
        if (res.returnCode === '0') {
          const token = res.data.token;
          dispatch(setUserToken(token));
          setToken(token);
          resolve(res.data);
        } else {
          const msg = res.message;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};