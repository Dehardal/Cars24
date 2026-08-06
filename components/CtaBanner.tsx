import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { CtaBannerProps, SduiAction } from '../schema/types';
import { Feather } from '@expo/vector-icons';

interface CtaBannerComponentProps {
  props: CtaBannerProps;
  actions?: {
    onTap?: SduiAction;
  };
  onAction: (action: SduiAction) => void;
}

const CtaBannerButton = ({ 
  label, 
  actions, 
  onAction 
}: { 
  label: string; 
  actions: any; 
  onAction: (action: SduiAction) => void;
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
      onPress={() => actions?.onTap && onAction(actions.onTap)}
    >
      <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
        <Text style={styles.buttonText}>{label}</Text>
        <Feather name="arrow-right" size={12} color="#ffffff" style={{ marginLeft: 4 }} />
      </Animated.View>
    </Pressable>
  );
};

export default function CtaBanner({ props, actions, onAction }: CtaBannerComponentProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>Get best price instantly</Text>
      </View>
      <CtaBannerButton label={props.ctaLabel} actions={actions} onAction={onAction} />
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
    color: 'rgba(255, 255, 255, 0.85)',
  },
  button: {
    backgroundColor: '#EF5F3C',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
