export const userConfig =
  {
    headers: {
      Token: localStorage.getItem(btoa('token')) ? atob(localStorage.getItem(btoa('token'))) : null,
      'Refresh-Token': localStorage.getItem(btoa('refreshToken')) ? atob(localStorage.getItem(btoa('refreshToken'))) : null,
      withCredentials: true
    }
  };

export const clientConfig =
  {
    headers: {
      'Client-Token': localStorage.getItem(btoa('clientsToken')) ? atob(localStorage.getItem(btoa('clientsToken'))) : null,
      withCredentials: true
    }
  };
