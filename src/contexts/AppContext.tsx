
"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';
import { useToast } from '@/hooks/use-toast';

type UserMode = 'student' | 'agent';

interface AppContextType {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  savedProperties: number[];
  toggleSavedProperty: (id: number) => void;
  isPropertySaved: (id: number) => boolean;
  clearSavedProperties: () => void;
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
  const { toast } = useToast();

  const toggleSavedProperty = (id: number) => {
    setSavedProperties(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const isPropertySaved = (id: number) => savedProperties.includes(id);
  
  const clearSavedProperties = () => setSavedProperties([]);

  const toggleCompareProperty = (id: number) => {
    setCompareProperties(prev => {
        if(prev.includes(id)) {
            return prev.filter(pId => pId !== id);
        }
        if(prev.length < 3) {
            return [...prev, id];
        } else {
            toast({
              variant: "destructive",
              title: "Comparison Limit Reached",
              description: "You can only compare up to 3 properties at a time.",
            });
            return prev;
        }
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
    clearSavedProperties,
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
