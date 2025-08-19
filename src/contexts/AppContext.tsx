
"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';
import { useToast } from '@/hooks/use-toast';
import type { Property } from '@/lib/types';
import { properties as initialProperties } from '@/lib/data';

type UserMode = 'student' | 'agent';

interface AppContextType {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  
  properties: Property[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (property: Property) => void;
  getPropertyById: (id: number) => Property | undefined;
  getPropertiesByAgent: (agentId: number) => Property[];

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
  const [properties, setProperties] = useState<Property[]>(initialProperties);
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

  const getPropertyById = (id: number) => properties.find(p => p.id === id);

  const getPropertiesByAgent = (agentId: number) => properties.filter(p => p.agentId === agentId);

  const addProperty = (propertyData: Omit<Property, 'id'>) => {
    setProperties(prev => {
        const newId = Math.max(...prev.map(p => p.id)) + 1;
        const newProperty: Property = { ...propertyData, id: newId };
        return [newProperty, ...prev];
    });
  };

  const updateProperty = (updatedProperty: Property) => {
    setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));
  };


  const value = {
    userMode,
    setUserMode,
    properties,
    addProperty,
    updateProperty,
    getPropertyById,
    getPropertiesByAgent,
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
