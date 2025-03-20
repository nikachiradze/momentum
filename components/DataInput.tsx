"use client";

import { Input } from "@heroui/input";
import { on } from "events";
import Image from "next/image";
import Vector from "./icons/Vector";

type DataInputProps = {
  label: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: { min: boolean; max: boolean };
};

export default function dataInput({
  label,
  value,
  name,
  onChange,
  isValid,
}: DataInputProps) {
  return (
    <div className="w-2/3">
      <label htmlFor="name">{label}</label>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        className="border border-grey rounded-md !bg-white ![&>*]:bg-white"
      />
      <div className="flex flex-row gap-1 items-center">
        <Vector color={isValid.min ? "#4DC591" : "#6C757D"} />
        <span
          className={`text-[10px] ${isValid.min ? "text-green-500" : "text-darkGrey"}`}
        >
          მინიმუმ 2 სიმბოლო
        </span>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <Vector color={isValid.max ? "#4DC591" : "#6C757D"} />
        <span
          className={`text-[10px] ${isValid.max ? "text-green-500" : "text-darkGrey"}`}
        >
          მაქსიმუმ 255 სიმბოლო
        </span>
      </div>
    </div>
  );
}
