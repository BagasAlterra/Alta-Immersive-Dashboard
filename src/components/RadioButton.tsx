import { InputHTMLAttributes, FC } from 'react';
import { clsx } from 'clsx';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  id: string;
  register?: any;
  error?: string;
  placeholder?: string;
  showLabel?: boolean;
  data?: any[];
  vertical?: boolean;
}

const RadioButton: FC<Props> = ({
  placeholder,
  data = [],
  vertical,
  register,
  disabled,
  showLabel,
  error,
  value,
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
      <div className={clsx('flex w-1/2 gap-3', vertical && 'flex-col')}>
        {data.map(({ label: optionLabel, value: optionValue }, index) => (
          <label
            key={index}
            className="flex w-full cursor-pointer items-center"
          >
            <input
              data-theme="light"
              {...(register ? register(name) : {})}
              {...props}
              className="radio mr-2 checked:bg-alta-orange"
              type="radio"
              id={index}
              name={name}
              value={optionValue}
              disabled={disabled}
              checked={value ? optionValue === value : true}
            />
            <span className="label-text">{optionLabel}</span>
          </label>
        ))}
      </div>
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

export default RadioButton;
