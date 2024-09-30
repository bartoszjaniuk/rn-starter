export const authQueryKeys = {
  login: () => 'user/login',
  register: () => 'user/register',
  logout: () => 'user/logout',
  getUserInfo: () => 'user/info',
  profileCompletion: (id: string) => `user/info/${id}/profile-completion`,
};
