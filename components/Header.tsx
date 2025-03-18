"use client";
import { Button } from "@heroui/button";
import Image from "next/image";
export default function Header() {
  return (
    <header className="flex flex-row justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-fredoka text-primary font-semibold">
          Momentum
        </h1>
        <Image src="/Hourglass.svg" alt="Hourglass" width={38} height={38} />
      </div>
      <div className="flex flex-row gap-6">
        <Button className="px-6 border border-primary bg-white rounded-md">
          თანამშრომლის შექმნა
        </Button>
        <Button className="px-6 bg-primary text-white rounded-md">
          + შექმენი ახალი დავალება
        </Button>
      </div>
    </header>
  );
}
