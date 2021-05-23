export const clientConfig =
  {
    headers: {
      'Client-Token': localStorage.getItem(btoa('clientsToken')) ? atob(localStorage.getItem(btoa('clientsToken'))) : null,
      withCredentials: true
    }
  };
