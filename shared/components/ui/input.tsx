import { cn } from '@shared/lib/utils';
import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, name, type, label, ...props }, ref) => {
    const { control } = useFormContext();

    const {
      field,
      fieldState: { error },
    } = useController({
      name: name!,
      control: control,
      defaultValue: '',
    });

    return (
      <div className="mb-4 flex flex-col">
        {label && (
          <label htmlFor={name} className="mb-1 text-xs font-medium">
            {label}
          </label>
        )}
        <input
          id={name}
          type={type}
          data-slot="input"
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            error ? 'border-red-500 focus-visible:ring-red-500/50' : '',
            className,
          )}
          {...props}
          {...field}
          ref={ref}
        />
        {error && (
          <p className="mt-[1px] text-xs font-medium text-red-500">
            {error.message}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
