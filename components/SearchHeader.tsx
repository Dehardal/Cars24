import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { SearchHeaderProps, SduiAction } from '../schema/types';
import { Feather } from '@expo/vector-icons';

interface SearchHeaderComponentProps {
  props: SearchHeaderProps;
  actions?: {
    onTap?: SduiAction;
    onLocationTap?: SduiAction;
    onMenuTap?: SduiAction;
  };
  onAction: (action: SduiAction) => void;
}

const SearchHeader = React.memo(({ props, actions, onAction }: SearchHeaderComponentProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1.0, useNativeDriver: true, friction: 3 }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable 
          style={styles.menuWrapper}
          onPress={() => actions?.onMenuTap && onAction(actions.onMenuTap)}
        >
          <Feather name="menu" size={22} color="#EF5F3C" />
        </Pressable>
        <Pressable 
          style={styles.locationChip}
          onPress={() => actions?.onLocationTap && onAction(actions.onLocationTap)}
        >
          <Feather name="map-pin" size={12} color="#EF5F3C" />
          <Text style={styles.locationText}>{props.location}</Text>
          <Feather name="chevron-down" size={10} color="#2D3E50" style={{ marginLeft: 2 }} />
        </Pressable>
        <Text style={styles.brandTitle}>Cars24</Text>
      </View>
      <Pressable 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => actions?.onTap && onAction(actions.onTap)}
      >
        <Animated.View style={[styles.searchBar, { transform: [{ scale }] }]}>
          <Feather name="search" size={14} color="#8d716a" />
          <Text style={styles.searchText}>{props.placeholder}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
});

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#edeef0',
    flexDirection: 'column',
    gap: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  menuWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 20,
    color: '#ab2f0f',
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f4f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 4,
  },
  locationPin: {
    fontSize: 12,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D3E50',
  },
  locationArrow: {
    fontSize: 8,
    color: '#2D3E50',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ab2f0f',
    letterSpacing: -0.5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fb',
    borderWidth: 1,
    borderColor: '#e1e2e4',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchIcon: {
    fontSize: 14,
    color: '#8d716a',
  },
  searchText: {
    fontSize: 13,
    color: '#8d716a',
    flex: 1,
  },
});
