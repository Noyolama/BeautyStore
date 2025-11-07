import { configureAuth } from 'react-query-auth';
import api from "@/api/axiosClient";

export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
  userFn: async () => {
    try {
      const res = await api.get('/users/me');

      return res?.data?.data
    } catch (error: any) {
      if (error.response.status == '401' || error.response.status === '404') {
        await api.post('users/logout');
        return null
      }

      throw error
    }
  },
  loginFn: async (credentials) => {
    const res = await api.post('users/login', credentials);

    return res?.data
  },
  registerFn: async (credentials) => {
    const res = await api.post('users/register', credentials);

    return res?.data
  },
  logoutFn: async () => {
    const res = await api.post('users/logout');

    return res?.data
  },
});
