import { PropsWithChildren } from 'react';
import * as React from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { PortalProvider } from '@gorhom/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './AuthContext';
import { FontLoader } from './FontLoader';

const queryClient = new QueryClient();

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <FontLoader>
      <KeyboardProvider statusBarTranslucent={true} navigationBarTranslucent={true}>
        <ActionSheetProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <PortalProvider>{children}</PortalProvider>
            </AuthProvider>
          </QueryClientProvider>
        </ActionSheetProvider>
      </KeyboardProvider>
    </FontLoader>
  );
};

// import Toast from 'react-native-toast-message';

// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { PortalProvider } from '@gorhom/portal';
// import { toastConfig } from '@qiwa-mobile/core/components';
// import {
//   CurrentUserProvider,
//   HeaderHeightProvider,
//   LocaleProvider,
//   QueryClientProvider,
//   Services,
//   ServicesProvider,
// } from '@qiwa-mobile/core/providers';
// import { DesignSystemFontLoader } from '@takamol/qiwa-mobile-design-system/utils/designSystemFontLoader';

// type Props = React.PropsWithChildren<{
//   services: Services;
// }>;

// export const HostProvider = (props: Props) => {
//   const { services, children } = props;
//   return (
// <KeyboardProvider statusBarTranslucent={true} navigationBarTranslucent={true}>
//       <ServicesProvider value={services}>
//         <DesignSystemFontLoader>
//           <QueryClientProvider>
//             <LocaleProvider>
//               <PortalProvider>
//                 <CurrentUserProvider>
//                   <BottomSheetModalProvider>
//                     <HeaderHeightProvider>
//                       {children}
//                       <Toast config={toastConfig} />
//                     </HeaderHeightProvider>
//                   </BottomSheetModalProvider>
//                 </CurrentUserProvider>
//               </PortalProvider>
//             </LocaleProvider>
//           </QueryClientProvider>
//         </DesignSystemFontLoader>
//       </ServicesProvider>
//     </KeyboardProvider>
//   );
// };
