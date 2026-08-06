import React, { useEffect, useRef } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Animated, 
  Dimensions 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SideDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(width * 0.75, 300);

const DrawerItem = ({ 
  icon, 
  label, 
  onPress 
}: { 
  icon: string; 
  label: string; 
  onPress: () => void;
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
      onPress={onPress}
      style={styles.itemWrapper}
    >
      <Animated.View style={[styles.item, { transform: [{ scale }] }]}>
        <Feather name={icon as any} size={18} color="#2D3E50" />
        <Text style={styles.label}>{label}</Text>
        <Feather name="chevron-right" size={14} color="#e1e2e4" style={styles.arrow} />
      </Animated.View>
    </Pressable>
  );
};

export default function SideDrawer({ visible, onClose }: SideDrawerProps) {
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 5,
        tension: 40,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Backdrop overlay */}
        <Pressable style={styles.backdrop} onPress={onClose} />
        
        {/* Drawer Content */}
        <Animated.View style={[styles.drawer, { width: DRAWER_WIDTH, transform: [{ translateX: slideAnim }] }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <Feather name="user" size={24} color="#ffffff" />
              </View>
              <View style={styles.headerText}>
                <Text style={styles.welcome}>Welcome Guest</Text>
                <Text style={styles.loginBtn}>Login / Sign Up</Text>
              </View>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuList}>
            <DrawerItem icon="search" label="Buy Used Cars" onPress={onClose} />
            <DrawerItem icon="dollar-sign" label="Sell Your Car" onPress={onClose} />
            <DrawerItem icon="percent" label="EMI & Loan Calculator" onPress={onClose} />
            <DrawerItem icon="shield" label="Cars24 Certified Assured" onPress={onClose} />
            <DrawerItem icon="settings" label="App Settings" onPress={onClose} />
            <DrawerItem icon="help-circle" label="Help & Support" onPress={onClose} />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.version}>Cars24 SDUI v1.0.0</Text>
            <Text style={styles.copyright}>© 2026 Cars24. All rights reserved.</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(45, 62, 80, 0.5)',
  },
  drawer: {
    height: '100%',
    backgroundColor: '#ffffff',
    shadowColor: '#2D3E50',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  header: {
    backgroundColor: '#2D3E50',
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EF5F3C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flexDirection: 'column',
    gap: 2,
  },
  welcome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loginBtn: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF5F3C',
  },
  menuList: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection: 'column',
    gap: 4,
  },
  itemWrapper: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 12,
    position: 'relative',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D3E50',
  },
  arrow: {
    position: 'absolute',
    right: 12,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#edeef0',
    flexDirection: 'column',
    gap: 2,
  },
  version: {
    fontSize: 10,
    color: '#8d716a',
    fontWeight: 'bold',
  },
  copyright: {
    fontSize: 9,
    color: '#cbd5e1',
  },
});
