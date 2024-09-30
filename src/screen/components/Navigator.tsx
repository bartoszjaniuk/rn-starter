import * as React from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';

import { NavigatorItem } from './NavigatorItem';

import { NavigatorProvider } from '../providers';

type AnyObject = Record<string, unknown>;
type Params = {
  params: AnyObject;
};

type Props = {
  as: React.FC<Params>;
  data?: AnyObject;
};

export const Navigator = (props: Props) => {
  const { as: Component, data = {} } = props;
  // const [navigationData, setNavigationData] = React.useState(data);

  const route = useRoute<RouteProp<Params>>();
  const [isFlushed, setFlushState] = React.useState(false);

  // HACK: dirty hack to get a correct navigation state
  React.useEffect(() => {
    setFlushState(true);
  }, []);

  // const dataMemoized = React.useMemo(
  //   () => ({ navigationData, setNavigationData }),
  //   [navigationData, setNavigationData],
  // );

  return <NavigatorProvider data={data}>{isFlushed ? <Component params={route.params} /> : null}</NavigatorProvider>;
};

Navigator.Item = NavigatorItem;
