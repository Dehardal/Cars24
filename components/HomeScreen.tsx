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
import cars24HomeUnknown from '../schema/cars24_home_with_unknown.json';

const normalData = cars24HomeNormal as SduiScreen;
const unknownData = cars24HomeUnknown as SduiScreen;

// Start the cold-open timer immediately when the file is read (represents cold start)
markStart('sdui-cold-open');

// Swapping to a fetch() later is a one-line change here
const loadScreenData = async (useUnknown: boolean): Promise<SduiScreen> => {
  markStart('sdui-json-parse');
  const data = useUnknown ? unknownData : normalData;
  markEnd('sdui-json-parse');
  return data;
};

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

  const [useUnknownSchema, setUseUnknownSchema] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const ttiRegistered = useRef(false);

  // Initialize and mark start timers on component mount or schema swap
  useEffect(() => {
    markStart('sdui-above-the-fold-TTR');
    markStart('sdui-full-page');

    loadScreenData(useUnknownSchema).then(data => {
      setScreen(data);
    });
  }, [useUnknownSchema, setScreen]);

  const handleAction = (action: any) => {
    if (!ttiRegistered.current) {
      ttiRegistered.current = true;
      markEnd('sdui-cold-open');
      console.log('[Perf Timing] SDUI TTI (Cold-Open to Tap) registered.');
    }

    executeSduiAction(action, {
      state,
      updateStateKey,
      openSheet,
      closeSheet,
      navigate,
      refetchSection,
    });
  };

  const openDebugPanel = () => {
    setDebugLogs(getPerfLogs());
    setShowDebug(true);
  };

  const handleResetLogs = () => {
    clearPerfLogs();
    setDebugLogs([]);
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

      {/* Dev-only toggle button to swap schemas dynamically */}
      <Pressable 
        style={styles.floatingToggleBtn} 
        onPress={() => setUseUnknownSchema((prev: boolean) => !prev)}
      >
        <Text style={styles.floatingText}>
          {useUnknownSchema ? '🟢 Load Normal' : '⚠️ Load Unknown'}
        </Text>
      </Pressable>

      {/* Floating Performance Logs button */}
      <Pressable style={styles.floatingBtn} onPress={openDebugPanel}>
        <Text style={styles.floatingText}>⏱️ Perf Logs</Text>
      </Pressable>

      {/* Debug Menu modal sheet */}
      <Modal visible={showDebug} transparent animationType="fade">
        <View style={styles.debugBackdrop}>
          <View style={styles.debugDialog}>
            <Text style={styles.debugTitle}>SDUI Engine Performance Mappings</Text>
            <ScrollView style={styles.debugScroll}>
              {debugLogs.length === 0 ? (
                <Text style={styles.emptyLogs}>No measurements loaded yet. Interact with the screen first.</Text>
              ) : (
                debugLogs.map((log: string, idx: number) => (
                  <Text key={idx} style={styles.logText}>
                    {log}
                  </Text>
                ))
              )}
            </ScrollView>
            <View style={styles.debugActions}>
              <Pressable style={styles.resetBtn} onPress={handleResetLogs}>
                <Text style={styles.resetText}>Reset Logs</Text>
              </Pressable>
              <Pressable style={styles.closeBtn} onPress={() => setShowDebug(false)}>
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  floatingToggleBtn: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    backgroundColor: '#EF5F3C',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 999,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    backgroundColor: '#2D3E50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 999,
  },
  floatingText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  debugBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  debugDialog: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'column',
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3E50',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#edeef0',
    paddingBottom: 8,
  },
  debugScroll: {
    flex: 1,
    marginVertical: 8,
  },
  emptyLogs: {
    fontSize: 12,
    color: '#8d716a',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  logText: {
    fontSize: 11,
    color: '#191c1e',
    marginVertical: 2,
    lineHeight: 16,
  },
  debugActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  resetBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e2e4',
  },
  resetText: {
    fontSize: 12,
    color: '#2D3E50',
    fontWeight: '600',
  },
  closeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#EF5F3C',
  },
  closeText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
