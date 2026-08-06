import React, { useState, useRef } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  TextInput, 
  Alert, 
  ActivityIndicator,
  Animated 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SellCarSheetProps {
  visible: boolean;
  onClose: () => void;
}

export default function SellCarSheet({ visible, onClose }: SellCarSheetProps) {
  const [carNumber, setCarNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const btnScale = useRef(new Animated.Value(1)).current;

  const handleBtnPressIn = () => {
    Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true }).start();
  };

  const handleBtnPressOut = () => {
    Animated.spring(btnScale, { toValue: 1.0, useNativeDriver: true, friction: 3 }).start();
  };

  const validateCarNumber = (val: string) => {
    const clean = val.replace(/\s+/g, '').toUpperCase();
    const regex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
    return regex.test(clean);
  };

  const handleGetPrice = () => {
    if (!carNumber.trim()) {
      Alert.alert('Error', 'Please enter your car registration number.');
      return;
    }
    if (!validateCarNumber(carNumber)) {
      Alert.alert('Error', 'Please enter a valid Indian registration number (e.g., KA 03 MS 1234).');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Valuation Submitted',
        `Success! Custom valuation request submitted for "${carNumber.toUpperCase()}". A specialist will contact you shortly.`,
        [{ text: 'OK', onPress: () => { setCarNumber(''); onClose(); } }]
      );
    }, 1500);
  };

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
            <Text style={styles.title}>Sell Your Car in Minutes</Text>
            <Text style={styles.subtitle}>Enter registration number to get instant valuation</Text>
 
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Car Registration Number</Text>
              <View style={styles.inputWrapper}>
                <Feather name="credit-card" size={20} color="#8d716a" style={{ marginRight: 4 }} />
                <TextInput
                  style={styles.input}
                  placeholder="KA 03 MS 1234"
                  placeholderTextColor="#cbd5e1"
                  value={carNumber}
                  onChangeText={setCarNumber}
                  autoCapitalize="characters"
                  autoCorrect={false}
                />
              </View>
            </View>
 
            <Pressable 
              onPressIn={handleBtnPressIn}
              onPressOut={handleBtnPressOut}
              onPress={handleGetPrice}
              disabled={loading}
              style={{ width: '100%' }}
            >
              <Animated.View style={[styles.button, loading ? styles.buttonDisabled : null, { transform: [{ scale: btnScale }] }]}>
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <View style={styles.btnContent}>
                    <Text style={styles.buttonText}>Get Instant Price</Text>
                    <Feather name="arrow-right" size={14} color="#ffffff" style={{ marginLeft: 4 }} />
                  </View>
                )}
              </Animated.View>
            </Pressable>
 
            <Pressable onPress={() => Alert.alert('Notice', 'Alternative listing options are loading.')}>
              <Text style={styles.helperLink}>Don't know your car number?</Text>
            </Pressable>
 
            {/* Badges */}
            <View style={styles.badgesRow}>
              <View style={styles.badgeCol}>
                <View style={styles.badgeCircle}>
                  <Feather name="zap" size={15} color="#EF5F3C" />
                </View>
                <Text style={styles.badgeLabel}>Instant Quote</Text>
              </View>
              <View style={styles.badgeCol}>
                <View style={styles.badgeCircle}>
                  <Feather name="shield" size={15} color="#EF5F3C" />
                </View>
                <Text style={styles.badgeLabel}>Secure Process</Text>
              </View>
              <View style={styles.badgeCol}>
                <View style={styles.badgeCircle}>
                  <Feather name="dollar-sign" size={15} color="#EF5F3C" />
                </View>
                <Text style={styles.badgeLabel}>Same Day Pay</Text>
              </View>
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
  },
  inputGroup: {
    width: '100%',
    marginTop: 24,
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8d716a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fb',
    borderWidth: 1,
    borderColor: '#e1e2e4',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191c1e',
  },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#EF5F3C',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    elevation: 3,
    shadowColor: '#EF5F3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.24,
    shadowRadius: 12,
  },
  buttonDisabled: {
    opacity: 0.8,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  helperLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF5F3C',
    textDecorationLine: 'underline',
    marginTop: 16,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#edeef0',
    paddingTop: 24,
    marginTop: 24,
  },
  badgeCol: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 4,
  },
  badgeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(207, 225, 248, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#2D3E50',
  },
});
