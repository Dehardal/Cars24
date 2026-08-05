import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CtaBannerProps, SduiAction } from '../schema/types';

interface CtaBannerComponentProps {
  props: CtaBannerProps;
  actions?: {
    onTap?: SduiAction;
  };
  onAction: (action: SduiAction) => void;
}

export default function CtaBanner({ props, actions, onAction }: CtaBannerComponentProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>Get best price instantly</Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => actions?.onTap && onAction(actions.onTap)}
      >
        <Text style={styles.buttonText}>{props.ctaLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#2D3E50',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#2D3E50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginVertical: 8,
  },
  textContainer: {
    flexDirection: 'column',
    gap: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  button: {
    backgroundColor: '#EF5F3C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
