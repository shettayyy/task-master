import { forwardRef } from 'react';

export interface RadioboxProps {
  /**
   * Array of options
   *
   * @example
   *
   * const options = [
   * { value: 'red', label: 'Red' },
   * { value: 'blue', label: 'Blue' },
   * { value: 'green', label: 'Green' },
   * ];
   */
  options: Array<{
    value: string;
    label: string;
  }>;
  /**
   * Error message
   *
   * @default undefined
   *
   * @example
   *
   * 'This field is required'
   */
  error?: string;
}

/**
 * Radiobox component
 *
 * @param options - Array of options
 * @param ref - Ref for input element
 * @param restProps - Rest of the props
 *
 * @returns Radiobox component
 *
 * @example
 *
 * const options = [
 *  { value: 'red', label: 'Red' },
 *  { value: 'blue', label: 'Blue' },
 *  { value: 'green', label: 'Green' },
 * ];
 *
 * <Radiobox options={options} ref={ref} {...restProps} />
 */
export const Radiobox = forwardRef<HTMLInputElement, RadioboxProps>(
  (props, ref) => {
    const { options, error, ...restProps } = props;

    return (
      <fieldset className="space-y-2">
        <div className="flex flex-wrap justify-center gap-2">
          <legend className="sr-only">Color</legend>

          {options.map((option) => (
            <label
              key={option.value}
              htmlFor={option.value}
              className="flex cursor-pointer items-center justify-center rounded-md bg-white px-4 py-2 text-gray-900 hover:bg-orange-300 transition-all duration-200 ease-in-out has-[:checked]:border-orange-400 has-[:checked]:bg-orange-400"
            >
              <input
                type="radio"
                value={option.value}
                id={option.value}
                className="sr-only"
                ref={ref}
                {...restProps}
              />

              <p className="text-sm font-medium">{option.label}</p>
            </label>
          ))}
        </div>

        <p className="text-red-500 text-xs md:text-sm text-center">{error}</p>
      </fieldset>
    );
  }
);
