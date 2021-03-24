export const userConfig =
  {
    headers: {
      Token: localStorage.getItem('token'),
      'Refresh-Token': localStorage.getItem('refreshToken'),
      withCredentials: true
    }
  };

export const clientConfig =
  {
    headers: {
      'Client-Token': localStorage.getItem('clientsToken'),
      withCredentials: true
    }
  };