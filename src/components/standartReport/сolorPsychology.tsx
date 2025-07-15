"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";

interface ColorValue {
  name: string;
  color: string;
}

const colorValues: ColorValue[] = [
  { name: "Энергичность", color: "#F44336" },
  { name: "Самодостаточность", color: "#FF9800" },
  { name: "Успешность", color: "#FFC727" },
  { name: "Сопереживание", color: "#8BC34A" },
  { name: "Защищённость", color: "#388E3C" },
  { name: "Толерантность", color: "#303F9F" },
  { name: "Традиционность", color: "#9C27B0" },
  { name: "Гедонизм", color: "#FF69B4" },
  { name: "Гибкость", color: "#BOBECS" },
  { name: "Власть", color: "#212121" },
];

const ColorPsychology = () => {
  return (
    <div className="flex flex-col gap-1 bg-white rounded-3xl p-5 border-primary border relative pr-10">
      <Dialog>
        <DialogTrigger>
          <InfoIcon className="absolute top-5 right-5 h-7 w-7 text-green-600" />
        </DialogTrigger>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Психология цвета</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-2 mt-5">
                {colorValues.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center justify-between group"
                  >
                    <p className="text-lg font-bold">{item.name}</p>
                    <div className="relative flex items-center">
                      <div
                        className="w-20 h-10 rounded-full transition-all duration-500 ease-in-out group-hover:w-40"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <p>
        <span className="font-bold">
          Вы знали, что у каждой ценности есть свой цвет?
        </span>{" "}
        <br />
        Существует даже наука, которая изучает, как цвета влияют на нас. Мы
        подобрали для вас комбинацию цветов, которые отражают ваши самые важные
        ценности. Скачайте эту картинку и сделайте её фоном на своих
        устройствах.
      </p>
    </div>
  );
};

export default ColorPsychology;
