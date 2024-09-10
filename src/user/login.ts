import { client } from '../utils';

export const login = async () => {
  //   return await client.post('user/login', { email: 'janek@gmail.com', password: '123' });
  return await fetch('http://3.71.173.93/api/user/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'janek@gmail.com', password: '123' }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // return await fetch('https://jsonplaceholder.typicode.com/posts', {
  //   method: 'POST',
  //   body: JSON.stringify({ email: 'janek@gmail.com', password: '123' }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
};
