import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text, Pressable, Modal } from 'react-native';
import SearchHeader from '../components/SearchHeader';
import Carousel from '../components/Carousel';
import ChipGroup from '../components/ChipGroup';
import HorizontalRail from '../components/HorizontalRail';
import TenureSelector from '../components/TenureSelector';
import IconTextRow from '../components/IconTextRow';
import CtaBanner from '../components/CtaBanner';
import SellCarSheet from '../components/SellCarSheet';
import { calculateEmiAmortization } from '../sdui/computed';
import { markStart, markEnd, getPerfLogs, clearPerfLogs } from '../perf/timing';

// Start the cold-open timer immediately when the file is read (represents cold start)
markStart('static-cold-open');

const CARS_DATABASE = [
  {
    carId: 'swift-2021',
    title: '2021 Maruti Swift',
    price: '₹6.45L',
    km: '15,000 km',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5OB2Ngr4nztYzyHD3ULJfBnyFXwAWGteRupgorZGqBZLubcsWnknHrBZWv-Lma1-osmfQwJYk5HQCKJ_I6XecOjVwG8nBef4RO4CT9P2rzCqNiiulbFGwtJJhgcaBykvSJvNKC6IyR6bmOA9VczVzbQu6Gf-6HrEGBLEbAHVX5xWQOFkPN1gJu-hWkGNWyHeZat8iuc5F4OgJA2ROJnxffErWJz3mkbrmntE45cf3_lTivsW6ur27Hw',
    category: 'hatchback',
  },
  {
    carId: 'creta-2020',
    title: '2020 Hyundai Creta',
    price: '₹12.8L',
    km: '32,000 km',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHPcOUnkBx_4feZ37LbsoRkl36Pf-Jayac86JLpQ3e1-xxQLLwMdLVKfnMDeZLHsPn3FNWd8XFPQZXbCYuVQ7MhSXYw0HNTeJ6NX4On_A3xvMfVBZ1-TCfjph-qDdt_SIL8REGKvKMZxAPwRAfsVp5T53iXUS0O956NsdTdReBGhlOc0M7KAMXHwgYC1-EdqefiTTonj6ae-5bHUYuBh3ULD9GqoOTiVj5a5_wFn1TOIIAMSQ-yKeD9g',
    category: 'suv',
  },
];

export default function HomeScreenStatic() {
  const [selectedCategory, setSelectedCategory] = useState('hatchback');
  const [tenureMonths, setTenureMonths] = useState(24);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const ttiRegistered = useRef(false);

  // Initialize and mark start timers on component mount
  useEffect(() => {
    markStart('static-above-the-fold-TTR');
    markStart('static-full-page');
  }, []);

  const registerTtiTap = () => {
    if (!ttiRegistered.current) {
      ttiRegistered.current = true;
      markEnd('static-cold-open'); // Represents TTI completion from compile to tap
      console.log('[Perf Timing] Static Screen TTI registered.');
    }
  };

  const emi = calculateEmiAmortization(500000, 9.5, tenureMonths);
  const formattedEmi = '₹' + emi.toLocaleString('en-IN');

  const filteredCars = CARS_DATABASE.filter(
    car => car.category === selectedCategory
  );

  const openDebugPanel = () => {
    setDebugLogs(getPerfLogs());
    setShowDebug(true);
  };

  const handleResetLogs = () => {
    clearPerfLogs();
    setDebugLogs([]);
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        onLayout={() => {
          markEnd('static-full-page');
        }}
      >
        <View 
          style={styles.aboveFoldWrapper}
          onLayout={() => {
            markEnd('static-above-the-fold-TTR');
          }}
        >
          {/* 1. SearchHeader Direct Component Call */}
          <SearchHeader
            props={{
              placeholder: 'Search by brand, model or budget',
              location: 'Delhi',
            }}
            actions={{
              onTap: { type: 'navigate', target: 'search_screen' },
            }}
            onAction={(action) => {
              registerTtiTap();
              if (action.type === 'navigate') {
                Alert.alert('Static Nav', `Navigating to: ${action.target}`);
              }
            }}
          />

          {/* 2. Carousel Direct Component Call */}
          <Carousel
            props={{
              autoScrollMs: 4000,
              items: [
                {
                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3Be6njH2Mp-7_rjingXEYQUGofpqTvQrst7xanUJKb2DAD5B-WioAK0nTgbwavSM3EjAH8gDaLwIgT_F0AARdIBJRo2yLUwhL8dNu8bov2-nnrPCWIxZ0ZC1gG60ic2Yy2UnPr3xNjNy13rLmWQdv515vBlamtMp0tQCm6NOgVBU4bVzwdwI0LphtRNnVjl0vmTvwJe6wQnDnfciBwACsjdZS4L3jUaVFA_RWAnp1LVyS4sX9ObWLbg',
                },
              ],
            }}
            onAction={() => {
              registerTtiTap();
              Alert.alert('Static Action', 'Carousel tap');
            }}
          />

          {/* 3. ChipGroup Direct Component Call */}
          <ChipGroup
            props={{
              selectedId: selectedCategory,
              options: [
                { id: 'hatchback', label: 'Hatchback' },
                { id: 'suv', label: 'SUV' },
                { id: 'sedan', label: 'Sedan' },
              ],
            }}
            actions={{
              onSelect: { type: 'update_state', stateKey: 'selected_category' },
            }}
            onAction={(action) => {
              registerTtiTap();
              if (action.type === 'update_state' && action.value) {
                setSelectedCategory(action.value);
              }
            }}
          />
        </View>

        {/* 4. HorizontalRail Direct Component Call */}
        <HorizontalRail
          props={{
            title: 'Recommended for you',
            itemType: 'car_card',
            items: filteredCars,
          }}
          actions={{
            onItemTap: { type: 'navigate', target: 'car_details', paramsFromItem: ['carId'] },
          }}
          onAction={(action) => {
            registerTtiTap();
            if (action.type === 'navigate') {
              Alert.alert('Static Nav', `Selected Car ID: ${action.params?.carId}`);
            }
          }}
        />

        {/* 5. TenureSelector Direct Component Call */}
        <TenureSelector
          props={{
            options: [12, 24, 36, 48],
            selectedMonths: tenureMonths,
            emiValue: formattedEmi,
          }}
          actions={{
            onSelect: { type: 'update_state', stateKey: 'tenure_months' },
          }}
          onAction={(action) => {
            registerTtiTap();
            if (action.type === 'update_state' && action.value) {
              setTenureMonths(Number(action.value));
            }
          }}
        />

        {/* 6. IconTextRow Direct Component Call */}
        <IconTextRow
          props={{
            items: [
              { icon: 'shield', label: '140 point inspection' },
              { icon: 'refresh', label: '5 day money back' },
            ],
          }}
        />

        {/* 7. CtaBanner Direct Component Call */}
        <CtaBanner
          props={{
            title: 'Sell your car',
            ctaLabel: 'Get Price',
          }}
          actions={{
            onTap: { type: 'open_sheet', sheetId: 'sell_car_sheet' },
          }}
          onAction={() => {
            registerTtiTap();
            setSheetVisible(true);
          }}
        />

        <SellCarSheet
          visible={sheetVisible}
          onClose={() => setSheetVisible(false)}
        />
      </ScrollView>

      {/* Floating Performance Logs button */}
      <Pressable style={styles.floatingBtn} onPress={openDebugPanel}>
        <Text style={styles.floatingText}>⏱️ Perf Logs</Text>
      </Pressable>

      {/* Debug Menu modal sheet */}
      <Modal visible={showDebug} transparent animationType="fade">
        <View style={styles.debugBackdrop}>
          <View style={styles.debugDialog}>
            <Text style={styles.debugTitle}>Static Screen Performance Mappings</Text>
            <ScrollView style={styles.debugScroll}>
              {debugLogs.length === 0 ? (
                <Text style={styles.emptyLogs}>No measurements loaded yet. Interact with the screen first.</Text>
              ) : (
                debugLogs.map((log, idx) => (
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

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  aboveFoldWrapper: {
    width: '100%',
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
