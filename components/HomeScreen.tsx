import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Modal } from 'react-native';
import { SduiStateProvider, useSdui } from '../sdui/SduiStateProvider';
import SduiRenderer from '../sdui/SduiRenderer';
import { executeSduiAction } from '../sdui/actionEngine';
import SellCarSheet from './SellCarSheet';
import { SduiScreen } from '../schema/types';
import { markStart, markEnd, getPerfLogs, clearPerfLogs } from '../perf/timing';

// Static JSON imports to satisfy TS compilation and Metro bundler out-of-the-box
import cars24HomeNormal from '../schema/cars24_home.json';

const normalData = cars24HomeNormal as SduiScreen;

// Start the cold-open timer immediately when the file is read (represents cold start)
markStart('sdui-cold-open');

function HomeScreenContent() {
  const { 
    screen,
    state, 
    computed, 
    sheetVisible, 
    setScreen, 
    updateStateKey, 
    openSheet, 
    closeSheet, 
    navigate,
    refetchSection
  } = useSdui();

  // Initialize and mark start timers on component mount
  useEffect(() => {
    markStart('sdui-above-the-fold-TTR');
    markStart('sdui-full-page');
    setScreen(normalData);
  }, [setScreen]);

  const handleAction = (action: any) => {
    executeSduiAction(action, {
      state,
      updateStateKey,
      openSheet,
      closeSheet,
      navigate,
      refetchSection,
    });
  };

  if (!screen) return null;

  return (
    <View style={styles.container}>
      <SduiRenderer
        screen={screen}
        state={state}
        computed={computed}
        onAction={handleAction}
      />
      
      <SellCarSheet
        visible={!!sheetVisible['sell_car_sheet']}
        onClose={closeSheet}
      />
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SduiStateProvider>
      <HomeScreenContent />
    </SduiStateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
});
