"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';

type UserMode = 'student' | 'agent';

interface AppContextType {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  savedProperties: number[];
  toggleSavedProperty: (id: number) => void;
  isPropertySaved: (id: number) => boolean;
  compareProperties: number[];
  toggleCompareProperty: (id: number) => void;
  isPropertyForCompare: (id: number) => boolean;
  clearCompare: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userMode, setUserMode] = useLocalStorage<UserMode>('userMode', 'student');
  const [savedProperties, setSavedProperties] = useLocalStorage<number[]>('savedProperties', []);
  const [compareProperties, setCompareProperties] = useLocalStorage<number[]>('compareProperties', []);

  const toggleSavedProperty = (id: number) => {
    setSavedProperties(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const isPropertySaved = (id: number) => savedProperties.includes(id);

  const toggleCompareProperty = (id: number) => {
    setCompareProperties(prev => {
        if(prev.includes(id)) {
            return prev.filter(pId => pId !== id);
        }
        if(prev.length < 3) {
            return [...prev, id];
        }
        // Optionally, show a toast notification here that limit is 3
        return prev;
    });
  };

  const isPropertyForCompare = (id: number) => compareProperties.includes(id);

  const clearCompare = () => setCompareProperties([]);

  const value = {
    userMode,
    setUserMode,
    savedProperties,
    toggleSavedProperty,
    isPropertySaved,
    compareProperties,
    toggleCompareProperty,
    isPropertyForCompare,
    clearCompare,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
