import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SduiScreen, SduiSection } from '../schema/types';
import { resolveComputedFields } from './computed';

interface SduiContextType {
  screen: SduiScreen | null;
  state: Record<string, any>;
  computed: Record<string, any>;
  sheetVisible: Record<string, boolean>;
  activeRoute: string;
  navigationParams: Record<string, any>;
  updateStateKey: (key: string, value: any, recomputeKeys?: string[]) => void;
  openSheet: (sheetId: string) => void;
  closeSheet: () => void;
  navigate: (target: string, params?: Record<string, any>) => void;
  setScreen: (screen: SduiScreen) => void;
  refetchSection: (sectionId: string) => void;
}

const SduiContext = createContext<SduiContextType | undefined>(undefined);

export function SduiStateProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreenState] = useState<SduiScreen | null>(null);
  const [state, setState] = useState<Record<string, any>>({});
  const [computed, setComputed] = useState<Record<string, any>>({});
  const [sheetVisible, setSheetVisible] = useState<Record<string, boolean>>({});
  const [activeRoute, setActiveRoute] = useState<string>('home');
  const [navigationParams, setNavigationParams] = useState<Record<string, any>>({});

  // Initialize state keys from screen definitions when screen is loaded
  useEffect(() => {
    if (screen && screen.state) {
      setState(prev => ({
        ...screen.state,
        ...prev,
      }));
    }
  }, [screen]);

  // Recalculate computed definitions automatically on state/screen updates
  useEffect(() => {
    if (!screen) return;
    
    let mergedComputedDefs: Record<string, any> = {};
    screen.sections.forEach(section => {
      if (section.computed) {
        mergedComputedDefs = {
          ...mergedComputedDefs,
          ...section.computed,
        };
      }
    });
    
    const nextComputed = resolveComputedFields(mergedComputedDefs, state);
    setComputed(nextComputed);
  }, [state, screen]);

  // Listen to selected_category updates to trigger recommended rail refetches dynamically!
  useEffect(() => {
    if (!screen) return;
    
    const activeCategory = state.selected_category ?? 'hatchback';
    console.log(`[SDUI State useEffect] selected_category changed to: "${activeCategory}". Auto-refetching car_rail.`);

    const hatchbacks = [
      { 
        carId: 'swift-2021', 
        title: '2021 Maruti Swift', 
        price: '₹6.45L', 
        km: '15,000 km', 
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5OB2Ngr4nztYzyHD3ULJfBnyFXwAWGteRupgorZGqBZLubcsWnknHrBZWv-Lma1-osmfQwJYk5HQCKJ_I6XecOjVwG8nBef4RO4CT9P2rzCqNiiulbFGwtJJhgcaBykvSJvNKC6IyR6bmOA9VczVzbQu6Gf-6HrEGBLEbAHVX5xWQOFkPN1gJu-hWkGNWyHeZat8iuc5F4OgJA2ROJnxffErWJz3mkbrmntE45cf3_lTivsW6ur27Hw' 
      }
    ];
    
    const suvs = [
      { 
        carId: 'creta-2020', 
        title: '2020 Hyundai Creta', 
        price: '₹12.8L', 
        km: '32,000 km', 
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHPcOUnkBx_4feZ37LbsoRkl36Pf-Jayac86JLpQ3e1-xxQLLwMdLVKfnMDeZLHsPn3FNWd8XFPQZXbCYuVQ7MhSXYw0HNTeJ6NX4On_A3xvMfVBZ1-TCfjph-qDdt_SIL8REGKvKMZxAPwRAfsVp5T53iXUS0O956NsdTdReBGhlOc0M7KAMXHwgYC1-EdqefiTTonj6ae-5bHUYuBh3ULD9GqoOTiVj5a5_wFn1TOIIAMSQ-yKeD9g' 
      }
    ];
    
    const sedans = [
      { 
        carId: 'city-2019', 
        title: '2019 Honda City', 
        price: '₹8.95L', 
        km: '41,000 km', 
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5OB2Ngr4nztYzyHD3ULJfBnyFXwAWGteRupgorZGqBZLubcsWnknHrBZWv-Lma1-osmfQwJYk5HQCKJ_I6XecOjVwG8nBef4RO4CT9P2rzCqNiiulbFGwtJJhgcaBykvSJvNKC6IyR6bmOA9VczVzbQu6Gf-6HrEGBLEbAHVX5xWQOFkPN1gJu-hWkGNWyHeZat8iuc5F4OgJA2ROJnxffErWJz3mkbrmntE45cf3_lTivsW6ur27Hw' 
      }
    ];
    
    const nextItems = activeCategory === 'suv' ? suvs : activeCategory === 'sedan' ? sedans : hatchbacks;
    
    setScreenState(prev => {
      if (!prev) return null;
      
      const railSection = prev.sections.find(sec => sec.id === 'car_rail');
      if (railSection && railSection.type === 'horizontal_rail' && JSON.stringify(railSection.props.items) === JSON.stringify(nextItems)) {
        return prev;
      }

      return {
        ...prev,
        sections: prev.sections.map((sec: SduiSection) => {
          if (sec.id === 'car_rail' && sec.type === 'horizontal_rail') {
            return {
              ...sec,
              props: {
                ...sec.props,
                items: nextItems,
              }
            };
          }
          return sec;
        })
      };
    });
  }, [state.selected_category, screen]);

  const updateStateKey = useCallback((key: string, value: any, recomputeKeys?: string[]) => {
    setState(prev => ({
      ...prev,
      [key]: value,
    }));
    console.log(`[SDUI State] Key "${key}" updated to:`, value, recomputeKeys ? `(recompute: ${recomputeKeys.join(', ')})` : '');
  }, []);

  const openSheet = useCallback((sheetId: string) => {
    setSheetVisible(prev => ({
      ...prev,
      [sheetId]: true,
    }));
  }, []);

  const closeSheet = useCallback(() => {
    setSheetVisible({});
  }, []);

  const navigate = useCallback((target: string, params?: Record<string, any>) => {
    setActiveRoute(target);
    setNavigationParams(params || {});
  }, []);

  const setScreen = useCallback((newScreen: SduiScreen) => {
    setScreenState(newScreen);
  }, []);

  const refetchSection = useCallback((sectionId: string) => {
    console.log(`[SDUI State] Simulating refetch callback for: "${sectionId}"`);
  }, []);

  return (
    <SduiContext.Provider
      value={{
        screen,
        state,
        computed,
        sheetVisible,
        activeRoute,
        navigationParams,
        updateStateKey,
        openSheet,
        closeSheet,
        navigate,
        setScreen,
        refetchSection,
      }}
    >
      {children}
    </SduiContext.Provider>
  );
}

export function useSdui() {
  const context = useContext(SduiContext);
  if (!context) {
    throw new Error('useSdui must be used within an SduiStateProvider');
  }
  return context;
}
