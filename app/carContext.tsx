"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import apiService, { Car } from "./utils/API/axios";

type CarsContextType = {
  cars: Car[] | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getCarById: (id: string) => Promise<Car | null>;
};

const CarsContext = createContext<CarsContextType | undefined>(undefined);

export const CarsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await apiService.getPublicCars();
      setCars(res);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to load cars");
      setCars(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const getCarById = async (id: string) => {
    // First try local cache
    if (cars) {
      const c = cars.find((x) => String(x.id) === String(id));
      if (c) return c;
    }
    // fallback to API detail endpoint
    try {
      const res = await apiService.getCarById(id);
      return res;
    } catch (err) {
      return null;
    }
  };

  return (
    <CarsContext.Provider
      value={{
        cars,
        loading,
        error,
        refresh: fetchCars,
        getCarById,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};

export const useCars = () => {
  const ctx = useContext(CarsContext);
  if (!ctx) throw new Error("useCars must be used inside CarsProvider");
  return ctx;
};
