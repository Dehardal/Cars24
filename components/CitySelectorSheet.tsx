import React, { useRef } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Animated 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CitySelectorSheetProps {
  visible: boolean;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onClose: () => void;
}

const CITIES = [
  'Delhi NCR',
  'Bengaluru',
  'Mumbai',
  'Pune',
  'Hyderabad',
  'Chennai',
];

const CityOption = ({ 
  city, 
  isSelected, 
  onSelect 
}: { 
  city: string; 
  isSelected: boolean; 
  onSelect: (city: string) => void;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1.0, useNativeDriver: true, friction: 3 }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onSelect(city)}
      style={styles.optionWrapper}
    >
      <Animated.View style={[styles.option, isSelected ? styles.selectedOption : null, { transform: [{ scale }] }]}>
        <Feather 
          name="map-pin" 
          size={14} 
          color={isSelected ? '#EF5F3C' : '#8d716a'} 
        />
        <Text style={[styles.optionText, isSelected ? styles.selectedOptionText : null]}>
          {city}
        </Text>
        {isSelected && (
          <Feather name="check" size={14} color="#EF5F3C" style={styles.checkIcon} />
        )}
      </Animated.View>
    </Pressable>
  );
};

export default function CitySelectorSheet({ 
  visible, 
  selectedCity, 
  onSelectCity, 
  onClose 
}: CitySelectorSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} pointerEvents="auto">
          {/* Drag Handle */}
          <View style={styles.dragHandle} />
          
          {/* Close button */}
          <Pressable style={styles.closeBtn} onPress={onClose}>
            <Feather name="x" size={16} color="#59413b" />
          </Pressable>

          <View style={styles.content}>
            <Text style={styles.title}>Select Your City</Text>
            <Text style={styles.subtitle}>Find cars available in your location</Text>

            <View style={styles.grid}>
              {CITIES.map(city => (
                <CityOption
                  key={city}
                  city={city}
                  isSelected={city.toLowerCase() === selectedCity.toLowerCase() || (selectedCity.toLowerCase() === 'delhi' && city === 'Delhi NCR')}
                  onSelect={(val) => {
                    onSelectCity(val);
                    onClose();
                  }}
                />
              ))}
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(45, 62, 80, 0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    paddingHorizontal: 16,
    position: 'relative',
  },
  dragHandle: {
    width: 48,
    height: 4,
    backgroundColor: '#e1e2e4',
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 12,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f2f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingTop: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3E50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#4f6073',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  grid: {
    width: '100%',
    flexDirection: 'column',
    gap: 10,
  },
  optionWrapper: {
    width: '100%',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fb',
    borderWidth: 1,
    borderColor: '#e1e2e4',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    gap: 12,
    position: 'relative',
  },
  selectedOption: {
    borderColor: '#EF5F3C',
    backgroundColor: 'rgba(239, 95, 60, 0.05)',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3E50',
  },
  selectedOptionText: {
    color: '#EF5F3C',
    fontWeight: '700',
  },
  checkIcon: {
    position: 'absolute',
    right: 16,
  },
});
