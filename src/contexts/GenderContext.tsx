"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Gender } from "@/lib/imageUtils";

interface GenderContextType {
  selectedGender: Gender | null;
  setSelectedGender: (gender: Gender | null) => void;
}

const GenderContext = createContext<GenderContextType | undefined>(undefined);

const GENDER_STORAGE_KEY = "selectedGender";

export function GenderProvider({ children }: { children: ReactNode }) {
  const [selectedGender, setSelectedGenderState] = useState<Gender | null>(
    null
  );

  // Загружаем сохраненный гендер из localStorage при инициализации
  useEffect(() => {
    const savedGender = localStorage.getItem(GENDER_STORAGE_KEY);
    if (savedGender === "MALE" || savedGender === "FEMALE") {
      setSelectedGenderState(savedGender as Gender);
    }
  }, []);

  const setSelectedGender = (gender: Gender | null) => {
    setSelectedGenderState(gender);
    if (gender) {
      localStorage.setItem(GENDER_STORAGE_KEY, gender);
    } else {
      localStorage.removeItem(GENDER_STORAGE_KEY);
    }
  };

  return (
    <GenderContext.Provider
      value={{
        selectedGender,
        setSelectedGender,
      }}
    >
      {children}
    </GenderContext.Provider>
  );
}

export const useGender = () => {
  const context = useContext(GenderContext);
  if (context === undefined) {
    throw new Error("useGender must be used within a GenderProvider");
  }
  return context;
};

