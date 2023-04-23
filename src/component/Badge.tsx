import { AnchorHTMLAttributes, FC } from 'react';

export interface BadgeProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  theme?:
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'danger'
    | 'info'
    | 'dark'
    | 'light';
}

const LightTheme: BadgeProps['theme'][] = ['warning', 'light'];

export const Badge: FC<BadgeProps> = ({
  theme = 'primary',
  children,
  ...props
}) => (
  <a
    {...props}
    className={`text-decoration-none d-inline-block rounded-pill px-3 py-1 bg-${theme} text-${
      LightTheme.includes(theme) ? 'dark' : 'white'
    }`}
  >
    {children}
  </a>
);
