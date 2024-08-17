import { PropsWithChildren } from 'react';
import * as React from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <KeyboardProvider statusBarTranslucent={true} navigationBarTranslucent={true}>
      {children}
    </KeyboardProvider>
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
