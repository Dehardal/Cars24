import React from 'react';
import { ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { ChipGroupProps, SduiAction } from '../schema/types';

interface ChipGroupComponentProps {
  props: ChipGroupProps;
  actions?: {
    onSelect?: SduiAction;
  };
  onAction: (action: SduiAction) => void;
}

const ChipGroup = React.memo(({ props, actions, onAction }: ChipGroupComponentProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {props.options.map(option => {
        const isSelected = option.id === props.selectedId;
        return (
          <Pressable
            key={option.id}
            style={[styles.chip, isSelected ? styles.selectedChip : null]}
            onPress={() => {
              if (actions?.onSelect) {
                onAction({
                  ...actions.onSelect,
                  value: option.id,
                } as any);
              }
            }}
          >
            <Text style={[styles.chipText, isSelected ? styles.selectedText : null]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
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
