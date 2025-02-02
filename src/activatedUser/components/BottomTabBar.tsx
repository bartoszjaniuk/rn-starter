import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Screen } from 'src/screen';
import { useAuthStore } from 'src/store/auth';

import * as route from '../navigation/routes';

export const BottomTabBar = (_props: BottomTabBarProps) => {
  const { user } = useAuthStore();

  return (
    <Screen.BottomTabBar defaultRoute={route.toBottomTabsHome}>
      <Screen.BottomTabBar.Item icon="home" title="Ekran główny" to={route.toBottomTabsHome} />
      {user?.role === 'trainer' ? (
        <Screen.BottomTabBar.Item icon="calendar" title="Kalendarz" to={route.toBottomTabsCalendar} />
      ) : null}
      {/* {data?.role === 'trainee' ? (
        <Screen.BottomTabBar.Item icon="document" title="Moje plany" to={route.toBottomTabsMyPlans} />
      ) : (
        <Screen.BottomTabBar.Item icon="trainees" title="Podopieczni" to={route.toBottomTabsTrainerTrainees} />
      )} */}
      <Screen.BottomTabBar.Item icon="profile" title="Profil" to={route.toBottomTabsProfile} />
    </Screen.BottomTabBar>
  );
};
