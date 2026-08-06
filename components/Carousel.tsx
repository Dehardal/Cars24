import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View, Image, StyleSheet, Dimensions, Pressable, Text, Animated } from 'react-native';
import { CarouselProps, SduiAction } from '../schema/types';

interface CarouselComponentProps {
  props: CarouselProps;
  onAction: (action: SduiAction) => void;
}

const CarouselSlide = ({ 
  item, 
  onAction, 
  width 
}: { 
  item: any; 
  onAction: (action: SduiAction) => void; 
  width: number;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1.0, useNativeDriver: true, friction: 3 }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => item.actions?.onTap && onAction(item.actions.onTap)}
    >
      <Animated.View style={[styles.itemWrapper, { width, transform: [{ scale }] }]}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title || 'Exchange Bonus'}</Text>
          <Text style={styles.subtitle}>{item.subtitle || 'Get up to ₹50,000 extra value'}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const Carousel = React.memo(({ props, onAction }: CarouselComponentProps) => {
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width - 32);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleLayout = (e: any) => {
    const { width } = e.nativeEvent.layout;
    if (width > 0) {
      setContainerWidth(width);
    }
  };

  useEffect(() => {
    if (!props.items || props.items.length <= 1) return;
    const intervalTime = props.autoScrollMs || 4000;
    
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= props.items.length) {
        nextIndex = 0;
      }
      setActiveIndex(nextIndex);
      try {
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      } catch (err) {
        console.warn('Carousel scrollToIndex warning:', err);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [activeIndex, props.items, props.autoScrollMs]);

  if (!props.items || props.items.length === 0) return null;

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <FlatList
        ref={flatListRef}
        data={props.items}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / containerWidth);
          if (index >= 0 && index < props.items.length) {
            setActiveIndex(index);
          }
        }}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: containerWidth,
          offset: containerWidth * index,
          index,
        })}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <CarouselSlide item={item} onAction={onAction} width={containerWidth} />
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
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 8,
    position: 'relative',
    width: '100%',
  },
  itemWrapper: {
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
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(25, 28, 30, 0.65)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
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
    width: 16,
  },
});

export default Carousel;
