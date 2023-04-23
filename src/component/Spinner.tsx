import { Spin, SpinProps } from 'antd';
import { FC } from 'react';

export interface SpinnerProps extends SpinProps {
  ratio?: '1x1' | '4x3' | '16x9' | '21x9';
}

export const Spinner: FC<SpinnerProps> = ({
  className = '',
  style,
  ratio = '1x1',
  ...props
}) => (
  <div
    className={`ratio ratio-${ratio} d-flex justify-content-center align-items-center ${className}`}
    style={style}
  >
    <Spin {...props} className="position-static" />
  </div>
);
