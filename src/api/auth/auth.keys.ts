export const authQueryKeys = {
  login: () => 'user/login',
  register: () => 'user/register',
  logout: () => 'user/logout',
  getUserInfo: () => 'user/info',
  activateAccount: () => 'user/activate',
  profileCompletion: (id: string) => `user/info/${id}/profile-completion`,
};
