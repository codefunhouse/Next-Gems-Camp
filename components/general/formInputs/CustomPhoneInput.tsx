// components/general/inputs/CustomPhoneInput.tsx
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface CustomPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export function CustomPhoneInput({
  value,
  onChange,
  label,
  error,
  required,
  placeholder,
}: CustomPhoneInputProps) {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="block text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <PhoneInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        // defaultCountry="ae"
        className="focus:ring-1 focus:ring-blue-sec focus:border-blue-sec focus:outline-none rounded-l-xl!"
        inputClassName="w-full px-4! py-5! rounded-r-xl! text-black border border-gray-300 focus:ring-1 focus:ring-blue-sec focus:border-blue-sec focus:outline-none transition-colors"
        countrySelectorStyleProps={{
          buttonClassName:
            "px-4! py-5! border-r border-gray-300 rounded-l-xl! bg-white! hover:bg-gray-100 focus:ring-1 focus:ring-blue-sec focus:border-blue-sec focus:outline-none ",
          dropdownStyleProps: {
            className:
              "z-50 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-xl!",
          },
        }}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
