import { Button } from "@heroui/button";
import { useEffect } from "react";

type OptionSelectorProps = {
  name: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  options: { id: number; name: string }[];
  selected: number[];
  toggleOption: (id: number) => void;
  fetchData: () => void;
};

export default function OptionSelector({
  name,
  isOpen,
  setIsOpen,
  options,
  selected,
  toggleOption,
  fetchData,
}: OptionSelectorProps) {
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? "text-primary" : ""}`}
      >
        {name}
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-[688px] border rounded-lg bg-white shadow-lg p-5 flex flex-col gap-3 text-black">
          {options.map((option) => (
            <div key={option.id} className="flex items-center gap-2">
              <input
                className="w-5 h-5 border-2 border-black-500 rounded-sm checked:accent-white cursor-pointer"
                onChange={() => toggleOption(option.id)}
                type="checkbox"
                checked={selected.includes(option.id)}
              />
              {option.name}
            </div>
          ))}
          <div className="flex justify-end ">
            <Button className="w-[155px] rounded-full py-0 h-[35px] bg-primary text-white">
              არჩევა
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
