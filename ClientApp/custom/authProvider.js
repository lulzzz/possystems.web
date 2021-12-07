import decodeJwt from 'jwt-decode';
import { fetchUtils } from 'react-admin';

export const httpClient = (url, options = {}) => {
  options.headers = new Headers({ 'Content-Type': 'application/json' });

  const token = sessionStorage.getItem('token');
  options.user = {
    authenticated: true,
    token: `Bearer ${token}`,
  };

  return fetchUtils.fetchJson(url, options);
};

export default {
  login: ({ username, password }) => {
    const request = new Request(apiUrl + '/api/auth', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token }) => {
        const decodedToken = decodeJwt(token);

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('permissions', decodedToken[decodedToken.sub]);
      });
  },
  logout: () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('permissions');
    return Promise.resolve();
  },
  checkError: error => {
    const { status } = error;
    return status === 401 || status === 403
      ? Promise.reject()
      : Promise.resolve();
  },
  checkAuth: () => {
    return sessionStorage.getItem('token')
      ? Promise.resolve()
      : Promise.reject();
  },
  getPermissions: () => {
    const role = sessionStorage.getItem('permissions');
    return role ? Promise.resolve(role) : Promise.resolve();
  },
};
