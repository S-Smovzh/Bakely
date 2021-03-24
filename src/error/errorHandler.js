import {interval} from "rxjs";
import axios from "axios";

let errors = {};

export function logError(error) {

  const clientsToken = localStorage.getItem('clientsToken');
  const userToken = localStorage.getItem('token');

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
    axios.post('http://localhost:5000/api/protected/errors/', errors, {
      headers: {
        'Submission-Key': btoa('Key')
      }
    }).catch();
  });
  errors = {};
}