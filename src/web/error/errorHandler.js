import { interval } from 'rxjs';
import axios from 'axios';
import { userLinks } from '../utils/restLinks';

let errors = {};

export function logError(error) {
  const clientsToken = typeof window !== 'undefined' && (localStorage.getItem(btoa('clientsToken'))
    ? atob(localStorage.getItem(btoa('clientsToken'))) : null);
  const userToken = typeof window !== 'undefined' && (localStorage.getItem(btoa('token'))
    ? atob(localStorage.getItem(btoa('token'))) : null);

  const token = userToken ? userToken : clientsToken;

  if (!errors[token]) {
    Object.defineProperty(errors, token, {
      value: {},
      writable: true
    });
  }

  Object.assign(errors[token], {
    [Date.now()]: error
  });
}

export async function sendErrorReport() {
  interval(180000).subscribe(() => {
    axios.post(userLinks.error, errors, {
      headers: {
        'Submission-Key':
          typeof window !== 'undefined' && (localStorage.getItem(btoa('clientsToken'))
            ? atob(localStorage.getItem(btoa('clientsToken'))) : null)
      }
    }).catch();
  });
  errors = {};
}
