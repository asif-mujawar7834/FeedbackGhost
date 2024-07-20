import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface FormInputProps {
  control: any;
  error?: string;
  placeholder: string;
  label?: string;
  name: string;
  type: string;
  disabled?: boolean;
  required?: boolean;
}

export default function FormInput({
  control,
  error,
  placeholder,
  label,
  name,
  type,
  disabled,
  required = false,
}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-black font-bold">
            {label}
            {required && label && <span className="ml-2 text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className={
                error
                  ? "outline outline-1 outline-red-500"
                  : "outline outline-1 outline-gray-700"
              }
              disabled={disabled}
            />
          </FormControl>
          {error && <FormMessage>{error}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
