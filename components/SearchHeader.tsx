import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SearchHeaderProps, SduiAction } from '../schema/types';

interface SearchHeaderComponentProps {
  props: SearchHeaderProps;
  actions?: {
    onTap?: SduiAction;
  };
  onAction: (action: SduiAction) => void;
}

export default function SearchHeader({ props, actions, onAction }: SearchHeaderComponentProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.menuWrapper}>
          <Text style={styles.menuIcon}>☰</Text>
        </View>
        <View style={styles.locationChip}>
          <Text style={styles.locationPin}>📍</Text>
          <Text style={styles.locationText}>{props.location}</Text>
          <Text style={styles.locationArrow}>▼</Text>
        </View>
        <Text style={styles.brandTitle}>Cars24</Text>
      </View>
      <Pressable 
        style={styles.searchBar} 
        onPress={() => actions?.onTap && onAction(actions.onTap)}
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchText}>{props.placeholder}</Text>
      </Pressable>
    </View>
  );
}

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
