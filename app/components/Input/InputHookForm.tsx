import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import clsx from 'clsx';

interface InputProps {
  id: string;
  errors: FieldErrors;
  type: string;
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
}

export const Input = ({
  id,
  errors,
  type,
  required,
  minLength,
  pattern,
  register,
  placeholder,
}: InputProps) => {
  return (
    <>
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, {
          required: {
            value: required!,
            message: `${placeholder} input is required!`,
          },
          pattern: {
            value: pattern!,
            message: 'Please enter a valid email',
          },
          minLength: {
            value: minLength!,
            message: `This field must be at least ${minLength} character`,
          },
        })}
        className={clsx(
          `rounded-sm border border-[rgba(0,0,0,0.1)] px-3 py-[6px] text-black outline-none transition-all duration-150
          focus:border-[#80bdff] focus:shadow-[0_0_0_0.2rem_rgba(0,123,255,.25)]`,
          errors[id] && 'border-invalidColor'
        )}
        placeholder={placeholder}
        required={required}
      />
      <div className='absolute bottom-[calc(70%)] right-0 mt-1 text-right text-xs text-invalidColor'>
        {errors[id]?.message as string}
      </div>
    </>
  );
};
