import { FC, ButtonHTMLAttributes, LabelHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: string;
  fill?: boolean;
  label: string;
  id: string;
}

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  loading?: boolean;
  variant?: string;
  fill?: boolean;
  label: string;
  id: string;
  htmlFor?: string;
}

const COLORS: any = {
  primary:
    'bg-alta-orange border-alta-orange hover:bg-alta-orange/80 hover:border-alta-orange text-white',
  secondary:
    'bg-slate-50 hover:bg-slate-200 hover:border-alta-orange text-alta-orange border-alta-orange',
};

const Button: FC<Props> = ({
  variant = 'primary',
  type = 'button',
  onClick,
  loading,
  label,
  fill,
  id,
  ...props
}) => {
  return (
    <button
      data-theme="light"
      id={id}
      className={clsx(
        'btn rounded-xl',
        loading && 'cursor-not-allowed',
        fill && 'w-full',
        COLORS[variant]
      )}
      onClick={onClick}
      disabled={loading}
      type={type}
      {...props}
    >
      {label}
    </button>
  );
};

const ButtonLabel: FC<LabelProps> = ({
  variant = 'primary',
  onClick,
  loading,
  htmlFor,
  label,
  fill,
  id,
  ...props
}) => {
  return (
    <label
      htmlFor={htmlFor}
      id={id}
      className={clsx(
        'btn rounded-xl',
        loading && 'cursor-not-allowed',
        fill && 'w-full',
        COLORS[variant]
      )}
      onClick={onClick}
      {...props}
    >
      {label}
    </label>
  );
};

export default Button;
export { Button, ButtonLabel };
