import React, { useRef } from 'react';
import { ScrollView, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { ChipGroupProps, SduiAction } from '../schema/types';

interface ChipGroupComponentProps {
  props: ChipGroupProps;
  actions?: {
    onSelect?: SduiAction;
  };
  onAction: (action: SduiAction) => void;
}

const ChipItem = ({ 
  option, 
  isSelected, 
  actions, 
  onAction 
}: { 
  option: any; 
  isSelected: boolean; 
  actions: any; 
  onAction: (action: SduiAction) => void;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.94, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1.0, useNativeDriver: true, friction: 3 }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        if (actions?.onSelect) {
          onAction({
            ...actions.onSelect,
            value: option.id,
          } as any);
        }
      }}
    >
      <Animated.View style={[styles.chip, isSelected ? styles.selectedChip : null, { transform: [{ scale }] }]}>
        <Text style={[styles.chipText, isSelected ? styles.selectedText : null]}>
          {option.label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const ChipGroup = React.memo(({ props, actions, onAction }: ChipGroupComponentProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {props.options.map(option => (
        <ChipItem
          key={option.id}
          option={option}
          isSelected={option.id === props.selectedId}
          actions={actions}
          onAction={onAction}
        />
      ))}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e1e2e4',
    backgroundColor: '#ffffff',
  },
  selectedChip: {
    borderColor: '#EF5F3C',
    backgroundColor: 'rgba(239, 95, 60, 0.1)',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2D3E50',
  },
  selectedText: {
    color: '#EF5F3C',
    fontWeight: '700',
  },
});

export default ChipGroup;
