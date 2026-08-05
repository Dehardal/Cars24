import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View, Image, StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import { CarouselProps, SduiAction } from '../schema/types';

const { width } = Dimensions.get('window');
const CAROUSEL_WIDTH = width - 32;

interface CarouselComponentProps {
  props: CarouselProps;
  onAction: (action: SduiAction) => void;
}

export default function Carousel({ props, onAction }: CarouselComponentProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!props.items || props.items.length <= 1) return;
    const intervalTime = props.autoScrollMs || 4000;
    
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= props.items.length) {
        nextIndex = 0;
      }
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [activeIndex, props.items, props.autoScrollMs]);

  if (!props.items || props.items.length === 0) return null;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={props.items}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / CAROUSEL_WIDTH);
          setActiveIndex(index);
        }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemWrapper}
            onPress={() => item.actions?.onTap && onAction(item.actions.onTap)}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.title}>Exchange Bonus</Text>
              <Text style={styles.subtitle}>Get up to ₹50,000 extra value</Text>
            </View>
          </Pressable>
        )}
      />
      <View style={styles.dotContainer}>
        {props.items.map((_, idx) => (
          <View
            key={idx}
            style={[styles.dot, activeIndex === idx ? styles.activeDot : null]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 8,
    position: 'relative',
  },
  itemWrapper: {
    width: CAROUSEL_WIDTH,
    height: 128,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#2D3E50',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(45, 62, 80, 0.75)',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e1e2e4',
  },
  activeDot: {
    backgroundColor: '#EF5F3C',
    width: 12,
  },
});
