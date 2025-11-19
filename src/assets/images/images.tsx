import { forwardRef, type SVGProps } from 'react';

import xIcon from './x_icon.svg?react'
import MarkerIcon from './marker_icon.svg?react'
import PhoneIcon from './phone_icon.svg?react'
import MailIcon from './mail_icon.svg?react'
import JobIcon from './job_icon.svg?react'
import ArrowIcon from './ArrowRight_Icon.svg?react'

const ICONS = {
  XIcon: xIcon,
  MarkerIcon: MarkerIcon,
  PhoneIcon: PhoneIcon,
  MailIcon: MailIcon,
  JobIcon:JobIcon,
  ArrowIcon: ArrowIcon
} as const;

type Props = {
  name: IconName;
  size?: number | string;
  decorative?: boolean; 
  title?: string;      
  customStyle?: React.CSSProperties;
  fill? : string;
  color?: string;
} & SVGProps<SVGSVGElement>;

export type IconName = keyof typeof ICONS;

export const AppImage = forwardRef<SVGSVGElement, Props>(function AppIcon(
  { name, decorative = false, title, customStyle, fill, color,...rest },
  ref
) {
  const Svg = ICONS[name];
  const aria = decorative
    ? { role: 'img', 'aria-hidden': true }
    : { role: 'img', 'aria-label': title ?? name };

  const { ...restProps } = rest
  const defaultStyle: React.CSSProperties = {
    color: color ||"currentColor",
    flexShrink:0
  };

  return (
    <Svg
      ref={ref}
      {...aria}
      {...restProps}
      fill={fill ?? 'none'}
      style={{ ...defaultStyle,...customStyle }}
    />
  );
});