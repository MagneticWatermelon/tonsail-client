import ky from 'ky';
import { BASE_API_URL } from '../config';

export const client = ky.create({
  prefixUrl: BASE_API_URL
});
