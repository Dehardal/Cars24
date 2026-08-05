import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconTextRowProps } from '../schema/types';

interface IconTextRowComponentProps {
  props: IconTextRowProps;
}

export default function IconTextRow({ props }: IconTextRowComponentProps) {
  return (
    <View style={styles.container}>
      {props.items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <View style={styles.divider} />}
          <View style={styles.item}>
            <Text style={styles.icon}>
              {item.icon === 'shield' ? '🛡️' : '🔄'}
            </Text>
            <Text style={styles.label}>{item.label}</Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f4f6',
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 16,
    color: '#EF5F3C',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2D3E50',
    textAlign: 'center',
    lineHeight: 14,
  },
  divider: {
    width: 1,
    height: 18,
    backgroundColor: '#e1e2e4',
  },
});
