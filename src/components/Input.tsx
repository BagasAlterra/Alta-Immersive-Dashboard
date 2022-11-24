import { FC, InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  id: string;
  register?: any;
  error?: string;
  label?: string;
  showLabel?: boolean;
}

const Input: FC<Props> = ({
  placeholder,
  showLabel,
  register,
  onChange,
  disabled,
  label,
  value,
  error,
  name,
  type,
  id,
  ...props
}) => {
  return (
    <div className="form-control w-full">
      {showLabel && (
        <label className="label">
          <span className="label-text">{placeholder}</span>
        </label>
      )}
      <input
        className={clsx(
          'input input-bordered w-full bg-gray-50 p-2 text-black shadow-md focus:border-alta-space-cadet focus:outline-none focus:ring-1 focus:ring-alta-space-cadet disabled:bg-slate-200',
          error && 'border-red-500'
        )}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && (
        <label className="label">
          <p className="text-neutral-500 break-words text-sm font-light">
            {error}
          </p>
        </label>
      )}
    </div>
  );
};

export default Input;
