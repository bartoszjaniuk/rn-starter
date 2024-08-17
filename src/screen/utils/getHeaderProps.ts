import { HeaderProps } from '../providers';

export const getHeaderProps = (node: React.ReactNode): Partial<HeaderProps> => {
  return node !== undefined &&
    node !== null &&
    typeof node === 'object' &&
    'type' in node &&
    // @ts-expect-error: this_is_fine.png
    node.type.__type__ === 'Header'
    ? (node.props as HeaderProps)
    : {};
};
