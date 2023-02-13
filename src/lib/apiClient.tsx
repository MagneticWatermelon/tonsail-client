import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import ky, { HTTPError } from 'ky';
import { redirect } from 'react-router-dom';
import { BASE_API_URL } from '../config';

const handleErrors = async (error: HTTPError) => {
  if (error.response.status === 401) {
    redirect('/login');
  }
  let errorBody = await error.response.json();
  showNotification({
    title: errorBody.title,
    message: errorBody.message,
    autoClose: 5000,
    color: 'red',
    icon: <IconX />
  });
  return error;
};

export const client = ky.create({
  prefixUrl: BASE_API_URL,
  mode: 'cors',
  // credentials: 'include'
  hooks: {
    beforeError: [handleErrors]
  }
});
