
"use client"

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Property } from '@/lib/types';
import { properties as initialProperties } from '@/lib/data';

interface AppContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: number) => void;
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

  recentlyViewed: number[];
  addRecentlyViewed: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [savedProperties, setSavedProperties] = useState<number[]>([]);
  const [compareProperties, setCompareProperties] = useState<number[]>([]);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);
  const { toast } = useToast();

  const toggleSavedProperty = useCallback((id: number) => {
    setSavedProperties(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  }, []);

  const isPropertySaved = useCallback((id: number) => savedProperties.includes(id), [savedProperties]);
  
  const clearSavedProperties = useCallback(() => setSavedProperties([]), []);

  const toggleCompareProperty = useCallback((id: number) => {
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
  }, [toast]);

  const isPropertyForCompare = useCallback((id: number) => compareProperties.includes(id), [compareProperties]);

  const clearCompare = useCallback(() => setCompareProperties([]), []);

  const getPropertyById = useCallback((id: number) => properties.find(p => p.id === id), [properties]);

  const getPropertiesByAgent = useCallback((agentId: number) => properties.filter(p => p.agentId === agentId), [properties]);

  const addProperty = useCallback((propertyData: Omit<Property, 'id'>) => {
    setProperties(prev => {
        const newId = Math.max(...prev.map(p => p.id), 0) + 1;
        const newProperty: Property = { ...propertyData, id: newId };
        return [newProperty, ...prev];
    });
  }, []);

  const updateProperty = useCallback((updatedProperty: Property) => {
    setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));
  }, []);
  
  const deleteProperty = useCallback((id: number) => {
    setProperties(prev => prev.filter(p => p.id !== id));
     toast({
        title: "Property Deleted",
        description: "The property has been successfully removed.",
    });
  }, [toast]);

  const addRecentlyViewed = useCallback((id: number) => {
    setRecentlyViewed(prev => {
        const newHistory = [id, ...prev.filter(pId => pId !== id)];
        return newHistory.slice(0, 4); // Keep only the last 4 viewed properties
    });
  }, []);


  const value = {
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
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
    recentlyViewed,
    addRecentlyViewed,
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
