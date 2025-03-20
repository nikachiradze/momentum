import { Button } from "@heroui/button";
import { useEffect } from "react";
import Image from "next/image";
import { Employee } from "@/app/Tasks/page";
type OptionSelectorProps = {
  name: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  options: Employee[];
  selected: number;
  toggleOption: (id: number) => void;
  fetchData: () => void;
};

export default function SingleOptionSelector({
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
  }, [isOpen]);

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
                checked={selected === option.id}
              />
              <Image
                src={option.avatar}
                alt={option.name}
                width={20}
                height={20}
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
