import * as React from 'react';

import { D } from '@mobily/ts-belt';
import { useNavigation } from '@react-navigation/native';

import { flattenChildren } from 'src/core';
import { useLazy } from 'src/shared/hooks';

import { HeaderButton, HeaderCloseButton, HeaderGoBackButton } from './HeaderButton';
import { HeaderDefault } from './HeaderDefault';
import {
  HeaderBottomElement,
  HeaderContentElement,
  HeaderHostElement,
  HeaderLeftElement,
  HeaderRightElement,
} from './HeaderElement';
import { HeaderProgress } from './HeaderProgress';
import { HeaderTitle } from './HeaderTitle';

import { HeaderProps, useHeader } from '../../providers';
import { LayoutProps, isHeaderElementType } from '../../utils';

type Props = React.PropsWithChildren<Omit<HeaderProps, 'renderLeft' | 'renderRight' | 'renderContent'>> & {
  as?: React.FC<LayoutProps>;
};

export const Header = (props: Props) => {
  const { children, ...rest } = props;

  const navigation = useNavigation();

  const { headerProps } = useHeader();

  const combinedState = D.merge(rest, headerProps);

  const flatChildren = flattenChildren(children);
  const leftElement = flatChildren.find(isHeaderElementType('HeaderLeftElement'));
  const rightElement = flatChildren.find(isHeaderElementType('HeaderRightElement'));
  const contentElement = flatChildren.find(isHeaderElementType('HeaderContentElement'));
  const bottomElement = flatChildren.find(isHeaderElementType('HeaderBottomElement'));

  const {
    title,
    renderRight,
    renderLeft,
    renderContent,
    renderBottom,
    hasCloseButton,
    hasBackButton = true,
    dismissRoute,
    as: Component = HeaderDefault,
  } = combinedState;

  const canGoBack = useLazy(navigation.canGoBack);

  const isGoingBackEnabled = canGoBack && hasBackButton;
  const isBackButtonVisible = isGoingBackEnabled;

  const headerCloseButton = hasCloseButton ? (
    <HeaderRightElement paddingRight={2}>
      <HeaderCloseButton route={dismissRoute} />
    </HeaderRightElement>
  ) : null;
  const headerBackButton = isBackButtonVisible ? (
    <HeaderLeftElement paddingLeft={2}>
      <HeaderGoBackButton />
    </HeaderLeftElement>
  ) : null;

  const headerTitle = title ? <HeaderTitle>{title}</HeaderTitle> : null;
  const headerRightElement = renderRight?.() ?? rightElement ?? headerCloseButton;
  const headerLeftElement = renderLeft?.() ?? leftElement ?? headerBackButton;
  const headerContentElement = renderContent?.(headerTitle) ?? contentElement ?? headerTitle;
  const headerBottomElement = renderBottom?.() ?? bottomElement;

  return (
    <Component
      content={headerContentElement}
      left={headerLeftElement}
      right={headerRightElement}
      bottom={headerBottomElement}
    />
  );
};

Header.__type__ = 'Header';

Header.Left = HeaderLeftElement;
Header.Right = HeaderRightElement;
Header.Content = HeaderContentElement;
Header.Bottom = HeaderBottomElement;
Header.Host = HeaderHostElement;

Header.Button = HeaderButton;
Header.GoBackButton = HeaderGoBackButton;
Header.CloseButton = HeaderCloseButton;
Header.Title = HeaderTitle;

Header.Default = HeaderDefault;
Header.Progress = HeaderProgress;
