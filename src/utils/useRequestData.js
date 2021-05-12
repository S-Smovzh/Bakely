import axios from 'axios';
import { logError } from '../error/errorHandler';

export async function useRequestData(url) {
  let success;

  let data;

  let errors;

  await axios.get(url)
    .then(response => {
      success = response.data.success;
      data = response.data.data;
      errors = response.data.errors;
    }).catch((error) => logError(error));

  return [success, data, errors];
}
