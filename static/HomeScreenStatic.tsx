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
import CitySelectorSheet from '../components/CitySelectorSheet';
import SideDrawer from '../components/SideDrawer';
import SearchSheet from '../components/SearchSheet';
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
  const [location, setLocation] = useState('Delhi');
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const [searchSheetVisible, setSearchSheetVisible] = useState(false);
  // Initialize and mark start timers on component mount
  useEffect(() => {
    markStart('static-above-the-fold-TTR');
    markStart('static-full-page');
  }, []);

  const emi = calculateEmiAmortization(500000, 9.5, tenureMonths);
  const formattedEmi = '₹' + emi.toLocaleString('en-IN');

  const filteredCars = CARS_DATABASE.filter(
    car => car.category === selectedCategory
  );

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
              location: location,
            }}
            actions={{
              onTap: { type: 'navigate', target: 'search_screen' },
              onLocationTap: { type: 'open_sheet', sheetId: 'city_selector_sheet' },
              onMenuTap: { type: 'open_sheet', sheetId: 'side_menu' },
            }}
            onAction={(action) => {
              if (action.type === 'navigate') {
                Alert.alert('Static Nav', `Navigating to: ${action.target}`);
              } else if (action.type === 'open_sheet') {
                if (action.sheetId === 'city_selector_sheet') {
                  setCityModalVisible(true);
                } else if (action.sheetId === 'side_menu') {
                  setSideMenuVisible(true);
                } else if (action.sheetId === 'search_sheet') {
                  setSearchSheetVisible(true);
                }
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
                  title: 'Exchange Bonus',
                  subtitle: 'Get up to ₹50,000 extra value',
                },
                {
                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd2_FvObtq6L_CoT4pwP8TC9bZBlKhpiMLzVrMIdza7zBz1ujh4gGJGBgtc8tQgdCEynVnnn1N3JIQApXyBORqC_KM9CUacmr_NuzsF1Y3QRUcFfd0NGTk0jUSRhLdXAcJ4HiKEQwnrcCZVJhqDvJn-7qO9mCCSIUedYjnbS9RV8q781geTK3h-FZqcJ0-VM6OAeUSDGWItCoIGs-6QlSDsWntg_gvEyEG8YZkNgWmA87BMTv2YKFDjQ',
                  title: 'Zero Downpayment',
                  subtitle: 'Drive home today with instant approvals',
                },
                {
                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnQ3vjz6AjCgstDroHpWA16V6tvyCjkjn9IgOROkOtny8E-DNGe-9dB4dZi18Jqs7ZV-MiulGDZR6bgRIFv_raoWCoy8aapPs-qvT9eDMdkA4sli2VmmXpzri7wK00CQKgE3jdFBBz-HbF7Ux0x68UhzpebpZLKt3UyJ7nfsB8wbRRfFZEEu90iCsBm_VyWaKxQXXyyQp5t0MpizNqJDyXXYeR99wVHuECTDoDF6FLLSQ3Gqa7EQePpg',
                  title: 'Free Warranty',
                  subtitle: '1 Year comprehensive coverage',
                },
              ],
            }}
            onAction={() => {
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
            setSheetVisible(true);
          }}
        />

        <SellCarSheet
          visible={sheetVisible}
          onClose={() => setSheetVisible(false)}
        />

        <CitySelectorSheet
          visible={cityModalVisible}
          selectedCity={location}
          onSelectCity={setLocation}
          onClose={() => setCityModalVisible(false)}
        />

        <SideDrawer
          visible={sideMenuVisible}
          onClose={() => setSideMenuVisible(false)}
        />

        <SearchSheet
          visible={searchSheetVisible}
          onClose={() => setSearchSheetVisible(false)}
        />
      </ScrollView>
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
});
