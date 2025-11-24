import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface SelectOption {
  value: string;
  label: string;
  slug?: string;
}

interface SelectProps {
  label?: string;
  labelStyles?: string;
  name: string;
  options: SelectOption[];
  required?: boolean;
  placeholder?: string;
  value?: string | string[];
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement> & {
      target: { name: string; value: string | string[] };
    }
  ) => void;
  classNames?: string;
  disabled?: boolean;
  error?: string;
  parentStyles?: string;
  mode?: "single" | "multiple";
  searchable?: boolean;
  searchPlaceholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  labelStyles,
  name,
  options,
  required = false,
  placeholder = "Select an option...",
  value = "",
  onChange,
  classNames = "",
  disabled = false,
  error = "",
  parentStyles,
  mode = "single",
  searchable = true,
  searchPlaceholder = "Search...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize state directly without useEffect - this is the key fix
  const [selectedValue, setSelectedValue] = useState<string | string[]>(() => {
    if (mode === "multiple") {
      return Array.isArray(value) ? value : [];
    } else {
      return typeof value === "string" ? value : "";
    }
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
      if (!isOpen) {
        setSearchTerm("");
      }
    }
  };

  const handleSingleSelect = (selected: string) => {
    setSelectedValue(selected);
    setIsOpen(false);
    setSearchTerm("");
    if (onChange) {
      onChange({
        target: { name, value: selected },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleMultipleSelect = (selected: string) => {
    const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
    let newValues: string[];

    if (currentValues.includes(selected)) {
      newValues = currentValues.filter((val) => val !== selected);
    } else {
      newValues = [...currentValues, selected];
    }

    setSelectedValue(newValues);

    if (onChange) {
      onChange({
        target: { name, value: newValues },
      } as React.ChangeEvent<HTMLInputElement> & {
        target: { name: string; value: string[] };
      });
    }
  };

  const getDisplayValue = () => {
    if (mode === "multiple") {
      const values = Array.isArray(selectedValue) ? selectedValue : [];
      if (values.length === 0) return placeholder;

      const selectedLabels = values
        .map((value) => {
          const option = options.find((opt) => opt.value === value);
          return option ? option.label : value;
        })
        .join(", ");

      return selectedLabels;
    } else {
      if (!selectedValue) return placeholder;
      const option = options.find((opt) => opt.value === selectedValue);
      return option ? option.label : selectedValue;
    }
  };

  const isOptionSelected = (optionValue: string) => {
    if (mode === "multiple") {
      const values = Array.isArray(selectedValue) ? selectedValue : [];
      return values.includes(optionValue);
    }
    return selectedValue === optionValue;
  };

  const filteredOptions =
    searchable && searchTerm
      ? options.filter(
          (option) =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            option.value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

  return (
    <div className={twMerge("relative w-full", parentStyles)} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={name}
          className={twMerge(
            `block text-sm font-semibold text-gray-700 mb-2`,
            labelStyles
          )}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`w-full px-4 py-3 rounded-xl border text-black focus:ring-1 cursor-pointer focus:ring-blue-sec focus:outline-none bg-[#F9F9F9F9] ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } ${classNames} relative`}
        onClick={toggleDropdown}
      >
        <input
          id={name}
          name={name}
          type="text"
          value={getDisplayValue()}
          readOnly
          placeholder={placeholder}
          className="w-full text-sm bg-transparent border-none focus:outline-none cursor-pointer truncate pr-8"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
          <ChevronDown />
        </div>
      </div>

      {isOpen && (
        <div
          className={`absolute left-0 w-full rounded-md shadow-lg bg-white border border-gray-300 max-h-48 overflow-y-auto transition-all duration-500`}
          style={{ zIndex: 10 }}
        >
          {searchable && (
            <div className="px-3 py-2 border-b border-gray-200 sticky top-0 bg-white z-10">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, idx) => (
              <div
                key={idx}
                className={`px-5 py-3 text-sm cursor-pointer hover:bg-gray-100 ${
                  mode === "multiple" ? "flex items-center gap-3" : ""
                }`}
                onClick={() =>
                  mode === "multiple"
                    ? handleMultipleSelect(option.value)
                    : handleSingleSelect(option.value)
                }
              >
                {mode === "multiple" && (
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isOptionSelected(option.value)}
                      onChange={() => {}} // Handled by parent onClick
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 border-2 border-gray-300 rounded flex items-center justify-center ${
                        isOptionSelected(option.value)
                          ? "bg-blue-primary border-blue-primary"
                          : "bg-white"
                      }`}
                    >
                      {isOptionSelected(option.value) && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                )}
                <span
                  className={
                    isOptionSelected(option.value) && mode === "single"
                      ? "font-medium"
                      : ""
                  }
                >
                  {option.label}
                </span>
              </div>
            ))
          ) : (
            <div className="px-5 py-3 text-sm text-gray-500 text-center">
              No options found
            </div>
          )}
        </div>
      )}

      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default Select;
