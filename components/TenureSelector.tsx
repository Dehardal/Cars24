import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TenureSelectorProps, SduiAction } from '../schema/types';

interface TenureSelectorComponentProps {
  props: TenureSelectorProps;
  actions?: {
    onSelect?: SduiAction;
  };
  onAction: (action: SduiAction) => void;
}

const TenureSelector = React.memo(({ props, actions, onAction }: TenureSelectorComponentProps) => {
  const selectedMonths = props.selectedMonths ?? 36;
  const emiText = props.emiValue ?? '₹12,450';

  const handleSelect = (months: number) => {
    if (actions?.onSelect) {
      onAction({
        ...actions.onSelect,
        value: months,
      } as any);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.sub}>EMI Planner</Text>
          <Text style={styles.title}>Customize Tenure</Text>
        </View>
        <Text style={styles.emi}>
          {emiText}
          <Text style={styles.emiPeriod}>/mo</Text>
        </Text>
      </View>
      <View style={styles.optionsRow}>
        {props.options.map(months => {
          const isSelected = months === selectedMonths;
          return (
            <Pressable
              key={months}
              style={[styles.btn, isSelected ? styles.selectedBtn : null]}
              onPress={() => handleSelect(months)}
            >
              <Text style={[styles.btnText, isSelected ? styles.selectedBtnText : null]}>
                {months}m
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#edeef0',
    elevation: 2,
    shadowColor: '#2D3E50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sub: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8d716a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191c1e',
    marginTop: 2,
  },
  emi: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3E50',
  },
  emiPeriod: {
    fontSize: 11,
    fontWeight: '400',
    color: '#59413b',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e2e4',
    backgroundColor: '#ffffff',
  },
  selectedBtn: {
    borderColor: '#EF5F3C',
    backgroundColor: 'rgba(239, 95, 60, 0.1)',
  },
  btnText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2D3E50',
  },
  selectedBtnText: {
    color: '#EF5F3C',
    fontWeight: '700',
  },
});

export default TenureSelector;
