import { FC, InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  name: string;
  id: string;
  data?: any[];
  register?: any;
  error?: string;
  showLabel?: boolean;
}

const Dropdown: FC<Props> = ({
  placeholder,
  showLabel,
  onChange,
  disabled,
  register,
  value,
  error,
  data,
  name,
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
      <select
        data-theme="light"
        className={clsx(
          'select select-bordered w-full bg-gray-50 p-2 text-black shadow-md focus:border-alta-space-cadet focus:outline-none focus:ring-1 focus:ring-alta-space-cadet disabled:bg-slate-200',
          error && 'border-red-500'
        )}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...(register ? register(name) : {})}
        {...props}
      >
        <option disabled>{placeholder}</option>
        {data ? (
          data.map(({ label: optionLabel, value: optionValue }) => (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          ))
        ) : (
          <option>No data available</option>
        )}
      </select>
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

export default Dropdown;
