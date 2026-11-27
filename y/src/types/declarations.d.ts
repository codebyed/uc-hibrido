declare module 'lucide-react-native' {
  import { FC } from 'react';
  import { SvgProps } from 'react-native-svg';

  export interface IconProps extends SvgProps {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }

  export const Heart: FC<IconProps>;
  export const MessageCircle: FC<IconProps>;
  export const Eye: FC<IconProps>;
  export const EyeOff: FC<IconProps>;
  export const Ellipsis: FC<IconProps>;
  export const ChevronLeft: FC<IconProps>;
  export const ChevronRight: FC<IconProps>;
  export const Share2: FC<IconProps>;
  export const UserPlus: FC<IconProps>;
  export const UserCheck: FC<IconProps>;
  export const User: FC<IconProps>;
  export const BellOff: FC<IconProps>;
  export const Flag: FC<IconProps>;
  export const X: FC<IconProps>;
  export const ArrowUp: FC<IconProps>;
  export const House: FC<IconProps>;
  export const Search: FC<IconProps>;
  export const LayoutGrid: FC<IconProps>;
  export const Signal: FC<IconProps>;
  export const Wifi: FC<IconProps>;
  export const BatteryFull: FC<IconProps>;
  export const Mail: FC<IconProps>;
  export const Lock: FC<IconProps>;
  export const LogOut: FC<IconProps>;

  const icons: { [key: string]: FC<IconProps> };
  export default icons;
}
